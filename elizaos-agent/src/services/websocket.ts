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
import { Server } from 'http';
import logger from '../config/logger';
import { aiAgentService } from './ai-agent';

interface WSMessage {
  type: 'analyze' | 'history' | 'market_update';
  address?: string;
  content?: string;
}

export class WebSocketService {
  private wss: WebSocket.Server;
  private clients: Map<WebSocket, string> = new Map(); // ws -> address mapping

  constructor(server: Server) {
    this.wss = new WebSocket.Server({ server });
    this.setupWebSocket();
    
    logger.info('WebSocket service initialized');
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws: WebSocket) => {
      logger.info('New WebSocket connection established');

      ws.on('message', async (message: string) => {
        try {
          const data: WSMessage = JSON.parse(message);
          await this.handleMessage(ws, data);
        } catch (error) {
          logger.error('Error handling WebSocket message:', error);
          this.sendError(ws, 'Invalid message format');
        }
      });

      ws.on('close', () => {
        this.clients.delete(ws);
        logger.info('WebSocket connection closed');
      });

      ws.on('error', (error) => {
        logger.error('WebSocket error:', error);
        this.clients.delete(ws);
      });
    });
  }

  private async handleMessage(ws: WebSocket, message: WSMessage) {
    switch (message.type) {
      case 'analyze':
        if (!message.address) {
          this.sendError(ws, 'Address is required');
          return;
        }
        
        this.clients.set(ws, message.address);
        
        try {
          const analysis = await aiAgentService.analyzePortfolio(
            message.address,
            message.content
          );
          
          this.send(ws, {
            type: 'analysis_result',
            content: analysis
          });
        } catch (error) {
          logger.error('Analysis failed:', error);
          this.sendError(ws, 'Analysis failed');
        }
        break;

      case 'history':
        const address = this.clients.get(ws);
        if (!address) {
          this.sendError(ws, 'No active analysis session');
          return;
        }
        
        const history = aiAgentService.getConversationHistory(address);
        this.send(ws, {
          type: 'history_result',
          content: history
        });
        break;

      case 'market_update':
        // Broadcast market updates to all connected clients
        this.broadcast({
          type: 'market_update',
          content: message.content
        });
        break;

      default:
        this.sendError(ws, 'Unknown message type');
    }
  }

  private send(ws: WebSocket, data: any) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }

  private sendError(ws: WebSocket, error: string) {
    this.send(ws, {
      type: 'error',
      content: error
    });
  }

  private broadcast(data: any) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

export const createWebSocketService = (server: Server): WebSocketService => {
  return new WebSocketService(server);
}; 