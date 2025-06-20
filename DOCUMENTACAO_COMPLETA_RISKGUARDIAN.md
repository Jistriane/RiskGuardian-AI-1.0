# 🛡️ RiskGuardian AI - Documentação Completa do Projeto

## 📋 Índice
1. [Visão Geral do Projeto](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura)
3. [Funcionalidades Principais](#funcionalidades)
4. [Instalação e Configuração](#instalação)
5. [Inicialização dos Serviços](#inicialização)
6. [Interface do Usuário](#interface)
7. [APIs e Integrações](#apis)
8. [Desenvolvimento](#desenvolvimento)
9. [Troubleshooting](#troubleshooting)
10. [Roadmap e Futuro](#roadmap)

---

## 🎯 Visão Geral do Projeto {#visão-geral}

### O que é o RiskGuardian AI?

O **RiskGuardian AI** é uma plataforma DeFi (Finanças Descentralizadas) avançada que combina inteligência artificial, automação blockchain e análise de riscos em tempo real para proteger e otimizar portfolios de criptomoedas.

### Principais Características:
- 🤖 **IA Integrada** - Sistema ElizaOS para análise preditiva
- 🔗 **Blockchain Nativo** - Contratos inteligentes Ethereum/Polygon
- 📊 **Dashboard em Tempo Real** - Interface Next.js responsiva
- 🚨 **Sistema de Alertas** - Monitoramento contínuo de riscos
- 🌐 **Multilíngue** - Suporte completo PT-BR/EN
- 🔐 **Web3 Integrado** - Conexão direta com carteiras

---

## 🏗️ Arquitetura do Sistema {#arquitetura}

### Estrutura de Diretórios:
```
riskguardian-ai/
├── frontend/           # Interface Next.js (Porta 3001)
├── backend/            # API Node.js/TypeScript (Porta 8001)
├── elizaos-agent/      # Sistema de IA (Porta 3000)
├── chromia_aws/        # Sistema de Alertas (Porta 3002)
├── contracts/          # Contratos Inteligentes Solidity
├── scripts/            # Scripts de Deploy e Automação
├── docs/               # Documentação Adicional
└── logs/               # Logs do Sistema
```

### Fluxo de Dados:
```
🌐 Frontend (Next.js) ←→ 🔌 Backend API (Node.js)
       ↓                        ↓
🤖 ElizaOS Agent ←→ 🚨 Chromia AWS (Alertas)
       ↓                        ↓
🔗 Blockchain (Ethereum/Polygon/Chainlink)
```

### Tecnologias Utilizadas:

**Frontend:**
- Next.js 14 com App Router
- TypeScript
- Tailwind CSS
- Wagmi/Viem (Web3)
- React Hooks
- i18n (Internacionalização)

**Backend:**
- Node.js com TypeScript
- Express.js
- Prisma ORM
- WebSocket (Socket.io)
- JWT Authentication
- Rate Limiting

**Blockchain:**
- Solidity (Contratos)
- Hardhat (Framework)
- Chainlink (Oracles/Automação)
- Gelato (Automação)
- OpenZeppelin (Segurança)

**IA e Dados:**
- ElizaOS (Sistema de IA)
- APIs de Mercado (CoinGecko, CoinMarketCap)
- Análise Preditiva
- Machine Learning

---

## ⚡ Funcionalidades Principais {#funcionalidades}

### 1. Dashboard Inteligente
- **Portfolio em Tempo Real**: Visualização completa de ativos
- **Métricas de Risco**: Volatilidade, VaR, Sharpe Ratio, Correlação
- **Alertas Ativos**: Monitoramento contínuo de riscos
- **Performance 24h**: Análise de ganhos/perdas
- **Insights AI**: Recomendações da ElizaOS

### 2. Sistema de Automação
- **Stop Loss Inteligente**: Proteção automática contra perdas
- **Rebalanceamento**: Otimização automática de portfolio
- **Hedge Strategies**: Estratégias de proteção
- **DCA (Dollar Cost Average)**: Investimento programado

### 3. Análise de Riscos
- **Cálculo de VaR**: Value at Risk em tempo real
- **Análise de Correlação**: Entre diferentes ativos
- **Detecção de Anomalias**: IA identifica padrões suspeitos
- **Stress Testing**: Simulação de cenários extremos

### 4. Sistema de Seguros DeFi
- **Proteção de Portfolio**: Seguro contra perdas
- **Cobertura Personalizada**: Baseada no perfil de risco
- **Claims Automáticos**: Processamento via smart contracts
- **Pool de Liquidez**: Sistema de seguros descentralizado

### 5. Integrações Web3
- **Carteiras Suportadas**: MetaMask, WalletConnect, Coinbase
- **Multi-Chain**: Ethereum, Polygon, BSC, Arbitrum
- **DeFi Protocols**: Uniswap, Aave, Compound
- **NFTs**: Análise de coleções e raridade

---

## 🔧 Instalação e Configuração {#instalação}

### Pré-requisitos:
```bash
# Node.js 18+ e npm
node --version  # v18.0.0+
npm --version   # 8.0.0+

# Git
git --version

# Docker (opcional)
docker --version
```

### 1. Clone do Repositório:
```bash
git clone https://github.com/seu-usuario/riskguardian-ai.git
cd riskguardian-ai
```

### 2. Configuração de Ambiente:

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

### 3. Instalação de Dependências:
```bash
# Instalar todas as dependências automaticamente
./install-all-dependencies.sh

# Ou manualmente:
cd backend && npm install
cd ../frontend && npm install
cd ../elizaos-agent && npm install
cd ../chromia_aws && npm install --legacy-peer-deps
```

---

## 🚀 Inicialização dos Serviços {#inicialização}

### Inicialização Automática (Recomendado):

```bash
# Iniciar todos os serviços
./start-all-services.sh
```

**O que acontece:**
1. ✅ Limpeza de processos antigos
2. ✅ Verificação de dependências
3. ✅ Instalação de módulos faltantes
4. ✅ Inicialização em ordem de dependência:
   - Backend API (8001) - Primeiro
   - ElizaOS Agent (3000) - Segundo
   - Chromia AWS (3002) - Terceiro
   - Frontend (3001) - Último
5. ✅ Verificação de conectividade
6. ✅ Status final com URLs

### Verificação de Status:
```bash
# Verificar se todos estão rodando
./check-services-status.sh
```

### Parar Todos os Serviços:
```bash
# Parada segura
./stop-all-services.sh
```

### URLs de Acesso:
- **🌐 Frontend:** http://localhost:3001
- **🔌 Backend API:** http://localhost:8001
- **🤖 ElizaOS:** http://localhost:3000
- **🚨 Alertas:** http://localhost:3002

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
- Conexão com carteiras
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
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
GET  /api/auth/profile
```

**Portfolio:**
```
GET  /api/portfolio          # Obter portfolio
POST /api/portfolio/sync     # Sincronizar com carteira
GET  /api/portfolio/metrics  # Métricas de risco
GET  /api/portfolio/history  # Histórico de performance
```

**Monitoramento:**
```
GET  /api/monitoring/alerts  # Alertas ativos
POST /api/monitoring/rules   # Criar regra de alerta
GET  /api/monitoring/status  # Status dos serviços
```

**Seguros:**
```
GET  /api/insurance/policies # Apólices ativas
POST /api/insurance/claim    # Fazer claim
GET  /api/insurance/quotes   # Cotações
```

**Market Data:**
```
GET  /api/market/prices      # Preços em tempo real
GET  /api/market/trending    # Tendências
GET  /api/market/news        # Notícias do mercado
```

### Integrações Externas:

**APIs de Mercado:**
- CoinGecko: Preços e dados históricos
- CoinMarketCap: Market cap e rankings
- DeFiPulse: Dados de protocolos DeFi
- The Graph: Dados on-chain

**Blockchain:**
- Alchemy: RPC nodes Ethereum/Polygon
- Infura: Backup RPC provider
- Chainlink: Price feeds e automação
- Gelato: Automação de tarefas

**IA e ML:**
- OpenAI: GPT para análises
- Anthropic: Claude para insights
- ElizaOS: Sistema próprio de IA
- TensorFlow: Modelos preditivos

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
./stop-all-services.sh
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
# Todos os logs
tail -f logs/*.log

# Log específico
tail -f logs/frontend.log
tail -f logs/backend.log
tail -f logs/elizaos.log
tail -f logs/chromia.log
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
- ✅ Dashboard completo funcional
- ✅ Sistema de IA integrado
- ✅ Análise de riscos em tempo real
- ✅ Automação básica
- ✅ Interface multilíngue
- ✅ Integração Web3

### Próximas Versões:

**v1.1 - Melhorias de UX:**
- 📱 App mobile (React Native)
- 🔔 Notificações push
- 📊 Gráficos avançados (TradingView)
- 🎨 Temas personalizáveis
- 📈 Relatórios PDF

**v1.2 - Funcionalidades Avançadas:**
- 🤖 Trading automático
- 🔄 Cross-chain swaps
- 💎 Análise de NFTs
- 🏦 Yield farming otimizado
- 📊 Social trading

**v1.3 - Escala Enterprise:**
- 👥 Multi-usuário
- 🏢 Dashboard institucional
- 📊 Analytics avançados
- 🔐 Compliance tools
- 🌐 API pública

### Tecnologias Futuras:
- **Layer 2**: Optimism, Arbitrum, zkSync
- **AI Avançada**: Modelos próprios, AutoML
- **Blockchain**: Solana, Cardano, Cosmos
- **DeFi 2.0**: Protocolos emergentes
- **Metaverse**: Integração com mundos virtuais

---

## 📞 Suporte e Comunidade

### Documentação:
- 📚 Wiki completa no GitHub
- 🎥 Tutoriais em vídeo
- 📖 Guias passo a passo
- 🔧 Referência da API

### Canais de Suporte:
- 💬 Discord: Comunidade ativa
- 📧 Email: suporte@riskguardian.ai
- 🐛 GitHub Issues: Bugs e features
- 📱 Telegram: Atualizações rápidas

### Contribuição:
- 🤝 Pull requests bem-vindos
- 🐛 Report de bugs
- 💡 Sugestões de features
- 📝 Melhorias na documentação

---

**🎉 RiskGuardian AI - O Futuro das Finanças Descentralizadas!**

*Sistema completo de gestão de riscos DeFi com IA integrada, automação blockchain e interface moderna. Proteja e otimize seus investimentos crypto com tecnologia de ponta.* 