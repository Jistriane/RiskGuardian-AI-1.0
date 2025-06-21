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
const http = require('http');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use(express.json());

// Cache para dados
let marketCache = {};
let lastUpdate = 0;

// Função para buscar dados reais da CoinGecko
async function fetchRealCryptoData() {
    const now = Date.now();

    // Cache de 30 segundos
    if (now - lastUpdate < 30000 && Object.keys(marketCache).length > 0) {
        console.log('📦 Retornando dados do cache');
        return marketCache;
    }

    try {
        console.log('🌐 Buscando dados reais da CoinGecko...');

        const fetch = (await
            import ('node-fetch')).default;

        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin,aave,uniswap,chainlink,matic-network,avalanche-2&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true'
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        marketCache = {
            BTC: {
                symbol: 'BTC',
                price: data.bitcoin ? .usd || 65000,
                change24h: data.bitcoin ? .usd_24h_change || 2.5,
                volume24h: data.bitcoin ? .usd_24h_vol || 25000000000,
                marketCap: data.bitcoin ? .usd_market_cap || 1280000000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            },
            ETH: {
                symbol: 'ETH',
                price: data.ethereum ? .usd || 3500,
                change24h: data.ethereum ? .usd_24h_change || 1.8,
                volume24h: data.ethereum ? .usd_24h_vol || 15000000000,
                marketCap: data.ethereum ? .usd_market_cap || 420000000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            },
            USDC: {
                symbol: 'USDC',
                price: data['usd-coin'] ? .usd || 1.00,
                change24h: data['usd-coin'] ? .usd_24h_change || 0.01,
                volume24h: data['usd-coin'] ? .usd_24h_vol || 5000000000,
                marketCap: data['usd-coin'] ? .usd_market_cap || 32000000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            },
            AAVE: {
                symbol: 'AAVE',
                price: data.aave ? .usd || 150,
                change24h: data.aave ? .usd_24h_change || 3.2,
                volume24h: data.aave ? .usd_24h_vol || 200000000,
                marketCap: data.aave ? .usd_market_cap || 2250000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            },
            UNI: {
                symbol: 'UNI',
                price: data.uniswap ? .usd || 12,
                change24h: data.uniswap ? .usd_24h_change || 4.1,
                volume24h: data.uniswap ? .usd_24h_vol || 150000000,
                marketCap: data.uniswap ? .usd_market_cap || 7200000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            }
        };

        lastUpdate = now;
        console.log('✅ Dados atualizados com sucesso');
        return marketCache;

    } catch (error) {
        console.error('❌ Erro ao buscar dados:', error);

        // Retorna dados simulados realistas se API falhar
        if (Object.keys(marketCache).length === 0) {
            marketCache = {
                BTC: { symbol: 'BTC', price: 65432.10, change24h: 2.34, volume24h: 24567890123, marketCap: 1285000000000, lastUpdate: new Date().toISOString(), source: 'Fallback' },
                ETH: { symbol: 'ETH', price: 3521.45, change24h: 1.87, volume24h: 14234567890, marketCap: 423000000000, lastUpdate: new Date().toISOString(), source: 'Fallback' },
                USDC: { symbol: 'USDC', price: 1.001, change24h: 0.01, volume24h: 4567890123, marketCap: 32100000000, lastUpdate: new Date().toISOString(), source: 'Fallback' },
                AAVE: { symbol: 'AAVE', price: 152.34, change24h: 3.21, volume24h: 187654321, marketCap: 2285000000, lastUpdate: new Date().toISOString(), source: 'Fallback' },
                UNI: { symbol: 'UNI', price: 12.67, change24h: 4.12, volume24h: 156789012, marketCap: 7600000000, lastUpdate: new Date().toISOString(), source: 'Fallback' }
            };
        }

        return marketCache;
    }
}

// Endpoints da API
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'RiskGuardian Simple API'
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

