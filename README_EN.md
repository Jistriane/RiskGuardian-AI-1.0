# 🛡️ RiskGuardian AI - Complete DeFi Risk Management System

**Innovative risk management platform that combines artificial intelligence with blockchain technology to protect investors in DeFi and traditional financial markets**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## 🎯 What is RiskGuardian AI?

**RiskGuardian AI** works as an "intelligent autopilot" for DeFi investments, combining the speed of blockchain automation with AI intelligence to keep users' funds safe. It's essentially a "financial guardian" system that:

- 🔍 **Prevents losses** through predictive analysis
- 🛡️ **Automates protections** without manual intervention  
- 📊 **Simplifies complex** investment decisions
- ⚡ **Monitors 24/7** multiple networks and protocols

## 🚀 Quick Start

### 🔧 Initial Setup

**For new users:**
```bash
# Clone the repository
git clone https://github.com/Jistriane/RiskGuardian-AI-1.0.git
cd RiskGuardian-AI-1.0

# Automatic initial setup
./setup-riskguardian.sh
```

### ⚡ Quick Launch

**Complete development system:**
```bash
# Start all services
./start-riskguardian.sh dev

# Check services status
./status-riskguardian.sh

# Stop all services
./stop-riskguardian.sh
```

**✅ Ready!** All services will be running:
- 🎨 **Frontend**: http://localhost:3001
- 🔧 **Backend**: http://localhost:8001
- 🤖 **ElizaOS Agent**: http://localhost:3000
- 🗄️ **PostgreSQL**: http://localhost:5432
- 🔄 **Redis**: http://localhost:6379
- ⛓️ **Blockchain**: http://localhost:8545

## 🏗️ Architecture and Technologies

### System Architecture

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Frontend      │  │   Backend API   │  │  ElizaOS Agent  │
│   Next.js       │◄─┤   Node.js/TS    │◄─┤   AI Engine     │
│   Port: 3001    │  │   Port: 8001    │  │   Port: 3000    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                     ┌─────────────────┐
                     │   Database      │
                     │ PostgreSQL:5432 │
                     │   Redis:6379    │
                     └─────────────────┘
                                 │
                                 ▼
                     ┌─────────────────┐
                     │   Blockchain    │
                     │ Anvil/Hardhat   │
                     │   Port: 8545    │
                     └─────────────────┘
```

### Technology Stack

**Frontend (Next.js 14):**
- React 18 + TypeScript
- Tailwind CSS + Shadcn/ui
- Wagmi v2 + RainbowKit (Web3)
- TradingView Charts
- Socket.io Client
- Zustand (State Management)

**Backend (Node.js):**
- Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT Authentication
- Rate Limiting & Security
- Socket.io Server
- Ethers.js v6

**Blockchain & DeFi:**
- Ethereum + Chainlink + Avalanche
- Multi-chain Support (Sepolia, Mumbai, Fuji, BSC)
- Smart Contracts (Solidity)
- Hardhat Framework
- OpenZeppelin Security

**AI & Automation:**
- ElizaOS Agent (conversational AI)
- OpenAI/Anthropic Integration
- Chromia Services (real-time alerts)
- Anomaly Detection
- WebSocket Real-time

## ✨ Main Features

### 🔍 Intelligent Risk Analysis
- **Predictive AI**: Uses ElizaOS to analyze market trends
- **Multi-chain Monitoring**: Real-time analysis across multiple networks
- **Anomaly Detection**: Identifies suspicious activities and "whale" movements
- **Advanced Metrics**: VaR, Sharpe Ratio, Volatility, Correlation

### ⚠️ Proactive Alert System
- Instant notifications about vulnerabilities and threats
- Extreme volatility alerts
- Detection of suspicious activities in DeFi protocols
- Real-time WebSocket for instant alerts

### 🛡️ Protection Automation
- **Automatic Hedge**: Smart contracts with protection strategies
- **Intelligent Stop-loss**: Cross-chain system that protects positions
- **Automatic Rebalancing**: Adjusts portfolios based on risk analysis
- **Chainlink Automation**: Automatic execution via decentralized oracles

### 📊 Advanced Analytical Dashboard
- Real-time data visualization with TradingView
- Custom risk metrics
- "What if?" scenario simulation to test strategies
- Responsive interface for desktop and mobile

## 📋 System Scripts

### 🚀 Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `setup-riskguardian.sh` | Initial system setup | `./setup-riskguardian.sh` |
| `start-riskguardian.sh` | Complete initialization with multiple modes | `./start-riskguardian.sh [mode]` |
| `stop-riskguardian.sh` | Safe shutdown of all services | `./stop-riskguardian.sh` |
| `status-riskguardian.sh` | Detailed status monitor | `./status-riskguardian.sh` |

### 🎯 Operation Modes

```bash
# Complete development (default)
./start-riskguardian.sh dev

