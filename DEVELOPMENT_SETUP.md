# 🛠️ DEVELOPMENT SETUP - RiskGuardian AI

**Guia completo de configuração do ambiente de desenvolvimento nativo usando scripts automatizados.**

## 🎯 Visão Geral

**RiskGuardian AI** é uma plataforma de análise de riscos DeFi com IA integrada, construída com arquitetura moderna usando Node.js nativo. A plataforma combina tecnologia blockchain, inteligência artificial e análise de dados em tempo real para fornecer avaliação abrangente de riscos para portfólios DeFi.

## 🛠️ Stack Tecnológica

### **Core Technologies**
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Backend**: Node.js + Express + TypeScript  
- **AI Agent**: ElizaOS + WebSocket
- **Alertas**: Chromia AWS
- **Blockchain**: Ethereum + Chainlink + Anvil/Hardhat
- **Database**: SQLite (dev) / PostgreSQL (prod)

## 📋 Pré-requisitos

### **Ferramentas Obrigatórias**
- **Node.js 18+**: Runtime JavaScript
- **npm 9+**: Gerenciador de pacotes
- **Git**: Controle de versão
- **curl**: Health checks (opcional)

### **Verificação do Sistema**
```bash
# Verificar versões
node --version    # >= 18.0.0
npm --version     # >= 9.0.0
git --version     # Qualquer versão

# Configuração inicial automática
./setup-riskguardian.sh
```

## 🚀 Histórico de Desenvolvimento

### **Evolução da Arquitetura**
O projeto evoluiu de uma abordagem complexa com Docker para uma solução nativa otimizada:

**Versão 1.0 (Docker Era)**
- 7 serviços em containers Docker
- Complexidade de configuração
- Overhead de recursos

**Versão 2.0 (Native Era - Atual)**
- Scripts automatizados nativos
- Inicialização instantânea
- Recursos otimizados
- Desenvolvimento ágil

### **Benefícios da Abordagem Nativa**
- ⚡ **Inicialização mais rápida**: 5-10 segundos vs 2-3 minutos
- 🔧 **Debug simplificado**: Logs nativos e debug direto
- 📦 **Menos recursos**: CPU e RAM otimizados
- 🚀 **Desenvolvimento ágil**: Hot reload instantâneo
- 🎯 **Foco no código**: Sem overhead de containers

## 📦 Estrutura do Projeto

```
riskguardian-ai/
├── 🎨 frontend/                      # Next.js Application
│   ├── src/
│   │   ├── app/                      # App Router
│   │   ├── components/               # React Components
│   │   ├── hooks/                    # Custom Hooks
│   │   ├── services/                 # API Services
│   │   └── stores/                   # State Management
│   ├── package.json                  # Dependencies
│   └── next.config.js                # Next.js Config
│
├── 🔧 backend/                       # Node.js API
│   ├── src/
│   │   ├── controllers/              # Route Controllers
│   │   ├── services/                 # Business Logic
│   │   ├── middleware/               # Express Middleware
│   │   ├── routes/                   # API Routes
│   │   └── utils/                    # Utilities
│   ├── simple-server.js              # Production Server
│   └── package.json                  # Dependencies
│
├── 🤖 elizaos-agent/                 # AI Agent
│   ├── src/
│   │   ├── services/                 # AI Services
│   │   └── config/                   # Agent Config
│   └── package.json                  # Dependencies
│
├── 🔗 chromia_aws/                   # Alert System
│   ├── src/
│   │   ├── services/                 # Alert Services
│   │   └── config/                   # System Config
│   └── package.json                  # Dependencies
│
├── 📄 contracts/                     # Smart Contracts
│   ├── *.sol                         # Solidity Files
│   └── scripts/                      # Deploy Scripts
│
├── 🚀 scripts/                       # Deployment Scripts
│   └── *.ts                          # TypeScript Scripts
│
├── 🛠️ *.sh                          # System Scripts
└── 📋 *.md                          # Documentation
```

## 🚀 Configuração Inicial

### **Configuração Automática (Recomendado)**
```bash
# Clone do repositório
git clone https://github.com/your-repo/riskguardian-ai.git
cd riskguardian-ai

# Configuração completa automática
./setup-riskguardian.sh

# Inicialização em modo desenvolvimento
./start-riskguardian.sh dev
```

