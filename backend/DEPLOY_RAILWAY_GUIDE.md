# 🚀 DEPLOY RISKGUARDIAN AI BACKEND NO RAILWAY

## 🆓 **100% GRATUITO SEM CARTÃO DE CRÉDITO!**

### 📋 **PASSO A PASSO SUPER SIMPLES:**

### **🎯 PASSO 1: Acesse o Railway**
1. Vá para: **https://railway.app**
2. Clique em **"Start a New Project"**
3. Faça login com sua conta GitHub
4. ✅ **NÃO pede cartão de crédito!**

### **🔗 PASSO 2: Novo Projeto**
1. Clique em **"Deploy from GitHub repo"**
2. Selecione **`RiskGuardian-AI-1.0`**
3. Clique em **"Deploy Now"**

### **⚙️ PASSO 3: Configurações**
1. **Service Name**: `riskguardian-backend`
2. **Root Directory**: `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `node simple-server.js`

### **🔧 PASSO 4: Variáveis de Ambiente**
Na aba **"Variables"**, adicione:

```
NODE_ENV=testnet
NETWORK=sepolia
CHAIN_ID=11155111
RPC_URL=https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
TESTNET=true
FRONTEND_URL=https://riskguardian-ai.vercel.app
ALLOWED_ORIGINS=https://riskguardian-ai.vercel.app
JWT_SECRET=riskguardian-testnet-2025
CORS_ENABLED=true
RATE_LIMIT_ENABLED=false
AUTH_REQUIRED=false
LOG_LEVEL=info
USDC_ADDRESS=0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
WETH_ADDRESS=0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14
LINK_ADDRESS=0x779877A7B0D9E8603169DdbD7836e478b4624789
ETH_USD_FEED=0x694AA1769357215DE4FAC081bf1f309aDC325306
LINK_USD_FEED=0xc59E3633BAAC79493d908e63626716e204A45EdF
INFURA_PROJECT_ID=9aa3d95b3bc440fa88ea12eaa4456161
```

### **🚀 PASSO 5: Deploy**
1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. ✅ **PRONTO!**

## 🌐 **RESULTADO FINAL**

Seu backend estará em:
- **URL**: `https://riskguardian-backend-production.up.railway.app`
- **Health**: `https://riskguardian-backend-production.up.railway.app/health`
- **API**: `https://riskguardian-backend-production.up.railway.app/api/portfolio`

## ⚡ **VANTAGENS DO RAILWAY:**

- ✅ **100% gratuito SEM cartão**
- ✅ **500 horas/mês grátis**
- ✅ **SSL automático**
- ✅ **Deploy automático no push**
- ✅ **Logs em tempo real**
- ✅ **Interface mais bonita que Render**
- ✅ **Mais confiável**
- ✅ **Sem cold start**

## 🔄 **LIMITAÇÕES (PLANO GRATUITO):**

- ⏰ **500 horas/mês** (mais que suficiente)
- 💾 **512MB RAM** (perfeito para API)
- 🌐 **1GB bandwidth** (tranquilo)

## 🛠️ **ALTERNATIVA 2: FLY.IO (SE RAILWAY NÃO FUNCIONAR)**

```bash
# Instala CLI
npm install -g flyctl

# Login
fly auth login

# Vai para pasta backend
cd backend

# Cria app
fly launch --no-deploy

# Adiciona variáveis
fly secrets set NODE_ENV=testnet
fly secrets set NETWORK=sepolia
fly secrets set RPC_URL=https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161

# Deploy
fly deploy
```

## 🛠️ **ALTERNATIVA 3: CYCLIC**

1. Vá para: **https://app.cyclic.sh**
2. Login com GitHub
3. Conecta repositório
4. Seleciona pasta `backend`
5. Deploy automático

## 🎯 **RECOMENDAÇÃO:**

**Use o RAILWAY** - É o melhor gratuito atualmente!

## ⏱️ **TEMPO TOTAL: 2 MINUTOS**

## 🆘 **PROBLEMAS COMUNS:**

### **❌ Build Error:**
- Certifique que `package.json` está na pasta backend
- Use Build Command: `npm install`

### **❌ Start Error:**
- Use Start Command: `node simple-server.js`
- Certifique que o arquivo existe

### **❌ Port Error:**
- Railway define PORT automaticamente
- Não precisa configurar PORT nas variáveis

## 🎉 **POR QUE RAILWAY É MELHOR:**

- 🚀 **Mais rápido que Render**
- 💪 **Mais confiável**
- 🆓 **Realmente gratuito**
- 🎨 **Interface mais bonita**
- 📊 **Métricas melhores**

## 🆘 **PRECISA DE AJUDA?**

Me avise se der algum erro que eu ajudo a resolver!

---

NODE_ENV=production
FRONTEND_URL=https://riskguardian-ai.vercel.app
ALLOWED_ORIGINS=https://riskguardian-ai.vercel.app,https://riskguardian-ai-jistrianes-projects.vercel.app
JWT_SECRET=riskguardian-super-secret-jwt-key-production-2025-blockchain-defi-security
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SEPOLIA_CHAIN_ID=11155111
SEPOLIA_RPC_URL=https://sepolia.drpc.org
LOG_LEVEL=info
HEALTH_CHECK_ENABLED=true
API_TIMEOUT=30000
MAX_REQUEST_SIZE=10mb
CORS_ENABLED=true
HELMET_ENABLED=true
RATE_LIMIT_ENABLED=true
```

### 🎯 **PASSO 4: Configurar Build**
1. Vá em **Settings**
2. Em **Build Command**: `npm install --production`
3. Em **Start Command**: `node simple-server.js`
4. Em **Root Directory**: `backend`

### ✅ **PASSO 5: Deploy Automático**
O Railway vai automaticamente:
- ✅ Instalar dependências
- ✅ Iniciar o servidor
- ✅ Gerar URL pública
- ✅ Configurar SSL automático

## 🌐 **RESULTADO FINAL**

Seu backend estará disponível em:
- **URL**: `https://seu-projeto.railway.app`
- **Health Check**: `https://seu-projeto.railway.app/health`
- **API**: `https://seu-projeto.railway.app/api/portfolio`

## 🔄 **ATUALIZAR FRONTEND**

Depois do deploy, atualize o frontend com a nova URL:

1. Vá no arquivo `frontend/src/services/api.service.ts`
2. Altere `BACKEND_URL` para sua URL do Railway
3. Faça novo deploy no Vercel

## 📊 **MONITORAMENTO**

No Railway você pode:
- ✅ Ver logs em tempo real
- ✅ Monitorar CPU/RAM
- ✅ Ver métricas de requests
- ✅ Configurar alertas

## 🆘 **SOLUÇÃO DE PROBLEMAS**

### Build Error:
- Verifique se está na pasta `backend`
- Confirme que `simple-server.js` existe

### CORS Error:
- Confirme `FRONTEND_URL` nas variáveis
- Adicione todas as URLs do Vercel em `ALLOWED_ORIGINS`

### 500 Error:
- Verifique logs no Railway
- Confirme todas as variáveis de ambiente

## 🎉 **PRONTO!**

Seu backend RiskGuardian AI estará rodando 24/7 no Railway!

**Tempo total: ~5 minutos** ⚡

---

*Desenvolvido por Jistriane Santos - RiskGuardian AI Team* 