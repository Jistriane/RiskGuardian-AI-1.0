#!/bin/bash

echo "🧪 Configurando Ambiente de Testes - RiskGuardian AI"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. BACKEND TESTING SETUP
echo -e "${BLUE}📦 Configurando testes Backend...${NC}"

cd backend

# Install testing dependencies
npm install --save-dev \
  jest \
  @types/jest \
  @jest/globals \
  ts-jest \
  supertest \
  @types/supertest \
  jest-environment-node \
  @testcontainers/postgresql \
  @testcontainers/redis

# Create Jest configuration
cat > jest.config.js << 'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/tests/**/*'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json-summary'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testTimeout: 30000,
  maxWorkers: 1, // Para testes com containers
  globalSetup: '<rootDir>/src/tests/globalSetup.ts',
  globalTeardown: '<rootDir>/src/tests/globalTeardown.ts'
};
EOF

# Create test setup file
mkdir -p src/tests/unit src/tests/integration src/tests/fixtures

cat > src/tests/setup.ts << 'EOF'
import { jest } from '@jest/globals';

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5433/test_db';
process.env.REDIS_URL = 'redis://localhost:6380';

// Global test timeout
jest.setTimeout(30000);

// Mock external APIs
global.fetch = jest.fn();

// Console override for cleaner test output
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});
EOF

# Create global setup for test containers
cat > src/tests/globalSetup.ts << 'EOF'
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RedisContainer } from '@testcontainers/redis';

export default async () => {
  // Start PostgreSQL container
  const postgres = await new PostgreSqlContainer()
    .withDatabase('test_db')
    .withUsername('test')
    .withPassword('test')
    .withExposedPorts(5432)
    .start();

  // Start Redis container
  const redis = await new RedisContainer()
    .withExposedPorts(6379)
    .start();

  // Store connection details
  process.env.TEST_POSTGRES_HOST = postgres.getHost();
  process.env.TEST_POSTGRES_PORT = postgres.getMappedPort(5432).toString();
  process.env.TEST_REDIS_HOST = redis.getHost();
  process.env.TEST_REDIS_PORT = redis.getMappedPort(6379).toString();

  // Store container references for teardown
  (global as any).__TESTCONTAINERS__ = {
    postgres,
    redis
  };
};
EOF

cat > src/tests/globalTeardown.ts << 'EOF'
export default async () => {
  const containers = (global as any).__TESTCONTAINERS__;
  
  if (containers) {
    await containers.postgres.stop();
    await containers.redis.stop();
  }
};
EOF

# Update package.json scripts
npm pkg set scripts.test="jest"
npm pkg set scripts.test:watch="jest --watch"
npm pkg set scripts.test:coverage="jest --coverage"
npm pkg set scripts.test:integration="jest --testPathPattern=integration"
npm pkg set scripts.test:unit="jest --testPathPattern=unit"

echo -e "${GREEN}✅ Backend testing configurado!${NC}"

# 2. FRONTEND TESTING SETUP
echo -e "${BLUE}📦 Configurando testes Frontend...${NC}"

cd ../frontend

# Install testing dependencies
npm install --save-dev \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  jest-environment-jsdom \
  @jest/globals \
  cypress \
  @cypress/code-coverage \
  cypress-lighthouse \
  cypress-axe \
  @testing-library/cypress

# Create Jest configuration for frontend
cat > jest.config.js << 'EOF'
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
};

module.exports = createJestConfig(customJestConfig);
EOF

# Create Jest setup file
cat > jest.setup.js << 'EOF'
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock Web3 provider
global.ethereum = {
  request: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
EOF

# Create Cypress configuration
cat > cypress.config.ts << 'EOF'
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // Lighthouse plugin
      require('cypress-lighthouse')(on, config);
      
      // Code coverage
      require('@cypress/code-coverage/task')(on, config);
      
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    supportFile: 'cypress/support/component.ts',
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
  },
});
EOF

# Create Cypress support files
mkdir -p cypress/support cypress/e2e cypress/fixtures cypress/downloads

cat > cypress/support/e2e.ts << 'EOF'
import './commands';
import 'cypress-axe';
import '@cypress/code-coverage/support';

// Hide XHR requests in command log
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}
EOF

cat > cypress/support/commands.ts << 'EOF'
declare namespace Cypress {
  interface Chainable {
    connectWallet(): Chainable<void>;
    mockWeb3(): Chainable<void>;
    loginUser(wallet: string): Chainable<void>;
  }
}

Cypress.Commands.add('connectWallet', () => {
  cy.window().then((win) => {
    win.ethereum = {
      request: cy.stub().resolves(['0x1234567890abcdef1234567890abcdef12345678']),
      on: cy.stub(),
      removeListener: cy.stub(),
    };
  });
});

Cypress.Commands.add('mockWeb3', () => {
  cy.window().then((win) => {
    win.Web3 = class MockWeb3 {
      constructor() {}
      eth = {
        getAccounts: cy.stub().resolves(['0x123...']),
        getBalance: cy.stub().resolves('1000000000000000000'),
      };
    };
  });
});

Cypress.Commands.add('loginUser', (wallet: string) => {
  cy.window().then((win) => {
    win.localStorage.setItem('wallet-connected', 'true');
    win.localStorage.setItem('wallet-address', wallet);
  });
});
EOF

# Create test fixtures
cat > cypress/fixtures/market-data.json << 'EOF'
{
  "bitcoin": {
    "current_price": 45000,
    "price_change_24h": 2.5,
    "market_cap": 850000000000
  },
  "ethereum": {
    "current_price": 3200,
    "price_change_24h": -1.2,
    "market_cap": 380000000000
  }
}
EOF

