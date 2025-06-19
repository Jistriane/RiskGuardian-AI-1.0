import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configurações de performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },

  // Configurações de build
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  },

  // Configurações de assets
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ],
  },

  // Headers para WebSocket e CORS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },

  // Configurações de WebSocket e API
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'http://localhost:3001/api/:path*'
      },
      {
        source: '/api/elizaos/:path*',
        destination: 'http://localhost:3000/api/:path*'
      },
      {
        source: '/api/chromia/:path*',
        destination: 'http://localhost:3002/:path*'
      }
    ];
  },

  // Configurações de webpack para bibliotecas especiais
  webpack: (config, { dev, isServer }) => {
    // Configurações para TradingView
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false
    };

    // Configurações para bibliotecas de WebSocket
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        encoding: false
      };
    }

    return config;
  },

  // Configurações de ambiente
  env: {
    CUSTOM_KEY: 'riskguardian-ai',
    NEXT_PUBLIC_APP_NAME: 'RiskGuardian AI',
    NEXT_PUBLIC_APP_VERSION: '2.0.0'
  },

  // Configurações de saída
  output: 'standalone',

  // Configurações de desenvolvimento
  ...(process.env.NODE_ENV === 'development' && {
    reactStrictMode: true,
    devIndicators: {
      buildActivity: true,
      buildActivityPosition: 'bottom-right'
    }
  })
};

export default nextConfig; 