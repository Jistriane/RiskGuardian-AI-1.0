/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    basePath: process.env.GITHUB_PAGES === 'true' ? '/RiskGuardian-AI-1.0' : '',
    assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/RiskGuardian-AI-1.0/' : '',
    images: {
        unoptimized: false,
    },
    experimental: {
        esmExternals: false,
    },
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                crypto: false,
            }
        }

        // Exclude problematic HeartbeatWorker
        config.externals = config.externals || []
        config.externals.push({
            './HeartbeatWorker': 'HeartbeatWorker',
            './HeartbeatWorker.js': 'HeartbeatWorker',
        })

        // Handle workers
        config.module.rules.push({
            test: /\.worker\.js$/,
            loader: 'worker-loader',
            options: {
                inline: 'no-fallback',
            },
        })

        // Disable optimization for GitHub Pages
        if (process.env.GITHUB_PAGES === 'true') {
            config.optimization.minimize = false
            config.optimization.minimizer = []
        }

        return config
    },
    typescript: {
        ignoreBuildErrors: process.env.NODE_ENV === 'production',
    },
    eslint: {
        ignoreDuringBuilds: process.env.NODE_ENV === 'production',
    },
    env: {
        CUSTOM_KEY: 'my-value',
    },
    // Headers seguros mas compatíveis com Web3
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
            ],
        }];
    },
    // Redirect configuration
    async redirects() {
        return [{
            source: '/',
            destination: '/dashboard',
            permanent: false,
        }];
    },
    // Configurações para APIs e funcionalidades dinâmicas
    async rewrites() {
        return [{
            source: '/api/:path*',
            destination: '/api/:path*',
        }, ]
    },
};

module.exports = nextConfig;