### **Configuração Manual**
```bash
# 1. Instalar dependências
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd elizaos-agent && npm install && cd ..
cd chromia_aws && npm install && cd ..

# 2. Configurar ambientes
cp backend/env.example backend/.env-dev
# Editar .env-dev conforme necessário

# 3. Inicializar serviços
./start-riskguardian.sh dev
```

## 📊 Arquitetura de Serviços

### **1. Frontend (Next.js)**
**Porta**: 3000
**Tecnologias**: Next.js 15 + React 19 + TypeScript
**Características**:
- App Router com SSR/SSG otimizado
- Integração Web3 com Wagmi v2
- UI moderna com Tailwind + Shadcn/ui
- Gráficos TradingView integrados

### **2. Backend (Node.js)**
**Porta**: 3001
**Tecnologias**: Node.js + Express + TypeScript
**Características**:
- API RESTful completa
- Autenticação JWT + Web3
- Rate limiting e segurança
- Health checks automáticos

### **3. ElizaOS Agent (IA)**
**Porta**: 3002
**Tecnologias**: ElizaOS + WebSocket
**Características**:
- Análise de riscos com IA
- Recomendações inteligentes
- Comunicação WebSocket
- Processamento em tempo real

### **4. Chromia AWS (Alertas)**
**Porta**: 3003
**Tecnologias**: Chromia + Socket.IO
**Características**:
- Sistema de alertas em tempo real
- Detecção de anomalias
- Notificações personalizadas
- Integração Socket.IO

### **5. Blockchain Local**
**Porta**: 8545
**Tecnologias**: Anvil (Foundry) ou Hardhat
**Características**:
- Blockchain local para desenvolvimento
- Deploy de contratos
- Testes de automação Chainlink
- Estado persistente

## 🎯 Scripts de Sistema

### **Script Principal: start-riskguardian.sh**

```bash
# Modos disponíveis
./start-riskguardian.sh dev         # Desenvolvimento completo
./start-riskguardian.sh prod        # Produção (sem blockchain)
./start-riskguardian.sh blockchain  # Apenas blockchain
./start-riskguardian.sh test        # Apenas dependências

# Recursos automáticos
- ✅ Verificação de pré-requisitos
- ✅ Limpeza de portas em uso
- ✅ Instalação de dependências
- ✅ Health checks automáticos
- ✅ Logs detalhados coloridos
```

### **Scripts Auxiliares**

```bash
./setup-riskguardian.sh     # Configuração inicial
./stop-riskguardian.sh      # Parada segura
./status-riskguardian.sh    # Monitor de status
```

## 💻 Workflow de Desenvolvimento

### **Desenvolvimento Diário**

```bash
# 1. Verificar status do sistema
./status-riskguardian.sh

# 2. Iniciar desenvolvimento
./start-riskguardian.sh dev

# 3. Acessar serviços
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001
# ElizaOS:  http://localhost:3002
# Chromia:  http://localhost:3003

# 4. Monitorar logs
tail -f riskguardian-startup.log

# 5. Parar quando terminar
./stop-riskguardian.sh
```

### **Desenvolvimento Frontend**

```bash
# Terminal dedicado para frontend
cd frontend

# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Lint e type checking
npm run lint
npm run type-check
```

### **Desenvolvimento Backend**

```bash
# Terminal dedicado para backend
cd backend

# Desenvolvimento com nodemon
npm run dev

# Executar testes
npm test

# Build TypeScript
npm run build
```

### **Desenvolvimento de Contratos**

```bash
# Iniciar apenas blockchain
./start-riskguardian.sh blockchain

# Em outro terminal
cd contracts

# Compile contratos
npx hardhat compile

# Deploy local
npx hardhat run scripts/deploy.ts --network localhost

# Executar testes
npx hardhat test
```

## 🔧 Configurações de Ambiente

