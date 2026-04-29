# SEO Product Description Generator
https://drive.google.com/file/d/1qpDJuROJc4sSyifRTpW7PbEL2YqJJb51/view?usp=drive_link

Portfolio/test assignment project: a Flowise + Ollama workflow wrapped by a small NestJS API.

The service accepts product data and returns a structured SEO JSON response:

- `title`
- `meta_description`
- `h1`
- `description`
- `bullets`

## Architecture

```text
Client
  -> POST /api/generate-seo
  -> NestJS API
  -> Flowise Prediction API
  -> Flowise LLM Chain
  -> Ollama model
  -> Structured Output Parser
  -> NDJSON streaming response
```

## Repository Structure

```text
api/                         NestJS endpoint
flowise/chatflow-export.json Flowise chatflow export
ollama/apertus-tools-seo.Modelfile
docs/architecture.md
docs/edge-cases.md
docs/follow-up-notes.md
```

## Requirements

- Node.js 20+
- Flowise running locally on `http://127.0.0.1:3000`
- Ollama running locally on `http://127.0.0.1:11434`
- Imported Flowise chatflow from `flowise/chatflow-export.json`
- Ollama model alias from `ollama/apertus-tools-seo.Modelfile`

## Ollama Setup

```powershell
ollama create apertus-tools-seo -f .\ollama\apertus-tools-seo.Modelfile
ollama show apertus-tools-seo
```

The model alias uses `num_ctx 8192`. The SEO task has only three short input fields, so a 64K context window adds latency without improving output quality.

## Flowise Setup

Import:

```text
flowise/chatflow-export.json
```

The local test chatflow id was:

```text
1f3ed5ba-65f7-47f1-bc73-9d0f96b92a10
```

If your imported Flowise chatflow gets a different id, set it through the API environment variable:

```powershell
$env:FLOWISE_CHATFLOW_ID="your-imported-chatflow-id"
```

## API Setup

```powershell
cd .\api
npm install
npm run build
npm start
```

Default API URL:

```text
http://127.0.0.1:3100
```

## Browser Demo

After starting the API, open:

```text
demo.html
```

The demo page calls `POST http://127.0.0.1:3100/api/generate-seo` and renders the SEO fields in the browser.

For a video walkthrough with PowerShell startup commands and browser-only testing, use:

```text
docs/video-script.md
```

Demo video:

```text
https://drive.google.com/file/d/1qpDJuROJc4sSyifRTpW7PbEL2YqJJb51/view?usp=drive_link
```

## Example Request

```powershell
$body = @{
  product_name = "Кожаный рюкзак для ноутбука 15 дюймов"
  category = "Рюкзаки и сумки"
  keywords = "кожаный рюкзак, рюкзак для ноутбука, рюкзак 15 дюймов"
} | ConvertTo-Json

Invoke-WebRequest `
  -UseBasicParsing `
  -Method Post `
  -Uri http://127.0.0.1:3100/api/generate-seo `
  -ContentType "application/json; charset=utf-8" `
  -Body $body
```

## Streaming Response

The endpoint returns newline-delimited JSON:

```json
{"event":"start"}
{"event":"result","data":{"title":"...","meta_description":"...","h1":"...","description":"...","bullets":["..."]}}
{"event":"done"}
```

Errors during generation are returned as stream events:

```json
{"event":"start"}
{"event":"error","error":"Invalid JSON returned by LLM"}
```

Validation errors before generation return regular HTTP `400` JSON.

## Notes

This project intentionally keeps Flowise as the orchestration layer and NestJS as the product API boundary. The API validates input, handles Flowise/network failures, normalizes JSON, and streams a simple client-friendly response.
