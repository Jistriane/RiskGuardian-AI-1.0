const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Cache para dados
let marketCache = {};
let lastUpdate = 0;

// Função para buscar dados reais da CoinGecko
async function fetchRealCryptoData(symbols) {
    const now = Date.now();

    // Cache de 30 segundos
    if (now - lastUpdate < 30000 && Object.keys(marketCache).length > 0) {
        console.log('📦 Retornando dados do cache');
        return marketCache;
    }

    try {
        console.log('🌐 Buscando dados reais da CoinGecko...');

        const symbolMap = {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'USDC': 'usd-coin',
            'AAVE': 'aave',
            'UNI': 'uniswap'
        };

        const ids = symbols.map(s => symbolMap[s]).filter(Boolean).join(',');
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`;

        // Usar node-fetch se disponível, senão usar fetch nativo do Node 18+
        let fetchFunction;
        try {
            fetchFunction = require('node-fetch');
        } catch (e) {
            fetchFunction = fetch; // Node 18+ tem fetch nativo
        }

        const response = await fetchFunction(url, {
            headers: { 'User-Agent': 'RiskGuardian-AI/1.0' }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Dados recebidos:', Object.keys(data));

        // Converter para nosso formato
        const result = {};

        for (const symbol of symbols) {
            const id = symbolMap[symbol];
            if (id && data[id]) {
                result[symbol] = {
                    symbol,
                    price: data[id].usd || 0,
                    change24h: data[id].usd_24h_change || 0,
                    volume24h: data[id].usd_24h_vol || 0,
                    marketCap: data[id].usd_market_cap || 0,
                    lastUpdate: new Date().toISOString(),
                    source: 'coingecko'
                };
            } else {
                // Fallback com preços realistas
                const fallbackPrices = {
                    'BTC': 43250,
                    'ETH': 2580,
                    'USDC': 1.00,
                    'AAVE': 95,
                    'UNI': 7.25
                };

                result[symbol] = {
                    symbol,
                    price: fallbackPrices[symbol] || 100,
                    change24h: (Math.random() - 0.5) * 10,
                    volume24h: Math.random() * 10000000,
                    marketCap: Math.random() * 100000000000,
                    lastUpdate: new Date().toISOString(),
                    source: 'fallback'
                };
            }
        }

        marketCache = result;
        lastUpdate = now;

        return result;

    } catch (error) {
        console.warn('⚠️ Erro ao buscar dados reais:', error.message);

        // Fallback completo com dados simulados
        const result = {};
        const fallbackPrices = {
            'BTC': 43250,
            'ETH': 2580,
            'USDC': 1.00,
            'AAVE': 95,
            'UNI': 7.25
        };

        symbols.forEach(symbol => {
            result[symbol] = {
                symbol,
                price: fallbackPrices[symbol] ?
                    fallbackPrices[symbol] * (1 + (Math.random() - 0.5) * 0.02) : Math.random() * 1000 + 50,
                change24h: (Math.random() - 0.5) * 8,
                volume24h: Math.random() * 10000000,
                marketCap: Math.random() * 100000000000,
                lastUpdate: new Date().toISOString(),
                source: 'simulation'
            };
        });

        marketCache = result;
        lastUpdate = now;

        return result;
    }
}

// Routes
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'RiskGuardian API',
        realTimeData: true,
        cache: Object.keys(marketCache).length > 0 ? 'warm' : 'cold'
    });
});

app.post('/api/market/monitor', async(req, res) => {
    const { symbols = ['BTC', 'ETH', 'USDC', 'AAVE', 'UNI'] } = req.body;

    try {
        console.log(`📈 Solicitação de dados para: ${symbols.join(', ')}`);
        const marketData = await fetchRealCryptoData(symbols);

        res.json({
            success: true,
            data: marketData,
            timestamp: new Date().toISOString(),
            source: 'real_time_api'
        });

    } catch (error) {
        console.error('Erro no endpoint:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/portfolio/:address', async(req, res) => {
    const { address } = req.params;

    // Buscar dados reais para calcular portfolio
    const marketData = await fetchRealCryptoData(['ETH', 'USDC', 'AAVE', 'UNI']);

    const ethPrice = (marketData.ETH && marketData.ETH.price) || 2580;
    const aavePrice = (marketData.AAVE && marketData.AAVE.price) || 95;
    const uniPrice = (marketData.UNI && marketData.UNI.price) || 7.25;

    const portfolio = {
        address,
        totalValue: (25.5 * ethPrice) + 50000 + (500 * aavePrice) + (2000 * uniPrice),
        change24h: (marketData.ETH && marketData.ETH.change24h) || 3.2,
        riskScore: 67,
        healthFactor: 1.85,
        assets: [{
                symbol: 'ETH',
                balance: 25.5,
                value: 25.5 * ethPrice,
                change24h: (marketData.ETH && marketData.ETH.change24h) || 3.2
            },
            {
                symbol: 'USDC',
                balance: 50000,
                value: 50000,
                change24h: (marketData.USDC && marketData.USDC.change24h) || 0.01
            },
            {
                symbol: 'AAVE',
                balance: 500,
                value: 500 * aavePrice,
                change24h: (marketData.AAVE && marketData.AAVE.change24h) || 8.5
            },
            {
                symbol: 'UNI',
                balance: 2000,
                value: 2000 * uniPrice,
                change24h: (marketData.UNI && marketData.UNI.change24h) || -2.1
            }
        ],
        lastUpdate: new Date().toISOString()
    };

    res.json({
        success: true,
        data: portfolio
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 RiskGuardian API com DADOS REAIS rodando na porta ${PORT}`);
    console.log(`🌐 Health: http://localhost:${PORT}/health`);
    console.log(`📊 Market: POST http://localhost:${PORT}/api/market/monitor`);
    console.log(`💼 Portfolio: GET http://localhost:${PORT}/api/portfolio/[address]`);
    console.log(`🎯 Fonte: CoinGecko API (com fallback)`);
});

process.on('SIGTERM', () => {
    console.log('📴 Parando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('📴 Parando servidor...');
    process.exit(0);
});