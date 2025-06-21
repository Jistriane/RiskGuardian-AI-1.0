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

const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server: SocketIOServer } = require('socket.io');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// Configurar CORS para produção
const corsOrigins = process.env.ALLOWED_ORIGINS ?
    process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app'];

// Configurar Socket.IO
const io = new SocketIOServer(server, {
    cors: {
        origin: corsOrigins,
        methods: ['GET', 'POST'],
        credentials: true
    },
    transports: ['websocket', 'polling']
});

// Middleware básico
app.use(cors({
    origin: corsOrigins,
    credentials: true
}));
app.use(express.json());

// WebSocket handlers
io.on('connection', (socket) => {
    console.log(`🔌 Cliente conectado: ${socket.id}`);

    socket.on('subscribe-portfolio', (data) => {
        console.log('Subscribe portfolio:', data);
        socket.join(`portfolio-${data.portfolioId}`);

        socket.emit('portfolio-update', {
            portfolioId: data.portfolioId,
            totalValue: 125000,
            change24h: 2.34,
            assets: []
        });
    });

    socket.on('subscribe-alerts', (data) => {
        console.log('Subscribe alerts:', data);
        socket.join(`alerts-${data.userId}`);

        socket.emit('portfolio-alert', {
            id: '1',
            type: 'warning',
            message: 'Conexão WebSocket estabelecida',
            timestamp: new Date().toISOString()
        });
    });

    socket.on('request-market-data', (data) => {
        console.log('Request market data:', data);

        socket.emit('market-data', {
            symbols: data.symbols,
            prices: data.symbols.reduce((acc, symbol) => {
                acc[symbol] = {
                    price: Math.random() * 1000,
                    change24h: (Math.random() - 0.5) * 10
                };
                return acc;
            }, {})
        });
    });

    socket.on('disconnect', () => {
        console.log(`🔌 Cliente desconectado: ${socket.id}`);
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'RiskGuardian AI Backend',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'RiskGuardian AI Backend API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'RiskGuardian AI Backend',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
        features: [
            'Real-time Portfolio Monitoring',
            'WebSocket Alerts',
            'Market Data API',
            'AI-Powered Risk Analysis'
        ]
    });
});

// Portfolio endpoints
app.get('/api/portfolio', (req, res) => {
    res.json({
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
});

// Real-time portfolio data (compatível com frontend)
app.get('/api/portfolio/real-time', (req, res) => {
    // Evitar cache
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    // Gerar dados simulados com volatilidade
    const btcPrice = 45000 + (Math.random() - 0.5) * 10000;
    const ethPrice = 3000 + (Math.random() - 0.5) * 1000;
    const usdcPrice = 1 + (Math.random() - 0.5) * 0.02;

    const portfolioData = {
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
            assets: [{
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

    res.json(portfolioData);
});

app.get('/portfolio/multichain/:address', (req, res) => {
    res.json({
        success: true,
        data: {
            address: req.params.address,
            totalValue: 245847.32,
            change24h: 5.67,
            riskScore: 67,
            healthFactor: 1.85,
            chains: {
                ethereum: {
                    balance: 185000,
                    assets: [
                        { symbol: 'ETH', balance: 25.5, value: 85000, change24h: 3.2 },
                        { symbol: 'USDC', balance: 50000, value: 50000, change24h: 0.01 },
                        { symbol: 'AAVE', balance: 500, value: 50000, change24h: 8.5 }
                    ]
                },
                polygon: {
                    balance: 45847.32,
                    assets: [
                        { symbol: 'UNI', balance: 2000, value: 45847.32, change24h: -2.1 }
                    ]
                },
                avalanche: {
                    balance: 15000,
                    assets: [
                        { symbol: 'AVAX', balance: 500, value: 15000, change24h: 1.5 }
                    ]
                }
            },
            alerts: [{
                    id: '1',
                    type: 'warning',
                    message: 'Health Factor baixo detectado',
                    timestamp: new Date().toISOString()
                },
                {
                    id: '2',
                    type: 'info',
                    message: 'Oportunidade de hedge automático disponível',
                    timestamp: new Date().toISOString()
                },
                {
                    id: '3',
                    type: 'success',
                    message: 'Auto-hedge ativado com sucesso',
                    timestamp: new Date().toISOString()
                }
            ]
        }
    });
});

// Market data endpoints
app.post('/api/market/monitor', (req, res) => {
    const { symbols = ['BTC', 'ETH', 'MATIC', 'USDC', 'AAVE', 'UNI'] } = req.body;

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

    res.json({
        success: true,
        data: marketData
    });
});

// AI Analysis endpoints
app.post('/api/ai/analyze', (req, res) => {
    res.json({
        success: true,
        data: {
            confidence: 85,
            riskScore: 67,
            recommendations: [
                'Considere diversificar mais seu portfólio para reduzir concentração de risco',
                'ETH mostra sinais de recuperação - mantenha a posição atual',
                'USDC oferece estabilidade - considere aumentar allocation em momentos voláteis'
            ],
            insights: [{
                id: '1',
                type: 'bullish',
                confidence: 85,
                title: 'Momentum Positivo Detectado',
                description: 'Análise técnica indica tendência de alta para ativos principais',
                recommendation: 'Mantenha posições atuais e considere DCA em quedas',
                timestamp: new Date().toISOString()
            }],
            lastUpdate: new Date().toISOString()
        }
    });
});

app.get('/api/ai/insights', (req, res) => {
    res.json({
        success: true,
        data: [{
                id: '1',
                type: 'bullish',
                confidence: 85,
                title: 'Oportunidade de Crescimento',
                description: 'Análise técnica indica momentum positivo para seus ativos principais.',
                recommendation: 'Considere manter posição ou aumentar exposição gradualmente.',
                timestamp: new Date().toISOString()
            },
            {
                id: '2',
                type: 'warning',
                confidence: 72,
                title: 'Concentração de Risco',
                description: 'Portfolio concentrado em poucos protocolos pode aumentar volatilidade.',
                recommendation: 'Diversifique investimentos entre diferentes protocolos DeFi.',
                timestamp: new Date().toISOString()
            }
        ]
    });
});

// Risk analysis endpoints
app.get('/api/risk/analysis/:address', (req, res) => {
    res.json({
        success: true,
        data: {
            address: req.params.address,
            riskScore: 67,
            riskLevel: 'medium',
            healthFactor: 1.85,
            factors: [
                { name: 'Concentration Risk', score: 70, weight: 0.3 },
                { name: 'Volatility Risk', score: 80, weight: 0.4 },
                { name: 'Liquidity Risk', score: 45, weight: 0.3 }
            ],
            recommendations: [
                'Consider diversifying your portfolio',
                'Monitor high volatility assets'
            ]
        }
    });
});

// Monitoring endpoints
app.get('/api/monitoring/alerts', (req, res) => {
    res.json({
        success: true,
        data: [{
                id: '1',
                type: 'price_alert',
                message: 'ETH price dropped by 5%',
                severity: 'medium',
                timestamp: new Date().toISOString()
            },
            {
                id: '2',
                type: 'risk_alert',
                message: 'Portfolio risk score increased',
                severity: 'high',
                timestamp: new Date().toISOString()
            }
        ]
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
        timestamp: new Date().toISOString(),
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 RiskGuardian AI Backend running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS origins: ${corsOrigins.join(', ')}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});