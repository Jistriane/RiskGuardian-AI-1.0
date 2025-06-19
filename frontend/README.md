# 🚀 RiskGuardian AI Frontend

Frontend moderno e futurístico para o sistema RiskGuardian AI - Plataforma avançada de gestão de risco DeFi.

## ✨ Características

### 🎨 Design Futurístico
- **Tema Dark**: Interface escura com elementos cyber
- **Animações Fluidas**: Powered by Framer Motion
- **Glass Morphism**: Efeitos de vidro com blur
- **Gradientes Dinâmicos**: Cores que fluem dinamicamente
- **Grid Cyber**: Fundo animado com padrão de grade

### 🔧 Tecnologias

- **Next.js 15**: Framework React de última geração
- **React 19**: Componentes modernos
- **TypeScript**: Tipagem completa
- **Tailwind CSS**: Estilização utilitária
- **Framer Motion**: Animações suaves
- **TanStack Query**: Gerenciamento de estado
- **Zustand**: Store global
- **Socket.io**: WebSocket em tempo real

### 📱 Funcionalidades Implementadas

#### 🏠 Dashboard Principal
- **Header Dinâmico**: Logo animado + relógio + botão de carteira
- **Status dos Sistemas**: Monitoramento em tempo real dos serviços
- **Visão Geral do Portfólio**: Métricas principais com animações
- **Alertas Tempo Real**: Notificações categorizadas por tipo
- **Métricas de Risco**: VaR, Sharpe Ratio, Max Drawdown, Beta
- **Ações Rápidas**: Navegação para páginas principais
- **Links Diretos**: Acesso direto aos serviços (Backend, ElizaOS, Chromia)

#### 🧠 Integração com Serviços
- **Backend API** (localhost:3001): Gestão de portfólios e dados
- **ElizaOS Agent** (localhost:3000): IA para análise em tempo real
- **Chromia AWS** (localhost:3002): Sistema de alertas e monitoring
- **Blockchain RPC**: Conexão com Sepolia Testnet

#### 📊 Dados em Tempo Real
- Atualização automática de preços
- Monitoramento contínuo de status
- Alertas instantâneos
- Métricas de performance

## 🛠️ Instalação e Uso

### Pré-requisitos
```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### Instalação
```bash
# Clone o repositório
cd frontend

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Execute em produção
npm start
```

### Scripts Disponíveis
```bash
npm run dev        # Servidor de desenvolvimento (porta 3000)
npm run build      # Build otimizado
npm run start      # Servidor de produção
npm run lint       # Verificação de código
npm run type-check # Verificação de tipos
npm run clean      # Limpar build
```

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── globals.css         # Estilos globais futurísticos
│   │   ├── layout.tsx          # Layout raiz com providers
│   │   ├── page.tsx            # Dashboard principal
│   │   ├── analysis/           # Página de análise AI
│   │   ├── charts/             # Página de gráficos
│   │   ├── strategies/         # Página de estratégias
│   │   └── settings/           # Página de configurações
│   ├── components/             # Componentes reutilizáveis
│   │   ├── providers.tsx       # Context providers
│   │   ├── ui/                 # Componentes de UI base
│   │   ├── dashboard/          # Componentes do dashboard
│   │   ├── charts/             # Componentes de gráficos
│   │   ├── wallet/             # Componentes de carteira
│   │   └── layout/             # Componentes de layout
│   ├── lib/                    # Utilitários
│   │   ├── utils.ts            # Funções utilitárias
│   │   └── format.ts           # Formatação de dados
│   ├── hooks/                  # React Hooks customizados
│   ├── services/               # Serviços de API
│   ├── store/                  # Estado global (Zustand)
│   ├── types/                  # Definições TypeScript
│   │   └── index.ts            # Types completos do sistema
│   └── config/                 # Configurações
│       └── constants.ts        # Constantes do sistema
├── public/                     # Assets estáticos
├── package.json               # Dependências
├── next.config.ts             # Configuração Next.js
├── tailwind.config.ts         # Configuração Tailwind
├── tsconfig.json              # Configuração TypeScript
└── postcss.config.mjs         # Configuração PostCSS
```

## 🎨 Sistema de Design

### Cores Cyber
```css
--cyber-blue: 0 212 255      /* Azul neon principal */
--cyber-purple: 139 92 246   /* Roxo futurístico */
--cyber-green: 0 255 136     /* Verde matrix */
--cyber-pink: 255 0 128      /* Rosa cyber */
--cyber-yellow: 255 255 0    /* Amarelo neon */
--cyber-orange: 255 128 0    /* Laranja vibrante */
```

### Efeitos Especiais
- **cyber-text**: Texto com gradiente animado
- **cyber-border**: Bordas com glow neon
- **cyber-glow**: Efeito de brilho pulsante
- **glass**: Efeito de vidro com blur
- **float-animation**: Animação flutuante
- **data-stream**: Fluxo de dados animado

