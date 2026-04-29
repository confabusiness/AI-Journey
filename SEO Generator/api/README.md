# SEO Generator API

NestJS wrapper over Flowise Prediction API.

## Endpoint

`POST /api/generate-seo`

Request:

```json
{
  "product_name": "Умная светодиодная лампа RGB E27",
  "category": "Освещение для дома",
  "keywords": "умная лампа, RGB лампа, светодиодная лампа E27"
}
```

Response is newline-delimited JSON streaming:

```json
{"event":"start"}
{"event":"result","data":{"title":"...","meta_description":"...","h1":"...","description":"...","bullets":["..."]}}
{"event":"done"}
```

## Flowise

Default chatflow:

`1f3ed5ba-65f7-47f1-bc73-9d0f96b92a10`

The Flowise prompt uses `product_name`, `category`, and `keywords` as runtime variables through `overrideConfig.vars`.
