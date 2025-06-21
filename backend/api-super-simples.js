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

const app = express();

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
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin,aave,uniswap&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true'
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Acesso seguro aos dados
        const bitcoin = data.bitcoin || {};
        const ethereum = data.ethereum || {};
        const usdc = data['usd-coin'] || {};
        const aave = data.aave || {};
        const uniswap = data.uniswap || {};

        marketCache = {
            BTC: {
                symbol: 'BTC',
                price: bitcoin.usd || 65432.10,
                change24h: bitcoin.usd_24h_change || 2.34,
                volume24h: bitcoin.usd_24h_vol || 24567890123,
                marketCap: bitcoin.usd_market_cap || 1285000000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            },
            ETH: {
                symbol: 'ETH',
                price: ethereum.usd || 3521.45,
                change24h: ethereum.usd_24h_change || 1.87,
                volume24h: ethereum.usd_24h_vol || 14234567890,
                marketCap: ethereum.usd_market_cap || 423000000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            },
            USDC: {
                symbol: 'USDC',
                price: usdc.usd || 1.001,
                change24h: usdc.usd_24h_change || 0.01,
                volume24h: usdc.usd_24h_vol || 4567890123,
                marketCap: usdc.usd_market_cap || 32100000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            },
            AAVE: {
                symbol: 'AAVE',
                price: aave.usd || 152.34,
                change24h: aave.usd_24h_change || 3.21,
                volume24h: aave.usd_24h_vol || 187654321,
                marketCap: aave.usd_market_cap || 2285000000,
                lastUpdate: new Date().toISOString(),
                source: 'CoinGecko API'
            },
            UNI: {
                symbol: 'UNI',
                price: uniswap.usd || 12.67,
                change24h: uniswap.usd_24h_change || 4.12,
                volume24h: uniswap.usd_24h_vol || 156789012,
                marketCap: uniswap.usd_market_cap || 7600000000,
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
        service: 'RiskGuardian Super Simple API'
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

        // Acesso seguro aos dados de mercado
        const btcData = marketData.BTC || {};
        const ethData = marketData.ETH || {};
        const usdcData = marketData.USDC || {};
        const aaveData = marketData.AAVE || {};
        const uniData = marketData.UNI || {};

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
                    value: (btcData.price || 65000) * 0.15,
                    change24h: btcData.change24h || 2.34
                },
                {
                    symbol: 'ETH',
                    balance: 2.5,
                    value: (ethData.price || 3500) * 2.5,
                    change24h: ethData.change24h || 1.87
                },
                {
                    symbol: 'USDC',
                    balance: 5000,
                    value: (usdcData.price || 1) * 5000,
                    change24h: usdcData.change24h || 0.01
                },
                {
                    symbol: 'AAVE',
                    balance: 12,
                    value: (aaveData.price || 150) * 12,
                    change24h: aaveData.change24h || 3.21
                },
                {
                    symbol: 'UNI',
                    balance: 100,
                    value: (uniData.price || 12) * 100,
                    change24h: uniData.change24h || 4.12
                }
            ]
        };

        // Calcula valor total e mudança média
        portfolio.totalValue = portfolio.assets.reduce((sum, asset) => sum + asset.value, 0);
        portfolio.change24h = portfolio.assets.reduce((sum, asset) => {
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
        const btcData = marketData.BTC || {};
        const ethData = marketData.ETH || {};

        const insights = [{
                id: '1',
                type: (btcData.change24h || 0) > 0 ? 'bullish' : 'bearish',
                title: `Bitcoin ${(btcData.change24h || 0) > 0 ? 'em alta' : 'em baixa'}`,
                description: `BTC está ${(btcData.change24h || 0) > 0 ? 'subindo' : 'caindo'} ${Math.abs(btcData.change24h || 0).toFixed(2)}% nas últimas 24h`,
                recommendation: (btcData.change24h || 0) > 0 ? 'Considere manter posição ou aumentar exposição' : 'Monitore suportes e considere reduzir exposição'
            },
            {
                id: '2',
                type: (ethData.change24h || 0) > 2 ? 'bullish' : 'info',
                title: 'Ethereum Performance',
                description: `ETH mostra ${(ethData.change24h || 0) > 0 ? 'momentum positivo' : 'correção'} de ${(ethData.change24h || 0).toFixed(2)}%`,
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
app.listen(PORT, () => {
    console.log(`🚀 RiskGuardian API rodando na porta ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 Market data: http://localhost:${PORT}/api/market/data`);
    console.log(`💼 Portfolio: http://localhost:${PORT}/api/portfolio/multichain/0x742d35Cc6634C0532925a3b8d6Fd0C040aa5B2ba`);

    // Busca dados iniciais
    fetchRealCryptoData();
});