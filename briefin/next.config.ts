import type { NextConfig } from 'next';
import path from 'path';

const repoRoot = path.resolve(__dirname, '..');

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: repoRoot,
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
