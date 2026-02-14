/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'pawdash-uploads.s3.amazonaws.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY,
    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  },
}

module.exports = nextConfig
