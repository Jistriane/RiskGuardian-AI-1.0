# 🚀 Guia de Deploy do Backend - RiskGuardian AI

## 📋 **RESUMO EXECUTIVO**

Este guia fornece instruções completas para fazer deploy do backend RiskGuardian AI em produção usando **Railway** (recomendado) ou alternativas.

### **✅ STATUS ATUAL:**
- 🔨 Backend compilado com sucesso
- 📦 Dependências verificadas
- 🎯 Arquitetura: Node.js + TypeScript + Express + PostgreSQL + Redis
- 🌐 Pronto para deploy em produção

---

## 🎯 **OPÇÃO 1: RAILWAY (RECOMENDADO)**

### **Por que Railway?**
- ✅ PostgreSQL e Redis incluídos automaticamente
- ✅ Deploy automático via GitHub
- ✅ Configuração simples
- ✅ Logs em tempo real
- ✅ Escalabilidade automática

### **📋 PASSO A PASSO - RAILWAY:**

#### **1. Preparação (✅ JÁ FEITO)**
```bash
# Já executado:
✅ npm install
✅ npm run build
✅ Arquivos de configuração criados (railway.json, Procfile)
```

#### **2. Criar Conta Railway**
1. Acesse: https://railway.app
2. Clique em "Start a New Project"
3. Conecte sua conta GitHub
4. Selecione "Deploy from GitHub repo"
5. Escolha: `riskguardian-ai`

#### **3. Configurar Projeto**
```
✅ Root Directory: /backend
✅ Build Command: npm run build
✅ Start Command: npm run start
```

#### **4. Adicionar Serviços**
No painel Railway, adicione:
- 🗄️ **PostgreSQL**: Clique em "+ Add Service" → PostgreSQL
- 🔴 **Redis**: Clique em "+ Add Service" → Redis

#### **5. Configurar Variáveis de Ambiente**
No painel Railway, vá em "Variables" e adicione:

```bash
# Essenciais (OBRIGATÓRIAS)
NODE_ENV=production
PORT=${{RAILWAY_PUBLIC_PORT}}
DATABASE_URL=${{DATABASE_URL}}  # Auto-gerada pelo Railway
REDIS_URL=${{REDIS_URL}}        # Auto-gerada pelo Railway

# Frontend (AJUSTAR PARA SUA URL VERCEL)
FRONTEND_URL=https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app
ALLOWED_ORIGINS=https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app

# Segurança
JWT_SECRET=riskguardian-super-secret-jwt-key-production-2024-32chars-minimum
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Blockchain (Sepolia Testnet)
SEPOLIA_CHAIN_ID=11155111
SEPOLIA_RPC_URL=https://sepolia.drpc.org

# Logging
LOG_LEVEL=info
```

#### **6. Deploy**
1. No Railway, clique em "Deploy"
2. Aguarde o build (1-3 minutos)
3. Acesse a URL gerada: `https://your-app.railway.app`

---

## 🔵 **OPÇÃO 2: HEROKU (ALTERNATIVA)**

### **📋 PASSO A PASSO - HEROKU:**

#### **1. Instalar Heroku CLI**
```bash
# Ubuntu/Debian
curl https://cli-assets.heroku.com/install.sh | sh

# macOS
brew tap heroku/brew && brew install heroku
```

#### **2. Login e Criar App**
```bash
heroku login
heroku create riskguardian-backend

# Adicionar add-ons
heroku addons:create heroku-postgresql:essential-0
heroku addons:create heroku-redis:mini
```

