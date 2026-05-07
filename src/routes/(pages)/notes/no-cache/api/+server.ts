import type { RequestHandler } from './$types'

export const GET: RequestHandler = ({ request }) => {
  if (request.headers.get('if-none-match') === '"hello"') {
    return new Response(null, {
      status: 304,
      headers: {
        'content-length': '0',
      }
    })
  }

  const body = JSON.stringify({ hello: 'world' })

  return new Response(body, {
    status: 200,
    headers: {
      etag: '"hello"',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'content-length': body.length.toString(),
    }
  })
}
