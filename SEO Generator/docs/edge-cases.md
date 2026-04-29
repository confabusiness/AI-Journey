# Edge Cases

## Missing Input

If one of the required fields is missing:

- `product_name`
- `category`
- `keywords`

the API returns HTTP `400`.

Example:

```json
{"error":"Missing required fields: product_name"}
```

## Flowise Unavailable

If Flowise is down or the API URL is wrong, the endpoint streams an error event:

```json
{"event":"start"}
{"event":"error","error":"fetch failed"}
```

## Timeout

The Flowise request is aborted after `FLOWISE_TIMEOUT_MS`.

Default:

```text
120000 ms
```

Override:

```powershell
$env:FLOWISE_TIMEOUT_MS="30000"
```

## Empty Flowise Response

The API checks for an empty response body and returns:

```json
{"event":"error","error":"Empty response from Flowise"}
```

## Invalid Flowise JSON

If Flowise returns a non-JSON HTTP response:

```json
{"event":"error","error":"Invalid JSON response from Flowise"}
```

## Invalid LLM JSON

If Flowise returns text that cannot be parsed into the required SEO JSON object:

```json
{"event":"error","error":"Invalid JSON returned by LLM"}
```

## Invalid SEO Shape

If the parsed object misses one of the required fields or has a wrong type, the API returns:

```json
{"event":"error","error":"Invalid SEO JSON from LLM"}
```
