import type { NextConfig } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/server/:path*',
        destination: 'https://giraffy-marketplace-api.koyeb.app/:path*',
      },
      {
        source: '/api/:path((?!auth/).*)',
        destination: 'https://giraffy-marketplace-api.koyeb.app/:path*',
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              titleProp: true,
            },
          },
        ],
      },
    },
  },
};

export default nextConfig;
