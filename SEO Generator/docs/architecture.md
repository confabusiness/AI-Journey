# Architecture

## Flow

```text
POST /api/generate-seo
  -> validate product_name/category/keywords
  -> call Flowise Prediction API
  -> Flowise prompt template injects variables
  -> LLM Chain calls Ollama
  -> Structured Output Parser validates JSON shape
  -> NestJS validates/normalizes final JSON
  -> response streams as NDJSON
```

## Why Flowise

Flowise is used for visual orchestration of the LLM workflow:

- prompt template can be inspected and changed without editing backend code;
- parser schema is visible in the workflow;
- model provider can be swapped in the UI;
- Prediction API gives the backend a stable integration point.

## Why NestJS

NestJS is used as the API boundary:

- validates request input;
- hides Flowise implementation details from clients;
- handles timeouts and malformed model output;
- returns streaming output in a predictable format.

## Why NDJSON Streaming

NDJSON is simple to consume from browsers, scripts, and backend clients. It also makes errors explicit after generation has started:

```json
{"event":"start"}
{"event":"result","data":{}}
{"event":"done"}
```

or:

```json
{"event":"start"}
{"event":"error","error":"Flowise request timed out"}
```
