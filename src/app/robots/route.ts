import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${process.env.PAYLOAD_URL}/sitemap.xml
`

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store',
    },
  })
}
