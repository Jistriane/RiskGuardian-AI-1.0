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
const PORT = 3001;

// Middleware básico
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req: any, res: any) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'RiskGuardian Backend (Simple)'
  });
});

app.get('/api/health', (req: any, res: any) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'RiskGuardian Backend API (Simple)'
  });
});

// Portfolio endpoints
app.get('/api/portfolio', (req: any, res: any) => {
  res.json({
    success: true,
    data: {
      totalValue: 125000,
      assets: [
        { symbol: 'ETH', balance: 10.5, value: 35000, chain: 'ethereum' },
        { symbol: 'MATIC', balance: 5000, value: 4500, chain: 'polygon' }
      ],
      protocols: ['Uniswap', 'Aave', 'Compound'],
      chains: ['ethereum', 'polygon', 'avalanche']
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 RiskGuardian Backend (Simple) running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app; 