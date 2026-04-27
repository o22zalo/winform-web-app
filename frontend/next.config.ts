import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  output: 'standalone',
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
