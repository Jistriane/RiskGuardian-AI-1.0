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
    // Configurações para Vercel - SSR habilitado
    output: 'standalone',

    // Configurações de imagens otimizadas para Vercel
    images: {
        unoptimized: false,
        domains: ['localhost', 'riskguardian-ai.vercel.app'],
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'riskguardian-backend.onrender.com',
            port: '',
            pathname: '/api/**',
        }, ],
    },

    // Configurações experimentais otimizadas para Vercel
    experimental: {
        esmExternals: 'loose',
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
        serverComponentsExternalPackages: ['socket.io-client'],
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

        // Configurações para resolver problemas com workers
        config.resolve.alias = {
            ...config.resolve.alias,
        };

        // Configurações de externals para problemas de build
        if (!isServer) {
            config.externals = config.externals || [];
            config.externals.push({
                'utf-8-validate': 'commonjs utf-8-validate',
                'bufferutil': 'commonjs bufferutil',
            });
        }

        // Correção robusta para HeartbeatWorker - Solução definitiva
        if (!dev) {
            // Configurar externals para excluir HeartbeatWorker
            if (!config.externals) {
                config.externals = [];
            }
            if (Array.isArray(config.externals)) {
                config.externals.push(function(context, request, callback) {
                    if (/HeartbeatWorker/.test(request)) {
                        return callback(null, 'self HeartbeatWorker');
                    }
                    callback();
                });
            }

            // Configurar resolve para ignorar HeartbeatWorker
            config.resolve.alias = {
                ...config.resolve.alias,
                './HeartbeatWorker': false,
                './HeartbeatWorker.js': false,
            };

            // Configurar module rules para ignorar HeartbeatWorker
            config.module.rules.push({
                test: /HeartbeatWorker\.js$/,
                use: 'null-loader',
            });

            // Desabilitar minificação apenas para arquivos problemáticos
            if (config.optimization && config.optimization.minimizer) {
                config.optimization.minimizer = config.optimization.minimizer.filter((plugin) => {
                    return plugin.constructor.name !== 'TerserPlugin';
                });

                // Adicionar TerserPlugin customizado
                const originalTerser = config.optimization.minimizer.find(p => p.constructor.name === 'TerserPlugin');
                if (originalTerser) {
                    const TerserPlugin = originalTerser.constructor;
                    config.optimization.minimizer.push(
                        new TerserPlugin({
                            exclude: /HeartbeatWorker/,
                            terserOptions: {
                                parse: {
                                    ecma: 2020,
                                },
                                compress: {
                                    drop_console: false,
                                },
                                mangle: true,
                                format: {
                                    comments: false,
                                },
                            },
                        })
                    );
                }
            }
        }

        // Configuração específica para Web Workers
        config.module.rules.push({
            test: /\.worker\.(js|ts)$/,
            use: {
                loader: 'worker-loader',
                options: {
                    name: 'static/worker/[hash].worker.js',
                    publicPath: '/_next/',
                },
            },
        });

        // Otimizações para desenvolvimento
        if (dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            };
        }

        // Configurações de otimização para produção
        if (!dev) {
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
                        walletWorkers: {
                            test: /HeartbeatWorker/,
                            name: 'wallet-workers',
                            chunks: 'all',
                            priority: 15,
                            enforce: true,
                        },
                    },
                },
            };
        }

        return config;
    },

    // Configurações de TypeScript
    typescript: {
        ignoreBuildErrors: true,
    },

    eslint: {
        ignoreDuringBuilds: true,
    },

    // Headers de segurança otimizados para Vercel
    async headers() {
        return [{
                source: '/api/:path*',
                headers: [{
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache',
                    },
                    {
                        key: 'Expires',
                        value: '0',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization, Cache-Control',
                    },
                ],
            },
            {
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
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },

    // Configuração de redirecionamento
    async redirects() {
        return [{
            source: '/',
            destination: '/dashboard',
            permanent: false,
        }, ];
    },

    // Configurações de rewrite para APIs
    async rewrites() {
        return [{
            source: '/api/:path*',
            destination: '/api/:path*',
        }, ];
    },

    // Configurações de ambiente
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://riskguardian-backend.onrender.com',
        NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'wss://riskguardian-backend.onrender.com',
        NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'wss://riskguardian-backend.onrender.com',
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://riskguardian-ai.vercel.app',
    },

    // Configurações de compressão
    compress: true,

    // Configurações de trailing slash
    trailingSlash: false,

    // Configurações de PoweredBy
    poweredByHeader: false,
};

module.exports = nextConfig;