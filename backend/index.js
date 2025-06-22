// RiskGuardian AI Backend - Ultra Simple for Vercel
// Testnet Sepolia - No Authentication Required

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const url = req.url || '/';

    // Health endpoint
    if (url === '/health' || url === '/api/health' || url === '/') {
        res.status(200).json({
            status: 'healthy',
            message: 'RiskGuardian AI Backend - Testnet Sepolia',
            environment: 'testnet',
            network: 'sepolia',
            chainId: '11155111',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            endpoints: ['/health', '/api/portfolio', '/api/market', '/api/config']
        });
        return;
    }

    // Portfolio endpoint
    if (url === '/api/portfolio' || url === '/portfolio') {
        res.status(200).json({
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
        });
        return;
    }

    // Market endpoint
    if (url === '/api/market' || url === '/market') {
        res.status(200).json({
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
        });
        return;
    }

    // Config endpoint
    if (url === '/api/config' || url === '/config') {
        res.status(200).json({
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
        });
        return;
    }

    // 404 for unknown routes
    res.status(404).json({
        error: 'Endpoint not found',
        message: `Route ${url} not found`,
        availableEndpoints: ['/health', '/api/portfolio', '/api/market', '/api/config'],
        timestamp: new Date().toISOString()
    });
};