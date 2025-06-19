# 🛡️ RiskGuardian AI - Sistema de Inicialização Completo

## 📋 Visão Geral

O **RiskGuardian AI** possui um sistema de inicialização abrangente que gerencia todos os componentes do projeto automaticamente. Este documento fornece instruções completas sobre como usar o sistema.

## 🚀 Início Rápido

### 1. Configuração Inicial

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/your-org/riskguardian-ai.git
cd riskguardian-ai

# Torne o script executável
chmod +x riskguardian-start.sh

# Configure as variáveis de ambiente
cp env.example .env
# Edite o arquivo .env com suas credenciais

# Inicie todo o sistema
./riskguardian-start.sh start
```

### 2. Início Rápido (Sem Verificações)

```bash
./riskguardian-start.sh quick-start
```

## 🏗️ Arquitetura do Sistema

O RiskGuardian AI é composto por:

### 🔧 **Infraestrutura (Docker)**
- **PostgreSQL** (porta 5432) - Banco de dados principal
- **Redis** (porta 6379) - Cache e sessões
- **Anvil** (porta 8545) - Blockchain local de desenvolvimento

### 🚀 **Aplicações Node.js**
- **Frontend** (porta 3000) - Dashboard Next.js + React
- **Backend API** (porta 8001) - API Express + TypeScript
- **ElizaOS Agent** (porta 3001) - Agente de IA para análise
- **Chromia AWS** (porta 3002) - Sistema de alertas em tempo real

### 🔗 **Blockchain**
- **Contratos Inteligentes** - Hedging e automação
- **Chainlink Automation** - Execução automática
- **Sepolia Testnet** - Rede de teste

## 📖 Comandos Disponíveis

### 🚀 **Inicialização**

#### `./riskguardian-start.sh start`
Inicialização completa com todas as verificações:
- ✅ Verifica dependências (Node.js, npm, Docker)
- ✅ Verifica arquivos de ambiente
- ✅ Instala dependências de todos os serviços
- ✅ Compila todos os projetos
- ✅ Inicia infraestrutura Docker
- ✅ Inicia aplicações Node.js
- ✅ Deploy de contratos locais
- ✅ Configura contratos
- ✅ Mostra status final

#### `./riskguardian-start.sh quick-start`
Início rápido sem verificações (para desenvolvimento):
- ⚡ Pula verificações de dependências
- ⚡ Inicia apenas os serviços essenciais
- ⚡ Ideal para reinicios rápidos

#### `./riskguardian-start.sh setup`
Configuração inicial do projeto:
- 🔧 Verifica dependências
- 🔧 Instala dependências
- 🔧 Compila projetos
- 🔧 Não inicia serviços

### 🔧 **Serviços Individuais**

```bash
# Infraestrutura
./riskguardian-start.sh start-infra     # PostgreSQL + Redis + Anvil

# Aplicações individuais
./riskguardian-start.sh start-backend   # Apenas Backend API
./riskguardian-start.sh start-frontend  # Apenas Frontend
./riskguardian-start.sh start-elizaos   # Apenas ElizaOS Agent
./riskguardian-start.sh start-chromia   # Apenas Chromia AWS
```

### 🔗 **Blockchain e Contratos**

```bash
# Deploy local (Anvil)
./riskguardian-start.sh deploy

# Deploy na testnet (Sepolia)
./riskguardian-start.sh deploy-testnet

# Configurar contratos
./riskguardian-start.sh configure-contracts

# Registrar automação Chainlink
./riskguardian-start.sh register-automation
```

### 📊 **Monitoramento**

```bash
# Status dos serviços
./riskguardian-start.sh status

# Logs do sistema
./riskguardian-start.sh logs

# Monitor em tempo real
./riskguardian-start.sh monitor
```

### 🧪 **Testes**

```bash
# Todos os testes
./riskguardian-start.sh test

# Testes de integração
./riskguardian-start.sh test-integration
```

### 🧹 **Manutenção**

```bash
# Parar todos os serviços
./riskguardian-start.sh stop

# Reiniciar sistema completo
./riskguardian-start.sh restart

# Compilar todos os projetos
./riskguardian-start.sh build

# Limpeza completa (remove node_modules, builds, etc.)
./riskguardian-start.sh clean

# Reset do banco de dados
./riskguardian-start.sh reset-db
```

### ❓ **Ajuda**

```bash
# Mostrar ajuda completa
./riskguardian-start.sh help

# Versão do sistema
./riskguardian-start.sh version
```

## 🌐 URLs dos Serviços

Após iniciar o sistema, acesse:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:3000 | Dashboard principal |
| **Backend API** | http://localhost:8001 | API REST |
| **ElizaOS Agent** | http://localhost:3001 | Agente de IA |
| **Chromia AWS** | http://localhost:3002 | Sistema de alertas |
| **PgAdmin** | http://localhost:5050 | Admin do PostgreSQL |

### 🔗 **Endpoints da API**

- **Health Check**: `GET /api/health`
- **Autenticação**: `POST /api/auth/login`
- **Portfólio**: `GET /api/portfolio`
- **Análise AI**: `POST /api/analyze-portfolio`

## ⚙️ Configuração de Ambiente

### 📝 **Arquivo .env**

Copie `env.example` para `.env` e configure:

```bash
cp env.example .env
```

### 🔑 **Variáveis Essenciais**

```env
# APIs de IA
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-claude-key

# Blockchain
ALCHEMY_API_KEY=your-alchemy-key
ETHERSCAN_API_KEY=your-etherscan-key

