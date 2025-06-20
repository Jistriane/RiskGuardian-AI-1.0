# 🛠️ DEVELOPMENT GUIDE - RiskGuardian AI

**Guia completo para workflow de desenvolvimento diário com ambiente nativo.**

---

## 📋 Pré-requisitos

### **Ferramentas Obrigatórias**
- [Node.js 18+](https://nodejs.org/) (LTS recomendado)
- [npm 9+](https://www.npmjs.com/) (incluído com Node.js)
- [Git](https://git-scm.com/) (controle de versão)

### **Ferramentas Opcionais**
- [curl](https://curl.se/) (para health checks)
- [VSCode](https://code.visualstudio.com/) (editor recomendado)

---

## 🚀 Setup Inicial Rápido

### **Configuração Automática (Recomendado)**
```bash
# Clone e configure automaticamente
git clone <repository-url>
cd riskguardian-ai

# Setup automático completo
./setup-riskguardian.sh

# Iniciar desenvolvimento
./start-riskguardian.sh dev
```

### **Verificar se tudo está funcionando**
```bash
# Verificar status de todos os serviços
./status-riskguardian.sh
```

**✅ Sucesso!** Você deve ver todos os serviços rodando:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001  
- ElizaOS: http://localhost:3002
- Chromia: http://localhost:3003
- Blockchain: http://localhost:8545

---

## 🎯 Comandos Principais

### **Gerenciamento de Sistema**

```bash
# Iniciar sistema completo
./start-riskguardian.sh dev

# Verificar status
./status-riskguardian.sh

# Parar tudo
./stop-riskguardian.sh
```

### **Modos de Inicialização**

```bash
# Desenvolvimento completo (padrão)
./start-riskguardian.sh dev

# Modo produção (sem blockchain local)
./start-riskguardian.sh prod

# Apenas blockchain local
./start-riskguardian.sh blockchain

# Apenas instalar dependências
./start-riskguardian.sh test
```

---

## 🎨 Desenvolvimento Frontend

### **Comandos Frontend**

```bash
# Entrar no diretório
cd frontend

# Desenvolvimento com hot reload
npm run dev

# Instalar nova dependência
npm install package-name

# Executar testes
npm test

# Build para produção
npm run build

# Type checking
npm run type-check

# Lint
npm run lint
```

### **Estrutura Frontend**
```
frontend/
├── src/
│   ├── app/                 # App Router (Next.js)
│   ├── components/          # Componentes React
│   ├── hooks/              # Custom Hooks
│   ├── services/           # API Services
│   ├── stores/             # Estado (Zustand)
│   └── types/              # Tipos TypeScript
├── public/                 # Assets estáticos
└── package.json            # Dependências
```

### **Hot Reload**
1. Faça mudanças nos arquivos
2. Salve (Ctrl+S)
3. Veja as mudanças automaticamente no navegador

---

## 🔧 Desenvolvimento Backend

### **Comandos Backend**

```bash
# Entrar no diretório
cd backend

# Desenvolvimento com nodemon
npm run dev

# Instalar nova dependência
npm install package-name

# Executar testes
npm test

# Build TypeScript
npm run build

# Executar em produção
npm start
```

### **Estrutura Backend**
```
backend/
├── src/
│   ├── controllers/        # Controladores de rota
│   ├── services/          # Lógica de negócio
│   ├── middleware/        # Express middleware
│   ├── routes/            # Rotas da API
│   ├── utils/             # Utilitários
│   └── types/             # Tipos TypeScript
├── simple-server.js       # Servidor de produção
└── package.json           # Dependências
```

### **Endpoints da API**
```bash
# Health check
GET http://localhost:3001/health

# Autenticação
POST http://localhost:3001/api/auth/login
POST http://localhost:3001/api/auth/logout

# Portfolio
GET http://localhost:3001/api/portfolio
GET http://localhost:3001/api/portfolio/real-time

# Monitoramento
GET http://localhost:3001/api/market/monitor
```

---

## 🤖 Desenvolvimento ElizaOS (IA)

### **Comandos ElizaOS**

```bash
# Entrar no diretório
cd elizaos-agent

# Desenvolvimento
npm run dev

# Instalar dependências
npm install

# Build
npm run build
```

### **Características**
- **IA Agent**: Análise inteligente de riscos
- **WebSocket**: Comunicação em tempo real
- **Multi-provider**: OpenAI, Anthropic, outros
- **Real-time**: Processamento instantâneo

### **Testando IA**
```bash
# Health check
curl http://localhost:3002/health

# WebSocket (use uma ferramenta como wscat)
wscat -c ws://localhost:3002
```

---

## 🔗 Desenvolvimento Chromia (Alertas)

### **Comandos Chromia**

```bash
# Entrar no diretório
cd chromia_aws

# Desenvolvimento
npm run dev

# Build
npm run build
```

### **Características**
- **Alert System**: Sistema de alertas em tempo real
- **Socket.IO**: Comunicação bidirecional
- **Anomaly Detection**: Detecção de anomalias
- **AWS Integration**: Integração com serviços AWS

### **Testando Alertas**
```bash
# Health check
curl http://localhost:3003/health

# Socket.IO (use ferramenta apropriada)
# Eventos: 'alert', 'anomaly', 'notification'
```

---

## ⛓️ Desenvolvimento Blockchain

### **Iniciar Blockchain Local**

```bash
# Apenas blockchain (em terminal separado)
./start-riskguardian.sh blockchain

# Ou manualmente
anvil --port 8545 --host 0.0.0.0
# ou
npx hardhat node --port 8545
```

### **Desenvolvimento de Contratos**

```bash
# Entrar no diretório
cd contracts

# Compilar contratos
npx hardhat compile

# Executar testes
npx hardhat test

# Deploy local
npx hardhat run scripts/deploy.ts --network localhost

# Verificar no Anvil
curl -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

### **Configuração de Rede**
```javascript
// hardhat.config.ts
networks: {
  localhost: {
    url: "http://localhost:8545",
    chainId: 31337
  }
}
```

---

## 🗄️ Banco de Dados

### **SQLite (Desenvolvimento)**
```bash
# Arquivo local
backend/dev.db

# Visualizar (se sqlite3 instalado)
sqlite3 backend/dev.db
.tables
.schema
```

### **Prisma (ORM)**
```bash
# No diretório backend
cd backend

# Gerar cliente
npx prisma generate

# Migrate
npx prisma migrate dev

# Studio (interface visual)
npx prisma studio
```

---

## 📊 Monitoramento e Logs

### **Status Global**
```bash
# Status completo do sistema
./status-riskguardian.sh

# Informações mostradas:
# - Versões do sistema
# - Status de cada serviço
# - Health checks
# - Uso de recursos
# - PIDs ativos
```

### **Logs em Tempo Real**
```bash
# Log principal do sistema
tail -f riskguardian-startup.log

# Logs por serviço (em terminais separados)
cd frontend && npm run dev 2>&1 | tee frontend.log
cd backend && npm run dev 2>&1 | tee backend.log
cd elizaos-agent && npm run dev 2>&1 | tee elizaos.log
cd chromia_aws && npm run dev 2>&1 | tee chromia.log
```

### **Debug Detalhado**
```bash
# Logs com debug
DEBUG=* npm run dev          # Frontend
DEBUG=app:* npm run dev      # Backend

# Sistema com logs verbosos
DEBUG=1 ./start-riskguardian.sh dev
```

---

## 📦 Gerenciamento de Dependências

### **Adicionar Dependências**

```bash
# Frontend
cd frontend
npm install package-name
npm install --save-dev dev-package

# Backend
cd backend
npm install package-name
npm install --save-dev dev-package

# Reinstalar tudo
./start-riskguardian.sh test
```

### **Atualizar Dependências**
```bash
# Verificar atualizações
npm outdated

# Atualizar específico
npm update package-name

# Atualizar tudo
npm update

# Audit de segurança
npm audit
npm audit fix
```

---

## 🧪 Testes

### **Executar Testes**
```bash
# Backend - testes unitários
cd backend
npm test
npm run test:watch
npm run test:coverage

# Frontend - testes de componente
cd frontend
npm test
npm run test:e2e

# Integração completa
./scripts/test-integration.sh
```

### **Cobertura de Testes**
```bash
# Gerar relatório
cd backend && npm run test:coverage

# Ver relatório
open coverage/lcov-report/index.html
```

---

## 🔍 Troubleshooting

### **Problemas Comuns**

**Porta já em uso:**
```bash
# Identificar processo
lsof -i :3000
lsof -i :3001

# Parar tudo
./stop-riskguardian.sh

# Matar processo específico
kill -9 <PID>
```

**Dependências corrompidas:**
```bash
# Limpar cache
npm cache clean --force

# Reinstalar
rm -rf node_modules package-lock.json
npm install

# Ou usar o script
./start-riskguardian.sh test
```

**Serviços não iniciam:**
```bash
# Verificar logs
./status-riskguardian.sh
cat riskguardian-startup.log

# Verificar pré-requisitos
node --version  # >= 18
npm --version   # >= 9
```

**Blockchain não conecta:**
```bash
# Verificar se Anvil está rodando
curl -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# Reiniciar blockchain
./start-riskguardian.sh blockchain
```

---

## 🎯 Workflow de Desenvolvimento

### **Fluxo Diário Recomendado**

```bash
# 1. Iniciar dia
./status-riskguardian.sh        # Verificar estado
./start-riskguardian.sh dev     # Iniciar tudo

# 2. Desenvolvimento
# Trabalhar nos arquivos necessários
# Hot reload automático

# 3. Testes
npm test                        # Testar mudanças

# 4. Commit
git add .
git commit -m "feat: nova funcionalidade"

# 5. Finalizar
./stop-riskguardian.sh         # Parar serviços
```

### **Desenvolvimento em Equipe**

```bash
# Sincronizar
git pull origin main

# Instalar novas dependências
./start-riskguardian.sh test

# Iniciar desenvolvimento
./start-riskguardian.sh dev

# Criar branch para feature
git checkout -b feature/nova-funcionalidade

# Desenvolver e testar
# ...

# Push da branch
git push origin feature/nova-funcionalidade
```

---

## 📈 Performance e Otimização

### **Monitoramento de Recursos**
```bash
# CPU e RAM por serviço
top -p $(ps aux | grep node | awk '{print $2}' | tr '\n' ',')

# Uso de disco
df -h

# Processos Node.js ativos
ps aux | grep node

# Monitoramento contínuo
watch ./status-riskguardian.sh
```

### **Otimizações de Desenvolvimento**
- ✅ **Hot Reload**: Mudanças instantâneas
- ✅ **Cache Inteligente**: Build incremental
- ✅ **Process Management**: PIDs organizados
- ✅ **Port Management**: Limpeza automática

---

## 🔗 URLs Úteis

### **Desenvolvimento Local**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- ElizaOS Agent: http://localhost:3002
- Chromia Services: http://localhost:3003
- Blockchain RPC: http://localhost:8545

### **Health Checks**
- Backend: http://localhost:3001/health
- ElizaOS: http://localhost:3002/health
- Chromia: http://localhost:3003/health

### **Produção**
- Frontend: https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app
- Backend: https://riskguardian-backend.onrender.com

---

## 📚 Recursos Adicionais

### **Documentação**
```bash
# Guias do projeto
cat README.md                  # Visão geral
cat SCRIPTS_SISTEMA.md        # Scripts detalhados
cat DEVELOPMENT_SETUP.md      # Setup completo

# Logs do sistema
tail -f riskguardian-startup.log
```

### **Comandos Úteis**
```bash
# Backup de configurações
tar -czf backup-$(date +%Y%m%d).tar.gz *.sh *.md

# Limpar logs
> riskguardian-startup.log

# Verificar versões
node --version && npm --version && git --version
```

---

**✨ Agora você está pronto para desenvolver com o RiskGuardian AI!** 

*Para mais detalhes, consulte `SCRIPTS_SISTEMA.md` para documentação completa dos scripts.*