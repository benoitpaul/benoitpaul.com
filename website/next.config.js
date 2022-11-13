/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ["d1.awsstatic.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
