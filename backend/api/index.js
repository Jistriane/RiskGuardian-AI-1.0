// RiskGuardian AI Backend - Vercel Serverless Function
// Testnet Sepolia Configuration

const cors = require('cors');

// Environment variables with defaults
const config = {
    NODE_ENV: process.env.NODE_ENV || 'testnet',
    NETWORK: process.env.NETWORK || 'sepolia',
    CHAIN_ID: process.env.CHAIN_ID || '11155111',
    RPC_URL: process.env.RPC_URL || 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    TESTNET: process.env.TESTNET || 'true',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://riskguardian-ai.vercel.app',
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'https://riskguardian-ai.vercel.app',
    JWT_SECRET: process.env.JWT_SECRET || 'riskguardian-testnet-2025',
    CORS_ENABLED: process.env.CORS_ENABLED || 'true',
    RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED || 'false',
    AUTH_REQUIRED: process.env.AUTH_REQUIRED || 'false',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    USDC_ADDRESS: process.env.USDC_ADDRESS || '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    WETH_ADDRESS: process.env.WETH_ADDRESS || '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    LINK_ADDRESS: process.env.LINK_ADDRESS || '0x779877A7B0D9E8603169DdbD7836e478b4624789',
    ETH_USD_FEED: process.env.ETH_USD_FEED || '0x694AA1769357215DE4FAC081bf1f309aDC325306',
    LINK_USD_FEED: process.env.LINK_USD_FEED || '0xc59E3633BAAC79493d908e63626716e204A45EdF',
    INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID || '9aa3d95b3bc440fa88ea12eaa4456161'
};

// CORS configuration
const corsOptions = {
    origin: function(origin, callback) {
        const allowedOrigins = config.ALLOWED_ORIGINS.split(',');
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for testnet
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Main handler function
module.exports = async(req, res) => {
    // Handle CORS
    if (config.CORS_ENABLED === 'true') {
        const corsHandler = cors(corsOptions);
        await new Promise((resolve, reject) => {
            corsHandler(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { pathname } = new URL(req.url, `https://${req.headers.host}`);

    try {
        // Health check endpoint
        if (pathname === '/health' || pathname === '/api/health') {
            return res.status(200).json({
                status: 'healthy',
                environment: config.NODE_ENV,
                network: config.NETWORK,
                chainId: config.CHAIN_ID,
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                testnet: config.TESTNET === 'true'
            });
        }

        // Portfolio endpoint
        if (pathname === '/api/portfolio' || pathname === '/portfolio') {
            return res.status(200).json({
                status: 'success',
                data: {
                    portfolio: {
                        totalValue: '1000.00',
                        tokens: [{
                                symbol: 'ETH',
                                balance: '0.5',
                                value: '800.00',
                                address: config.WETH_ADDRESS
                            },
                            {
                                symbol: 'USDC',
                                balance: '200.00',
                                value: '200.00',
                                address: config.USDC_ADDRESS
                            }
                        ],
                        network: config.NETWORK,
                        chainId: config.CHAIN_ID
                    }
                },
                timestamp: new Date().toISOString()
            });
        }

        // Market data endpoint
        if (pathname === '/api/market' || pathname === '/market') {
            return res.status(200).json({
                status: 'success',
                data: {
                    prices: {
                        ETH: '1600.00',
                        USDC: '1.00',
                        LINK: '15.50'
                    },
                    priceFeeds: {
                        ETH_USD: config.ETH_USD_FEED,
                        LINK_USD: config.LINK_USD_FEED
                    },
                    network: config.NETWORK
                },
                timestamp: new Date().toISOString()
            });
        }

        // Config endpoint
        if (pathname === '/api/config' || pathname === '/config') {
            return res.status(200).json({
                status: 'success',
                data: {
                    network: config.NETWORK,
                    chainId: config.CHAIN_ID,
                    rpcUrl: config.RPC_URL,
                    contracts: {
                        USDC: config.USDC_ADDRESS,
                        WETH: config.WETH_ADDRESS,
                        LINK: config.LINK_ADDRESS
                    },
                    priceFeeds: {
                        ETH_USD: config.ETH_USD_FEED,
                        LINK_USD: config.LINK_USD_FEED
                    },
                    testnet: config.TESTNET === 'true'
                },
                timestamp: new Date().toISOString()
            });
        }

        // Default route
        if (pathname === '/' || pathname === '/api') {
            return res.status(200).json({
                message: 'RiskGuardian AI Backend - Testnet Sepolia',
                status: 'running',
                environment: config.NODE_ENV,
                network: config.NETWORK,
                endpoints: [
                    '/health',
                    '/api/health',
                    '/api/portfolio',
                    '/api/market',
                    '/api/config'
                ],
                timestamp: new Date().toISOString()
            });
        }

        // 404 for unknown routes
        return res.status(404).json({
            error: 'Endpoint not found',
            message: `Route ${pathname} not found`,
            availableEndpoints: ['/health', '/api/health', '/api/portfolio', '/api/market', '/api/config'],
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
};