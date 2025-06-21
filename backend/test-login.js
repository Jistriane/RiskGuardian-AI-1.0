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

const TEST_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
const TEST_SIGNATURE = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

async function testLogin() {
  try {
    // Step 1: Request nonce
    console.log('🔑 Requesting nonce...');
    const nonceResponse = await axios.post('http://localhost:8001/api/auth/nonce', {
      address: TEST_ADDRESS
    });

    const { nonce, message } = nonceResponse.data.data;
    console.log('✅ Nonce received:', nonce);
    console.log('📝 Message to sign:', message);

    // Step 2: Attempt login
    console.log('\n🔐 Attempting login...');
    const loginResponse = await axios.post('http://localhost:8001/api/auth/login', {
      address: TEST_ADDRESS,
      signature: TEST_SIGNATURE,
      message: message
    });

    console.log('\n🎉 Login Response:', JSON.stringify(loginResponse.data, null, 2));

  } catch (error) {
    if (error.response) {
      console.error('❌ Error Response:', error.response.data);
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

testLogin();