import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumb.tossinvest.com',
      },
      {
        protocol: 'https',
        hostname: 'img.hankyung.com',
      },
    ],
  },
};

export default nextConfig;