#### **3. Configurar Variáveis**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=riskguardian-super-secret-jwt-key-production-2024-32chars-minimum
heroku config:set FRONTEND_URL=https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app
heroku config:set ALLOWED_ORIGINS=https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app
heroku config:set SEPOLIA_RPC_URL=https://sepolia.drpc.org
heroku config:set SEPOLIA_CHAIN_ID=11155111
```

#### **4. Deploy**
```bash
cd backend
git init
heroku git:remote -a riskguardian-backend
git add .
git commit -m "Deploy RiskGuardian Backend"
git push heroku main
```

---

## 🟣 **OPÇÃO 3: RENDER (SIMPLES)**

1. Acesse: https://render.com
2. Conecte GitHub
3. New → Web Service
4. Repository: `riskguardian-ai`
5. Root Directory: `backend`
6. Build Command: `npm run build`
7. Start Command: `npm start`
8. Adicione PostgreSQL: New → PostgreSQL
9. Configure variáveis de ambiente

---

## ⚙️ **CONFIGURAÇÕES PÓS-DEPLOY**

### **1. Verificar Saúde da API**
```bash
curl https://your-backend-url.railway.app/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "message": "RiskGuardian AI Backend",
  "version": "1.0.0",
  "timestamp": "2024-06-20T11:00:00.000Z",
  "uptime": 123.45
}
```

### **2. Testar Endpoints Principais**
```bash
# Root endpoint
curl https://your-backend-url.railway.app/

# API routes
curl https://your-backend-url.railway.app/api/auth/nonce/0x123...
```

### **3. Configurar CORS no Frontend**
No frontend, atualize o arquivo de configuração da API:

```typescript
// frontend/src/services/api.service.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.railway.app/api'
  : 'http://localhost:3001/api';
```

### **4. Migrar Banco de Dados**
O Prisma executará automaticamente as migrações no primeiro deploy via Procfile.

---

## 🛠️ **CONFIGURAÇÕES DE AMBIENTE**

### **🔴 VARIÁVEIS OBRIGATÓRIAS:**
```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=min-32-characters
FRONTEND_URL=https://your-frontend.vercel.app
```

### **🟡 VARIÁVEIS OPCIONAIS:**
```bash
SEPOLIA_PRIVATE_KEY=         # Para transações blockchain
COINMARKETCAP_API_KEY=       # Para dados de mercado
COINGECKO_API_KEY=          # Alternativa para dados
LOG_LEVEL=info              # Nível de logs
```

---

## 🔧 **COMANDOS ÚTEIS DE MONITORAMENTO**

### **Railway:**
```bash
# Ver logs
railway logs

# Abrir app
railway open

# Status
railway status
```

### **Heroku:**
```bash
# Ver logs
heroku logs --tail -a riskguardian-backend

# Status
heroku ps -a riskguardian-backend

# Restart
heroku restart -a riskguardian-backend
```

---

## 🎯 **CHECKLIST FINAL**

- [ ] ✅ Backend deployado com sucesso
- [ ] ✅ API `/health` respondendo
- [ ] ✅ Banco PostgreSQL conectado
- [ ] ✅ Redis funcionando
- [ ] ✅ CORS configurado para frontend
- [ ] ✅ Logs sem erros críticos
- [ ] ✅ Frontend atualizado com nova URL da API

---

## 🚨 **RESOLUÇÃO DE PROBLEMAS**

### **Problema: API não responde**
```bash
# Verificar logs
railway logs
# ou
heroku logs --tail
```

### **Problema: Erro de CORS**
- Verificar `FRONTEND_URL` nas variáveis de ambiente
- Confirmar URL do Vercel nas `ALLOWED_ORIGINS`

### **Problema: Banco não conecta**
- Verificar `DATABASE_URL` 
- Confirmar que PostgreSQL está rodando

### **Problema: Build falha**
```bash
# Limpar e rebuild
npm run clean
npm run build
```

---

## 📞 **PRÓXIMOS PASSOS**

1. **Execute o deploy** seguindo uma das opções acima
2. **Teste a API** com os comandos fornecidos
3. **Atualize o frontend** com a nova URL
4. **Monitore os logs** para garantir estabilidade
5. **Configure monitoramento** (Sentry, LogRocket, etc.)

---

**🎉 Seu backend RiskGuardian AI estará rodando em produção em poucos minutos!** 