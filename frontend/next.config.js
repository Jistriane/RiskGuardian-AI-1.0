/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Sistema completo de gestão de riscos para portfolios DeFi
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    basePath: process.env.GITHUB_PAGES === 'true' ? '/RiskGuardian-AI-1.0' : '',
    assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/RiskGuardian-AI-1.0/' : '',

    // Configurações de imagens otimizadas
    images: {
        unoptimized: process.env.GITHUB_PAGES === 'true',
        domains: ['localhost'],
        formats: ['image/webp', 'image/avif'],
    },

    // Configurações experimentais otimizadas
    experimental: {
        esmExternals: 'loose',
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    },

    // Configuração webpack otimizada
    webpack: (config, { dev, isServer }) => {
        // Configurações de fallback para módulos Node.js
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                url: false,
                zlib: false,
                http: false,
                https: false,
                assert: false,
                os: false,
                path: false,
            };
        }

        // Otimizações para desenvolvimento
        if (dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            };
        }

        // Configurações de otimização
        config.optimization = {
            ...config.optimization,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: 10,
                    },
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        priority: 5,
                    },
                },
            },
        };

        return config;
    },

    // Configurações de TypeScript mais tolerantes para desenvolvimento
    typescript: {
        ignoreBuildErrors: false,
    },

    eslint: {
        ignoreDuringBuilds: false,
    },

    // Variáveis de ambiente
    env: {
        CUSTOM_KEY: 'my-value',
    },

    // Headers de segurança otimizados
    async headers() {
        return [{
            source: '/(.*)',
            headers: [{
                    key: 'X-Frame-Options',
                    value: 'DENY',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin',
                },
            ],
        }];
    },

    // Configuração de redirecionamento
    async redirects() {
        return [{
            source: '/',
            destination: '/dashboard',
            permanent: false,
        }];
    },

    // Configurações de rewrite para APIs
    async rewrites() {
        return [{
            source: '/api/:path*',
            destination: '/api/:path*',
        }, ];
    },
};

module.exports = nextConfig;