import 'reflect-metadata'
import { Body, Controller, HttpException, HttpStatus, Module, Post, Res } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { Response } from 'express'

const FLOWISE_URL = process.env.FLOWISE_URL ?? 'http://127.0.0.1:3000'
const FLOWISE_CHATFLOW_ID = process.env.FLOWISE_CHATFLOW_ID ?? '1f3ed5ba-65f7-47f1-bc73-9d0f96b92a10'
const FLOWISE_TIMEOUT_MS = Number(process.env.FLOWISE_TIMEOUT_MS ?? 120000)

type GenerateSeoRequest = {
  product_name?: unknown
  category?: unknown
  keywords?: unknown
}

type SeoPayload = {
  title: string
  meta_description: string
  h1: string
  description: string
  bullets: string[]
}

type FlowiseResponse = {
  json?: unknown
  text?: unknown
}

class TimeoutError extends Error {
  constructor() {
    super('Flowise request timed out')
  }
}

@Controller()
class SeoController {
  @Post('/api/generate-seo')
  async generateSeo(@Body() body: GenerateSeoRequest, @Res() res: Response) {
    let input: Required<GenerateSeoRequest>
    try {
      input = validateInput(body)
    } catch (error) {
      const status = mapErrorStatus(error)
      return res.status(status).json({
        error: error instanceof Error ? error.message : 'Invalid request'
      })
    }

    res.status(200)
    res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('X-Accel-Buffering', 'no')

    writeChunk(res, { event: 'start' })

    try {
      const flowiseResponse = await callFlowise(input)
      const seo = normalizeFlowiseResponse(flowiseResponse)

      writeChunk(res, { event: 'result', data: seo })
      writeChunk(res, { event: 'done' })
      res.end()
    } catch (error) {
      const status = mapErrorStatus(error)
      res.status(status)
      writeChunk(res, {
        event: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      res.end()
    }
  }
}

@Module({
  controllers: [SeoController]
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] })
  app.enableCors()
  const port = Number(process.env.PORT ?? 3100)
  await app.listen(port, '127.0.0.1')
  console.log(`SEO generator API listening on http://127.0.0.1:${port}`)
}

function validateInput(body: GenerateSeoRequest): Required<GenerateSeoRequest> {
  const product_name = cleanString(body.product_name)
  const category = cleanString(body.category)
  const keywords = cleanString(body.keywords)

  const missing = [
    !product_name && 'product_name',
    !category && 'category',
    !keywords && 'keywords'
  ].filter(Boolean)

  if (missing.length > 0) {
    throw new HttpException(`Missing required fields: ${missing.join(', ')}`, HttpStatus.BAD_REQUEST)
  }

  return {
    product_name,
    category,
    keywords
  }
}

async function callFlowise(input: Required<GenerateSeoRequest>): Promise<FlowiseResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(new TimeoutError()), FLOWISE_TIMEOUT_MS)

  try {
    const response = await fetch(`${FLOWISE_URL}/api/v1/prediction/${FLOWISE_CHATFLOW_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      signal: controller.signal,
      body: JSON.stringify({
        question: 'Generate SEO JSON.',
        overrideConfig: {
          vars: input
        }
      })
    })

    const text = await response.text()
    if (!response.ok) {
      throw new HttpException(`Flowise error ${response.status}: ${text.slice(0, 500)}`, HttpStatus.BAD_GATEWAY)
    }
    if (!text.trim()) {
      throw new HttpException('Empty response from Flowise', HttpStatus.BAD_GATEWAY)
    }

    try {
      return JSON.parse(text) as FlowiseResponse
    } catch {
      throw new HttpException('Invalid JSON response from Flowise', HttpStatus.BAD_GATEWAY)
    }
  } catch (error) {
    if (error instanceof HttpException) throw error
    if (error instanceof TimeoutError || (error instanceof Error && error.name === 'AbortError')) {
      throw new HttpException('Flowise request timed out', HttpStatus.GATEWAY_TIMEOUT)
    }
    throw new HttpException(error instanceof Error ? error.message : 'Flowise request failed', HttpStatus.BAD_GATEWAY)
  } finally {
    clearTimeout(timeout)
  }
}

function normalizeFlowiseResponse(response: FlowiseResponse): SeoPayload {
  const raw = response.json ?? response.text
  if (raw == null) {
    throw new HttpException('Empty answer from LLM', HttpStatus.BAD_GATEWAY)
  }

  const parsed = typeof raw === 'string' ? parseJsonString(raw) : raw
  if (!isSeoPayload(parsed)) {
    throw new HttpException('Invalid SEO JSON from LLM', HttpStatus.BAD_GATEWAY)
  }

  return {
    title: parsed.title.trim(),
    meta_description: parsed.meta_description.trim(),
    h1: parsed.h1.trim(),
    description: parsed.description.trim(),
    bullets: parsed.bullets.map((item) => item.trim()).filter(Boolean)
  }
}

function parseJsonString(value: string): unknown {
  const trimmed = value.trim()
  const withoutFence = trimmed.startsWith('```')
    ? trimmed.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
    : trimmed

  try {
    return JSON.parse(withoutFence)
  } catch {
    throw new HttpException('Invalid JSON returned by LLM', HttpStatus.BAD_GATEWAY)
  }
}

function isSeoPayload(value: unknown): value is SeoPayload {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<SeoPayload>
  return (
    typeof item.title === 'string' &&
    typeof item.meta_description === 'string' &&
    typeof item.h1 === 'string' &&
    typeof item.description === 'string' &&
    Array.isArray(item.bullets) &&
    item.bullets.length > 0 &&
    item.bullets.every((bullet) => typeof bullet === 'string' && bullet.trim().length > 0)
  )
}

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function writeChunk(res: Response, payload: unknown) {
  res.write(`${JSON.stringify(payload)}\n`)
}

function mapErrorStatus(error: unknown): number {
  if (error instanceof HttpException) return error.getStatus()
  return HttpStatus.INTERNAL_SERVER_ERROR
}

void bootstrap()
