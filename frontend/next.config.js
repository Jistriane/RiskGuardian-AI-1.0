/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath: process.env.GITHUB_PAGES === 'true' ? '/RiskGuardian-AI-1.0' : '',
    assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/RiskGuardian-AI-1.0/' : '',
    images: {
        unoptimized: true,
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
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
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
                    key: 'Referrer-Policy',
                    value: 'origin-when-cross-origin',
                },
                {
                    key: 'Content-Security-Policy',
                    value: process.env.NODE_ENV === 'development' ?
                        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval' data: blob: https:; style-src 'self' 'unsafe-inline' https: data:; font-src 'self' https: data:; img-src 'self' data: blob: https:; connect-src 'self' https: wss: ws: data: blob:; worker-src 'self' blob:; child-src 'self' blob:; object-src 'none'; media-src 'self' data: blob:;" : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https: wss:; object-src 'none';"
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
};

module.exports = nextConfig;