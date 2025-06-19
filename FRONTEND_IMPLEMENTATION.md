# 🚀 RiskGuardian AI - Frontend Implementation

## 📋 Visão Geral

Esta documentação detalha a implementação completa do frontend da plataforma RiskGuardian AI, uma aplicação DeFi de análise de risco em tempo real com integração de IA.

## 🏗️ Arquitetura

### Stack Tecnológico
- **Framework**: Next.js 14 (App Router)
- **UI Framework**: React 18 com TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Estado Global**: Zustand
- **Web3**: wagmi + viem
- **Animações**: Framer Motion
- **WebSockets**: Native WebSocket API
- **Notificações**: Sonner

### Estrutura de Pastas
```
src/
├── app/                    # App Router pages
├── components/            # Componentes React
│   ├── dashboard/        # Componentes do dashboard
│   ├── layout/          # Layouts da aplicação
│   ├── ui/             # Componentes UI base
│   └── wallet/         # Componentes Web3
├── hooks/              # Custom hooks
├── stores/             # Gerenciamento de estado
├── services/           # Serviços da API
├── types/              # Definições TypeScript
├── lib/                # Utilitários
├── providers/          # Context providers
└── config/             # Configurações
```

## 🔧 Componentes Principais

### 1. Sistema de Autenticação Web3

**Hook: `useAuth`**
- Integração com carteiras Web3
- Autenticação por assinatura de mensagem
- Gerenciamento de sessão
- Estado de autenticação global

**Componentes:**
- `WalletButton` - Botão de conexão da carteira
- `AuthStore` - Estado global de autenticação

### 2. Gerenciamento de Portfólios

**Hook: `usePortfolio`**
- CRUD de portfólios
- Carregamento automático quando autenticado
- Cache inteligente
- Dados em tempo real via WebSocket

**Componente: `PortfolioOverview`**
- Grid de portfólios
- Cards interativos com dados reais
- Modal de criação
- Estatísticas agregadas

### 3. Análise de Risco

**Componente: `RiskMetrics`**
- Score de risco visual
- Fatores de risco detalhados
- Recomendações automáticas
- Dados em tempo real

**Features:**
- Indicadores visuais de risco
- Thresholds configuráveis
- Histórico de risco (placeholder)

### 4. IA Insights

**Componente: `AIInsights`**
- Chat interativo com IA
- Análise automática de portfólios
- Insights contextuais
- Status de conexão ElizaOS

**Integrações:**
- WebSocket para chat em tempo real
- API REST como fallback
- Histórico de conversas

## 🌐 Gerenciamento de Estado

### Stores (Zustand)

**1. AuthStore**
```typescript
interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  error: string | null
  login: (address: string, signature: string, message: string) => Promise<boolean>
  logout: () => Promise<void>
  getNonce: (address: string) => Promise<string>
  loadProfile: () => Promise<void>
  clearError: () => void
}
```

**2. PortfolioStore**
```typescript
interface PortfolioState {
  portfolios: Portfolio[]
  selectedPortfolio: Portfolio | null
  portfolioRisk: PortfolioRisk | null
  realtimeData: Map<string, RealtimeData>
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
  // ... actions
}
```

**3. WebSocketStore**
```typescript
interface WebSocketState {
  isConnected: boolean
  elizaosStatus: {
    connected: boolean
    reconnectAttempts: number
  }
  messages: WebSocketMessage[]
  // ... actions
}
```

## 🔌 Serviços e APIs

### API Service
```typescript
class APIService {
  // Autenticação
  login(credentials: LoginCredentials): Promise<AuthResponse>
  getNonce(address: string): Promise<NonceResponse>
  getProfile(): Promise<UserProfile>

  // Portfólios
  getPortfolios(): Promise<Portfolio[]>
  createPortfolio(data: CreatePortfolioRequest): Promise<Portfolio>
  updatePortfolio(id: string, data: UpdatePortfolioRequest): Promise<Portfolio>
  deletePortfolio(id: string): Promise<void>

  // Análise de Risco
  getPortfolioRisk(portfolioId: string): Promise<PortfolioRisk>
  
  // IA Insights
  getAIInsights(): Promise<AIInsight[]>
  analyzePortfolio(address: string, portfolioData: string): Promise<AnalysisResult>
}
```

### WebSocket Service
```typescript
class WebSocketService {
  connect(): void
  disconnect(): void
  subscribe(topic: string): void
  unsubscribe(topic: string): void
  analyzePortfolio(address: string, data: string): void
  // ... event handlers
}
```

## 🎨 Sistema de UI

### Design System
- **Cores**: Sistema consistente baseado em CSS variables
- **Tipografia**: Inter font com escalas definidas
- **Espaçamento**: Sistema baseado em múltiplos de 4px
- **Componentes**: shadcn/ui como base + customizações

