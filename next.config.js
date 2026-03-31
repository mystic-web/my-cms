/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ggims.com', 'ggims.in'],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
    responseLimit: '20mb',
  },
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/blog/general/:slug',
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig