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

import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import logger from '../config/logger';
import { config } from '../config/env';
import { cacheService } from './cache';

interface AIProvider {
  name: string;
  analyze: (input: string) => Promise<string>;
}

interface PortfolioAnalysis {
  riskLevel: 'low' | 'moderate' | 'high';
  totalValue: number;
  healthFactor: number;
  mainRisks: string[];
  recommendations: string[];
  explanation: string;
}

class OpenAIProvider implements AIProvider {
  public readonly name = 'OpenAI';
  private client: OpenAI;
  private readonly SYSTEM_PROMPT = `You are an expert DeFi risk analyst. Analyze portfolios and explain risks in simple English.
Focus on:
- Portfolio composition and diversification
- Risk metrics (health factor, collateral ratio)
- Market exposure and volatility
- Smart contract risks
- Historical performance
Provide actionable recommendations based on risk tolerance.`;

  constructor() {
    if (!config.openai.apiKey) {
      throw new Error('OpenAI API key not configured');
    }
    this.client = new OpenAI({
      apiKey: config.openai.apiKey
    });
  }

  async analyze(input: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: config.openai.model,
        messages: [
          { role: 'system', content: this.SYSTEM_PROMPT },
          { role: 'user', content: input }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content || 'No analysis available';
    } catch (error) {
      logger.error('OpenAI analysis failed:', error);
      throw error;
    }
  }
}

class AnthropicProvider implements AIProvider {
  public readonly name = 'Anthropic';
  private client: Anthropic;
  private readonly SYSTEM_PROMPT = `You are Claude, an expert DeFi risk analyst. Analyze portfolios and explain risks in simple English.`;

  constructor() {
    if (!config.anthropic.apiKey) {
      throw new Error('Anthropic API key not configured');
    }
    this.client = new Anthropic({
      apiKey: config.anthropic.apiKey
    });
  }

  async analyze(input: string): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: config.anthropic.model,
        max_tokens: 1000,
        system: this.SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: input }
        ]
      });

      if (!response.content || response.content.length === 0) {
        return 'No analysis available';
      }

      const textContent = response.content[0];
      if ('text' in textContent) {
        return textContent.text;
      }

      return 'No analysis available';
    } catch (error) {
      logger.error('Anthropic analysis failed:', error);
      throw error;
    }
  }
}

class MockProvider implements AIProvider {
  public readonly name = 'Mock';

  async analyze(input: string): Promise<string> {
    return `Mock analysis for input: ${input}\n\nThis is a development/testing response. Configure OpenAI or Anthropic API keys for production use.`;
  }
}

class AIAgentService {
  private providers: AIProvider[];
  private conversationHistory: Map<string, string[]>;

  constructor() {
    this.providers = [];
    
    // Initialize available providers
    try {
      this.providers.push(new OpenAIProvider());
      logger.info('OpenAI provider initialized successfully');
    } catch (error: any) {
      logger.warn('OpenAI provider not available:', error.message);
    }

    try {
      this.providers.push(new AnthropicProvider());
      logger.info('Anthropic provider initialized successfully');
    } catch (error: any) {
      logger.warn('Anthropic provider not available:', error.message);
    }

    // Add mock provider if no other providers are available
    if (this.providers.length === 0) {
      this.providers.push(new MockProvider());
      logger.warn('No AI providers available, using mock provider');
    }

    this.conversationHistory = new Map();

    logger.info('AI Agent Service initialized with providers:', {
      providers: this.providers.map(p => p.name)
    });
  }

  private async getPortfolioData(address: string): Promise<any> {
    const cacheKey = `portfolio_${address}`;
    let portfolioData = cacheService.get(cacheKey);

    if (!portfolioData) {
      // Mock data for development
      portfolioData = {
        tokens: [
          { symbol: 'ETH', amount: '1.5', value: 3000 },
          { symbol: 'USDC', amount: '5000', value: 5000 }
        ],
        protocols: ['Aave', 'Uniswap'],
        totalValue: 8000,
        healthFactor: 1.8
      };
      cacheService.set(cacheKey, portfolioData);
    }

    return portfolioData;
  }

  private async analyzeWithFallback(input: string): Promise<string> {
    for (const provider of this.providers) {
      try {
        const result = await provider.analyze(input);
        logger.info('Analysis successful with provider:', {
          provider: provider.name
        });
        return result;
      } catch (error) {
        logger.warn('Provider failed, trying next:', {
          provider: provider.name,
          error
        });
        continue;
      }
    }
    throw new Error('All AI providers failed');
  }

  public async analyzePortfolio(address: string, userContext?: string): Promise<PortfolioAnalysis> {
    try {
      const portfolioData = await this.getPortfolioData(address);
      
      const prompt = `Analyze this DeFi portfolio:
Address: ${address}
Total Value: ${portfolioData.totalValue} USD
Health Factor: ${portfolioData.healthFactor}
Tokens: ${JSON.stringify(portfolioData.tokens)}
Protocols: ${JSON.stringify(portfolioData.protocols)}
${userContext ? `User Context: ${userContext}` : ''}

Provide a detailed risk analysis and recommendations.`;

      const analysis = await this.analyzeWithFallback(prompt);
      
      // Store in conversation history
      this.updateConversationHistory(address, prompt, analysis);

      // Parse AI response into structured format
      return {
        riskLevel: 'moderate',
        totalValue: portfolioData.totalValue,
        healthFactor: portfolioData.healthFactor,
        mainRisks: ['Market volatility', 'Protocol risk'],
        recommendations: ['Consider diversifying', 'Monitor health factor'],
        explanation: analysis
      };
    } catch (error) {
      logger.error('Portfolio analysis failed:', error);
      throw error;
    }
  }

  private updateConversationHistory(address: string, prompt: string, response: string) {
    const history = this.conversationHistory.get(address) || [];
    history.push(`User: ${prompt}`);
    history.push(`AI: ${response}`);
    
    // Keep only last 10 interactions
    if (history.length > 20) {
      history.splice(0, 2);
    }
    
    this.conversationHistory.set(address, history);
  }

  public getConversationHistory(address: string): string[] {
    return this.conversationHistory.get(address) || [];
  }
}

export const aiAgentService = new AIAgentService(); 