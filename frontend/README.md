# RiskGuardian AI - Frontend

Dashboard moderno para gerenciamento de risco DeFi com IA, automação e análise em tempo real.

## 🚀 Tecnologias

### Core Framework
- **Next.js 14+** com App Router (SSR/SSG otimizado)
- **TypeScript** (tipagem forte para DeFi)
- **React 18+** com Suspense e Concurrent Features

### Blockchain & Web3
- **Wagmi v2 + Viem** (conexão wallet moderna)
- **RainbowKit** (UI para conexão de carteiras)
- **ethers.js v6** para interações blockchain

### Styling & UI
- **Tailwind CSS** (utility-first, ideal para dashboards)
- **Shadcn/ui** (componentes modernos e customizáveis)
- **Framer Motion** (animações fluidas)
- **Lucide React** (ícones consistentes)

### Visualização de Dados
- **TradingView Charting Library** (gráficos profissionais)
- **Recharts** (gráficos React nativos)
- **D3.js** (visualizações customizadas)

### Real-time & Estado
- **Socket.io Client** (dados em tempo real)
- **Zustand** (gerenciamento de estado leve)
- **TanStack Query** (cache e sincronização de dados)
- **WebSocket** nativo para streams de preços

### Performance & Build
- **Turbopack** (build ultrarrápido)
- **TanStack Query** (cache inteligente)
- **React.memo** e **useMemo** para otimizações

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Setup Rápido

```bash
# 1. Navegar para a pasta frontend
cd frontend

# 2. Executar script de instalação
chmod +x install-frontend.sh
./install-frontend.sh

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

### Setup Manual

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local

# 3. Iniciar servidor
npm run dev
```

## 🔧 Variáveis de Ambiente

```env
# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3001

# Wallet Connect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id

# Chain Configuration (Testnet)
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CHAIN_NAME=Sepolia

# Environment
NODE_ENV=development
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── dashboard/         # Dashboard principal
│   ├── portfolio/         # Análise de portfólio
│   ├── risk-analysis/     # Métricas de risco
│   ├── automation/        # Configuração de hedge
│   ├── settings/          # Configurações
│   ├── layout.tsx         # Layout raiz
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── dashboard/         # Componentes do dashboard
│   ├── layout/           # Layouts e navegação
│   ├── ui/               # Componentes base (Shadcn/UI)
│   └── wallet/           # Componentes Web3
├── lib/                  # Utilitários e configurações
├── hooks/                # Custom hooks
├── stores/               # Estado global (Zustand)
├── types/                # Definições TypeScript
├── services/             # APIs e integrações
└── providers/            # Context providers
```

## 🎨 Design System

### Cores & Temas
- **Light/Dark mode** automático
- **Paleta DeFi** com cores específicas para risco
- **Gradients** para elementos Web3
- **Animações** fluidas com Framer Motion

### Componentes
- **Dashboard Layout** responsivo
- **Cards de métricas** em tempo real
- **Gráficos interativos** TradingView
- **Wallet connection** integrada
- **Notificações** em tempo real

## 📱 Funcionalidades

### Dashboard Principal
- ✅ **Portfolio Overview** - Visão geral dos ativos
- ✅ **Risk Metrics** - Métricas de risco em tempo real
- ✅ **Market Data** - Dados de mercado atualizados
- ✅ **AI Insights** - Análises geradas por IA
- ✅ **Automation Status** - Status das automações

### Análise de Portfolio
- 📊 **Composição detalhada** por token/protocol
- 📈 **Performance histórica** com gráficos
- 🎯 **Diversificação** e concentração
- 💰 **P&L** detalhado por posição

### Gestão de Risco
- 🛡️ **Risk Score** calculado em tempo real
- ⚠️ **Alertas** personalizáveis
- 📉 **Simulação** de cenários
- 🔄 **Rebalanceamento** automático

### Automação
- 🤖 **Hedge automático** via Chainlink
- ⚡ **Stop-loss** inteligente
- 🌊 **Volatility hedging**
- 🌉 **Cross-chain** operations

## 🔌 Integrações

### APIs Backend
- **Portfolio Service** - Dados de portfólio
- **Risk Oracle** - Métricas de risco
- **Market Data** - Preços em tempo real
- **AI Service** - Insights e análises
- **Automation** - Controle de hedge

### Blockchain
- **Sepolia Testnet** - Desenvolvimento
- **Arbitrum Sepolia** - Testes L2
- **Automação de Hedge (Chainlink + Avalanche)** - Execução automática
- **Multiple DEXs** - Dados de mercado

### Dados em Tempo Real
- **WebSocket** - Conexão persistente
- **Portfolio updates** - Mudanças instantâneas
- **Price feeds** - Preços atualizados
- **Risk alerts** - Notificações críticas

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes com UI
npm run test:ui

# Verificação de tipos
npm run type-check

# Lint
npm run lint
```

## 🚀 Deploy

### Build de Produção
```bash
npm run build
npm run start
```

### Análise de Bundle
```bash
npm run analyze
```

## 📚 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código
- `npm run test` - Execução de testes
- `npm run type-check` - Verificação TypeScript

## 🎯 Performance

### Otimizações
- **Server-side rendering** para SEO
- **Static generation** quando possível
- **Code splitting** automático
- **Image optimization** com Next.js
- **Bundle analysis** integrado

### Métricas Alvo
- **FCP** < 1.5s (First Contentful Paint)
- **LCP** < 2.5s (Largest Contentful Paint)
- **FID** < 100ms (First Input Delay)
- **CLS** < 0.1 (Cumulative Layout Shift)

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](../LICENSE) para detalhes.

## 🔗 Links Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [Shadcn/UI Components](https://ui.shadcn.com/)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Docs](https://www.rainbowkit.com/)
- [TradingView Charting](https://www.tradingview.com/charting-library/)

---

**RiskGuardian AI** - Protegendo seu DeFi com inteligência artificial 🛡️ 