# Production mode
./start-riskguardian.sh prod

# Local blockchain only
./start-riskguardian.sh blockchain

# Dependencies installation only
./start-riskguardian.sh test
```

## 🔧 Manual Development

### Prerequisites
```bash
Node.js 18+
npm 9+
Git
PostgreSQL 13+
Redis 6+
```

### Manual Installation
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (new terminal)
cd backend
npm install
npm run dev

# ElizaOS Agent (new terminal)
cd elizaos-agent
npm install
npm run dev

# Chromia Services (new terminal)
cd chromia_aws
npm install
npm run dev
```

### Local Blockchain
```bash
# Using Anvil (Foundry)
anvil --port 8545 --host 0.0.0.0

# Or using Hardhat
npx hardhat node --port 8545
```

## 📦 Project Structure

```
riskguardian-ai/
├── 🎨 frontend/           # Next.js App (Port 3001)
├── 🔧 backend/            # Node.js API (Port 8001)
├── 🤖 elizaos-agent/      # AI Agent (Port 3000)
├── 🔗 chromia_aws/        # Alert System
├── 📄 contracts/          # Solidity Smart Contracts
├── 🚀 scripts/            # Deployment Scripts
├── 📚 docs/               # Documentation
├── 🛠️ *.sh               # System Scripts
└── 📋 *.md                # Documentation
```

## 🔒 Security Configuration

### Environment Variables

**Backend (.env):**
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/riskguardian"

# APIs
ALCHEMY_API_KEY="your_alchemy_key"
COINMARKETCAP_API_KEY="your_cmc_key"
COINGECKO_API_KEY="your_coingecko_key"

# JWT
JWT_SECRET="your_jwt_secret_here"

# Blockchain
PRIVATE_KEY="your_wallet_private_key"
ETHEREUM_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-key"
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL="http://localhost:8001"
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:8001"
NEXT_PUBLIC_ENVIRONMENT="development"
```

**ElizaOS (.env):**
```env
OPENAI_API_KEY="your_openai_key"
ANTHROPIC_API_KEY="your_anthropic_key"
ELIZAOS_PORT="3000"
```

## 🧪 Testing and Quality

```bash
# Run all tests
cd backend && npm test

# Integration tests
./scripts/test-integration.sh

# Check code quality
npm run lint
npm run type-check
```

## 📈 Monitoring

### System Logs
```bash
# View real-time logs
tail -f riskguardian-startup.log

# Complete system status
./status-riskguardian.sh

# Specific service logs
cd frontend && npm run dev 2>&1 | tee frontend.log
cd backend && npm run dev 2>&1 | tee backend.log
```

### Health Checks
```bash
# Frontend
curl http://localhost:3001

# Backend
curl http://localhost:8001/health

# ElizaOS
curl http://localhost:3000/health

