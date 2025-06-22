# 🛡️ RiskGuardian AI - Sistema Completo de Gestão de Riscos DeFi

**Plataforma inovadora de gestão de riscos que combina inteligência artificial com tecnologia blockchain para proteger investidores em DeFi e mercados financeiros tradicionais**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## 🎯 O que é o RiskGuardian AI?

O **RiskGuardian AI** funciona como um "piloto automático inteligente" para investimentos em DeFi, combinando a velocidade da automação blockchain com a inteligência da IA para manter os fundos dos usuários seguros. É essencialmente um sistema de "guardião financeiro" que:

- 🔍 **Previne perdas** através de análise preditiva
- 🛡️ **Automatiza proteções** sem intervenção manual  
- 📊 **Simplifica decisões** complexas de investimento
- ⚡ **Monitora 24/7** múltiplas redes e protocolos

## 🚀 Início Rápido

### 🔧 Primeira Configuração

**Para novos usuários:**
```bash
# Clone o repositório
git clone https://github.com/Jistriane/RiskGuardian-AI-1.0.git
cd RiskGuardian-AI-1.0

# Configuração inicial automática
./setup-riskguardian.sh
```

### ⚡ Inicialização Rápida

**Sistema completo em desenvolvimento:**
```bash
# Inicia todos os serviços
./start-riskguardian.sh dev

# Verificar status dos serviços
./status-riskguardian.sh

# Parar todos os serviços
./stop-riskguardian.sh
```

**✅ Pronto!** Todos os serviços estarão rodando:
- 🎨 **Frontend**: http://localhost:3001
- 🔧 **Backend**: http://localhost:8001
- 🤖 **ElizaOS Agent**: http://localhost:3000
- 🗄️ **PostgreSQL**: http://localhost:5432
- 🔄 **Redis**: http://localhost:6379
- ⛓️ **Blockchain**: http://localhost:8545

## 🏗️ Arquitetura e Tecnologias

### Arquitetura do Sistema

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Frontend      │  │   Backend API   │  │  ElizaOS Agent  │
│   Next.js       │◄─┤   Node.js/TS    │◄─┤   IA Engine     │
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

### Stack Tecnológico

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

**IA & Automação:**
- ElizaOS Agent (IA conversacional)
- OpenAI/Anthropic Integration
- Chromia Services (Alertas em tempo real)
- Anomaly Detection
- WebSocket Real-time

## ✨ Funcionalidades Principais

### 🔍 Análise de Risco Inteligente
- **IA Preditiva**: Usa ElizaOS para analisar tendências de mercado
- **Monitoramento Multi-chain**: Análise em tempo real através de múltiplas redes
- **Detecção de Anomalias**: Identifica atividades suspeitas e movimentos de "whales"
- **Métricas Avançadas**: VaR, Sharpe Ratio, Volatilidade, Correlação

### ⚠️ Sistema de Alertas Proativo
- Notificações instantâneas sobre vulnerabilidades e ameaças
- Alertas de volatilidade extrema
- Detecção de atividades suspeitas em protocolos DeFi
- WebSocket real-time para alertas instantâneos

### 🛡️ Automação de Proteção
- **Hedge Automático**: Contratos inteligentes com estratégias de proteção
- **Stop-loss Inteligente**: Sistema cross-chain que protege posições
- **Rebalanceamento Automático**: Ajusta portfólios baseado em análises de risco
- **Chainlink Automation**: Execução automática via oráculos descentralizados

### 📊 Dashboard Analítico Avançado
- Visualização de dados em tempo real com TradingView
- Métricas de risco personalizadas
- Simulação de cenários "e se?" para testar estratégias
- Interface responsiva para desktop e mobile

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

# Modo produção
./start-riskguardian.sh prod

# Apenas blockchain local
./start-riskguardian.sh blockchain

# Apenas instalação de dependências
./start-riskguardian.sh test
```

## 🔧 Desenvolvimento Manual

### Pré-requisitos
```bash
Node.js 18+
npm 9+
Git
PostgreSQL 13+
Redis 6+
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
anvil --port 8545 --host 0.0.0.0

# Ou usando Hardhat
npx hardhat node --port 8545
```

## 📦 Estrutura do Projeto

```
riskguardian-ai/
├── 🎨 frontend/           # Next.js App (Porta 3001)
├── 🔧 backend/            # API Node.js (Porta 8001)
├── 🤖 elizaos-agent/      # IA Agent (Porta 3000)
├── 🔗 chromia_aws/        # Alert System
├── 📄 contracts/          # Smart Contracts Solidity
├── 🚀 scripts/            # Deployment Scripts
├── 📚 docs/               # Documentation
├── 🛠️ *.sh               # System Scripts
└── 📋 *.md                # Documentation
```

## 🔒 Configuração de Segurança

### Variáveis de Ambiente

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
curl http://localhost:3001

# Backend
curl http://localhost:8001/health

# ElizaOS
curl http://localhost:3000/health

# Blockchain
curl http://localhost:8545
```

