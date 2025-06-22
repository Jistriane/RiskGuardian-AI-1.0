// RiskGuardian AI Backend - Netlify Function
// Testnet Sepolia - 100% Gratuito

exports.handler = async(event, context) => {
    // Headers CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    const path = event.path || '/';

    try {
        // Health endpoint
        if (path === '/health' || path === '/.netlify/functions/api' || path === '/') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    status: 'healthy',
                    message: 'RiskGuardian AI Backend - Testnet Sepolia',
                    environment: 'testnet',
                    network: 'sepolia',
                    chainId: '11155111',
                    timestamp: new Date().toISOString(),
                    version: '1.0.0',
                    platform: 'netlify',
                    endpoints: [
                        '/.netlify/functions/api',
                        '/.netlify/functions/api/portfolio',
                        '/.netlify/functions/api/market',
                        '/.netlify/functions/api/config'
                    ]
                })
            };
        }

        // Portfolio endpoint
        if (path.includes('portfolio')) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    status: 'success',
                    data: {
                        portfolio: {
                            totalValue: '1000.00',
                            tokens: [{
                                    symbol: 'ETH',
                                    balance: '0.5',
                                    value: '800.00',
                                    address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14'
                                },
                                {
                                    symbol: 'USDC',
                                    balance: '200.00',
                                    value: '200.00',
                                    address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
                                }
                            ],
                            network: 'sepolia',
                            chainId: '11155111'
                        }
                    },
                    timestamp: new Date().toISOString()
                })
            };
        }

        // Market endpoint
        if (path.includes('market')) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    status: 'success',
                    data: {
                        prices: {
                            ETH: '1600.00',
                            USDC: '1.00',
                            LINK: '15.50'
                        },
                        priceFeeds: {
                            ETH_USD: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
                            LINK_USD: '0xc59E3633BAAC79493d908e63626716e204A45EdF'
                        },
                        network: 'sepolia'
                    },
                    timestamp: new Date().toISOString()
                })
            };
        }

        // Config endpoint
        if (path.includes('config')) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    status: 'success',
                    data: {
                        network: 'sepolia',
                        chainId: '11155111',
                        rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                        contracts: {
                            USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
                            WETH: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
                            LINK: '0x779877A7B0D9E8603169DdbD7836e478b4624789'
                        },
                        priceFeeds: {
                            ETH_USD: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
                            LINK_USD: '0xc59E3633BAAC79493d908e63626716e204A45EdF'
                        },
                        testnet: true
                    },
                    timestamp: new Date().toISOString()
                })
            };
        }

        // 404 para rotas desconhecidas
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
                error: 'Endpoint not found',
                message: `Route ${path} not found`,
                availableEndpoints: [
                    '/.netlify/functions/api',
                    '/.netlify/functions/api/portfolio',
                    '/.netlify/functions/api/market',
                    '/.netlify/functions/api/config'
                ],
                timestamp: new Date().toISOString()
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
};