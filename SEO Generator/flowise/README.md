# Flowise Chatflow

Import `chatflow-export.json` into Flowise.

The chatflow contains:

- Ollama chat model node
- Prompt Template node
- LLM Chain node
- Advanced Structured Output Parser node

Runtime variables:

- `product_name`
- `category`
- `keywords`

The NestJS API passes these variables through Flowise `overrideConfig.vars`.

The parser schema requires:

- `title: string`
- `meta_description: string`
- `h1: string`
- `description: string`
- `bullets: string[]`
