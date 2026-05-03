# SEO Product Description Generator
https://drive.google.com/file/d/1qpDJuROJc4sSyifRTpW7PbEL2YqJJb51/view?usp=drive_link

Portfolio case study: a browser demo and local API that turn basic product data into structured SEO content for ecommerce.

The project shows how an AI workflow can produce a title, meta description, H1, product description, and bullet points from a small product brief. It keeps the business value visible first, while the technical architecture stays documented below.

## Demo

- Browser demo: `demo.html`
- Demo video: https://drive.google.com/file/d/1qpDJuROJc4sSyifRTpW7PbEL2YqJJb51/view?usp=drive_link
- Screenshot: TODO - add `assets/seo-demo-screenshot.png`

## Problem

Ecommerce teams often need many product descriptions, category-friendly titles, and meta descriptions. Writing each one manually is slow, repetitive, and inconsistent.

## Solution

This demo accepts three input fields:

- product name
- category
- keywords

It returns a structured SEO JSON response:

- `title`
- `meta_description`
- `h1`
- `description`
- `bullets`

## Example

Input:

```json
{
  "product_name": "Leather laptop backpack 15 inch",
  "category": "Backpacks and bags",
  "keywords": "leather backpack, laptop backpack, 15 inch backpack"
}
```

Output shape:

```json
{
  "title": "...",
  "meta_description": "...",
  "h1": "...",
  "description": "...",
  "bullets": ["...", "...", "..."]
}
```

## Workflow

```text
Browser demo
  -> POST /api/generate-seo
  -> NestJS API validates input
  -> Flowise Prediction API
  -> local Ollama model
  -> structured output parser
  -> NDJSON response rendered in browser
```

## Business Value

This workflow can help ecommerce and content teams:

- create first drafts faster
- keep output fields consistent
- reduce repetitive copywriting work
- separate product input from generated SEO fields
- review AI output before publishing

## Stack

- Flowise for visual AI workflow orchestration
- Ollama for local LLM execution
- NestJS for the API boundary
- HTML/CSS/JavaScript for the browser demo
- NDJSON streaming for simple client-friendly responses

## Repository Structure

```text
demo.html                     Browser demo
api/                          NestJS endpoint
flowise/chatflow-export.json  Flowise chatflow export
ollama/apertus-tools-seo.Modelfile
docs/architecture.md
docs/edge-cases.md
docs/follow-up-notes.md
docs/video-script.md
```

## Requirements

- Node.js 20+
- Flowise running locally on `http://127.0.0.1:3000`
- Ollama running locally on `http://127.0.0.1:11434`
- imported Flowise chatflow from `flowise/chatflow-export.json`
- Ollama model alias from `ollama/apertus-tools-seo.Modelfile`

## Setup

Create the Ollama model alias:

```powershell
ollama create apertus-tools-seo -f .\ollama\apertus-tools-seo.Modelfile
ollama show apertus-tools-seo
```

Start the API:

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

Open:

```text
demo.html
```

## Configuration

The local test chatflow id was:

```text
1f3ed5ba-65f7-47f1-bc73-9d0f96b92a10
```

If your imported Flowise chatflow gets a different id, set it through the API environment variable:

```powershell
$env:FLOWISE_CHATFLOW_ID="your-imported-chatflow-id"
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

## Next Improvements

- add screenshot to the README
- add a hosted browser-only mock demo
- add examples for several product categories
- add output quality checklist for human review
- add optional export to CSV or Google Sheets
