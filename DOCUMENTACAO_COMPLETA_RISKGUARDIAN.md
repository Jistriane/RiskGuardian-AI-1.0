# 🛡️ RiskGuardian AI - Documentação Completa do Projeto

## 📋 Índice
1. [Visão Geral do Projeto](#visao-geral)
2. [Arquitetura do Sistema](#arquitetura)
3. [Funcionalidades Principais](#funcionalidades)
4. [Instalação e Configuração](#instalacao)
5. [Inicialização dos Serviços](#inicializacao)
6. [Interface do Usuário](#interface)
7. [APIs e Integrações](#apis)
8. [Desenvolvimento](#desenvolvimento)
9. [Troubleshooting](#troubleshooting)
10. [Roadmap e Futuro](#roadmap)

---

## 🎯 Visão Geral do Projeto {#visao-geral}

### O que é o RiskGuardian AI?

O **RiskGuardian AI** é uma plataforma inovadora de gestão de riscos que combina inteligência artificial com tecnologia blockchain para proteger investidores em DeFi e mercados financeiros tradicionais. É essencialmente um sistema de "piloto automático inteligente" para investimentos em DeFi, combinando a velocidade da automação blockchain com a inteligência da IA para manter os fundos dos usuários seguros.

### Principais Características:
- 🤖 **IA Integrada** - Sistema ElizaOS para análise preditiva
- 🔗 **Blockchain Nativo** - Contratos inteligentes Ethereum/Avalanche/Chainlink
- 📊 **Dashboard em Tempo Real** - Interface Next.js responsiva
- 🚨 **Sistema de Alertas** - Monitoramento contínuo de riscos
- 🌐 **Multilíngue** - Suporte completo PT-BR/EN
- 🔐 **Web3 Integrado** - Conexão direta com carteiras

### Valor para o Usuário:

O sistema funciona como um "guardião financeiro" que:
- Previne perdas através de análise preditiva
- Automatiza proteções sem intervenção manual
- Simplifica decisões complexas de investimento
- Monitora 24/7 múltiplas redes e protocolos

---

## 🏗️ Arquitetura do Sistema {#arquitetura}

### Estrutura de Diretórios:
```
RiskGuardian-AI-1.0/
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

### Fluxo de Arquitetura:
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

### Tecnologias Utilizadas:

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

---

## ⚡ Funcionalidades Principais {#funcionalidades}

### 1. Dashboard Inteligente
- **Portfolio em Tempo Real**: Visualização completa de ativos multi-chain
- **Métricas de Risco**: Value at Risk (VaR), Volatilidade, Sharpe Ratio, Correlação
- **Alertas Ativos**: Monitoramento contínuo de riscos
- **Performance 24h**: Análise de ganhos/perdas
- **Insights AI**: Recomendações da ElizaOS

### 2. Sistema de Automação Chainlink
- **Stop Loss Inteligente**: Proteção automática contra perdas
- **Rebalanceamento Automático**: Otimização automática de portfolio
- **Hedge Strategies**: Estratégias de proteção cross-chain
- **Chainlink Automation**: Execução automática via oráculos descentralizados

### 3. Análise de Riscos com IA
- **Cálculo de VaR**: Value at Risk em tempo real
- **Análise de Correlação**: Entre diferentes ativos
- **Detecção de Anomalias**: IA identifica padrões suspeitos
- **Análise Preditiva**: Tendências de mercado e previsão de volatilidade

### 4. Sistema de Seguros DeFi
- **Proteção de Portfolio**: Seguro contra perdas de smart contracts
- **Cobertura Personalizada**: Baseada no perfil de risco
- **Claims Automáticos**: Processamento via smart contracts
- **Pool de Liquidez**: Sistema de seguros descentralizado

### 5. Monitoramento Multi-Chain
- **Chains Suportadas**: Ethereum, Polygon, Avalanche, BSC
- **Cross-Chain Operations**: Monitoramento de múltiplas redes
- **DeFi Protocols**: Integração com protocolos principais
- **Otimização de Taxas**: Análise de custos de transação

---

## 🔧 Instalação e Configuração {#instalacao}

### Pré-requisitos:
```bash
# Node.js 18+ e npm
node --version  # v18.0.0+
npm --version   # 8.0.0+

# Git
git --version   # 2.0.0+

# PostgreSQL e Redis
psql --version
redis-cli --version
```

### 1. Clone do Repositório:
```bash
git clone https://github.com/Jistriane/RiskGuardian-AI-1.0.git
cd RiskGuardian-AI-1.0
```

### 2. Configuração Automática:
```bash
# Configuração inicial automática
./setup-riskguardian.sh

# Inicialização completa
./start-riskguardian.sh dev
```

### 3. Configuração de Ambiente:

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

### 4. Instalação Manual (se necessário):
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (novo terminal)
cd frontend
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

---

## 🚀 Inicialização dos Serviços {#inicializacao}

### Scripts de Sistema Disponíveis:

| Script | Descrição | Uso |
|--------|-----------|-----|
| `setup-riskguardian.sh` | Configuração inicial | `./setup-riskguardian.sh` |
| `start-riskguardian.sh` | Inicialização completa | `./start-riskguardian.sh [mode]` |
| `stop-riskguardian.sh` | Parada segura | `./stop-riskguardian.sh` |
| `status-riskguardian.sh` | Monitor de status | `./status-riskguardian.sh` |

### Modos de Operação:

```bash
# Desenvolvimento completo (padrão)
./start-riskguardian.sh dev

# Modo produção
./start-riskguardian.sh prod

# Apenas blockchain local
./start-riskguardian.sh blockchain

# Apenas instalação
./start-riskguardian.sh test
```

### Verificação de Status:
```bash
# Verificar se todos estão rodando
./status-riskguardian.sh
```

### URLs de Acesso:
- **🎨 Frontend**: http://localhost:3001
- **🔧 Backend**: http://localhost:8001
- **🤖 ElizaOS Agent**: http://localhost:3000
- **🗄️ PostgreSQL**: localhost:5432
- **🔄 Redis**: localhost:6379
- **⛓️ Blockchain**: http://localhost:8545

---

## 🎨 Interface do Usuário {#interface}

### Dashboard Principal

**Seções do Dashboard:**

1. **Portfolio em Tempo Real**
   - Valor total em USD
   - Variação 24h
   - Score de risco (0-100)
   - Diversificação percentual
   - Lista de ativos com preços

2. **Métricas de Risco**
   - **Volatilidade**: Medida de instabilidade
   - **Correlação**: Relação entre ativos
   - **VaR 1 Dia**: Perda máxima esperada
   - **Sharpe Ratio**: Retorno ajustado ao risco

3. **Status da Automação**
   - Stop Loss ETH: Proteção automática
   - Rebalanceamento: Otimização contínua
   - Alerta Volatilidade: Monitoramento
   - Seguro DeFi: Proteção de perdas

4. **Insights AI (ElizaOS)**
   - Oportunidades de DCA
   - Detecção de alta correlação
   - Sugestões de rebalanceamento
   - Alertas de volatilidade
   - Oportunidades de yield farming

5. **Alertas Ativos**
   - Alto risco detectado (>70%)
   - Portfolio concentrado (<50%)
   - Portfolio vazio
   - Status: Nenhum alerta ativo

### Funcionalidades da Interface:

**🌐 Multilíngue:**
- Português do Brasil (padrão)
- English (opcional)
- Troca instantânea via toggle

**📱 Responsivo:**
- Desktop: Layout completo
- Tablet: Grid adaptativo
- Mobile: Stack vertical

**🔗 Web3:**
- Conexão com carteiras (MetaMask, WalletConnect, Coinbase)
- Detecção automática de rede
- Exibição de endereço
- Status de conexão

**⚡ Tempo Real:**
- WebSocket para atualizações
- Refresh automático de dados
- Indicadores visuais de carregamento
- Notificações push

---

## 🔌 APIs e Integrações {#apis}

### Backend API Endpoints:

**Autenticação:**
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

**Automação:**
```typescript
GET /api/automation/status
POST /api/automation/configure
GET /api/automation/history
POST /api/automation/execute
```

**Seguros:**
```typescript
GET /api/insurance/policies
POST /api/insurance/claim
GET /api/insurance/quotes
```

### Integrações Externas:

**Blockchain:**
- Ethereum (Mainnet/Sepolia)
- Polygon (Mainnet/Mumbai)
- Avalanche (Mainnet/Fuji)
- BSC (Mainnet/Testnet)

**Oráculos:**
- Chainlink Data Feeds
- Chainlink Automation
- Chainlink CCIP
- Chainlink VRF

**Market Data:**
- CoinGecko API
- CoinMarketCap API
- DeFiPulse API
- TheGraph Protocol

**IA Services:**
- OpenAI GPT-4
- Anthropic Claude
- Custom ElizaOS Models

### WebSocket Events:
```typescript
// Cliente
socket.on('portfolio_update', (data) => {
  // Atualização de portfólio
});

socket.on('risk_alert', (alert) => {
  // Alerta de risco
});

socket.on('automation_executed', (execution) => {
  // Automação executada
});

// Servidor
socket.emit('subscribe_portfolio', { address });
socket.emit('configure_alerts', { preferences });
```

---

## 💻 Desenvolvimento {#desenvolvimento}

### Estrutura do Código:

**Frontend (Next.js):**
```
src/
├── app/                    # App Router pages
├── components/             # Componentes React
│   ├── dashboard/         # Componentes do dashboard
│   ├── ui/               # Componentes de UI
│   └── wallet/           # Componentes Web3
├── hooks/                # Custom hooks
├── services/             # Serviços de API
├── stores/               # Estado global
├── types/                # Tipos TypeScript
└── locales/              # Traduções
```

**Backend (Node.js):**
```
src/
├── controllers/          # Controladores de rota
├── services/            # Lógica de negócio
├── middleware/          # Middlewares Express
├── routes/              # Definição de rotas
├── types/               # Tipos TypeScript
├── utils/               # Utilitários
└── contracts/           # ABIs dos contratos
```

### Scripts de Desenvolvimento:

**Frontend:**
```bash
cd frontend
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting
npm run type-check   # Verificação de tipos
```

**Backend:**
```bash
cd backend
npm run dev          # Servidor com hot reload
npm run build        # Compilar TypeScript
npm run start        # Servidor de produção
npm run test         # Executar testes
npm run migrate      # Executar migrações
```

### Padrões de Código:

**TypeScript:**
- Tipagem estrita habilitada
- Interfaces para todos os dados
- Generics para reutilização
- Utility types quando apropriado

**React:**
- Functional components
- Custom hooks para lógica
- Context API para estado global
- Memoização para performance

**Segurança:**
- Validação de entrada
- Sanitização de dados
- Rate limiting
- CORS configurado
- CSP headers

---

## 🔧 Troubleshooting {#troubleshooting}

### Problemas Comuns:

**1. Porta Ocupada (EADDRINUSE):**
```bash
# Verificar processo na porta
lsof -i :3001

# Matar processo específico
kill -9 <PID>

# Ou usar script de limpeza
./stop-riskguardian.sh
```

**2. Dependências Não Instaladas:**
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install

# Ou para problemas de peer dependencies
npm install --legacy-peer-deps
```

**3. Erro de Conexão com Banco:**
```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Iniciar se necessário
sudo systemctl start postgresql

# Verificar conexão
psql -U postgres -d riskguardian -c "SELECT 1;"
```

**4. Problemas de Build:**
```bash
# Limpar cache do Next.js
rm -rf .next

# Limpar cache do TypeScript
rm -f tsconfig.tsbuildinfo

# Rebuild completo
npm run build
```

**5. Erro de Web3/Carteira:**
```bash
# Verificar se MetaMask está instalado
# Verificar rede (Ethereum Mainnet/Testnet)
# Verificar saldo para gas fees
# Limpar cache do navegador
```

### Logs e Debugging:

**Ver Logs em Tempo Real:**
```bash
# Ver logs do sistema
tail -f riskguardian-startup.log

# Status completo do sistema
./status-riskguardian.sh

# Logs de serviços específicos
cd frontend && npm run dev 2>&1 | tee frontend.log
cd backend && npm run dev 2>&1 | tee backend.log
```

**Debug Mode:**
```bash
# Frontend com debug
DEBUG=* npm run dev

# Backend com debug
NODE_ENV=development DEBUG=* npm run dev
```

---

## 🚀 Roadmap e Futuro {#roadmap}

### Versão Atual (v1.0):
- ✅ Dashboard completo com métricas de risco
- ✅ Integração Web3 com múltiplas carteiras
- ✅ Sistema de alertas em tempo real
- ✅ IA ElizaOS para análise de portfólio
- ✅ Automação Chainlink básica
- ✅ Suporte multi-chain (Testnet)
- ✅ Sistema de seguros DeFi

### Próximas Versões:

**v1.1 - Melhorias de UX (Q1 2024):**
- [ ] Mobile app (React Native)
- [ ] Notificações push nativas
- [ ] Onboarding aprimorado
- [ ] Tutoriais interativos
- [ ] Suporte a mais idiomas

**v1.2 - Expansão de Chains (Q2 2024):**
- [ ] Suporte Mainnet completo
- [ ] Integração com Arbitrum
- [ ] Suporte a Optimism
- [ ] Base network
- [ ] Solana integration

**v1.3 - IA Avançada (Q3 2024):**
- [ ] Modelos de IA personalizados
- [ ] Análise de sentimento de mercado
- [ ] Previsões de preço ML
- [ ] Recomendações de yield farming
- [ ] Análise de liquidez

**v2.0 - Ecossistema Completo (Q4 2024):**
- [ ] Marketplace de estratégias
- [ ] DAO governance
- [ ] Token nativo ($RISK)
- [ ] Staking e rewards
- [ ] API pública
- [ ] SDK para desenvolvedores

### Tecnologias Futuras:
- **Layer 2**: Optimism, Arbitrum, zkSync
- **AI Avançada**: Modelos próprios, AutoML
- **Blockchain**: Solana, Cardano, Cosmos
- **DeFi 2.0**: Protocolos emergentes
- **Metaverse**: Integração com mundos virtuais

---

## 📞 Suporte e Contato

### Canais de Comunicação:
- **Email**: jistriane@live.com
- **LinkedIn**: www.linkedin.com/in/jibso
- **Discord**: jistriane
- **X (Twitter)**: @jistriane
- **Instagram**: jibso87

### Suporte Técnico:
Para problemas e dúvidas:

1. **Verificar logs**: `cat riskguardian-startup.log`
2. **Verificar status**: `./status-riskguardian.sh`
3. **Reiniciar sistema**: `./stop-riskguardian.sh && ./start-riskguardian.sh`
4. **Documentação completa**: `DOCUMENTACAO_COMPLETA_RISKGUARDIAN_AI.md`

### Contribuição:
- 🤝 Pull requests bem-vindos
- 🐛 Report de bugs
- 💡 Sugestões de features
- 📝 Melhorias na documentação

---

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

**🎉 RiskGuardian AI - O Futuro das Finanças Descentralizadas!**

*Sistema completo de gestão de riscos DeFi com IA integrada, automação blockchain e interface moderna. Proteja e otimize seus investimentos crypto com tecnologia de ponta.* 