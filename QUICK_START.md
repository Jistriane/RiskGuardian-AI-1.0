# 🚀 RiskGuardian AI - Início Rápido

## ⚡ Em 3 Passos

```bash
# 1. Configure o ambiente
cp env.example .env

# 2. Inicie o sistema
./riskguardian-start.sh start

# 3. Acesse o dashboard
# Frontend: http://localhost:3000
```

## 🛠️ Pré-requisitos

- **Node.js** v18+ 
- **Docker** + **Docker Compose**
- **Git**

## 📋 Comandos Essenciais

| Comando | Descrição |
|---------|-----------|
| `./riskguardian-start.sh start` | Inicia todo o sistema |
| `./riskguardian-start.sh quick-start` | Início rápido |
| `./riskguardian-start.sh status` | Verifica status |
| `./riskguardian-start.sh stop` | Para todos os serviços |
| `./riskguardian-start.sh help` | Mostra ajuda completa |

## 🌐 URLs dos Serviços

- **Dashboard**: http://localhost:3000
- **API Backend**: http://localhost:8001
- **IA Agent**: http://localhost:3001  
- **Sistema de Alertas**: http://localhost:3002
- **Admin DB**: http://localhost:5050

## 🔧 Configuração Mínima

Edite `.env` com suas chaves de API:

```env
# IA APIs (opcional para desenvolvimento)
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key

# Blockchain APIs (opcional para testnet)
ALCHEMY_API_KEY=your-alchemy-key
ETHERSCAN_API_KEY=your-etherscan-key
```

## ❗ Troubleshooting

**Erro de porta em uso:**
```bash
./riskguardian-start.sh free-ports
./riskguardian-start.sh start
```

**Conflito de dependências (Ethers.js):**
```bash
./fix-chromia-deps.sh
./riskguardian-start.sh install
```

**Erro de dependências:**
```bash
./riskguardian-start.sh install
```

**Limpar tudo:**
```bash
./riskguardian-start.sh clean
./riskguardian-start.sh start
```

---

💡 **Dica**: Use `./riskguardian-start.sh monitor` para acompanhar os serviços em tempo real! 