/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    webpack: (config, { dev }) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false,
            crypto: false,
        };

        // Otimização para Web3
        config.externals.push('pino-pretty', 'lokijs', 'encoding');

        // Permitir eval em desenvolvimento para Web3
        if (dev) {
            config.devtool = 'eval-source-map';
        }

        return config;
    },
    images: {
        domains: [
            'localhost',
            'assets.coingecko.com',
            'raw.githubusercontent.com',
            'coin-images.coingecko.com',
        ],
        unoptimized: false,
    },
    env: {
        CUSTOM_KEY: 'riskguardian-frontend',
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