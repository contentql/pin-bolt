import { env } from '@env'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const sitemap = `User-Agent: Googlebot
Allow: /
Disallow: /admin/
User-Agent: Applebot
Disallow: /admin/
User-Agent: Bingbot
Disallow: /admin/
Sitemap: ${env.PAYLOAD_URL}/sitemap.xml`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store',
    },
  })
}
