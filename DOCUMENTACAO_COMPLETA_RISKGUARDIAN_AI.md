# 🛡️ RiskGuardian AI - Documentação Completa e Unificada

## 📋 Índice
1. [Visão Geral e Conceito](#visao-geral)
2. [Arquitetura e Tecnologias](#arquitetura)
3. [Funcionalidades Principais](#funcionalidades)
4. [Componentes Técnicos](#componentes)
5. [Instalação e Configuração](#instalacao)
6. [Uso e Operação](#uso)
7. [APIs e Integrações](#apis)
8. [Segurança e Boas Práticas](#seguranca)
9. [Desenvolvimento e Contribuição](#desenvolvimento)
10. [Roadmap e Futuro](#roadmap)

---

## 🎯 Visão Geral e Conceito {#visao-geral}

### O que é o RiskGuardian AI?

O **RiskGuardian AI** é uma plataforma inovadora de gestão de riscos que combina inteligência artificial com tecnologia blockchain para proteger investidores em DeFi e mercados financeiros tradicionais. É essencialmente um sistema de "piloto automático inteligente" para investimentos em DeFi, combinando a velocidade da automação blockchain com a inteligência da IA para manter os fundos dos usuários seguros.

### Principais Características:

🔍 **Análise de Risco Inteligente**
- **IA Preditiva**: Usa ElizaOS para analisar tendências de mercado e detectar padrões de fraude
- **Monitoramento Multi-chain**: Analisa riscos em tempo real através de Avalanche, Chromia e outras redes
- **Detecção de Anomalias**: Identifica atividades suspeitas e movimentos de "whales"

⚠️ **Sistema de Alertas Proativo**
- Notificações instantâneas sobre vulnerabilidades e ameaças
- Alertas de volatilidade extrema
- Detecção de atividades suspeitas em protocolos DeFi

🛡️ **Automação de Proteção**
- **Hedge Automático**: Contratos inteligentes que executam estratégias de proteção automaticamente
- **Stop-loss Inteligente**: Sistema cross-chain que protege posições
- **Rebalanceamento Automático**: Ajusta portfólios com base em análises de risco

📊 **Dashboard Analítico Avançado**
- Visualização de dados em tempo real com TradingView
- Métricas de risco personalizadas
- Simulação de cenários "e se?" para testar estratégias
- Interface responsiva para desktop e mobile

### Diferenciais Competitivos:

- **Arquitetura Híbrida**: Combina o melhor de múltiplas blockchains
- **IA Avançada**: ElizaOS como cérebro central para análise de risco
- **Integração Completa Chainlink**: Usa 5+ serviços Chainlink
- **UX Profissional**: Interface intuitiva inspirada em ferramentas de trading

### Valor para o Usuário:

O sistema funciona como um "guardião financeiro" que:
- Previne perdas através de análise preditiva
- Automatiza proteções sem intervenção manual
- Simplifica decisões complexas de investimento
- Monitora 24/7 múltiplas redes e protocolos

---

## 🏗️ Arquitetura e Tecnologias {#arquitetura}

### Arquitetura Tecnológica:

**Frontend**: Next.js + React + Tailwind CSS
**Backend**: AWS + Express.js + Socket.io
**Blockchain**:
- Avalanche: Execução rápida de smart contracts
- Chromia: Armazenamento de dados relacionais
- Chainlink: Oráculos e automação (Data Feeds, Automation, Functions, VRF, CCIP)
**IA**: ElizaOS para análise preditiva e detecção de padrões
**Banco de Dados**: PostgreSQL + Redis + Chromia

### Estrutura de Diretórios:

```
RiskGuardian-AI-1.0/
├── 🎨 frontend/           # Next.js App (Porta 3001)
├── 🔧 backend/            # API Node.js (Porta 8001)
├── 🤖 elizaos-agent/      # IA Agent (Porta 3000)
├── 🔗 chromia_aws/        # Alert System
├── 📄 contracts/          # Smart Contracts Solidity
├── 🚀 scripts/            # Deployment Scripts
├── 📚 docs/               # Documentation
├── 🛠️ *.sh               # System Scripts
└── 📋 *.md                # Documentation
```

### Fluxo de Arquitetura:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Frontend      │  │   Backend API   │  │  ElizaOS Agent  │
│   Next.js       │◄─┤   Node.js/TS    │◄─┤   IA Engine     │
│   Port: 3001    │  │   Port: 8001    │  │   Port: 3000    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                     ┌─────────────────┐
                     │   Database      │
                     │ PostgreSQL:5432 │
                     │   Redis:6379    │
                     └─────────────────┘
                                 │
                                 ▼
                     ┌─────────────────┐
                     │   Blockchain    │
                     │ Anvil/Hardhat   │
                     │   Port: 8545    │
                     └─────────────────┘
```

### Tecnologias Utilizadas:

**Frontend (Next.js 14):**
- React 18 + TypeScript
- Tailwind CSS + Shadcn/ui
- Wagmi v2 + RainbowKit (Web3)
- TradingView Charts
- Socket.io Client
- Zustand (State Management)

**Backend (Node.js):**
- Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT Authentication
- Rate Limiting & Security
- Socket.io Server
- Ethers.js v6

**Blockchain & DeFi:**
- Ethereum + Chainlink + Avalanche
- Multi-chain Support (Sepolia, Mumbai, Fuji, BSC)
- Smart Contracts (Solidity)
- Hardhat Framework
- OpenZeppelin Security

**IA & Automação:**
- ElizaOS Agent (IA conversacional)
- OpenAI/Anthropic Integration
- Chromia Services (Alertas em tempo real)
- Anomaly Detection
- WebSocket Real-time

---

## ⚡ Funcionalidades Principais {#funcionalidades}

### 1. Dashboard Inteligente

**Portfolio em Tempo Real:**
- Visualização completa de ativos multi-chain
- Integração com carteiras (MetaMask, WalletConnect, Coinbase)
- Suporte a múltiplas redes (Ethereum, Polygon, BSC, Arbitrum)
- Sincronização automática de dados

**Métricas de Risco:**
- **Value at Risk (VaR)**: Cálculo em tempo real
- **Volatilidade**: Análise de volatilidade histórica e implícita
- **Sharpe Ratio**: Relação risco-retorno
- **Correlação**: Entre diferentes ativos do portfólio
- **Health Factor**: Saúde geral do portfólio

**Alertas Ativos:**
- Monitoramento contínuo de riscos
- Notificações push em tempo real
- Alertas personalizáveis por usuário
- Integração com sistemas de comunicação

### 2. Sistema de Automação Chainlink

**Stop Loss Inteligente:**
```solidity
// Exemplo de implementação
contract StopLossHedge {
    function executeStopLoss(address user, uint256 orderId) external {
        // Lógica de proteção automática
        require(checkStopLossConditions(user, orderId), "Conditions not met");
        // Executa proteção
    }
}
```

**Rebalanceamento Automático:**
- Otimização automática de portfólio
- Baseado em análise de risco da IA
- Execução via Chainlink Automation
- Configuração personalizada por usuário

**Hedge Strategies:**
- Proteção contra volatilidade extrema
- Estratégias cross-chain
- Execução automática baseada em triggers
- Monitoramento de performance

### 3. Análise de Riscos com IA

**ElizaOS Integration:**
```typescript
class AIAgentService {
  async analyzePortfolio(address: string): Promise<PortfolioAnalysis> {
    const portfolioData = await this.getPortfolioData(address);
    const analysis = await this.analyzeWithFallback(portfolioData);
    return {
      riskLevel: analysis.riskLevel,
      recommendations: analysis.recommendations,
      explanation: analysis.explanation
    };
  }
}
```

**Detecção de Anomalias:**
- Análise de padrões suspeitos
- Detecção de movimentos de "whales"
- Identificação de atividades fraudulentas
- Alertas preventivos

**Análise Preditiva:**
- Tendências de mercado
- Previsão de volatilidade
- Análise de sentimento
- Recomendações personalizadas

### 4. Sistema de Seguros DeFi

**Proteção de Portfolio:**
- Seguro contra perdas de smart contracts
- Cobertura personalizada baseada no perfil de risco
- Claims automáticos via contratos inteligentes
- Pool de liquidez descentralizado

**Tipos de Cobertura:**
- Smart Contract Risk
- Slashing Risk (para staking)
- Oracle Failure Risk
- Bridge Risk (cross-chain)

### 5. Monitoramento Multi-Chain

**Chains Suportadas:**
```typescript
const SUPPORTED_CHAINS = {
  11155111: { name: 'Sepolia Testnet', rpcUrl: '...', ccipRouter: '...' },
  80001: { name: 'Mumbai Testnet', rpcUrl: '...', ccipRouter: '...' },
  43113: { name: 'Avalanche Fuji', rpcUrl: '...', ccipRouter: '...' },
  97: { name: 'BSC Testnet', rpcUrl: '...', ccipRouter: '...' }
};
```

**Cross-Chain Operations:**
- Monitoramento de múltiplas redes
- Execução de hedge cross-chain
- Sincronização de dados entre chains
- Otimização de taxas de transação

---

## 🔧 Componentes Técnicos {#componentes}

### Frontend (Next.js)

**Estrutura de Componentes:**
```typescript
// Dashboard Principal
export default function DashboardPage() {
  const { data: realTimeData, isConnected } = useRealTimeData();
  const { t } = useI18n();
  
  return (
    <DashboardLayout>
      <PortfolioOverview />
      <RiskMetrics />
      <AIInsights />
      <MarketData />
      <AutomationStatus />
    </DashboardLayout>
  );
}
```

**Principais Hooks:**
- `useRealTimeData()`: Dados em tempo real via WebSocket
- `usePortfolio()`: Gestão de estado do portfólio
- `useWebSocket()`: Conexão WebSocket para alertas
- `useTranslation()`: Internacionalização (PT-BR/EN)

**Dependências Principais:**
```json
{
  "@rainbow-me/rainbowkit": "^2.2.8",
  "wagmi": "^2.15.6",
  "viem": "^2.31.3",
  "next": "^14.2.30",
  "socket.io-client": "^4.8.1",
  "recharts": "^2.15.3"
}
```

### Backend (Node.js)

**Serviços Principais:**
```typescript
// Blockchain Service
export class MultiChainBlockchainService {
  private providers: Map<number, ethers.JsonRpcProvider> = new Map();
  
  async connect(): Promise<boolean> {
    // Conecta a múltiplas chains
  }
  
  async getMultiChainData(address: string): Promise<any> {
    // Coleta dados de todas as chains
  }
}
```

**API Routes:**
- `/api/auth/*`: Autenticação e autorização
- `/api/portfolio/*`: Gestão de portfólio
- `/api/risk/*`: Análise de riscos
- `/api/insurance/*`: Sistema de seguros
- `/api/monitoring/*`: Monitoramento e alertas

**Dependências Principais:**
```json
{
  "ethers": "^6.14.4",
  "express": "^4.21.2",
  "socket.io": "^4.8.1",
  "@prisma/client": "^6.9.0",
  "jsonwebtoken": "^9.0.0"
}
```

### ElizaOS Agent (IA)

**Configuração de Provedores:**
```typescript
class AIAgentService {
  private providers: AIProvider[] = [
    new OpenAIProvider(),
    new AnthropicProvider(),
    new MockProvider() // Fallback
  ];
  
  async analyzeWithFallback(input: string): Promise<string> {
    // Tenta cada provedor até obter sucesso
  }
}
```

**Capacidades:**
- Análise de portfólio
- Detecção de riscos
- Recomendações personalizadas
- Chat conversacional
- Análise preditiva

### Chromia AWS (Sistema de Alertas)

**Alert Orchestrator:**
```typescript
export class AlertOrchestrator {
  async processPortfolioUpdate(portfolioId: string, metrics: any): Promise<void> {
    const analysis = await this.anomalyDetection.analyzePortfolio(portfolioId, metrics);
    
    if (analysis.alerts.length > 0) {
      await this.webSocket.broadcastAlert(portfolioId, {
        type: analysis.riskScore >= 0.7 ? 'critical' : 'warning',
        message: analysis.alerts.join('; '),
        data: { riskScore: analysis.riskScore, metrics }
      });
    }
  }
}
```

**Funcionalidades:**
- Detecção de anomalias
- Broadcast de alertas via WebSocket
- Armazenamento em Chromia
- Limpeza automática de dados antigos

### Smart Contracts

**RiskGuardianMaster.sol:**
```solidity
contract RiskGuardianMaster is AutomationCompatible, Ownable, ReentrancyGuard {
    // Coordena todos os tipos de hedge
    address public stopLossHedgeContract;
    address public rebalanceHedgeContract;
    address public volatilityHedgeContract;
    address public crossChainHedgeContract;
    
    function checkUpkeep(bytes calldata) external view override 
        returns (bool upkeepNeeded, bytes memory performData) {
        // Verifica se automação é necessária
    }
    
    function performUpkeep(bytes calldata performData) external override {
        // Executa automação
    }
}
```

**Contratos Específicos:**
- `StopLossHedge.sol`: Proteção stop-loss
- `RebalanceHedge.sol`: Rebalanceamento automático
- `VolatilityHedge.sol`: Proteção contra volatilidade
- `CrossChainHedge.sol`: Operações cross-chain

---

## 🔧 Instalação e Configuração {#instalacao}

### Pré-requisitos:

```bash
# Verificar versões
node --version  # v18.0.0+
npm --version   # 8.0.0+
git --version   # 2.0.0+
```

### Instalação Automática:

```bash
# Clone o repositório
git clone https://github.com/Jistriane/RiskGuardian-AI-1.0.git
cd RiskGuardian-AI-1.0

# Configuração inicial automática
./setup-riskguardian.sh

# Inicialização completa
./start-riskguardian.sh dev
```

### Configuração de Ambiente:

**Backend (.env):**
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/riskguardian"

# APIs
ALCHEMY_API_KEY="your_alchemy_key"
COINMARKETCAP_API_KEY="your_cmc_key"
COINGECKO_API_KEY="your_coingecko_key"

# JWT
JWT_SECRET="your_jwt_secret_here"

# Blockchain
PRIVATE_KEY="your_wallet_private_key"
ETHEREUM_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-key"
POLYGON_RPC_URL="https://polygon-mainnet.alchemyapi.io/v2/your-key"

# Chainlink
CHAINLINK_AUTOMATION_REGISTRY="0x..."
CHAINLINK_CCIP_ROUTER="0x..."
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL="http://localhost:8001"
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:8001"
NEXT_PUBLIC_ENVIRONMENT="development"
```

**ElizaOS (.env):**
```env
OPENAI_API_KEY="your_openai_key"
ANTHROPIC_API_KEY="your_anthropic_key"
ELIZAOS_PORT="3000"
```

### Instalação Manual:

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (novo terminal)
cd frontend
npm install
npm run dev

# ElizaOS Agent (novo terminal)
cd elizaos-agent
npm install
npm run dev

# Chromia Services (novo terminal)
cd chromia_aws
npm install
npm run dev
```

---

## 🚀 Uso e Operação {#uso}

### Scripts de Sistema:

| Script | Descrição | Uso |
|--------|-----------|-----|
| `setup-riskguardian.sh` | Configuração inicial | `./setup-riskguardian.sh` |
| `start-riskguardian.sh` | Inicialização completa | `./start-riskguardian.sh [mode]` |
| `stop-riskguardian.sh` | Parada segura | `./stop-riskguardian.sh` |
| `status-riskguardian.sh` | Monitor de status | `./status-riskguardian.sh` |

### Modos de Operação:

```bash
# Desenvolvimento completo (padrão)
./start-riskguardian.sh dev

# Modo produção
./start-riskguardian.sh prod

# Apenas blockchain local
./start-riskguardian.sh blockchain

# Apenas instalação
./start-riskguardian.sh test
```

### URLs de Acesso:

- 🎨 **Frontend**: http://localhost:3001
- 🔧 **Backend**: http://localhost:8001
- 🤖 **ElizaOS Agent**: http://localhost:3000
- 🗄️ **PostgreSQL**: localhost:5432
- 🔄 **Redis**: localhost:6379
- ⛓️ **Blockchain**: http://localhost:8545

### Workflow Típico:

```bash
# 1. Verificar status
./status-riskguardian.sh

# 2. Iniciar sistema
./start-riskguardian.sh dev

# 3. Acessar dashboard
open http://localhost:3001

# 4. Conectar carteira
# Usar MetaMask ou WalletConnect

# 5. Configurar automações
# Via interface web

# 6. Monitorar logs
tail -f riskguardian-startup.log

# 7. Parar sistema
./stop-riskguardian.sh
```

---

## 🔌 APIs e Integrações {#apis}

### API Backend:

**Autenticação:**
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
GET /api/auth/profile
```

**Portfolio:**
```typescript
GET /api/portfolio/overview
GET /api/portfolio/assets
POST /api/portfolio/analyze
GET /api/portfolio/history
```

**Risk Analysis:**
```typescript
POST /api/risk/analyze
GET /api/risk/metrics
GET /api/risk/alerts
POST /api/risk/configure
```

**Automação:**
```typescript
GET /api/automation/status
POST /api/automation/configure
GET /api/automation/history
POST /api/automation/execute
```

### Integrações Externas:

**Blockchain:**
- Ethereum (Mainnet/Sepolia)
- Polygon (Mainnet/Mumbai)
- Avalanche (Mainnet/Fuji)
- BSC (Mainnet/Testnet)

**Oráculos:**
- Chainlink Data Feeds
- Chainlink Automation
- Chainlink CCIP
- Chainlink VRF

**Market Data:**
- CoinGecko API
- CoinMarketCap API
- DeFiPulse API
- TheGraph Protocol

**IA Services:**
- OpenAI GPT-4
- Anthropic Claude
- Custom ElizaOS Models

### WebSocket Events:

```typescript
// Cliente
socket.on('portfolio_update', (data) => {
  // Atualização de portfólio
});

socket.on('risk_alert', (alert) => {
  // Alerta de risco
});

socket.on('automation_executed', (execution) => {
  // Automação executada
});

// Servidor
socket.emit('subscribe_portfolio', { address });
socket.emit('configure_alerts', { preferences });
```

---

## 🔒 Segurança e Boas Práticas {#seguranca}

### Camadas de Segurança:

**Autenticação e Autorização:**
- JWT para autenticação de API
- Controle de acesso baseado em funções (RBAC)
- Sessões seguras com expiração
- 2FA para operações críticas

**Proteção de Dados:**
- Criptografia em repouso (AES-256)
- Criptografia em trânsito (TLS 1.3)
- Sanitização de entrada de dados
- Validação de parâmetros

**Segurança de API:**
- Rate limiting (100 req/min por IP)
- CORS configurado
- Proteção contra CSRF
- Validação de origem

**Segurança Blockchain:**
- Validações on-chain
- Proteção contra slippage
- Verificações de saldo
- Monitoramento de taxas

### Práticas de Desenvolvimento:

**Código Seguro:**
```typescript
// ✅ Correto: Validação de entrada
function processUserInput(input: string) {
  if (!input || input.length > MAX_LENGTH) {
    throw new ValidationError('Input inválido');
  }
  return sanitizeInput(input);
}

// ✅ Correto: Consulta parametrizada
function queryUser(id: string) {
  return db.query('SELECT * FROM users WHERE id = ?', [id]);
}
```

**Smart Contracts:**
```solidity
// ✅ Correto: Checks-Effects-Interactions
function executeTransfer(uint256 amount) external {
    require(amount > 0, "Amount must be positive");
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    balances[msg.sender] -= amount;
    require(token.transfer(msg.sender, amount), "Transfer failed");
}
```

### Monitoramento e Alertas:

**Sistema de Logs:**
- Logs estruturados (JSON)
- Rastreamento de eventos críticos
- Alertas em tempo real
- Análise de anomalias

**Métricas de Segurança:**
- Taxa de tentativas de invasão
- Tempo de resposta a incidentes
- Cobertura de testes de segurança
- Vulnerabilidades identificadas

---

## 🛠️ Desenvolvimento e Contribuição {#desenvolvimento}

### Estrutura de Desenvolvimento:

**Frontend:**
```bash
cd frontend
npm run dev        # Desenvolvimento
npm run build      # Build produção
npm run lint       # Linting
npm run test       # Testes
```

**Backend:**
```bash
cd backend
npm run dev        # Desenvolvimento
npm run build      # Build produção
npm run test       # Testes
npm run test:watch # Testes em watch mode
```

**Smart Contracts:**
```bash
npx hardhat compile         # Compilar contratos
npx hardhat test           # Testes
npx hardhat deploy         # Deploy
npx hardhat verify         # Verificar no Etherscan
```

### Padrões de Código:

**TypeScript:**
- Strict mode habilitado
- ESLint + Prettier
- Interfaces bem definidas
- Documentação JSDoc

**React:**
- Hooks personalizados
- Context API para estado global
- Componentes reutilizáveis
- Lazy loading

**Solidity:**
- OpenZeppelin padrões
- Natspec documentation
- Testes abrangentes
- Gas optimization

### Testes:

**Frontend:**
```typescript
// Teste de componente
import { render, screen } from '@testing-library/react';
import { DashboardPage } from './page';

test('renders dashboard correctly', () => {
  render(<DashboardPage />);
  expect(screen.getByText('Portfolio Overview')).toBeInTheDocument();
});
```

**Backend:**
```typescript
// Teste de API
describe('Portfolio API', () => {
  test('GET /api/portfolio/overview', async () => {
    const response = await request(app)
      .get('/api/portfolio/overview')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalValue');
  });
});
```

**Smart Contracts:**
```solidity
// Teste de contrato
describe("RiskGuardianMaster", function () {
  it("Should execute stop loss correctly", async function () {
    await riskGuardian.executeStopLoss(user.address, orderId);
    expect(await riskGuardian.getOrderStatus(orderId)).to.equal("executed");
  });
});
```

### CI/CD Pipeline:

```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test
      - run: npm run build
```

---

## 🚀 Roadmap e Futuro {#roadmap}

### Versão Atual (v1.0):

✅ **Funcionalidades Implementadas:**
- Dashboard completo com métricas de risco
- Integração Web3 com múltiplas carteiras
- Sistema de alertas em tempo real
- IA ElizaOS para análise de portfólio
- Automação Chainlink básica
- Suporte multi-chain (Testnet)
- Sistema de seguros DeFi

### Próximas Versões:

**v1.1 - Melhorias de UX (Q1 2024):**
- [ ] Mobile app (React Native)
- [ ] Notificações push nativas
- [ ] Onboarding aprimorado
- [ ] Tutoriais interativos
- [ ] Suporte a mais idiomas

**v1.2 - Expansão de Chains (Q2 2024):**
- [ ] Suporte Mainnet completo
- [ ] Integração com Arbitrum
- [ ] Suporte a Optimism
- [ ] Base network
- [ ] Solana integration

**v1.3 - IA Avançada (Q3 2024):**
- [ ] Modelos de IA personalizados
- [ ] Análise de sentimento de mercado
- [ ] Previsões de preço ML
- [ ] Recomendações de yield farming
- [ ] Análise de liquidez

**v2.0 - Ecossistema Completo (Q4 2024):**
- [ ] Marketplace de estratégias
- [ ] DAO governance
- [ ] Token nativo ($RISK)
- [ ] Staking e rewards
- [ ] API pública
- [ ] SDK para desenvolvedores

### Tecnologias Futuras:

**Blockchain:**
- Layer 2 solutions
- Zero-knowledge proofs
- Account abstraction
- Cross-chain bridges

**IA/ML:**
- Reinforcement learning
- Federated learning
- On-chain AI
- Predictive analytics

**DeFi:**
- Liquid staking
- Real World Assets (RWA)
- Institutional products
- Regulatory compliance

---

## 📞 Suporte e Contato

### Equipe de Desenvolvimento:
- **Arquiteto Principal**: [Nome]
- **Lead Frontend**: [Nome]
- **Lead Backend**: [Nome]
- **Blockchain Developer**: [Nome]
- **AI/ML Engineer**: [Nome]

### Canais de Comunicação:
- **Email**: jistriane@live.com
- **LinkedIn**: www.linkedin.com/in/jibso
- **Discord**: jistriane
- **X (Twitter)**: @jistriane
- **Instagram**: jibso87

### Suporte Técnico:
- **Documentação**: https://docs.riskguardian.ai
- **Bug Reports**: https://github.com/riskguardian-ai/issues
- **Feature Requests**: https://github.com/riskguardian-ai/discussions
- **Security**: security@riskguardian.ai

---

## 📜 Licença e Legal

### Licença:
Este projeto está licenciado sob a [MIT License](LICENSE).

### Disclaimers:
- Este software é fornecido "como está"
- Não constitui aconselhamento financeiro
- Use por sua própria conta e risco
- Sempre faça sua própria pesquisa (DYOR)

### Compliance:
- Não coleta dados pessoais desnecessários
- Compatível com GDPR
- Não oferece serviços financeiros regulamentados
- Ferramenta educacional e de análise

---

**Última atualização:** Janeiro 2024
**Versão do documento:** 1.0
**Versão do software:** 1.0.0 