# 🛡️ RiskGuardian AI - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#overview)
2. [System Architecture](#architecture)
3. [Main Features](#features)
4. [Installation and Configuration](#installation)
5. [Service Initialization](#initialization)
6. [User Interface](#interface)
7. [APIs and Integrations](#apis)
8. [Development](#development)
9. [Troubleshooting](#troubleshooting)
10. [Roadmap and Future](#roadmap)

---

## 🎯 Project Overview {#overview}

### What is RiskGuardian AI?

**RiskGuardian AI** is an innovative risk management platform that combines artificial intelligence with blockchain technology to protect investors in DeFi and traditional financial markets. It's essentially an "intelligent autopilot system" for DeFi investments, combining the speed of blockchain automation with AI intelligence to keep users' funds safe.

### Main Features:
- 🤖 **Integrated AI** - ElizaOS system for predictive analysis
- 🔗 **Blockchain Native** - Ethereum/Avalanche/Chainlink smart contracts
- 📊 **Real-time Dashboard** - Responsive Next.js interface
- 🚨 **Alert System** - Continuous risk monitoring
- 🌐 **Multilingual** - Complete PT-BR/EN support
- 🔐 **Web3 Integrated** - Direct wallet connection

### User Value:

The system works as a "financial guardian" that:
- Prevents losses through predictive analysis
- Automates protections without manual intervention
- Simplifies complex investment decisions
- Monitors 24/7 multiple networks and protocols

---

## 🏗️ System Architecture {#architecture}

### Directory Structure:
```
RiskGuardian-AI-1.0/
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

### Architecture Flow:
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

### Technologies Used:

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

---

## ⚡ Main Features {#features}

### 1. Intelligent Dashboard
- **Real-time Portfolio**: Complete multi-chain asset visualization
- **Risk Metrics**: Value at Risk (VaR), Volatility, Sharpe Ratio, Correlation
- **Active Alerts**: Continuous risk monitoring
- **24h Performance**: Gain/loss analysis
- **AI Insights**: ElizaOS recommendations

### 2. Chainlink Automation System
- **Intelligent Stop Loss**: Automatic protection against losses
- **Automatic Rebalancing**: Automatic portfolio optimization
- **Hedge Strategies**: Cross-chain protection strategies
- **Chainlink Automation**: Automatic execution via decentralized oracles

### 3. AI Risk Analysis
- **VaR Calculation**: Real-time Value at Risk
- **Correlation Analysis**: Between different assets
- **Anomaly Detection**: AI identifies suspicious patterns
- **Predictive Analysis**: Market trends and volatility prediction

### 4. DeFi Insurance System
- **Portfolio Protection**: Insurance against smart contract losses
- **Personalized Coverage**: Based on risk profile
- **Automatic Claims**: Processing via smart contracts
- **Liquidity Pool**: Decentralized insurance system

### 5. Multi-Chain Monitoring
- **Supported Chains**: Ethereum, Polygon, Avalanche, BSC
- **Cross-Chain Operations**: Multiple network monitoring
- **DeFi Protocols**: Integration with main protocols
- **Fee Optimization**: Transaction cost analysis

---

## 🔧 Installation and Configuration {#installation}

### Prerequisites:
```bash
# Node.js 18+ and npm
node --version  # v18.0.0+
npm --version   # 8.0.0+

# Git
git --version   # 2.0.0+

# PostgreSQL and Redis
psql --version
redis-cli --version
```

### 1. Repository Clone:
```bash
git clone https://github.com/Jistriane/RiskGuardian-AI-1.0.git
cd RiskGuardian-AI-1.0
```

### 2. Automatic Configuration:
```bash
# Automatic initial setup
./setup-riskguardian.sh

# Complete initialization
./start-riskguardian.sh dev
```

### 3. Environment Configuration:

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
POLYGON_RPC_URL="https://polygon-mainnet.alchemyapi.io/v2/your-key"

# Chainlink
CHAINLINK_AUTOMATION_REGISTRY="0x..."
CHAINLINK_CCIP_ROUTER="0x..."
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

### 4. Manual Installation (if needed):
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
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

---

## 🚀 Service Initialization {#initialization}

### Available System Scripts:

| Script | Description | Usage |
|--------|-------------|-------|
| `setup-riskguardian.sh` | Initial setup | `./setup-riskguardian.sh` |
| `start-riskguardian.sh` | Complete initialization | `./start-riskguardian.sh [mode]` |
| `stop-riskguardian.sh` | Safe shutdown | `./stop-riskguardian.sh` |
| `status-riskguardian.sh` | Status monitor | `./status-riskguardian.sh` |

### Operation Modes:

```bash
# Complete development (default)
./start-riskguardian.sh dev

# Production mode
./start-riskguardian.sh prod

# Local blockchain only
./start-riskguardian.sh blockchain

# Installation only
./start-riskguardian.sh test
```

### Status Check:
```bash
# Check if all are running
./status-riskguardian.sh
```

### Access URLs:
- **🎨 Frontend**: http://localhost:3001
- **🔧 Backend**: http://localhost:8001
- **🤖 ElizaOS Agent**: http://localhost:3000
- **🗄️ PostgreSQL**: localhost:5432
- **🔄 Redis**: localhost:6379
- **⛓️ Blockchain**: http://localhost:8545

---

## 🎨 User Interface {#interface}

### Main Dashboard

**Dashboard Sections:**

1. **Real-time Portfolio**
   - Total value in USD
   - 24h variation
   - Risk score (0-100)
   - Percentage diversification
   - Asset list with prices

2. **Risk Metrics**
   - **Volatility**: Instability measure
   - **Correlation**: Relationship between assets
   - **1-Day VaR**: Maximum expected loss
   - **Sharpe Ratio**: Risk-adjusted return

3. **Automation Status**
   - ETH Stop Loss: Automatic protection
   - Rebalancing: Continuous optimization
   - Volatility Alert: Monitoring
   - DeFi Insurance: Loss protection

4. **AI Insights (ElizaOS)**
   - DCA opportunities
   - High correlation detection
   - Rebalancing suggestions
   - Volatility alerts
   - Yield farming opportunities

5. **Active Alerts**
   - High risk detected (>70%)
   - Concentrated portfolio (<50%)
   - Empty portfolio
   - Status: No active alerts

### Interface Features:

**🌐 Multilingual:**
- Portuguese Brazil (default)
- English (optional)
- Instant switching via toggle

**📱 Responsive:**
- Desktop: Complete layout
- Tablet: Adaptive grid
- Mobile: Vertical stack

**🔗 Web3:**
- Wallet connection (MetaMask, WalletConnect, Coinbase)
- Automatic network detection
- Address display
- Connection status

**⚡ Real-time:**
- WebSocket for updates
- Automatic data refresh
- Visual loading indicators
- Push notifications

---

## 🔌 APIs and Integrations {#apis}

### Backend API Endpoints:

**Authentication:**
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
GET /api/auth/profile
```

**Portfolio:**
```typescript
GET /api/portfolio/overview
GET /api/portfolio/assets
POST /api/portfolio/analyze
GET /api/portfolio/history
```

**Risk Analysis:**
```typescript
POST /api/risk/analyze
GET /api/risk/metrics
GET /api/risk/alerts
POST /api/risk/configure
```

**Automation:**
```typescript
GET /api/automation/status
POST /api/automation/configure
GET /api/automation/history
POST /api/automation/execute
```

**Insurance:**
```typescript
GET /api/insurance/policies
POST /api/insurance/claim
GET /api/insurance/quotes
```

### External Integrations:

**Blockchain:**
- Ethereum (Mainnet/Sepolia)
- Polygon (Mainnet/Mumbai)
- Avalanche (Mainnet/Fuji)
- BSC (Mainnet/Testnet)

**Oracles:**
- Chainlink Data Feeds
- Chainlink Automation
- Chainlink CCIP
- Chainlink VRF

**Market Data:**
- CoinGecko API
- CoinMarketCap API
- DeFiPulse API
- TheGraph Protocol

**AI Services:**
- OpenAI GPT-4
- Anthropic Claude
- Custom ElizaOS Models

### WebSocket Events:
```typescript
// Client
socket.on('portfolio_update', (data) => {
  // Portfolio update
});

socket.on('risk_alert', (alert) => {
  // Risk alert
});

socket.on('automation_executed', (execution) => {
  // Automation executed
});

// Server
socket.emit('subscribe_portfolio', { address });
socket.emit('configure_alerts', { preferences });
```

---

## 💻 Development {#development}

### Code Structure:

**Frontend (Next.js):**
```
src/
├── app/                    # App Router pages
├── components/             # React components
│   ├── dashboard/         # Dashboard components
│   ├── ui/               # UI components
│   └── wallet/           # Web3 components
├── hooks/                # Custom hooks
├── services/             # API services
├── stores/               # Global state
├── types/                # TypeScript types
└── locales/              # Translations
```

**Backend (Node.js):**
```
src/
├── controllers/          # Route controllers
├── services/            # Business logic
├── middleware/          # Express middleware
├── routes/              # Route definitions
├── types/               # TypeScript types
├── utils/               # Utilities
└── contracts/           # Contract ABIs
```

### Development Scripts:

**Frontend:**
```bash
cd frontend
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Linting
npm run type-check   # Type checking
```

**Backend:**
```bash
cd backend
npm run dev          # Server with hot reload
npm run build        # Compile TypeScript
npm run start        # Production server
npm run test         # Run tests
npm run migrate      # Run migrations
```

### Code Standards:

**TypeScript:**
- Strict typing enabled
- Interfaces for all data
- Generics for reusability
- Utility types when appropriate

**React:**
- Functional components
- Custom hooks for logic
- Context API for global state
- Memoization for performance

**Security:**
- Input validation
- Data sanitization
- Rate limiting
- CORS configured
- CSP headers

---

## 🔧 Troubleshooting {#troubleshooting}

### Common Problems:

**1. Port in Use (EADDRINUSE):**
```bash
# Check process on port
lsof -i :3001

# Kill specific process
kill -9 <PID>

# Or use cleanup script
./stop-riskguardian.sh
```

**2. Dependencies Not Installed:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# Or for peer dependency issues
npm install --legacy-peer-deps
```

**3. Database Connection Error:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start if needed
sudo systemctl start postgresql

# Check connection
psql -U postgres -d riskguardian -c "SELECT 1;"
```

**4. Build Problems:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear TypeScript cache
rm -f tsconfig.tsbuildinfo

# Complete rebuild
npm run build
```

**5. Web3/Wallet Error:**
```bash
# Check if MetaMask is installed
# Check network (Ethereum Mainnet/Testnet)
# Check balance for gas fees
# Clear browser cache
```

### Logs and Debugging:

**View Real-time Logs:**
```bash
# View system logs
tail -f riskguardian-startup.log

# Complete system status
./status-riskguardian.sh

# Specific service logs
cd frontend && npm run dev 2>&1 | tee frontend.log
cd backend && npm run dev 2>&1 | tee backend.log
```

**Debug Mode:**
```bash
# Frontend with debug
DEBUG=* npm run dev

# Backend with debug
NODE_ENV=development DEBUG=* npm run dev
```

---

## 🚀 Roadmap and Future {#roadmap}

### Current Version (v1.0):
- ✅ Complete dashboard with risk metrics
- ✅ Web3 integration with multiple wallets
- ✅ Real-time alert system
- ✅ ElizaOS AI for portfolio analysis
- ✅ Basic Chainlink automation
- ✅ Multi-chain support (Testnet)
- ✅ DeFi insurance system

### Next Versions:

**v1.1 - UX Improvements (Q1 2024):**
- [ ] Mobile app (React Native)
- [ ] Native push notifications
- [ ] Enhanced onboarding
- [ ] Interactive tutorials
- [ ] Support for more languages

**v1.2 - Chain Expansion (Q2 2024):**
- [ ] Complete Mainnet support
- [ ] Arbitrum integration
- [ ] Optimism support
- [ ] Base network
- [ ] Solana integration

**v1.3 - Advanced AI (Q3 2024):**
- [ ] Custom AI models
- [ ] Market sentiment analysis
- [ ] ML price predictions
- [ ] Yield farming recommendations
- [ ] Liquidity analysis

**v2.0 - Complete Ecosystem (Q4 2024):**
- [ ] Strategy marketplace
- [ ] DAO governance
- [ ] Native token ($RISK)
- [ ] Staking and rewards
- [ ] Public API
- [ ] Developer SDK

### Future Technologies:
- **Layer 2**: Optimism, Arbitrum, zkSync
- **Advanced AI**: Custom models, AutoML
- **Blockchain**: Solana, Cardano, Cosmos
- **DeFi 2.0**: Emerging protocols
- **Metaverse**: Virtual world integration

---

## 📞 Support and Contact

### Communication Channels:
- **Email**: jistriane@live.com
- **LinkedIn**: www.linkedin.com/in/jibso
- **Discord**: jistriane
- **X (Twitter)**: @jistriane
- **Instagram**: jibso87

### Technical Support:
For problems and questions:

1. **Check logs**: `cat riskguardian-startup.log`
2. **Check status**: `./status-riskguardian.sh`
3. **Restart system**: `./stop-riskguardian.sh && ./start-riskguardian.sh`
4. **Complete documentation**: `COMPLETE_RISKGUARDIAN_AI_DOCUMENTATION_EN.md`

### Contribution:
- 🤝 Pull requests welcome
- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**🎉 RiskGuardian AI - The Future of Decentralized Finance!**

*Complete DeFi risk management system with integrated AI, blockchain automation, and modern interface. Protect and optimize your crypto investments with cutting-edge technology.* 