### **Frontend (.env.local)**
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
NEXT_PUBLIC_ELIZAOS_API_URL=http://localhost:3002
NEXT_PUBLIC_CHROMIA_API_URL=http://localhost:3003
```

### **Backend (.env-dev)**
```bash
NODE_ENV=development
JWT_SECRET=your-secret-key
DATABASE_URL=sqlite:./dev.db
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000
PORT=3001
```

### **ElizaOS (.env)**
```bash
ELIZAOS_PORT=3002
BACKEND_URL=http://localhost:3001
AI_MODEL=gpt-4-turbo
WEBSOCKET_ENABLED=true
```

## 📊 Monitoramento e Debug

### **Status do Sistema**
```bash
# Status completo
./status-riskguardian.sh

# Informações exibidas:
- Versões do sistema
- Status de cada serviço
- Health checks automáticos
- Uso de recursos
- PIDs ativos
```

### **Logs e Debug**
```bash
# Logs principais
tail -f riskguardian-startup.log

# Logs por serviço
cd frontend && npm run dev 2>&1 | tee frontend.log
cd backend && npm run dev 2>&1 | tee backend.log

# Debug específico
DEBUG=* npm run dev  # Frontend
DEBUG=app:* npm run dev  # Backend
```

### **Health Checks**
```bash
# Verificação automática
curl -f http://localhost:3000      # Frontend
curl -f http://localhost:3001/health  # Backend
curl -f http://localhost:3002/health  # ElizaOS
curl -f http://localhost:3003/health  # Chromia

# Blockchain
curl -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

## 🧪 Testes e Qualidade

### **Execução de Testes**
```bash
# Testes unitários backend
cd backend && npm test

# Testes de integração
./scripts/test-integration.sh

# Testes E2E frontend
cd frontend && npm run test:e2e

# Cobertura de código
cd backend && npm run test:coverage
```

### **Qualidade de Código**
```bash
# Lint
cd frontend && npm run lint
cd backend && npm run lint

# Type checking
cd frontend && npm run type-check
cd backend && npm run type-check

# Formatação
npm run prettier
```

## 🚀 Deploy e Produção

### **Preparação para Deploy**
```bash
# Teste em modo produção
./start-riskguardian.sh prod

# Build de todos os serviços
cd frontend && npm run build
cd backend && npm run build
```

### **URLs de Produção**
- **Frontend**: https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app
- **Backend**: https://riskguardian-backend.onrender.com

## 🔒 Segurança

### **Desenvolvimento Local**
- ✅ HTTPS automático (Next.js)
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ Input validation
- ✅ JWT tokens seguros

### **Produção**
- ✅ Environment variables seguras
- ✅ Headers de segurança
- ✅ Logs auditáveis
- ✅ Backup automático

## 🆘 Solução de Problemas

### **Problemas Comuns**

**Porta em uso:**
```bash
./stop-riskguardian.sh  # Para tudo
lsof -i :3000          # Verificar porta específica
kill -9 <PID>          # Matar processo
```

**Dependências não instaladas:**
```bash
./start-riskguardian.sh test  # Instalar dependências
# ou
rm -rf node_modules && npm install
```

**Serviços não respondem:**
```bash
./status-riskguardian.sh    # Verificar status
cat riskguardian-startup.log  # Ver logs
```

### **Debug Avançado**
```bash
# Logs detalhados
DEBUG=1 ./start-riskguardian.sh dev

# Análise de recursos
top -p $(ps aux | grep node | awk '{print $2}' | tr '\n' ',')

# Rede
netstat -tulpn | grep :300
```

## 📈 Performance

### **Métricas de Desenvolvimento**
- **Inicialização**: < 10 segundos
- **Hot reload**: < 2 segundos
- **Build completo**: < 60 segundos
- **Uso de RAM**: ~1GB (todos os serviços)

### **Otimizações**
- Scripts nativos otimizados
- Cache de dependências
- Build incremental
- Process management eficiente

## 🎯 Roadmap Técnico

### **Concluído ✅**
1. **Sistema de scripts nativos** - Substituição completa do Docker
2. **Automação completa** - Zero configuração manual
3. **Monitoramento integrado** - Status e logs unificados
4. **Deploy de produção** - Vercel + Render funcionando

### **Próximos Passos 🔄**
1. **Testes automatizados** - CI/CD completo
2. **Métricas avançadas** - APM integrado
3. **Backup automático** - Dados e configurações
4. **Mobile development** - React Native setup

---

**Desenvolvido com foco na simplicidade e produtividade** 🚀