# Blockchain
curl http://localhost:8545
```

## 🔌 APIs and Integrations

### Main API Endpoints

**Authentication:**
```typescript
POST /api/auth/login
POST /api/auth/register
GET /api/auth/profile
```

**Portfolio:**
```typescript
GET /api/portfolio/overview
GET /api/portfolio/assets
POST /api/portfolio/analyze
```

**Risk Analysis:**
```typescript
POST /api/risk/analyze
GET /api/risk/metrics
GET /api/risk/alerts
```

### External Integrations
- **Blockchain**: Ethereum, Polygon, Avalanche, BSC
- **Oracles**: Chainlink Data Feeds, Automation, CCIP, VRF
- **Market Data**: CoinGecko, CoinMarketCap, TheGraph
- **AI Services**: OpenAI GPT-4, Anthropic Claude

## 🌐 Deployment and Production

### Production URLs
- **Frontend**: https://riskguardian-ai.vercel.app
- **Backend**: https://riskguardian-backend.railway.app

### Automatic Deployment
```bash
# Deploy frontend (Vercel)
npm run build:frontend

# Deploy backend (Railway)
npm run build:backend
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support and Contact

### Communication Channels
- **Email**: jistriane@live.com
- **LinkedIn**: www.linkedin.com/in/jibso
- **Discord**: jistriane
- **X (Twitter)**: @jistriane
- **Instagram**: jibso87

### Technical Support

For problems and questions:

1. **Check logs**: `cat riskguardian-startup.log`
2. **Check status**: `./status-riskguardian.sh`
3. **Restart system**: `./stop-riskguardian.sh && ./start-riskguardian.sh`
4. **Complete documentation**: `COMPLETE_RISKGUARDIAN_AI_DOCUMENTATION_EN.md`

## 🚀 Roadmap

### Current Version (v1.0)
- [x] Complete dashboard with risk metrics
- [x] Web3 integration with multiple wallets
- [x] Real-time alert system
- [x] ElizaOS AI for portfolio analysis
- [x] Basic Chainlink automation
- [x] Multi-chain support (Testnet)

### Next Versions
- [ ] **v1.1** - Mobile App (React Native)
- [ ] **v1.2** - Complete Mainnet support
- [ ] **v1.3** - Advanced AI with custom ML
- [ ] **v2.0** - Complete ecosystem with DAO

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🎯 Competitive Advantages

- **Hybrid Architecture**: Combines the best of multiple blockchains
- **Advanced AI**: ElizaOS as central brain for risk analysis
- **Complete Chainlink Integration**: Uses 5+ Chainlink services
- **Professional UX**: Intuitive interface inspired by trading tools

---

---

## 👨‍💻 **Developer**

**Jistriane Brunielli Silva de Oliveira**  
🏢 **Senior Software Architect & Blockchain Developer**  
📧 **Email**: jistriane@live.com  
🌐 **Specialties**: DeFi, Smart Contracts, AI, Blockchain Automation  

### 🚀 **About the Developer**
Expert in developing complex DeFi systems with over 10 years of experience in software architecture. Creator of RiskGuardian AI, a pioneering system for automated crypto portfolio protection using artificial intelligence and blockchain automation.

### 🎯 **Technical Expertise**
- **Blockchain Development**: Ethereum, Smart Contracts, DeFi Protocols
- **AI & Machine Learning**: Risk analysis, Recommendation systems
- **Full-Stack Development**: React, Node.js, TypeScript, Next.js
- **DevOps & Cloud**: AWS, Docker, CI/CD, Monitoring
- **Database Systems**: PostgreSQL, Redis, Blockchain indexing

### 🏆 **Projects and Achievements**
- **RiskGuardian AI**: Complete DeFi protection system with AI
- **Chainlink Integration**: 5+ Chainlink services implemented
- **ElizaOS Integration**: Advanced AI for portfolio analysis
- **Multi-Chain Support**: Ethereum, Polygon, Avalanche, BSC
- **Professional UX**: Modern interface inspired by trading tools

---

⭐ **Star this project if it helped you!**

**© 2025 RiskGuardian AI - Developed by Jistriane Brunielli Silva de Oliveira**  
*Your intelligent financial guardian protecting DeFi investments 24/7* 🛡️ 