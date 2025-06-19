# 🚀 RiskGuardian AI - Frontend Setup

## 📋 Pré-requisitos

- Node.js 18+ 
- npm 9+
- Git

## 🛠️ Instalação

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp env.example .env.local

# Editar variáveis de ambiente
nano .env.local
```

### 3. Configurações Obrigatórias

**WalletConnect Project ID:**
1. Acesse: https://cloud.walletconnect.com
2. Crie um projeto
3. Copie o Project ID para `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

**APIs Backend:**
Certifique-se que os serviços estão rodando:
- Backend API: http://localhost:8001
- ElizaOS Agent: http://localhost:3003  
- Chromia AWS: http://localhost:3002

## 🚀 Executar

### Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
npm start
```

### Testes
```bash
npm run test
npm run test:e2e
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificar código
- `npm run type-check` - Verificar TypeScript
- `npm run test` - Testes unitários
- `npm run test:e2e` - Testes end-to-end

## 📱 Funcionalidades

### ✅ Implementadas

- **Conexão Web3**: RainbowKit + Wagmi v2
- **Dashboard Responsivo**: Layout moderno com sidebar
- **Tema Dark/Light**: Sistema de temas integrado
- **Estrutura Componentes**: Shadcn/ui + Tailwind CSS
- **Configuração TypeScript**: Tipagem forte
- **Configuração Build**: Next.js 14 + Turbopack

### 🚧 Em Desenvolvimento

- **Portfolio Overview**: Dados reais via API
- **Risk Metrics**: Análise de risco em tempo real
- **AI Insights**: Integração com ElizaOS
- **Real-time Alerts**: WebSocket + Socket.IO
- **TradingView Charts**: Gráficos profissionais
- **Automation Monitoring**: Status Chainlink upkeeps

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **ElizaOS Agent**: http://localhost:3003
- **Chromia Alerts**: http://localhost:3002

## 🔗 Integrações

### Backend APIs
- Autenticação Web3 (nonce + signature)
- Gerenciamento de portfólios
- Sistema de seguros DeFi
- Monitoramento de contratos

### ElizaOS Agent
- Análise AI de portfólios
- WebSocket para insights em tempo real
- Recomendações inteligentes

### Chromia AWS
- Sistema de alertas
- Detecção de anomalias
- Notificações em tempo real

### Register-Automation
- Gerenciamento de upkeeps Chainlink
- Monitoramento de automação
- Status de execuções

## 🔒 Redes Suportadas

### Testnets (Desenvolvimento)
- Ethereum Sepolia
- Polygon Mumbai
- Arbitrum Sepolia
- Base Sepolia
- Optimism Sepolia

### Mainnets (Produção)
- Ethereum
- Polygon
- Arbitrum
- Base
- Optimism

## 📦 Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 14)
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Shadcn/ui)
│   ├── dashboard/      # Componentes do dashboard
│   ├── wallet/         # Componentes Web3
│   └── layout/         # Layouts da aplicação
├── hooks/              # Custom hooks
├── lib/                # Utilitários
├── services/           # APIs e WebSocket
├── stores/             # Estado global (Zustand)
├── types/              # Tipos TypeScript
└── config/             # Configurações
```

## 🐛 Troubleshooting

### Dependências não instaladas
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erros de TypeScript
```bash
npm run type-check
```

### Build falha
```bash
npm run clean
npm run build
```

### WebSocket não conecta
Verifique se os backends estão rodando nas portas corretas.

## 📊 Performance

- **SSR/SSG**: Otimizado para SEO
- **Lazy Loading**: Componentes carregados sob demanda
- **Code Splitting**: Bundle otimizado
- **Image Optimization**: Next.js Image
- **Font Optimization**: Google Fonts

## 🔐 Segurança

- **Headers de Segurança**: CSP, CORS configurados
- **Sanitização**: XSS protection
- **Validação**: Zod para validação de dados
- **Rate Limiting**: Proteção contra spam

## 📈 Próximos Passos

1. ✅ Finalizar componentes do dashboard
2. 🔄 Integrar APIs reais
3. 📡 Implementar WebSocket real-time
4. 📊 Adicionar gráficos TradingView
5. 🤖 Conectar análise AI
6. 🔔 Sistema de notificações
7. 📱 Otimizar para mobile
8. 🧪 Adicionar testes

## 💡 Suporte

Para problemas ou dúvidas, consulte:
- Documentação Next.js 14
- Documentação Wagmi v2
- Documentação RainbowKit
- Documentação Shadcn/ui 