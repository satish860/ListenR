/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pngitem.com',
      }
    ],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
}

export default nextConfig
