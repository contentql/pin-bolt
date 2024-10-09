import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  console.log('robots', { payloadURL: process.env.PAYLOAD_URL })

  const robotsTxt = `User-Agent: *
Allow: /

Sitemap: ${process.env.PAYLOAD_URL}`

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store',
    },
  })
}
