# 🚀 DEPLOY RISKGUARDIAN AI BACKEND NO RENDER

## 🆓 **100% GRATUITO PARA SEMPRE!**

### 📋 **PASSO A PASSO SUPER SIMPLES:**

### **🎯 PASSO 1: Acesse o Render**
1. Vá para: **https://render.com**
2. Clique em **"Get Started for Free"**
3. Faça login com sua conta GitHub

### **🔗 PASSO 2: Novo Web Service**
1. Clique em **"New +"**
2. Selecione **"Web Service"**
3. Conecte seu repositório **`RiskGuardian-AI-1.0`**
4. Clique em **"Connect"**

### **⚙️ PASSO 3: Configurações Básicas**

#### **OPÇÃO A: SE VOCÊ VÊ "ROOT DIRECTORY"**
```
Name: jistriane-riskguardian-api
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
Build Command: npm install --production
Start Command: node simple-server.js
```

#### **OPÇÃO B: SE NÃO VÊ "ROOT DIRECTORY"**
```
Name: jistriane-riskguardian-api
Environment: Node
Region: Oregon (US West)
Branch: main
Build Command: cd backend && npm install --production
Start Command: cd backend && node simple-server.js
```

### **🔍 ONDE ENCONTRAR ROOT DIRECTORY:**
- 📍 **Na tela inicial** após conectar o GitHub
- 📍 **Na seção "Build & Deploy"**
- 📍 **Pode aparecer como "Source Directory"**
- 📍 **Se não encontrar, use a OPÇÃO B acima**

### **🎯 NOMES ÚNICOS DISPONÍVEIS:**
Escolha um destes nomes (caso jistriane-riskguardian-api esteja ocupado):
- **jistriane-riskguardian-api** ⭐ (Recomendado)
- **riskguardian-ai-backend-2025**
- **riskguardian-defi-api**
- **riskguardian-backend-prod**
- **riskguardian-ai-api-jistriane**
- **riskguardian-blockchain-api**
- **riskguardian-ai-0622-jist**

### **🔧 PASSO 4: Variáveis de Ambiente - TESTNET BÁSICO**
Na seção **Environment Variables**, adicione EXATAMENTE estas:

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

### **🎯 CONFIGURAÇÃO MÍNIMA (SE DER ERRO):**
```
NODE_ENV=testnet
NETWORK=sepolia
RPC_URL=https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
FRONTEND_URL=https://riskguardian-ai.vercel.app
CORS_ENABLED=true
AUTH_REQUIRED=false
```

### **🚀 PASSO 5: Deploy**
1. Clique em **"Create Web Service"**
2. Aguarde o deploy (2-3 minutos)
3. ✅ **PRONTO!**

## 🌐 **RESULTADO FINAL**

Seu backend estará em:
- **URL**: `https://jistriane-riskguardian-api.onrender.com`
- **Health**: `https://jistriane-riskguardian-api.onrender.com/health`
- **API**: `https://jistriane-riskguardian-api.onrender.com/api/portfolio`

## ⚡ **VANTAGENS DO RENDER:**

- ✅ **100% gratuito PARA SEMPRE**
- ✅ **Sem cartão de crédito**
- ✅ **SSL automático**
- ✅ **Deploy automático no push**
- ✅ **Logs em tempo real**
- ✅ **Interface super simples**
- ✅ **750 horas/mês grátis**

## 🔄 **LIMITAÇÕES (PLANO GRATUITO):**

- ⏰ **Sleep após 15min inativo** (normal para gratuito)
- 🔄 **Cold start** (demora ~30s para "acordar")
- 💾 **512MB RAM** (suficiente para API simples)

## 🛠️ **ALTERNATIVAS SE RENDER NÃO FUNCIONAR:**

### **OPÇÃO 2: FLY.IO**
```bash
npm install -g flyctl
fly auth login
fly launch
```

### **OPÇÃO 3: CYCLIC**
1. Vá para: **https://app.cyclic.sh**
2. Conecte GitHub
3. Deploy em 1 clique

## 🎯 **RECOMENDAÇÃO:**

**Use o RENDER** - É o mais simples e confiável!

## ⏱️ **TEMPO TOTAL: 3 MINUTOS**

## 🆘 **SE O NOME AINDA ESTIVER OCUPADO:**

Tente adicionar números ou sua data:
- `jistriane-riskguardian-api-2025`
- `jistriane-riskguardian-api-01`
- `riskguardian-api-jistriane-2025`

## 🆘 **PROBLEMAS COMUNS:**

### **❌ Build Error:**
- Use: `cd backend && npm install --production`

### **❌ Start Error:**
- Use: `cd backend && node simple-server.js`

### **❌ Not Found Error:**
- Verifique se o arquivo `simple-server.js` existe na pasta backend

## 🆘 **PRECISA DE AJUDA?**

Me avise se der algum erro que eu ajudo a resolver!

---

*Desenvolvido por Jistriane Santos - RiskGuardian AI Team* 