# Segurança
JWT_SECRET=your-super-secret-key
```

### 🌍 **Ambientes**

O sistema suporta múltiplos ambientes:

- **Desenvolvimento**: Anvil local + APIs de teste
- **Testnet**: Sepolia + APIs reais
- **Produção**: Mainnet + Configuração segura

## 🔍 Monitoramento e Logs

### 📊 **Status em Tempo Real**

```bash
./riskguardian-start.sh monitor
```

Mostra status atualizado a cada 5 segundos:
- ✅/❌ Status de cada serviço
- 🔧 Infraestrutura (Docker)
- 🚀 Aplicações (Node.js)
- 📊 Ferramentas administrativas

### 📝 **Logs**

Os logs são salvos em `logs/riskguardian-system.log`:

```bash
# Ver logs recentes
./riskguardian-start.sh logs

# Seguir logs em tempo real
tail -f logs/riskguardian-system.log
```

### 🔧 **Troubleshooting**

#### ❌ **Serviço não inicia**
```bash
# Verificar dependências
./riskguardian-start.sh install

# Verificar configuração
./riskguardian-start.sh status

# Ver logs de erro
./riskguardian-start.sh logs
```

#### ❌ **Erro de porta em uso**
```bash
# Liberar portas automaticamente
./riskguardian-start.sh free-ports

# Ou parar todos os serviços
./riskguardian-start.sh stop

# Verificar processos manualmente
lsof -i :3000 -i :8001 -i :3001 -i :3002

# Reiniciar
./riskguardian-start.sh start
```

#### ❌ **Conflitos de dependências (Ethers.js)**
```bash
# Corrigir dependências do Chromia
./fix-chromia-deps.sh

# Ou instalar com flags especiais
npm install --legacy-peer-deps
npm install --force  # apenas se necessário
```

#### ❌ **Erro de Docker**
```bash
# Verificar Docker
docker --version
docker-compose --version

# Reiniciar Docker
sudo systemctl restart docker

# Limpar containers
./riskguardian-start.sh clean
```

#### ❌ **PostgreSQL/Redis já rodando localmente**
```bash
# Parar serviços do sistema
sudo systemctl stop postgresql
sudo systemctl stop redis-server

# Ou usar portas diferentes no .env
```

#### ❌ **Diretórios não encontrados**
```bash
# Verificar estrutura do projeto
ls -la

# Executar do diretório correto
cd /caminho/para/riskguardian-ai
./riskguardian-start.sh start
```

## 🔗 Integração com Blockchain

### 🏠 **Desenvolvimento Local**

O sistema usa **Anvil** (Foundry) para blockchain local:
- 10 contas com 10,000 ETH cada
- Chain ID: 31337
- Blocos a cada 2 segundos

### 🧪 **Testnet (Sepolia)**

Para usar Sepolia Testnet:
1. Configure `ALCHEMY_API_KEY` no `.env`
2. Configure `ETHERSCAN_API_KEY` no `.env`
3. Execute: `./riskguardian-start.sh deploy-testnet`

### 🔗 **Contratos Deployados**

Contratos já deployados na Sepolia:

```
RiskGuardianMaster: 0x30175D5BB0c97F4af00707950707D4b0Da4E7DdF
StopLossHedge:      0x0D175144FaF2a7045820b1242353aaC7240cD748
RebalanceHedge:     0xcdddD0599117455BF24884082725aE2EaE58e401
VolatilityHedge:    0xdC3a51B096403aD9Fd080afdAA907643029423A6
```

## 🚀 Deploy em Produção

### 🏗️ **Preparação**

1. **Configure variáveis de produção**:
```env
NODE_ENV=production
JWT_SECRET=secure-production-secret
DATABASE_URL=postgresql://user:pass@prod-host:5432/riskguardian
```

2. **Configure APIs de produção**:
```env
ALCHEMY_API_KEY=prod-alchemy-key
OPENAI_API_KEY=prod-openai-key
```

3. **Configure HTTPS**:
```bash
./scripts/setup-ssl.sh
```

### 🐳 **Docker em Produção**

```bash
# Build de produção
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Monitoramento
./scripts/production-dashboard.sh
```

## 📚 Recursos Adicionais

### 📖 **Documentação**
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Arquitetura do sistema
- [SECURITY.md](docs/SECURITY.md) - Práticas de segurança
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Guia de desenvolvimento

### 🔗 **Links Úteis**
- [Alchemy Dashboard](https://dashboard.alchemy.com/)
- [Etherscan API](https://etherscan.io/apis)
- [OpenAI Platform](https://platform.openai.com/)
- [Chainlink Automation](https://automation.chain.link/)

### 🆘 **Suporte**

Em caso de problemas:
1. Consulte os logs: `./riskguardian-start.sh logs`
2. Verifique o status: `./riskguardian-start.sh status`
3. Limpe e reinicie: `./riskguardian-start.sh clean && ./riskguardian-start.sh start`

---

## 📄 **Exemplo de Uso Completo**

```bash
# 1. Configuração inicial
git clone https://github.com/your-org/riskguardian-ai.git
cd riskguardian-ai
chmod +x riskguardian-start.sh
cp env.example .env

# 2. Editar variáveis de ambiente
nano .env  # Configure suas APIs

# 3. Iniciar sistema completo
./riskguardian-start.sh start

# 4. Verificar status
./riskguardian-start.sh status

# 5. Acessar dashboard
# Frontend: http://localhost:3000
# Backend: http://localhost:8001/api/health

# 6. Para parar quando terminar
./riskguardian-start.sh stop
```

O sistema RiskGuardian AI está agora completamente operacional! 🎉 