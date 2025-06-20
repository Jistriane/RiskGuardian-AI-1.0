# 🛡️ RiskGuardian AI - Sistema Completo de Gestão de Riscos DeFi

**Plataforma completa de gestão de riscos para DeFi com IA integrada, automação Chainlink e análise em tempo real**

## 🚀 Início Rápido

### 🔧 Primeira Configuração

**Para novos usuários:**
```bash
# Clone o repositório
git clone https://github.com/your-repo/riskguardian-ai.git
cd riskguardian-ai

# Configuração inicial automática
./setup-riskguardian.sh
```

### ⚡ Inicialização Rápida

**Sistema completo em desenvolvimento:**
```bash
# Inicia todos os serviços (Frontend + Backend + Blockchain + ElizaOS + Chromia)
./start-riskguardian.sh dev

# Verificar status dos serviços
./status-riskguardian.sh

# Parar todos os serviços
./stop-riskguardian.sh
```

**✅ Pronto!** Todos os serviços estarão rodando:
- 🎨 **Frontend**: http://localhost:3000
- 🔧 **Backend**: http://localhost:3001
- ⛓️ **Blockchain**: http://localhost:8545
- 🤖 **ElizaOS Agent**: http://localhost:3002
- 🔗 **Chromia Services**: http://localhost:3003

## 📋 Scripts de Sistema

### 🚀 Scripts Disponíveis

| Script | Descrição | Uso |
|--------|-----------|-----|
| `setup-riskguardian.sh` | Configuração inicial do sistema | `./setup-riskguardian.sh` |
| `start-riskguardian.sh` | Inicialização completa com múltiplos modos | `./start-riskguardian.sh [mode]` |
| `stop-riskguardian.sh` | Parada segura de todos os serviços | `./stop-riskguardian.sh` |
| `status-riskguardian.sh` | Monitor de status detalhado | `./status-riskguardian.sh` |

### 🎯 Modos de Operação

```bash
# Desenvolvimento completo (padrão)
./start-riskguardian.sh dev

# Modo produção (sem blockchain local)
./start-riskguardian.sh prod

# Apenas blockchain local
./start-riskguardian.sh blockchain

# Apenas instalação de dependências
./start-riskguardian.sh test
```

**📚 Documentação completa:** `cat SCRIPTS_SISTEMA.md`

## 🛠️ Tecnologias Principais

### Frontend
- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS** + Shadcn/ui
- **Wagmi v2** + RainbowKit (Web3)
- **TradingView Charts**

### Backend
- **Node.js** + Express + TypeScript
- **Prisma ORM** + PostgreSQL/SQLite
- **JWT Authentication**
- **Rate Limiting & Security**

### Blockchain & DeFi
- **Ethereum** + Chainlink + Avalanche
- **Multi-chain Support**
- **Smart Contracts** (Solidity)
- **Risk Management Protocols**

### IA & Automação
- **ElizaOS Agent** (IA conversacional)
- **Chromia Services** (Alertas em tempo real)
- **Anomaly Detection**
- **WebSocket Real-time**

## 🏗️ Arquitetura do Sistema

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Frontend      │  │   Backend API   │  │  ElizaOS Agent  │
│   Next.js       │◄─┤   Node.js/TS    │◄─┤   IA Engine     │
│   Port: 3000    │  │   Port: 3001    │  │   Port: 3002    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                     ┌─────────────────┐
                     │  Chromia AWS    │
                     │  Alert System   │
                     │   Port: 3003    │
                     └─────────────────┘
                                 │
                                 ▼
                     ┌─────────────────┐
                     │   Blockchain    │
                     │ Anvil/Hardhat   │
                     │   Port: 8545    │
                     └─────────────────┘