cat > cypress/fixtures/portfolio-data.json << 'EOF'
{
  "totalValue": 125000,
  "totalPnl": 15000,
  "riskScore": 65,
  "positions": [
    {
      "symbol": "ETH",
      "amount": 25,
      "value": 80000,
      "pnl": 12000
    },
    {
      "symbol": "BTC",
      "amount": 1,
      "value": 45000,
      "pnl": 3000
    }
  ]
}
EOF

# Update package.json scripts
npm pkg set scripts.test="jest"
npm pkg set scripts.test:watch="jest --watch"
npm pkg set scripts.test:coverage="jest --coverage"
npm pkg set scripts.cypress:open="cypress open"
npm pkg set scripts.cypress:run="cypress run"
npm pkg set scripts.e2e="start-server-and-test dev http://localhost:3000 'cypress run'"

echo -e "${GREEN}✅ Frontend testing configurado!${NC}"

# 3. INTEGRATION TESTS SETUP
echo -e "${BLUE}🔗 Configurando testes de integração...${NC}"

cd ..

# Create integration test script
cat > scripts/run-integration-tests.sh << 'EOF'
#!/bin/bash

echo "🧪 Executando Testes de Integração Completos"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Start services
echo -e "${BLUE}🚀 Iniciando serviços...${NC}"
docker-compose up -d postgres redis

# Wait for services
echo -e "${YELLOW}⏳ Aguardando serviços...${NC}"
sleep 10

# Run backend tests
echo -e "${BLUE}🔧 Executando testes Backend...${NC}"
cd backend
npm run test:coverage

# Run frontend tests
echo -e "${BLUE}🌐 Executando testes Frontend...${NC}"
cd ../frontend
npm run test:coverage

# Start application for E2E
echo -e "${BLUE}🚀 Iniciando aplicação para E2E...${NC}"
npm run build
npm run start &
SERVER_PID=$!

# Wait for server
sleep 30

# Run E2E tests
echo -e "${BLUE}🎭 Executando testes E2E...${NC}"
npm run cypress:run

# Cleanup
echo -e "${YELLOW}🧹 Limpando...${NC}"
kill $SERVER_PID
cd ..
docker-compose down

echo -e "${GREEN}✅ Testes de integração concluídos!${NC}"
EOF

chmod +x scripts/run-integration-tests.sh

# 4. COVERAGE REPORT SETUP
echo -e "${BLUE}📊 Configurando relatórios de coverage...${NC}"

cat > scripts/generate-coverage-report.sh << 'EOF'
#!/bin/bash

echo "📊 Gerando Relatório de Coverage Consolidado"

# Create coverage directory
mkdir -p coverage/merged

# Backend coverage
cd backend
npm run test:coverage
cp coverage/lcov.info ../coverage/merged/backend-lcov.info

# Frontend coverage  
cd ../frontend
npm run test:coverage
cp coverage/lcov.info ../coverage/merged/frontend-lcov.info

# Merge coverage reports
cd ..
npx lcov-result-merger 'coverage/merged/*-lcov.info' coverage/merged/lcov.info

# Generate HTML report
npx genhtml coverage/merged/lcov.info --output-directory coverage/merged/html

echo "📊 Relatório disponível em: coverage/merged/html/index.html"

# Upload to Codecov (if CI)
if [ "$CI" = "true" ]; then
  npx codecov -f coverage/merged/lcov.info
fi
EOF

chmod +x scripts/generate-coverage-report.sh

# 5. PERFORMANCE TESTING SETUP
echo -e "${BLUE}⚡ Configurando testes de performance...${NC}"

npm install --save-dev lighthouse artillery @types/artillery

cat > performance/lighthouse.config.js << 'EOF'
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/dashboard'],
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.9}],
        'categories:seo': ['warn', {minScore: 0.9}],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './performance/lighthouse-results',
    },
  },
};
EOF

cat > performance/artillery-config.yml << 'EOF'
config:
  target: 'http://localhost:8001'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Load test"
    - duration: 60
      arrivalRate: 100
      name: "Stress test"
  http:
    timeout: 10
scenarios:
  - name: "API Health Check"
    weight: 30
    flow:
      - get:
          url: "/health"
  - name: "Market Data"
    weight: 40
    flow:
      - get:
          url: "/api/market/prices"
  - name: "Portfolio Data"
    weight: 30
    flow:
      - get:
          url: "/api/portfolio/overview"
EOF

# Add performance test scripts
npm pkg set scripts.test:lighthouse="lighthouse-ci"
npm pkg set scripts.test:artillery="artillery run performance/artillery-config.yml"
npm pkg set scripts.test:performance="npm run test:lighthouse && npm run test:artillery"

echo -e "${GREEN}✅ Configuração de testes concluída!${NC}"
echo ""
echo -e "${BLUE}📋 Comandos disponíveis:${NC}"
echo "Backend:"
echo "  npm run test                 # Testes unitários"
echo "  npm run test:integration     # Testes de integração"
echo "  npm run test:coverage        # Coverage report"
echo ""
echo "Frontend:"
echo "  npm run test                 # Testes unitários"
echo "  npm run cypress:open         # Cypress UI"
echo "  npm run cypress:run          # Cypress headless"
echo "  npm run e2e                  # E2E completo"
echo ""
echo "Integração:"
echo "  ./scripts/run-integration-tests.sh     # Todos os testes"
echo "  ./scripts/generate-coverage-report.sh  # Coverage consolidado"
echo ""
echo "Performance:"
echo "  npm run test:lighthouse      # Lighthouse CI"
echo "  npm run test:artillery       # Load testing"
echo "  npm run test:performance     # Performance completo" 