## 🔌 APIs e Integrações

### API Endpoints Principais

**Autenticação:**
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

### Integrações Externas
- **Blockchain**: Ethereum, Polygon, Avalanche, BSC
- **Oráculos**: Chainlink Data Feeds, Automation, CCIP, VRF
- **Market Data**: CoinGecko, CoinMarketCap, TheGraph
- **IA Services**: OpenAI GPT-4, Anthropic Claude

## 🌐 Deploy e Produção

### URLs de Produção
- **Frontend**: https://riskguardian-ai.vercel.app
- **Backend**: https://riskguardian-backend.railway.app

### Deploy Automático
```bash
# Deploy frontend (Vercel)
npm run build:frontend

# Deploy backend (Railway)
npm run build:backend
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte e Contato

### Canais de Comunicação
- **Email**: jistriane@live.com
- **LinkedIn**: www.linkedin.com/in/jibso
- **Discord**: jistriane
- **X (Twitter)**: @jistriane
- **Instagram**: jibso87

### Suporte Técnico

Para problemas e dúvidas:

1. **Verificar logs**: `cat riskguardian-startup.log`
2. **Verificar status**: `./status-riskguardian.sh`
3. **Reiniciar sistema**: `./stop-riskguardian.sh && ./start-riskguardian.sh`
4. **Documentação completa**: `DOCUMENTACAO_COMPLETA_RISKGUARDIAN_AI.md`

## 🚀 Roadmap

### Versão Atual (v1.0)
- [x] Dashboard completo com métricas de risco
- [x] Integração Web3 com múltiplas carteiras
- [x] Sistema de alertas em tempo real
- [x] IA ElizaOS para análise de portfólio
- [x] Automação Chainlink básica
- [x] Suporte multi-chain (Testnet)

### Próximas Versões
- [ ] **v1.1** - Mobile App (React Native)
- [ ] **v1.2** - Suporte Mainnet completo
- [ ] **v1.3** - IA Avançada com ML personalizado
- [ ] **v2.0** - Ecossistema completo com DAO

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🎯 Diferenciais Competitivos

- **Arquitetura Híbrida**: Combina o melhor de múltiplas blockchains
- **IA Avançada**: ElizaOS como cérebro central para análise de risco
- **Integração Completa Chainlink**: Usa 5+ serviços Chainlink
- **UX Profissional**: Interface intuitiva inspirada em ferramentas de trading

---

## 👨‍💻 **Desenvolvedor**

**Jistriane Brunielli Silva de Oliveira**  
🏢 **Arquiteto de Software Sênior & Desenvolvedor Blockchain**  
📧 **Email**: jistriane@live.com  
🌐 **Especialidades**: DeFi, Smart Contracts, IA, Automação Blockchain  

### 🚀 **Sobre o Desenvolvedor**
Especialista em desenvolvimento de sistemas DeFi complexos com mais de 10 anos de experiência em arquitetura de software. Criador do RiskGuardian AI, sistema pioneiro em proteção automatizada de portfolios cripto usando inteligência artificial e automação blockchain.

### 🎯 **Expertise Técnica**
- **Blockchain Development**: Ethereum, Smart Contracts, DeFi Protocols
- **AI & Machine Learning**: Análise de riscos, Sistemas de recomendação
- **Full-Stack Development**: React, Node.js, TypeScript, Next.js
- **DevOps & Cloud**: AWS, Docker, CI/CD, Monitoramento
- **Database Systems**: PostgreSQL, Redis, Blockchain indexing

### 🏆 **Projetos e Conquistas**
- **RiskGuardian AI**: Sistema completo de proteção DeFi com IA
- **Integração Chainlink**: 5+ serviços Chainlink implementados
- **ElizaOS Integration**: IA avançada para análise de portfolio
- **Multi-Chain Support**: Ethereum, Polygon, Avalanche, BSC
- **Professional UX**: Interface moderna inspirada em ferramentas de trading

---

⭐ **Star este projeto se te ajudou!**

**© 2025 RiskGuardian AI - Desenvolvido por Jistriane Brunielli Silva de Oliveira**  
*Seu guardião financeiro inteligente protegendo investimentos DeFi 24/7* 🛡️