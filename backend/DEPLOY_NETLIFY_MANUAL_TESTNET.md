# 🚀 DEPLOY MANUAL NETLIFY - BACKEND TESTNET SEPOLIA

## 📋 **PASSO A PASSO COMPLETO:**

### **🎯 PASSO 1: Acesse o Netlify**
1. Vá para: **https://app.netlify.com/**
2. Faça login com sua conta
3. Clique em **"Add new site"** > **"Deploy manually"**

### **📁 PASSO 2: Upload do Arquivo**
1. **Arraste** o arquivo `riskguardian-backend-testnet.zip` 
2. **OU** clique em "browse to upload" e selecione o arquivo
3. **Aguarde** o upload completar

### **⚙️ PASSO 3: Configurações do Site**
Após o upload, configure:

**Site name:** `riskguardian-backend-testnet`
**Functions directory:** `netlify/functions`

### **🔧 PASSO 4: Variáveis de Ambiente**
Vá em **Site settings** > **Environment variables** e adicione:

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
1. Clique em **"Deploy site"**
2. Aguarde o deploy completar
3. **Anote a URL** gerada (ex: `https://seu-site.netlify.app`)

### **✅ PASSO 6: Teste os Endpoints**
Teste os seguintes endpoints:

```bash
# Status da API
https://seu-site.netlify.app/.netlify/functions/api

# Portfolio
https://seu-site.netlify.app/.netlify/functions/api/portfolio

# Market Data
https://seu-site.netlify.app/.netlify/functions/api/market

# Config
https://seu-site.netlify.app/.netlify/functions/api/config
```

### **🎯 RESULTADO ESPERADO:**
```json
{
  "status": "healthy",
  "message": "RiskGuardian AI Backend - Testnet Sepolia",
  "environment": "testnet",
  "network": "sepolia",
  "chainId": "11155111",
  "timestamp": "2025-01-27T...",
  "version": "1.0.0",
  "platform": "netlify"
}
```

### **🔧 TROUBLESHOOTING:**

**❌ Se der erro 404:**
- Verifique se a pasta `netlify/functions` foi criada
- Confirme se o arquivo `api.js` está dentro dela

**❌ Se der erro 500:**
- Verifique as variáveis de ambiente
- Veja os logs em **Site settings** > **Functions**

**❌ Se não carregar:**
- Aguarde 2-3 minutos para propagação
- Limpe o cache do navegador

### **🎉 SUCESSO!**
Quando funcionar, você terá:
- ✅ Backend rodando em testnet Sepolia
- ✅ API REST funcional
- ✅ CORS configurado
- ✅ Endpoints de portfolio, market e config
- ✅ 100% gratuito no Netlify

---

**📝 NOTA:** Este arquivo ZIP contém tudo necessário para o deploy, incluindo as funções Netlify e configurações de testnet. 