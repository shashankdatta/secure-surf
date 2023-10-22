/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {}, /* deleted appDr: true, not recognzied by current version of Next.js  */
  images: {
    domains: ["localhost", "upload.wikimedia.org", "ssurf.tech"],
  },
};

module.exports = nextConfig;
