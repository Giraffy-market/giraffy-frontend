import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
