# Follow-Up Notes

## Why `num_ctx 8192`

The task input is small: product name, category, and keywords. There is no document ingestion and no retrieval step.

`8192` tokens is enough for:

- system/prompt instructions;
- three input fields;
- parser format instructions;
- a complete SEO JSON response.

A previous 64K setup worked but was much slower locally and loaded a much larger Ollama context. For this task, 64K adds latency without useful quality gain.

## Why No Chunking

Chunking is not needed because the API receives structured short fields, not long documents.

If the product input later includes long reviews, supplier descriptions, or marketplace catalogs, chunking could be added before Flowise:

- split source text by semantic sections;
- summarize or extract facts;
- pass only verified facts into the SEO generator.

For the current assignment, chunking would add complexity without solving a real problem.

## Why Structured Output Parser

The assignment requires JSON with a stable schema:

- `title`
- `meta_description`
- `h1`
- `description`
- `bullets`

Flowise Structured Output Parser forces the LLM output into that shape before it reaches the API. The NestJS layer then performs a second validation pass, because LLM output should not be trusted blindly.

## Prompt Design

The prompt is intentionally strict:

- asks for Russian ecommerce SEO copy;
- defines each field;
- forbids unsupported claims;
- tells the model not to invent hidden product features;
- handles sparse input with neutral wording.

This reduces hallucinations such as fake warranty, exact dimensions, app integrations, certifications, or compatibility claims.

## Why Backend Validation Still Exists

The parser improves output quality, but the API still validates:

- Flowise may return an error body;
- the LLM can still produce malformed JSON;
- parser behavior may change after model/provider swaps;
- client-facing API should fail predictably.

## Latency Notes

Local Ollama inference speed depends on CPU/GPU/RAM. The backend uses timeout handling so a slow local model does not leave the client hanging indefinitely.
