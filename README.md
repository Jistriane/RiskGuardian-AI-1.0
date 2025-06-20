# 🚀 RiskGuardian AI - Frontend

🛡️ **Plataforma completa de gestão de riscos para DeFi com IA integrada**

## 🚀 **Início Rápido (Modo Local - Recomendado)**

```bash
# Clone o repositório
git clone https://github.com/your-repo/riskguardian-ai.git
cd riskguardian-ai

# Inicie todo o sistema com UM comando
./riskguardian-start.sh start-local
```

**✅ Pronto!** Todos os serviços estarão rodando:
- 🚀 **Frontend**: http://localhost:3000
- 🔧 **Backend**: http://localhost:8001  
- 🤖 **ElizaOS Agent**: http://localhost:3001
- ⚡ **Chromia AWS**: http://localhost:3002

## 📋 **Comandos Disponíveis**

```bash
# Inicialização
./riskguardian-start.sh start-local         # Inicia tudo (recomendado)
# Docker removido - use apenas modo local

# Monitoramento
./riskguardian-start.sh status-local        # Status dos serviços
./riskguardian-start.sh logs-local          # Ver logs

# Manutenção
./riskguardian-start.sh stop-local          # Para tudo
./riskguardian-start.sh restart-local       # Reinicia tudo

# Ajuda
./riskguardian-start.sh help               # Todos os comandos
```

## 🛠️ **Tecnologias Principais**

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **IA Agent**: ElizaOS + WebSocket
- **Alertas**: Chromia AWS
- **Blockchain**: Ethereum + Chainlink
- **Database**: SQLite (local) / PostgreSQL (produção)

## 📦 **Modo de Desenvolvimento**

O sistema roda **nativamente** no modo local:

✅ **Vantagens do Modo Local:**
- ⚡ Mais rápido para desenvolver
- 🔧 Fácil debug e desenvolvimento
- 📦 Menos recursos do sistema
- 🚀 Inicialização instantânea
- 🎯 Foco em desenvolvimento ágil

## 🏗️ **Arquitetura**

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Frontend      │  │   Backend API   │  │  ElizaOS Agent  │
│   Port: 3000    │◄─┤   Port: 8001    │◄─┤   Port: 3001    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │  Chromia AWS    │
                     │   Port: 3002    │
                     └─────────────────┘
```

## 🔧 **Desenvolvimento**

```bash
# Instalar dependências
./riskguardian-start.sh install

# Executar testes
./riskguardian-start.sh test

# Build do projeto
./riskguardian-start.sh build
```

## 📄 **Licença**

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

⭐ **Star este projeto se te ajudou!**

## ✨ Visão Geral

Dashboard moderno e responsivo construído com Next.js 14, integração Web3 nativa e análise de risco em tempo real. Interface intuitiva para monitoramento de portfólios DeFi, alertas inteligentes e automação Chainlink.

## 🎯 Funcionalidades Principais

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

## 🛠️ Stack Tecnológica

### Core Framework
- **Next.js 14**: App Router, SSR/SSG otimizado
- **TypeScript**: Tipagem forte para DeFi
- **React 18**: Suspense & Concurrent Features

### Blockchain & Web3
- **Wagmi v2 + Viem**: Conexão wallet moderna
- **RainbowKit**: UI para conexão de carteiras
- **Multi-chain Support**: 5 redes principais

### Styling & UI
- **Tailwind CSS**: Utility-first, ideal para dashboards
- **Shadcn/ui**: Componentes modernos e customizáveis
- **Framer Motion**: Animações fluidas
- **Lucide React**: Ícones consistentes

### Visualização de Dados
- **TradingView Charting**: Gráficos profissionais
- **Recharts**: Gráficos React nativos
- **Real-time Updates**: Dados atualizados em tempo real

### Estado & Performance
- **Zustand**: Gerenciamento de estado leve
- **TanStack Query**: Cache e sincronização de dados
- **Socket.io Client**: Dados em tempo real
- **React.memo**: Otimizações de performance

## 🚀 Quick Start

### Pré-requisitos
```bash
Node.js 18+
npm 9+
Git
```

### Instalação
```bash
# Clonar repositório
git clone <repo-url>
cd riskguardian-ai

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp env.example .env.local
nano .env.local

# Executar em desenvolvimento
npm run dev
```

### Configuração Obrigatória

**1. WalletConnect Project ID**
```bash
# Acesse: https://cloud.walletconnect.com
# Crie um projeto e copie o ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

**2. Backend Services**
```bash
# Certifique-se que estão rodando:
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8001
NEXT_PUBLIC_ELIZAOS_API_URL=http://localhost:3003
NEXT_PUBLIC_CHROMIA_API_URL=http://localhost:3002
```

## 📱 Screenshots

### Dashboard Principal
![Dashboard](docs/screenshots/dashboard.png)

### Conexão Web3
![Wallet](docs/screenshots/wallet-connection.png)

### Análise de Risco
![Risk Analysis](docs/screenshots/risk-analysis.png)

### AI Insights
![AI Insights](docs/screenshots/ai-insights.png)

## 🌐 URLs de Desenvolvimento

| Serviço | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:3000 | 🟢 Ativo |
| **Backend API** | http://localhost:8001 | 🟢 Ativo |
| **ElizaOS Agent** | http://localhost:3003 | 🟢 Ativo |
| **Chromia Alerts** | http://localhost:3002 | 🟢 Ativo |

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                 # Servidor de desenvolvimento
npm run build               # Build de produção
npm run start               # Servidor de produção

# Qualidade de Código
npm run lint                # ESLint
npm run type-check          # TypeScript
npm run test                # Testes unitários
npm run test:e2e            # Testes end-to-end