### Componentes Base
```
ui/
├── button.tsx           # Botões com variantes
├── card.tsx            # Cards padronizados
├── loading-spinner.tsx # Indicadores de carregamento
├── notification-bell.tsx # Sistema de notificações
├── theme-toggle.tsx    # Alternador de tema
└── toaster.tsx         # Sistema de toast
```

### Responsividade
- **Mobile First**: Design responsivo desde mobile
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Sidebar**: Colapsível em mobile, fixa em desktop

## 🔄 Fluxos de Dados

### 1. Fluxo de Autenticação
```
1. Usuário conecta carteira → WalletButton
2. Carteira conectada → useAuth hook
3. Solicita nonce → API Service
4. Assina mensagem → Wallet
5. Envia credenciais → API Service
6. Recebe token → AuthStore
7. Carrega perfil → API Service
8. Atualiza UI → Components
```

### 2. Fluxo de Portfólios
```
1. Usuário autenticado → usePortfolio hook
2. Auto-carrega portfólios → API Service
3. Exibe na UI → PortfolioOverview
4. Seleção de portfólio → PortfolioStore
5. WebSocket subscreve → WebSocket Service
6. Dados em tempo real → RealtimeData
7. Atualiza métricas → RiskMetrics, AIInsights
```

### 3. Fluxo de IA
```
1. Usuário envia pergunta → AIInsights
2. WebSocket envia → ElizaOS Agent
3. IA processa → ElizaOS
4. Resposta via WebSocket → WebSocketStore
5. Atualiza chat → AIInsights UI
```

## 🔌 Integrações

### 1. Web3/Blockchain
- **wagmi**: Hooks React para Web3
- **viem**: Cliente Ethereum typesafe
- **Conectores**: MetaMask, WalletConnect, Coinbase

### 2. Backend APIs
- **Base URL**: Configurável via env
- **Autenticação**: JWT tokens
- **Rate Limiting**: Implementado no cliente
- **Retry Logic**: Automático com backoff

### 3. ElizaOS Agent
- **WebSocket**: Comunicação em tempo real
- **Fallback**: API REST para casos de falha
- **Reconexão**: Automática com limite de tentativas

## 📱 Features Implementadas

### ✅ Concluídas
- [x] Sistema de autenticação Web3 completo
- [x] Gerenciamento de portfólios com CRUD
- [x] Análise de risco em tempo real
- [x] Chat com IA integrado
- [x] Dashboard responsivo
- [x] Sistema de notificações
- [x] Dados em tempo real via WebSocket
- [x] Estados de loading e erro
- [x] Cache inteligente
- [x] Tema dark/light

### 🚧 Em Desenvolvimento
- [ ] Gráficos avançados (TradingView)
- [ ] Sistema de alertas avançado
- [ ] Histórico de transações
- [ ] Relatórios exportáveis
- [ ] Configurações de usuário
- [ ] Multi-idioma

## 🛠️ Configuração e Deployment

### Variáveis de Ambiente
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3000
NEXT_PUBLIC_ELIZAOS_URL=http://localhost:3001
NEXT_PUBLIC_ELIZAOS_WS=ws://localhost:3001
NEXT_PUBLIC_ELIZAOS_AGENT_ID=riskguardian-agent
```

### Scripts de Build
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Lint e testes
npm run lint
npm run test
```

### Otimizações
- **Code Splitting**: Automático via Next.js
- **Lazy Loading**: Componentes pesados
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: @next/bundle-analyzer

## 🔧 Troubleshooting

### Problemas Comuns

1. **WebSocket não conecta**
   - Verificar URL do WebSocket
   - Certificar que backend está rodando
   - Verificar CORS

2. **Carteira não conecta**
   - Verificar se extensão está instalada
   - Verificar rede blockchain
   - Limpar cache do navegador

3. **IA não responde**
   - Verificar status ElizaOS
   - Verificar logs do console
   - Tentar reconnect manual

## 📊 Performance

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

### Estratégias de Otimização
- Suspense boundaries para loading states
- Debounce em inputs de pesquisa
- Virtualização para listas grandes
- Prefetch de dados críticos
- Service Worker para cache offline

## 🔒 Segurança

### Implementações
- Validação de entrada client-side
- Sanitização de dados exibidos
- CSP headers configurados
- Rate limiting no cliente
- Tokens JWT com expiração
- Validação de assinaturas Web3

## 📈 Monitoramento

### Métricas Coletadas
- Performance de carregamento
- Erros JavaScript
- Interações do usuário
- Status de conexões WebSocket
- Tempo de resposta da API

### Ferramentas
- Next.js Analytics
- Web Vitals
- Error Boundaries
- Console logging estruturado

---

## 🎯 Próximos Passos

1. **Implementar gráficos TradingView**
2. **Sistema de alertas por email/push**
3. **Testes automatizados (Jest + Testing Library)**
4. **Storybook para documentação de componentes**
5. **PWA para funcionalidade offline**
6. **Integração com mais blockchains**

---

*Documentação atualizada em: Janeiro 2025*
*Versão: 1.0.0* 