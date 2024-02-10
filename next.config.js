const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'placehold.co',
      },
      {
        hostname: 'mvhpymzmjszthsc0.public.blob.vercel-storage.com',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
