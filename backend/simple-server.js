const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3001;

// CORS headers
const setCorsHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Content-Type', 'application/json');
};

// JSON response helper
const sendJSON = (res, data, statusCode = 200) => {
    setCorsHeaders(res);
    res.statusCode = statusCode;
    res.end(JSON.stringify(data, null, 2));
};

// Parse JSON body
const parseBody = (req) => {
    return new Promise((resolve) => {
        if (req.method === 'GET' || req.method === 'OPTIONS') {
            resolve({});
            return;
        }
        
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                resolve({});
            }
        });
    });
};

// Generate mock portfolio data
const generatePortfolioData = () => {
    const btcPrice = 45000 + (Math.random() - 0.5) * 10000;
    const ethPrice = 3000 + (Math.random() - 0.5) * 1000;
    const usdcPrice = 1 + (Math.random() - 0.5) * 0.02;

    return {
        timestamp: new Date().toISOString(),
        prices: {
            BTC: {
                price: parseFloat(btcPrice.toFixed(2)),
                change24h: parseFloat(((Math.random() - 0.5) * 10).toFixed(2))
            },
            ETH: {
                price: parseFloat(ethPrice.toFixed(2)),
                change24h: parseFloat(((Math.random() - 0.5) * 15).toFixed(2))
            },
            USDC: {
                price: parseFloat(usdcPrice.toFixed(4)),
                change24h: parseFloat(((Math.random() - 0.5) * 0.1).toFixed(4))
            }
        },
        portfolio: {
            totalValue: parseFloat((btcPrice * 0.5 + ethPrice * 2 + usdcPrice * 10000).toFixed(2)),
            totalChange24h: parseFloat(((Math.random() - 0.5) * 1000).toFixed(2)),
            assets: [
                {
                    symbol: 'BTC',
                    balance: 0.5,
                    value: parseFloat((btcPrice * 0.5).toFixed(2)),
                    change24h: parseFloat(((Math.random() - 0.5) * 500).toFixed(2))
                },
                {
                    symbol: 'ETH',
                    balance: 2,
                    value: parseFloat((ethPrice * 2).toFixed(2)),
                    change24h: parseFloat(((Math.random() - 0.5) * 300).toFixed(2))
                },
                {
                    symbol: 'USDC',
                    balance: 10000,
                    value: parseFloat((usdcPrice * 10000).toFixed(2)),
                    change24h: parseFloat(((Math.random() - 0.5) * 5).toFixed(2))
                }
            ]
        },
        riskMetrics: {
            volatility: parseFloat((Math.random() * 100).toFixed(2)),
            sharpeRatio: parseFloat((Math.random() * 3).toFixed(2)),
            maxDrawdown: parseFloat((Math.random() * -20).toFixed(2)),
            var95: parseFloat((Math.random() * -1000).toFixed(2)),
            beta: parseFloat((Math.random() * 2).toFixed(2)),
            diversificationScore: parseFloat((Math.random() * 100).toFixed(2))
        },
        lastUpdate: new Date().toISOString()
    };
};

// Server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    console.log(`${method} ${path}`);

    // Handle CORS preflight
    if (method === 'OPTIONS') {
        setCorsHeaders(res);
        res.statusCode = 200;
        res.end();
        return;
    }

    try {
        // Routes
        if (path === '/' && method === 'GET') {
            sendJSON(res, {
                name: 'RiskGuardian AI Backend',
                version: '1.0.0',
                status: 'running',
                timestamp: new Date().toISOString(),
                features: [
                    'Real-time Portfolio Monitoring',
                    'Market Data API',
                    'AI-Powered Risk Analysis'
                ]
            });

        } else if (path === '/health' && method === 'GET') {
            sendJSON(res, {
                status: 'ok',
                message: 'RiskGuardian AI Backend',
                version: '1.0.0',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: process.env.NODE_ENV || 'development'
            });

        } else if (path === '/api/health' && method === 'GET') {
            sendJSON(res, {
                status: 'ok',
                message: 'RiskGuardian AI Backend API',
                version: '1.0.0',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: process.env.NODE_ENV || 'development'
            });

        } else if (path === '/api/portfolio' && method === 'GET') {
            sendJSON(res, {
                success: true,
                data: {
                    totalValue: 245847.32,
                    change24h: 5.67,
                    assets: [
                        { symbol: 'ETH', balance: 25.5, value: 85000, change24h: 3.2, price: 3333.33 },
                        { symbol: 'USDC', balance: 50000, value: 50000, change24h: 0.01, price: 1.00 },
                        { symbol: 'AAVE', balance: 500, value: 65000, change24h: 8.5, price: 130.00 },
                        { symbol: 'UNI', balance: 2000, value: 45847.32, change24h: -2.1, price: 22.92 }
                    ]
                }
            });

        } else if (path === '/api/portfolio/real-time' && method === 'GET') {
            // No cache headers
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            
            sendJSON(res, generatePortfolioData());

        } else if (path === '/api/market/monitor' && method === 'POST') {
            const body = await parseBody(req);
            const { symbols = ['BTC', 'ETH', 'MATIC', 'USDC', 'AAVE', 'UNI'] } = body;

            const marketData = symbols.reduce((acc, symbol) => {
                acc[symbol] = {
                    symbol,
                    price: symbol === 'USDC' ? 1.00 : Math.random() * 5000 + 100,
                    change24h: (Math.random() - 0.5) * 15,
                    volume24h: Math.random() * 10000000,
                    marketCap: Math.random() * 100000000000,
                    lastUpdate: new Date().toISOString()
                };
                return acc;
            }, {});

            sendJSON(res, {
                success: true,
                data: marketData
            });

        } else {
            // 404
            sendJSON(res, {
                success: false,
                error: 'Route not found',
                path: path,
                timestamp: new Date().toISOString()
            }, 404);
        }

    } catch (error) {
        console.error('Error:', error);
        sendJSON(res, {
            success: false,
            error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
            timestamp: new Date().toISOString()
        }, 500);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 RiskGuardian AI Backend running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`�� Portfolio API: http://localhost:${PORT}/api/portfolio/real-time`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
