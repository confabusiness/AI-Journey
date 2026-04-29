const http = require('http')

const port = Number(process.env.MOCK_FLOWISE_PORT || 3998)
const mode = process.env.MOCK_FLOWISE_MODE || 'invalid-llm-json'

const server = http.createServer((req, res) => {
  if (!req.url.startsWith('/api/v1/prediction/')) {
    res.writeHead(404, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: 'not found' }))
    return
  }

  if (mode === 'empty-flowise-response') {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end('')
    return
  }

  if (mode === 'invalid-flowise-json') {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end('not-json')
    return
  }

  res.writeHead(200, { 'content-type': 'application/json' })
  res.end(JSON.stringify({ text: 'not-json-from-llm' }))
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Mock Flowise ${mode} listening on http://127.0.0.1:${port}`)
})
