# 🛡️ RiskGuardian Multi-Chain

![RiskGuardian AI](https://img.shields.io/badge/RiskGuardian-MultiChain-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Production--Ready-brightgreen?style=for-the-badge)

**Plataforma de gerenciamento de risco multi-chain com IA avançada** para análise e proteção de ativos DeFi em tempo real. Suporte nativo a 4 testnets com indexação contínua, cache Redis distribuído e comunicação cross-chain via Chainlink CCIP.

## 🎯 Visão Geral

O **RiskGuardian Multi-Chain** é uma plataforma de próxima geração que oferece:
- **🔗 Multi-Chain Nativo** - Suporte a 4 testnets simultaneamente
- **⚡ Cache Redis** - Performance otimizada com hit rate > 90%
- **📊 Indexação Real-Time** - Blocos indexados a cada 30 segundos
- **🌐 APIs REST Modernas** - Endpoints para monitoramento e portfolio
- **🎛️ Dashboard Unificado** - Interface Material-UI responsiva
- **🔄 Cross-Chain CCIP** - Comunicação entre blockchains
- **💾 PostgreSQL + Redis** - Persistência e cache otimizados

### 🚀 Principais Funcionalidades

✅ **📈 Monitoramento Multi-Chain em Tempo Real**  
✅ **🔗 Portfolio Agregado Cross-Chain**  
✅ **⚡ Cache Distribuído de Alta Performance**  
✅ **📊 Dashboard Unificado Moderno**  
✅ **🔄 Indexação Automática de 4 Testnets**  
✅ **🌐 APIs REST Completas**  
✅ **💾 Infraestrutura Docker Otimizada**  
✅ **🔍 Health Checks e Métricas Detalhadas**

### 🌐 Redes Suportadas

| Network | Chain ID | Status | RPC | Explorer |
|---------|----------|--------|-----|----------|
| **Sepolia** | 11155111 | 🟢 Ativo | Alchemy/Infura | etherscan.io |
| **Mumbai** | 80001 | 🟢 Ativo | Polygon RPC | polygonscan.com |
| **Fuji** | 43113 | 🟢 Ativo | Avalanche RPC | snowtrace.io |
| **BSC Testnet** | 97 | 🟢 Ativo | BSC RPC | bscscan.com |  

---

## 🏗️ Arquitetura do Sistema

### Microserviços

| Serviço | Porta | Tecnologia | Função |
|---------|-------|------------|--------|
| **Frontend** | 3000 | Next.js 14 | Interface do usuário |
| **Backend** | 8001 | Node.js + Prisma | API REST + Database |
| **ElizaOS Agent** | 3001 | TypeScript + IA | Agentes inteligentes |
| **Chromia Node** | 7740 | Rell + PostgreSQL | Blockchain descentralizado |
| **Anvil** | 8545 | Foundry | Blockchain local |
| **PostgreSQL** | 5432 | PostgreSQL 15 | Banco de dados |
| **Redis** | 6379 | Redis 7 | Cache e sessões |

### Contratos Inteligentes

| Contrato | Rede | Função |
|----------|------|--------|
| **RiskGuardianMaster** | Multi-chain | Controlador principal |
| **VolatilityHedge** | Ethereum/Polygon | Hedge de volatilidade |
| **RebalanceHedge** | BSC/Avalanche | Rebalanceamento automático |
| **StopLossHedge** | All networks | Stop-loss inteligente |
| **CrossChainHedge** | CCIP networks | Operações cross-chain |

---

## 🚀 Início Rápido

### Pré-requisitos

```bash
# Dependências obrigatórias
- Docker >= 20.10
- Docker Compose >= 2.0  
- Node.js >= 18.0
- Git
- 8GB RAM mínimo (recomendado 16GB)
```

### 1. Clone e Configure

```bash
# Clonar repositório
git clone https://github.com/uederson-ferreira/riskguardian-ai.git
cd riskguardian-ai

# 🔥 MÉTODO MAIS SIMPLES - Sistema Unificado Completo
./riskguardian-start.sh start
```

### 📋 Sistema Completo de Inicialização

O RiskGuardian AI possui um **sistema de inicialização unificado** que gerencia todos os componentes automaticamente:

```bash
# 🚀 Inicialização completa (recomendado)
./riskguardian-start.sh start

# ⚡ Início rápido (desenvolvimento)
./riskguardian-start.sh quick-start

# 📊 Verificar status dos serviços
./riskguardian-start.sh status

# 🛑 Parar todos os serviços
./riskguardian-start.sh stop

# ❓ Ver todos os comandos disponíveis
./riskguardian-start.sh help
```

**📚 Documentação Completa:**
- [📖 **SISTEMA_INICIALIZACAO.md**](SISTEMA_INICIALIZACAO.md) - Documentação completa do sistema
- [⚡ **QUICK_START.md**](QUICK_START.md) - Guia de início rápido  
- [🔧 **env.example**](env.example) - Configuração de ambiente

### 2. Sistema Multi-Chain Ativo! 🎉

Após inicialização (~ 3-5 minutos):

| Serviço | URL | Função |
|---------|-----|---------|
| 🌐 **Frontend Multi-Chain** | http://localhost:3000 | Dashboard unificado |
| 🔌 **Backend API** | http://localhost:3001 | API REST + Monitoring |
| 📊 **Health Check** | http://localhost:3001/monitoring/health | Status do sistema |
| 🔍 **System Status** | http://localhost:3001/monitoring/status | Métricas detalhadas |
| 💾 **Redis Cache** | localhost:6379 | Cache distribuído |
| 🗄️ **PostgreSQL** | localhost:5432 | Banco de dados |

### 3. Verificações Rápidas

```bash
# 1. Status do sistema
curl http://localhost:3001/monitoring/health

# 2. Status das chains
curl http://localhost:3001/monitoring/chains

# 3. Métricas do cache
curl http://localhost:3001/monitoring/cache/stats

# 4. Parar sistema
./stop-multichain.sh
```

---

## 🌐 APIs Multi-Chain Disponíveis

### 📊 Monitoramento e Health Check

```bash
# Status geral do sistema
GET /monitoring/health
GET /monitoring/status

# Status por chain
GET /monitoring/chains
GET /monitoring/chains/:chainId

# Métricas e estatísticas
GET /monitoring/metrics
GET /monitoring/cache/stats
```

### 💼 Portfolio Multi-Chain

```bash
# Portfolio agregado de todas as chains
GET /portfolio/multi-chain/:address

# Ativos por chain específica
GET /portfolio/chain/:chainId/assets/:address

# Análise de risco cross-chain
GET /portfolio/risk-analysis/:address

# Histórico de transações
GET /portfolio/history/:address
```

### 🔄 Cross-Chain Operations

```bash
# Mensagens CCIP cross-chain
GET /monitoring/cross-chain-messages

# Status de mensagens cross-chain
GET /monitoring/cross-chain-status/:messageId

# Executar operação cross-chain
POST /monitoring/execute-cross-chain
```

### 💾 Cache Management

```bash
# Limpar cache
DELETE /monitoring/cache/clear
DELETE /monitoring/cache/clear/:pattern

# Estatísticas de cache
GET /monitoring/cache/stats
GET /monitoring/cache/keys/:pattern
```

### 📈 Market Data

```bash
# Preços de tokens por chain
GET /market-data/prices/:chainId
GET /market-data/price/:chainId/:tokenAddress

# Dados de mercado agregados
GET /market-data/aggregated
```

---

## 📋 Comandos Principais

### 🌐 Sistema Multi-Chain (Recomendado)

```bash
# 🔥 Iniciar sistema completo multi-chain
./start-multichain.sh

# 🛑 Parar sistema multi-chain
./stop-multichain.sh

# 📊 Status do sistema em tempo real
curl http://localhost:3001/monitoring/status

# 📈 Ver métricas das chains
curl http://localhost:3001/monitoring/chains

# 📝 Ver logs do sistema
tail -f logs/multichain.log
```

### 🐳 Docker e Ambiente

```bash
# Ver status dos containers
docker-compose ps

# Ver logs de um serviço específico
docker-compose logs -f [backend|frontend|redis|postgres]

# Reiniciar um serviço
docker-compose restart [service-name]

# Verificar uso de recursos
docker stats

# Limpar cache Docker (se necessário)
./stop-multichain.sh --clean-logs
```

### 🔧 Scripts de Desenvolvimento

```bash
# Configuração inicial
./scripts/setup.sh                    # Setup completo do ambiente

# Contratos inteligentes
npm run compile                       # Compilar contratos
npm run deploy                        # Deploy na rede configurada
npm run test                          # Executar testes

# Análise e verificação
./scripts/check-balances.ts          # Verificar saldos
./scripts/check-etherscan.ts         # Verificar no Etherscan
./scripts/estimate-fees.ts           # Estimar taxas de gas

# Deploy e configuração
./scripts/deploy-hedge-contracts.ts  # Deploy contratos hedge
./scripts/configure-hedge-contracts.ts # Configurar contratos
./scripts/register-automation.ts     # Registrar Chainlink Automation
```

### 💰 Gestão de Tokens e Automação

```bash
# LINK Token (necessário para Chainlink)
./scripts/approve-link.ts            # Aprovar LINK tokens
./scripts/transfer-link.ts           # Transferir LINK
./scripts/check-link-balance.ts      # Verificar saldo LINK

# Chainlink Automation
./scripts/register-upkeep-final.ts   # Registrar upkeep
./scripts/simple-upkeep.ts           # Upkeep simples
./scripts/check-pending.ts           # Verificar transações pendentes

# Verificações de rede
./scripts/check-sepolia-balance.ts   # Saldo Sepolia
./scripts/check-mainnet-balance.ts   # Saldo Mainnet
./scripts/quick-check.ts             # Verificação rápida
```

---

## 🤖 ElizaOS Agent - Agentes de IA

### Endpoints REST

```bash
# Status e Health Check
curl http://localhost:3001/api/health
curl http://localhost:3001/api/health/detailed

# Análise de Portfólio
curl -X POST http://localhost:3001/api/analyze-portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x742d35Cc6635C0532925a3b8D0D8f8Cc86d0AB8B",
    "chain": "ethereum"
  }'

# Análise de Risco
curl -X POST http://localhost:3001/api/analyze-risk \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio": {
      "assets": [
        {"token": "ETH", "amount": "10.5"},
        {"token": "USDC", "amount": "5000"}
      ]
    }
  }'

# Previsão de Mercado
curl -X POST http://localhost:3001/api/market-prediction \
  -H "Content-Type: application/json" \
  -d '{
    "token": "ETH",
    "timeframe": "1d"
  }'

# Recomendações de Hedge
curl -X POST http://localhost:3001/api/hedge-recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio": {
      "totalValue": "50000",
      "riskProfile": "moderate"
    }
  }'
```

### WebSocket API

```javascript
// Conexão WebSocket para atualizações em tempo real
const ws = new WebSocket('ws://localhost:3001');

// Subscrever a análises de portfólio
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'portfolio_analysis',
  data: {
    address: '0x742d35Cc6635C0532925a3b8D0D8f8Cc86d0AB8B'
  }
}));

// Receber atualizações
ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  console.log('Atualização em tempo real:', update);
};

// Canais disponíveis
// - portfolio_analysis: Análise de portfólio
// - risk_alerts: Alertas de risco
// - market_data: Dados de mercado
// - hedge_signals: Sinais de hedge
```

### Serviços Internos do ElizaOS

```bash
# AI Agent Service
curl http://localhost:3001/api/ai/status
curl -X POST http://localhost:3001/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Analise meu portfólio DeFi",
    "context": "risk_analysis"
  }'

# Blockchain Service  
curl http://localhost:3001/api/blockchain/status
curl http://localhost:3001/api/blockchain/networks

# Cache Service
curl http://localhost:3001/api/cache/status
curl -X POST http://localhost:3001/api/cache/clear

# Métricas e Monitoramento
curl http://localhost:3001/api/metrics
curl http://localhost:3001/api/system/health
curl http://localhost:3001/api/websocket/connections
```

---

## 🔗 Backend API

### Autenticação

```bash
# Gerar nonce para Web3 login
curl -X POST http://localhost:8001/api/auth/nonce \
  -H "Content-Type: application/json" \
  -d '{"address": "0x742d35Cc6635C0532925a3b8D0D8f8Cc86d0AB8B"}'

# Login com assinatura
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x742d35Cc6635C0532925a3b8D0D8f8Cc86d0AB8B",
    "signature": "0x...",
    "message": "Welcome to RiskGuardian AI..."
  }'
```

### Portfólio e Análise

```bash
# Buscar portfólios do usuário
curl -H "Authorization: Bearer <token>" \
     http://localhost:8001/api/portfolio

# Criar novo portfólio
curl -X POST http://localhost:8001/api/portfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Meu Portfólio DeFi",
    "description": "Portfólio principal"
  }'

# Análise de risco
curl -X POST http://localhost:8001/api/portfolio/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"portfolioId": "portfolio_id"}'
```

### Seguros e Hedge

```bash
# Criar apólice de seguro
curl -X POST http://localhost:8001/api/insurance/policy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "type": "SMART_CONTRACT",
    "coverageAmount": "10000",
    "duration": 30
  }'

# Registrar claim
curl -X POST http://localhost:8001/api/insurance/claim \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "policyId": "policy_id",
    "type": "SMART_CONTRACT_HACK",
    "amount": "5000",
    "description": "Hack do protocolo X"
  }'
```

---

## 🌐 Frontend - Interface do Usuário

### Recursos Principais

- **Dashboard Analítico**: Visão geral do portfólio
- **Gestão de Risco**: Análise e alertas em tempo real  
- **Operações de Hedge**: Interface para configurar estratégias
- **Histórico**: Transações e performance
- **Configurações**: Preferências e notificações

### Comandos de Desenvolvimento

```bash
# Desenvolvimento local
cd frontend
npm install
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção
npm run lint         # Verificar código
npm run test         # Executar testes

# Docker
docker-compose up -d frontend
docker-compose logs -f frontend
```

---

## ⛓️ Contratos Inteligentes

### RiskGuardianMaster
Contrato principal que coordena todas as operações.

```bash
# Deploy
./scripts/deploy-hedge-contracts.ts

# Configurar
./scripts/configure-hedge-contracts.ts

# Verificar status
curl http://localhost:8001/api/contracts/status
```

### Estratégias de Hedge Disponíveis

1. **VolatilityHedge**: Proteção contra volatilidade
2. **RebalanceHedge**: Rebalanceamento automático
3. **StopLossHedge**: Stop-loss inteligente
4. **CrossChainHedge**: Operações cross-chain

### Redes Suportadas

- **Ethereum** (Mainnet/Sepolia)
- **Polygon** (Mainnet/Mumbai)  
- **BSC** (Mainnet/Testnet)
- **Avalanche** (Mainnet/Fuji)
- **Arbitrum** (Mainnet/Goerli)

---

## 🗄️ Banco de Dados

### Schema Principal

```sql
-- Usuários autenticados via Web3
Users (id, address, nonce, created_at)

-- Portfólios dos usuários
Portfolios (id, user_id, name, risk_score, total_value)

-- Apólices de seguro
InsurancePolicies (id, user_id, type, coverage_amount, premium)

-- Claims de seguro
Claims (id, policy_id, type, amount, status)

-- Avaliações de risco
RiskAssessments (id, user_address, risk_score, assessment_data)
```

### Comandos do Banco

```bash
# Conectar ao PostgreSQL
docker-compose exec postgres psql -U chromia -d chromia

# Executar migrações
docker-compose exec backend npx prisma migrate deploy

# Gerar cliente Prisma
docker-compose exec backend npx prisma generate

# Reset do banco (CUIDADO!)
docker-compose exec backend npx prisma migrate reset
```

---

## 🔍 Monitoramento e Logs

### Visualizar Logs

```bash
# Logs de todos os serviços
docker-compose logs -f

# Logs específicos
docker-compose logs -f frontend
docker-compose logs -f backend  
docker-compose logs -f elizaos-agent
docker-compose logs -f chromia-node

# Logs com timestamp
docker-compose logs -f -t backend

# Últimas 50 linhas
docker-compose logs --tail=50 frontend
```

### Health Checks

```bash
# Verificar status de todos os serviços
curl http://localhost:8001/api/health    # Backend
curl http://localhost:3001/api/health    # ElizaOS
curl http://localhost:7740/health        # Chromia

# Status dos containers
docker-compose ps

# Recursos do sistema
docker stats
```

### Métricas

```bash
# Métricas do ElizaOS
curl http://localhost:3001/api/metrics

# Conexões WebSocket ativas
curl http://localhost:3001/api/websocket/connections

# Status do cache Redis
curl http://localhost:3001/api/cache/status

# Uso de memória
curl http://localhost:3001/api/system/memory
```

---

## 🛠️ Desenvolvimento e Debug

### Ambiente de Desenvolvimento

```bash
# Setup inicial
./scripts/setup.sh

# Iniciar ambiente
./scripts/start-dev.sh

# Verificar se tudo está funcionando
curl http://localhost:3000  # Frontend
curl http://localhost:8001/api/health  # Backend
curl http://localhost:3001/api/health  # ElizaOS
```

### Debug e Troubleshooting

```bash
# Verificar containers com problema
docker-compose ps | grep -v "Up"

# Logs de erro
docker-compose logs backend | grep -i error
docker-compose logs elizaos-agent | grep -i error

# Reiniciar serviço específico
docker-compose restart backend

# Rebuild de um serviço
docker-compose up -d --build frontend

# Limpar cache e rebuildar
docker-compose down
docker system prune -f
docker-compose up -d --build
```

### Testes

```bash
# Testes do backend
cd backend && npm test

# Testes dos contratos
npm run test

# Teste de integração completo
./scripts/test-integration.sh

# Testes da API
cd backend && npm run test:api
```

---

## 🔐 Segurança

### Variáveis de Ambiente

```bash
# Arquivos de ambiente
.env                 # Configurações principais
backend/.env         # Configurações do backend
elizaos-agent/.env   # Configurações do ElizaOS
frontend/.env.local  # Configurações do frontend

# Nunca commitar:
- Private keys
- API keys
- Senhas de banco
- JWT secrets
```

### Práticas de Segurança

- ✅ Autenticação Web3 (MetaMask)
- ✅ JWT tokens com expiração
- ✅ Rate limiting nas APIs
- ✅ Validação de entrada
- ✅ Sanitização de dados
- ✅ CORS configurado
- ✅ HTTPS em produção

---

## 📦 Deploy em Produção

### Docker Production

```bash
# Build para produção
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Verificar status
docker-compose -f docker-compose.prod.yml ps
```

### Configurações de Produção

```bash
# Variáveis de ambiente para produção
NODE_ENV=production
DATABASE_URL=postgresql://user:password@db-host:5432/riskguardian
REDIS_URL=redis://redis-host:6379
JWT_SECRET=super-secret-key-change-me

# SSL/HTTPS
HTTPS_CERT_PATH=/etc/ssl/certs/riskguardian.crt
HTTPS_KEY_PATH=/etc/ssl/private/riskguardian.key

# APIs de produção
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_KEY
```

---

## 📚 Documentação Adicional

### Links Úteis

- [📖 Documentação da API](./docs/api-docs.md)
- [🏗️ Arquitetura do Sistema](./docs/ARCHITECTURE.md)  
- [🔒 Guia de Segurança](./docs/SECURITY.md)
- [🚀 Guia de Deploy](./DEVELOPMENT_SETUP.md)
- [🐳 Setup Docker](./docker_environment_setup.md)
- [🤝 Como Contribuir](./CONTRIBUTING.md)

### Recursos Externos

- [Chainlink CCIP Docs](https://docs.chain.link/ccip)
- [Chainlink Automation](https://docs.chain.link/chainlink-automation)
- [ElizaOS Documentation](https://elizaos.ai/docs)
- [Chromia Docs](https://docs.chromia.com/)
- [Next.js Docs](https://nextjs.org/docs)

---

## 🤝 Contribuição

### Como Contribuir

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Guidelines

- Seguir padrões de código TypeScript/JavaScript
- Adicionar testes para novas funcionalidades
- Documentar mudanças no README
- Usar commits semânticos

---

## 📞 Suporte

### Canais de Contato

- 🐛 **Issues**: [GitHub Issues](https://github.com/uederson-ferreira/riskguardian-ai/issues)
- 📧 **Email**: dev@riskguardian.ai
- 💬 **Discord**: [RiskGuardian Community](https://discord.gg/riskguardian)
- 🐦 **Twitter**: [@RiskGuardianAI](https://twitter.com/RiskGuardianAI)

### FAQ

**Q: Como configurar as chaves da API?**  
A: Execute `./scripts/setup.sh` e siga as instruções.

**Q: O frontend não está carregando?**  
A: Verifique se todas as portas estão livres e execute `docker-compose restart frontend`.

**Q: Como adicionar uma nova rede blockchain?**  
A: Adicione a configuração em `hardhat.config.ts` e atualize os contratos.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🏆 Agradecimentos

- **Chainlink** - Por CCIP e Automation
- **OpenZeppelin** - Por contratos seguros
- **ElizaOS** - Por agentes de IA
- **Chromia** - Por blockchain descentralizado
- **Comunidade DeFi** - Por inspiração e feedback

---

<div align="center">

**🛡️ RiskGuardian AI - Protegendo o futuro das finanças descentralizadas**

[![GitHub stars](https://img.shields.io/github/stars/uederson-ferreira/riskguardian-ai?style=social)](https://github.com/uederson-ferreira/riskguardian-ai)
[![GitHub forks](https://img.shields.io/github/forks/uederson-ferreira/riskguardian-ai?style=social)](https://github.com/uederson-ferreira/riskguardian-ai)
[![GitHub issues](https://img.shields.io/github/issues/uederson-ferreira/riskguardian-ai)](https://github.com/uederson-ferreira/riskguardian-ai/issues)

</div>