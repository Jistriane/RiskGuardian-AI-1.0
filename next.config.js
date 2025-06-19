/** @type {import('next').NextConfig} */
const nextConfig = {
    // Basic configuration for development
    reactStrictMode: true,

    // Remove problematic webpack optimizations during development
    webpack: (config, { isServer, dev }) => {
        // Fix for WalletConnect SSR issues
        config.externals.push('pino-pretty', 'lokijs', 'encoding')

        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                http: false,
                https: false,
                os: false,
                url: false,
                assert: false,
            }
        }

        // Ignore problematic modules that cause SSR issues
        config.module.rules.push({
            test: /\.node$/,
            use: 'ignore-loader'
        })

        return config
    },

    // Enable SWC minification for production
    swcMinify: true,

    // Disable strict mode temporarily to avoid double initialization
    reactStrictMode: false,
}

module.exports = nextConfig