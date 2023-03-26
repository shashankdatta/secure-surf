/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost", "upload.wikimedia.org", "ssurf.tech"],
  },
};

module.exports = nextConfig;
