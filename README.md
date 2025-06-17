# ��️ RiskGuardian AI

![RiskGuardian AI](https://img.shields.io/badge/RiskGuardian-AI-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Active-brightgreen?style=for-the-badge)

Sistema inteligente avançado de análise de risco e automação de hedge para portfólios DeFi, utilizando Chainlink CCIP para operações cross-chain, integração com Chromia e agentes de IA powered by ElizaOS.

## 🎯 Visão Geral

O **RiskGuardian AI** é uma plataforma de última geração que combina:
- **Contratos Inteligentes** para automação de hedge
- **Chainlink CCIP** para operações cross-chain
- **Chainlink Automation** para execução automática
- **Chromia** para armazenamento descentralizado
- **ElizaOS** para agentes de IA inteligentes
- **Interface Web** moderna e responsiva

### 🚀 Principais Funcionalidades

✅ **Análise de Risco em Tempo Real**  
✅ **Hedge Automatizado Cross-Chain**  
✅ **Agentes de IA para Trading**  
✅ **Integração Multi-Blockchain**  
✅ **Dashboard Analítico Avançado**  
✅ **APIs REST e WebSocket**  
✅ **Notificações Inteligentes**  

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
# Instalar dependências
- Docker >= 20.10
- Docker Compose >= 2.0
- Node.js >= 18.0
- Git
```

### 1. Clone e Configure

```bash
# Clonar repositório
git clone https://github.com/uederson-ferreira/riskguardian-ai.git
cd riskguardian-ai

# Configurar ambiente
./scripts/setup.sh

# Iniciar ambiente de desenvolvimento
./scripts/start-dev.sh
```

### 2. Acesso aos Serviços

| Serviço | URL | Status |
|---------|-----|---------|
| 🌐 **Frontend** | http://localhost:3000 | Interface principal |
| 🔌 **Backend API** | http://localhost:8001 | Documentação da API |
| 🤖 **ElizaOS Agent** | http://localhost:3001 | Agentes de IA |
| ⛓️ **Anvil RPC** | http://localhost:8545 | Blockchain local |
| 🗄️ **PostgreSQL** | localhost:5432 | Banco de dados |
| 💾 **Redis** | localhost:6379 | Cache |
| 🔗 **Chromia** | http://localhost:7740 | Blockchain Chromia |

---

## 📋 Comandos Principais

### 🐳 Docker e Ambiente

```bash
# Iniciar todos os serviços
./scripts/start-dev.sh

# Parar todos os serviços  
./scripts/stop.sh

# Ver status dos containers
docker-compose ps

# Ver logs de um serviço específico
docker-compose logs -f [frontend|backend|elizaos-agent|chromia-node]

# Reiniciar um serviço
docker-compose restart [service-name]

# Limpar ambiente (CUIDADO: Remove todos os dados)
./scripts/docker-cleanup.sh
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