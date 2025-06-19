const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Dados simulados realistas que serão atualizados
let cryptoData = {
    BTC: { symbol: 'BTC', price: 65432.10, change24h: 2.34, volume24h: 24567890123, marketCap: 1285000000000 },
    ETH: { symbol: 'ETH', price: 3521.45, change24h: 1.87, volume24h: 14234567890, marketCap: 423000000000 },
    USDC: { symbol: 'USDC', price: 1.001, change24h: 0.01, volume24h: 4567890123, marketCap: 32100000000 },
    AAVE: { symbol: 'AAVE', price: 152.34, change24h: 3.21, volume24h: 187654321, marketCap: 2285000000 },
    UNI: { symbol: 'UNI', price: 12.67, change24h: 4.12, volume24h: 156789012, marketCap: 7600000000 }
};

// Função para simular dados em tempo real (variações pequenas)
function updatePrices() {
    Object.keys(cryptoData).forEach(symbol => {
        const data = cryptoData[symbol];
        // Variação de -2% a +2%
        const variation = (Math.random() - 0.5) * 0.04;
        data.price = data.price * (1 + variation);
        data.change24h = data.change24h + (Math.random() - 0.5) * 2;
        data.lastUpdate = new Date().toISOString();
        data.source = 'Real-time Simulation';
    });
    console.log('📊 Preços atualizados:', new Date().toLocaleTimeString());
}

// Endpoints
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'RiskGuardian Simple Server'
    });
});

app.get('/api/market/data', (req, res) => {
    res.json({
        success: true,
        data: cryptoData,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/portfolio/multichain/:address', (req, res) => {
    const { address } = req.params;

    const assets = [
        { symbol: 'BTC', balance: 0.15, value: cryptoData.BTC.price * 0.15, change24h: cryptoData.BTC.change24h },
        { symbol: 'ETH', balance: 2.5, value: cryptoData.ETH.price * 2.5, change24h: cryptoData.ETH.change24h },
        { symbol: 'USDC', balance: 5000, value: cryptoData.USDC.price * 5000, change24h: cryptoData.USDC.change24h },
        { symbol: 'AAVE', balance: 12, value: cryptoData.AAVE.price * 12, change24h: cryptoData.AAVE.change24h },
        { symbol: 'UNI', balance: 100, value: cryptoData.UNI.price * 100, change24h: cryptoData.UNI.change24h }
    ];

    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const avgChange = assets.reduce((sum, asset) => sum + (asset.change24h * asset.value), 0) / totalValue;

    const portfolio = {
        totalValue: totalValue,
        change24h: avgChange,
        riskScore: 7.2,
        healthFactor: 1.85,
        activeAssets: 5,
        assets: assets
    };

    res.json({
        success: true,
        data: portfolio,
        address: address,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/ai/insights', (req, res) => {
    const insights = [{
            id: '1',
            type: cryptoData.BTC.change24h > 0 ? 'bullish' : 'bearish',
            title: `Bitcoin ${cryptoData.BTC.change24h > 0 ? 'em alta' : 'em baixa'}`,
            description: `BTC está ${cryptoData.BTC.change24h > 0 ? 'subindo' : 'caindo'} ${Math.abs(cryptoData.BTC.change24h).toFixed(2)}% nas últimas 24h`,
            recommendation: cryptoData.BTC.change24h > 0 ? 'Considere manter posição' : 'Monitore suportes'
        },
        {
            id: '2',
            type: 'info',
            title: 'Ethereum Performance',
            description: `ETH mostra ${cryptoData.ETH.change24h > 0 ? 'momentum positivo' : 'correção'} de ${cryptoData.ETH.change24h.toFixed(2)}%`,
            recommendation: 'Ethereum continua forte no DeFi'
        },
        {
            id: '3',
            type: 'warning',
            title: 'Diversificação de Risco',
            description: 'Portfólio concentrado em ativos correlacionados',
            recommendation: 'Considere adicionar stablecoins'
        }
    ];

    res.json({
        success: true,
        data: insights,
        timestamp: new Date().toISOString()
    });
});

// Atualizar preços a cada 10 segundos
setInterval(updatePrices, 10000);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Health: http://localhost:${PORT}/health`);
    console.log(`📊 Market: http://localhost:${PORT}/api/market/data`);
    updatePrices(); // Primeira atualização
});