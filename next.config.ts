import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        // Убедитесь, что здесь нет лишних слешей в конце
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
