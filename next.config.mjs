import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/public': ['./public/**/*'],
  },
  experimental: {
    reactCompiler: false,
  },
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['geist'],
  compiler: {
    // removeConsole: process.env.NODE_ENV !== 'development', // Remove console.log in production
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'pin-hcms.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'https://pub-ce94fe258c7740b3a579a329e72059e4.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