### Fontes
- **Inter**: Fonte principal (corpo do texto)
- **Orbitron**: Fonte futurística (títulos)
- **JetBrains Mono**: Fonte mono (códigos)

## 🔌 Integrações

### Backend API (Porta 3001)
```typescript
// Endpoints principais
/api/health              # Status da API
/api/auth/*             # Autenticação Web3
/api/portfolio/*        # Gestão de portfólios
/api/registry/*         # Protocolos DeFi
/api/insurance/*        # Seguros e apólices
/api/monitoring/*       # Monitoramento
```

### ElizaOS Agent (Porta 3000)
```typescript
// Análise AI em tempo real
/api/health                    # Status do agente
/api/analyze-portfolio        # Análise de portfólio
WebSocket: ws://localhost:3000 # Dados em tempo real
```

### Chromia AWS (Porta 3002)
```typescript
// Sistema de alertas
/api/alerts                   # Alertas do sistema
WebSocket: ws://localhost:3002/ws # Alertas em tempo real
```

## 📈 Componentes Principais

### Header
- Logo animado com efeito cyber
- Relógio em tempo real
- Botão de conexão de carteira
- Status de conexão visual

### SystemStatus
- Monitoramento de 4 serviços
- Indicadores visuais de status
- Latência em tempo real
- Animações de entrada

### PortfolioOverview
- Valor total do portfólio
- Mudança diária (%)
- Score de risco visual
- Posições ativas

### RealTimeAlerts
- Alertas categorizados
- Timestamps relativos
- Animações por tipo
- Indicador de atividade

### QuickActions
- Navegação rápida
- Animações hover
- Grid responsivo

## 🌐 Responsividade

### Breakpoints
- **sm**: 640px (Mobile)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large Desktop)
- **2xl**: 1536px (Ultra Wide)

### Grid Adaptativo
```css
/* Mobile: 1 coluna */
grid-cols-1

/* Desktop: 3 colunas */
lg:grid-cols-3
```

## ⚡ Performance

### Otimizações
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Next.js Image
- **Bundle Analysis**: Análise de tamanho
- **SSR**: Server-Side Rendering
- **Static Generation**: Páginas estáticas

### Métricas de Build
```
Route (app)                Size    First Load JS    
┌ ○ /                     51.9 kB     153 kB
└ ○ /_not-found           977 B       102 kB
+ First Load JS shared    101 kB
```

## 🔧 Configurações

### Variáveis de Ambiente
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api
NEXT_PUBLIC_ELIZAOS_URL=http://localhost:3000/api
NEXT_PUBLIC_ELIZAOS_WS=ws://localhost:3000
NEXT_PUBLIC_CHROMIA_URL=http://localhost:3002
NEXT_PUBLIC_CHROMIA_WS=ws://localhost:3002/ws
```

### Contratos (Sepolia Testnet)
```typescript
riskGuardianMaster: '0x30175D5BB0c97F4af00707950707D4b0Da4E7DdF'
stopLossHedge: '0x0D175144FaF2a7045820b1242353aaC7240cD748'
rebalanceHedge: '0xcdddD0599117455BF24884082725aE2EaE58e401'
volatilityHedge: '0xdC3a51B096403aD9Fd080afdAA907643029423A6'
```

## 🚀 Próximos Passos

### Funcionalidades Pendentes
- [ ] Conexão real com carteira Web3
- [ ] Gráficos TradingView integrados
- [ ] Análise AI com dados reais
- [ ] Sistema de notificações
- [ ] Gestão de estratégias de hedge
- [ ] Dashboard de performance
- [ ] Simulador de cenários
- [ ] Mobile app (React Native)

### Melhorias Técnicas
- [ ] Testes unitários (Jest)
- [ ] Testes E2E (Playwright)
- [ ] Storybook para componentes
- [ ] CI/CD pipeline
- [ ] Error boundary
- [ ] Offline support
- [ ] PWA capabilities

## 📝 Status Atual

✅ **Concluído:**
- Frontend base completamente implementado
- Design futurístico e responsivo
- Estrutura de componentes
- Sistema de tipos TypeScript
- Animações e efeitos visuais
- Build otimizado funcionando

🚧 **Em Desenvolvimento:**
- Integração real com APIs
- Componentes de gráficos avançados
- Sistema de autenticação Web3
- WebSocket em tempo real

## 📞 Suporte

Para questões técnicas ou sugestões:
- Abra uma issue no GitHub
- Consulte a documentação dos serviços
- Verifique os logs do console

---

**RiskGuardian AI Frontend v2.0.0** - Desenvolvido com ❤️ e tecnologia de ponta. 