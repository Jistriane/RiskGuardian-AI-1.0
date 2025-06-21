/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Sistema completo de gestão de riscos para portfolios DeFi
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:8001';
const TEST_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

async function testNonceEndpoint() {
  try {
    console.log('🔐 Testando endpoint de nonce...');
    
    const response = await axios.post(`${BASE_URL}/api/auth/nonce`, {
      address: TEST_ADDRESS
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Sucesso!');
    console.log('📝 Resposta:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Erro:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Executa os testes
async function runTests() {
  try {
    await testNonceEndpoint();
  } catch (error) {
    console.error('❌ Testes falharam');
    process.exit(1);
  }
}

runTests();