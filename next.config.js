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
        hostname: 'psflgg7lbj7nj1n9.public.blob.vercel-storage.com',
      },
      {
        hostname: 'csfqylejvcsupafcogzv.supabase.co',
      },
    ],
  },
  compress: false,
};

module.exports = withBundleAnalyzer(nextConfig);