```

## ✨ Funcionalidades Principais

### 🔗 Web3 & Blockchain
- **Conexão Multi-Carteira**: RainbowKit + Wagmi v2
- **Multi-Chain Support**: Ethereum, Polygon, Arbitrum, Base, Optimism
- **Redes Testnet**: Desenvolvimento seguro
- **Autenticação Web3**: Nonce + signature

### 📊 Dashboard Analítico
- **Portfolio Overview**: Visualização completa de ativos
- **Risk Metrics**: Análise de risco em tempo real
- **AI Insights**: Recomendações inteligentes via ElizaOS
- **TradingView Charts**: Gráficos profissionais integrados

### 🔔 Sistema de Alertas
- **Real-time Alerts**: WebSocket + Socket.IO
- **Anomaly Detection**: Detecção automática via Chromia
- **Custom Notifications**: Alertas personalizáveis
- **Smart Monitoring**: Monitoramento inteligente

### ⚡ Automação Chainlink
- **Upkeep Management**: Gerenciamento de automações
- **Execution Monitoring**: Status em tempo real
- **LINK Balance**: Controle de saldos
- **Performance Tracking**: Métricas de performance

## 🔧 Desenvolvimento Manual

### Pré-requisitos
```bash
Node.js 18+
npm 9+
Git
curl (opcional)
```

### Instalação Manual
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (novo terminal)
cd backend
npm install
npm run dev

# ElizaOS Agent (novo terminal)
cd elizaos-agent
npm install
npm run dev

# Chromia Services (novo terminal)
cd chromia_aws
npm install
npm run dev
```

### Blockchain Local
```bash
# Usando Anvil (Foundry)
anvil --port 8545

# Ou usando Hardhat
npx hardhat node --port 8545
```

## 📦 Estrutura do Projeto

```
riskguardian-ai/
├── 🎨 frontend/          # Next.js App
├── 🔧 backend/           # API Node.js
├── 🤖 elizaos-agent/     # IA Agent
├── 🔗 chromia_aws/       # Alert System
├── 📄 contracts/         # Smart Contracts
├── 🚀 scripts/           # Deployment Scripts
├── 📚 docs/              # Documentation
├── 🛠️ *.sh              # System Scripts
└── 📋 *.md               # Documentation
```

## 🌐 URLs de Produção

### Serviços Online
- **Frontend**: https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app
- **Backend**: https://riskguardian-backend.onrender.com

### Desenvolvimento Local
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **ElizaOS**: http://localhost:3002
- **Chromia**: http://localhost:3003
- **Blockchain**: http://localhost:8545

## 🔒 Configuração de Segurança

### Variáveis de Ambiente

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
NEXT_PUBLIC_ELIZAOS_API_URL=http://localhost:3002
NEXT_PUBLIC_CHROMIA_API_URL=http://localhost:3003
```

**Backend (.env-dev):**
```bash
NODE_ENV=development
JWT_SECRET=your-secret-key
DATABASE_URL=sqlite:./dev.db
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000
```

## 🧪 Testes e Qualidade

```bash
# Executar todos os testes
cd backend && npm test

# Testes de integração
./scripts/test-integration.sh

# Verificar qualidade do código
npm run lint
npm run type-check
```

## 📈 Monitoramento

### Logs do Sistema
```bash
# Ver logs em tempo real
tail -f riskguardian-startup.log

# Status completo do sistema
./status-riskguardian.sh

# Logs de serviços específicos
cd frontend && npm run dev 2>&1 | tee frontend.log
cd backend && npm run dev 2>&1 | tee backend.log
```

### Health Checks
```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:3001/health

# ElizaOS
curl http://localhost:3002/health

# Chromia
curl http://localhost:3003/health
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para problemas e dúvidas:

1. **Verificar logs**: `cat riskguardian-startup.log`
2. **Verificar status**: `./status-riskguardian.sh`
3. **Reiniciar sistema**: `./stop-riskguardian.sh && ./start-riskguardian.sh`
4. **Documentação**: `cat SCRIPTS_SISTEMA.md`

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🎯 Roadmap

- [x] Sistema de scripts automatizados
- [x] Deploy de produção (Vercel + Render)
- [x] Integração Web3 completa
- [x] IA Agent (ElizaOS)
- [x] Sistema de alertas (Chromia)
- [ ] Mobile App (React Native)
- [ ] Advanced Analytics
- [ ] Multi-language Support

---

⭐ **Star este projeto se te ajudou!**

*RiskGuardian AI - Protegendo seus investimentos DeFi com inteligência artificial* 🛡️