# Utilidades
npm run clean               # Limpar build
npm run preview             # Preview de produção
```

## 📦 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/
│   ├── ui/                # Componentes base (Shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── dashboard/         # Componentes do dashboard
│   │   ├── portfolio-overview.tsx
│   │   ├── risk-metrics.tsx
│   │   └── ...
│   ├── wallet/            # Componentes Web3
│   │   └── wallet-button.tsx
│   └── layout/            # Layouts
│       └── dashboard-layout.tsx
├── hooks/                 # Custom hooks
├── lib/                   # Utilitários
│   └── utils.ts
├── services/              # APIs e WebSocket
├── stores/                # Estado global (Zustand)
├── types/                 # Tipos TypeScript
└── config/                # Configurações
    └── wagmi.ts
```

## 🔗 Integrações Backend

### Backend Principal (Port 8001)
```typescript
// Autenticação Web3
POST /api/auth/nonce
POST /api/auth/login
POST /api/auth/logout

// Portfolio Management
GET  /api/portfolio
POST /api/portfolio/analyze

// Insurance
GET  /api/insurance
POST /api/insurance/create

// Monitoring
GET  /api/monitoring/contracts
GET  /api/monitoring/protocols
```

### ElizaOS Agent (Port 3003)
```typescript
// AI Analysis
WebSocket: ws://localhost:3003
Events: 'analysis', 'recommendation', 'insight'

// REST API
POST /api/analyze
GET  /api/insights
```

### Chromia AWS (Port 3002)
```typescript
// Real-time Alerts
Socket.IO: ws://localhost:3002
Events: 'alert', 'anomaly', 'notification'

// REST API
GET  /api/alerts
POST /api/alerts/subscribe
```

## 🔒 Redes Blockchain

### Testnets (Desenvolvimento)
- **Ethereum Sepolia**: Testes principais
- **Polygon Mumbai**: Baixo custo
- **Arbitrum Sepolia**: Layer 2
- **Base Sepolia**: Coinbase L2
- **Optimism Sepolia**: Optimistic rollup

### Mainnets (Produção)
- **Ethereum**: Rede principal
- **Polygon**: Baixo custo, alta velocidade
- **Arbitrum**: Escalabilidade L2
- **Base**: Coinbase Layer 2
- **Optimism**: Rollups otimistas

## 🎨 Design System

### Cores Principais
```css
/* Light Mode */
--primary: 221.2 83.2% 53.3%       /* Blue */
--secondary: 210 40% 96%            /* Gray */
--success: 142 76% 36%              /* Green */
--warning: 38 92% 50%               /* Yellow */
--destructive: 0 84.2% 60.2%        /* Red */

/* Dark Mode */
--primary: 217.2 91.2% 59.8%        /* Light Blue */
--background: 222.2 84% 4.9%        /* Dark */
```

### Tipografia
- **Font Sans**: Inter (Google Fonts)
- **Font Mono**: JetBrains Mono
- **Responsive**: Escalas automáticas

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 📊 Performance

### Métricas Target
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Otimizações
- **Image Optimization**: Next.js Image
- **Font Optimization**: Google Fonts
- **Code Splitting**: Automático
- **Bundle Analysis**: Webpack Bundle Analyzer

## 🔐 Segurança

### Frontend Security
- **CSP Headers**: Content Security Policy
- **XSS Protection**: Sanitização automática
- **Input Validation**: Zod schemas
- **Rate Limiting**: API protection

### Web3 Security
- **Signature Verification**: Message signing
- **Nonce Protection**: Replay attack prevention
- **Chain Validation**: Network verification
- **Address Validation**: Checksum verification

## 🧪 Testes

### Unit Tests (Vitest)
```bash
npm run test
npm run test:watch
npm run test:coverage
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
npm run test:e2e:ui
```

### Coverage Target
- **Unit Tests**: > 80%
- **Integration**: > 70%
- **E2E Critical Paths**: 100%

## 🚀 Deploy

### Build de Produção
```bash
npm run build
npm run start
```

### Build Local
```bash
npm run build
npm start
```

### Vercel (Recomendado)
```bash
vercel --prod
```

## 🐛 Troubleshooting

### Problemas Comuns

**Dependências não instaladas:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Erros de TypeScript:**
```bash
npm run type-check
```

**Build falha:**
```bash
npm run clean
npm run build
```

**WebSocket não conecta:**
- Verifique se backends estão rodando
- Confirme as portas nos .env
- Teste conectividade: `curl localhost:8001/health`

## 📈 Roadmap

### Q1 2024
- ✅ Estrutura base Next.js 14
- ✅ Integração Web3 completa
- ✅ Dashboard responsivo
- 🔄 Componentes do dashboard

### Q2 2024
- 📊 Gráficos TradingView
- 🤖 Análise AI completa
- 🔔 Sistema de alertas
- 📱 Otimização mobile

### Q3 2024
- 🧪 Testes completos
- 🚀 Deploy produção
- 📈 Analytics avançado
- 🔒 Audit de segurança

## 🤝 Contribuição

### Desenvolvimento
1. Fork o repositório
2. Crie branch feature: `git checkout -b feature/amazing-feature`
3. Commit mudanças: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Abra Pull Request

### Código de Conduta
- Siga ESLint rules
- Mantenha cobertura de testes
- Documente componentes novos
- Use Conventional Commits

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 💡 Suporte

### Documentação
- [Next.js 14](https://nextjs.org/docs)
- [Wagmi v2](https://wagmi.sh)
- [RainbowKit](https://rainbowkit.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)

### Comunidade
- Discord: [RiskGuardian Community](https://discord.gg/riskguardian)
- Twitter: [@RiskGuardianAI](https://twitter.com/riskguardianai)
- GitHub Issues: [Issues](https://github.com/riskguardian/issues)

---

**Construído com ❤️ pela equipe RiskGuardian AI**