app.get('/api/market/data', async(req, res) => {
    try {
        const marketData = await fetchRealCryptoData();
        res.json({
            success: true,
            data: marketData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Erro no endpoint market/data:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.get('/api/portfolio/multichain/:address', async(req, res) => {
    try {
        const { address } = req.params;
        const marketData = await fetchRealCryptoData();

        // Simula um portfólio realista baseado nos preços reais
        const portfolio = {
            totalValue: 0,
            change24h: 0,
            riskScore: 7.2,
            healthFactor: 1.85,
            activeAssets: 5,
            assets: [{
                    symbol: 'BTC',
                    balance: 0.15,
                    value: (marketData.BTC ? .price || 65000) * 0.15,
                    change24h: marketData.BTC ? .change24h || 2.34
                },
                {
                    symbol: 'ETH',
                    balance: 2.5,
                    value: (marketData.ETH ? .price || 3500) * 2.5,
                    change24h: marketData.ETH ? .change24h || 1.87
                },
                {
                    symbol: 'USDC',
                    balance: 5000,
                    value: (marketData.USDC ? .price || 1) * 5000,
                    change24h: marketData.USDC ? .change24h || 0.01
                },
                {
                    symbol: 'AAVE',
                    balance: 12,
                    value: (marketData.AAVE ? .price || 150) * 12,
                    change24h: marketData.AAVE ? .change24h || 3.21
                },
                {
                    symbol: 'UNI',
                    balance: 100,
                    value: (marketData.UNI ? .price || 12) * 100,
                    change24h: marketData.UNI ? .change24h || 4.12
                }
            ]
        };

        // Calcula valor total e mudança média
        portfolio.totalValue = portfolio.assets.reduce((sum, asset) => sum + asset.value, 0);
        portfolio.change24h = portfolio.assets.reduce((sum, asset, index, arr) => {
            const weight = asset.value / portfolio.totalValue;
            return sum + (asset.change24h * weight);
        }, 0);

        res.json({
            success: true,
            data: portfolio,
            address: address,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Erro no endpoint portfolio:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.get('/api/ai/insights', async(req, res) => {
    try {
        const marketData = await fetchRealCryptoData();

        const insights = [{
                id: '1',
                type: marketData.BTC ? .change24h > 0 ? 'bullish' : 'bearish',
                title: `Bitcoin ${marketData.BTC?.change24h > 0 ? 'em alta' : 'em baixa'}`,
                description: `BTC está ${marketData.BTC?.change24h > 0 ? 'subindo' : 'caindo'} ${Math.abs(marketData.BTC?.change24h || 0).toFixed(2)}% nas últimas 24h`,
                recommendation: marketData.BTC ? .change24h > 0 ? 'Considere manter posição ou aumentar exposição' : 'Monitore suportes e considere reduzir exposição'
            },
            {
                id: '2',
                type: marketData.ETH ? .change24h > 2 ? 'bullish' : 'info',
                title: 'Ethereum Performance',
                description: `ETH mostra ${marketData.ETH?.change24h > 0 ? 'momentum positivo' : 'correção'} de ${(marketData.ETH?.change24h || 0).toFixed(2)}%`,
                recommendation: 'Ethereum continua forte no ecossistema DeFi'
            },
            {
                id: '3',
                type: 'warning',
                title: 'Diversificação de Risco',
                description: 'Seu portfólio está concentrado em ativos correlacionados',
                recommendation: 'Considere adicionar ativos descorrelacionados como stablecoins ou commodities tokenizadas'
            }
        ];

        res.json({
            success: true,
            data: insights,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Erro no endpoint ai/insights:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Atualiza dados automaticamente a cada 30 segundos
setInterval(async() => {
    await fetchRealCryptoData();
}, 30000);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🚀 RiskGuardian API rodando na porta ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 Market data: http://localhost:${PORT}/api/market/data`);

    // Busca dados iniciais
    fetchRealCryptoData();
});