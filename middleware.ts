import { env } from '@env'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g., /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get('host')!

  // Extract subdomain or default to 'localhost'
  let currentHost = hostname
  if (process.env.NODE_ENV === 'production') {
    const baseDomain = env.PAYLOAD_URL // Your production domain
    currentHost = hostname.replace(`.${baseDomain}`, '') || 'localhost'
  } else {
    currentHost = hostname.replace('.localhost:3000', '') || 'localhost'
  }

  // Set a custom header for subdomain
  req.headers.set('x-custom-subdomain', currentHost)

  // Check if this is the root domain
  if (hostname === 'localhost') {
    return NextResponse.next() // No rewrite needed for root domain
  }

  // Rewrite subdomains to `/`
  url.pathname = '/'

  console.log('Hostname:', hostname)
  console.log('Rewriting to:', url.pathname)
  return NextResponse.rewrite(url)
}
