/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  images: {
    domains: ["d1.awsstatic.com"],
  },
};

module.exports = nextConfig;
