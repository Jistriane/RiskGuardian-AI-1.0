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

import WebSocket from 'ws';
import { config } from '../config/env';

const ws = new WebSocket(`ws://localhost:${config.port}`);

ws.on('open', () => {
  console.log('Connected to server');

  // Example: Analyze a portfolio
  const message = {
    type: 'analyze',
    address: '0x742d35Cc6635C0532925a3b8D0D8f8Cc86d0AB8B',
    content: 'Please analyze my DeFi portfolio risk'
  };

  ws.send(JSON.stringify(message));
});

ws.on('message', (data: string) => {
  try {
    const response = JSON.parse(data);
    console.log('Received:', response);

    if (response.type === 'analysis_result') {
      // Request conversation history
      ws.send(JSON.stringify({
        type: 'history'
      }));
    }
  } catch (error) {
    console.error('Error parsing message:', error);
  }
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.on('close', () => {
  console.log('Disconnected from server');
}); 