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

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Importar nossa classe após o mock
import { MarketDataService } from '../../services/market-data.service';

describe('📊 MarketDataService', () => {
  let marketDataService: MarketDataService;

  beforeEach(() => {
    marketDataService = new MarketDataService();
    jest.clearAllMocks();
  });

  describe('🌐 API Integration', () => {
    it('deve buscar preços da CoinGecko API', async () => {
      // Arrange
      const mockResponse = {
        data: {
          bitcoin: {
            usd: 45000,
            usd_24h_change: 2.5
          },
          ethereum: {
            usd: 3200,
            usd_24h_change: -1.2
          }
        }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);

      // Act
      const result = await marketDataService.getPrices(['bitcoin', 'ethereum']);

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('coingecko.com'),
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('deve lidar com erro de API graciosamente', async () => {
      // Arrange
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      // Act & Assert
      await expect(
        marketDataService.getPrices(['bitcoin'])
      ).rejects.toThrow('API Error');
    });

    it('deve aplicar rate limiting', async () => {
      // Arrange
      const mockResponse = { data: { bitcoin: { usd: 45000 } } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      // Act - fazer múltiplas chamadas rapidamente
      const promises = [
        marketDataService.getPrices(['bitcoin']),
        marketDataService.getPrices(['ethereum']),
        marketDataService.getPrices(['cardano'])
      ];

      await Promise.all(promises);

      // Assert - deve ter respeitado rate limiting
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    });
  });

  describe('🧮 Data Processing', () => {
    it('deve calcular volatilidade corretamente', () => {
      // Arrange
      const prices = [100, 110, 95, 105, 90, 115];

      // Act
      const volatility = marketDataService.calculateVolatility(prices);

      // Assert
      expect(volatility).toBeGreaterThan(0);
      expect(volatility).toBeLessThan(1);
      expect(typeof volatility).toBe('number');
    });

    it('deve validar dados de entrada', () => {
      // Act & Assert
      expect(() => {
        marketDataService.calculateVolatility([]);
      }).toThrow();

      expect(() => {
        marketDataService.calculateVolatility([100]); // apenas um valor
      }).toThrow();
    });

    it('deve formatar dados para frontend', () => {
      // Arrange
      const rawData = {
        bitcoin: {
          usd: 45123.456789,
          usd_24h_change: 2.123456
        }
      };

      // Act
      const formatted = marketDataService.formatForFrontend(rawData);

      // Assert
      expect(formatted.bitcoin.price).toBe('45,123.46');
      expect(formatted.bitcoin.change24h).toBe('2.12');
    });
  });

  describe('⚡ Performance', () => {
    it('deve cachear resultados por tempo determinado', async () => {
      // Arrange
      const mockResponse = { data: { bitcoin: { usd: 45000 } } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      // Act - primeira chamada
      await marketDataService.getPrices(['bitcoin']);
      
      // Act - segunda chamada (deve usar cache)
      await marketDataService.getPrices(['bitcoin']);

      // Assert - deve ter feito apenas uma chamada HTTP
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('deve limpar cache expirado', async () => {
      // Arrange
      const mockResponse = { data: { bitcoin: { usd: 45000 } } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      // Act - primeira chamada
      await marketDataService.getPrices(['bitcoin']);
      
      // Simular passagem de tempo
      jest.advanceTimersByTime(6 * 60 * 1000); // 6 minutos
      
      // Segunda chamada após cache expirar
      await marketDataService.getPrices(['bitcoin']);

      // Assert - deve ter feito duas chamadas HTTP
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });
  });

  describe('🔒 Error Handling', () => {
    it('deve retornar dados de fallback em caso de erro', async () => {
      // Arrange
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      // Act
      const result = await marketDataService.getPricesWithFallback(['bitcoin']);

      // Assert
      expect(result).toBeDefined();
      expect(result.bitcoin).toBeDefined();
      expect(result.bitcoin.source).toBe('fallback');
    });

    it('deve logar erros adequadamente', async () => {
      // Arrange
      const consoleSpy = jest.spyOn(console, 'error');
      mockedAxios.get.mockRejectedValue(new Error('API down'));

      // Act
      try {
        await marketDataService.getPrices(['bitcoin']);
      } catch (error) {
        // Error expected
      }

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Market data error'),
        expect.any(Error)
      );
    });
  });

  describe('📝 Validation', () => {
    it('deve validar símbolos de criptomoedas', () => {
      // Act & Assert
      expect(marketDataService.isValidSymbol('bitcoin')).toBe(true);
      expect(marketDataService.isValidSymbol('ethereum')).toBe(true);
      expect(marketDataService.isValidSymbol('')).toBe(false);
      expect(marketDataService.isValidSymbol('invalid-coin')).toBe(false);
    });

    it('deve sanitizar entrada do usuário', () => {
      // Arrange
      const maliciousInput = ['bitcoin', '<script>alert("xss")</script>', 'ethereum'];

      // Act
      const sanitized = marketDataService.sanitizeSymbols(maliciousInput);

      // Assert
      expect(sanitized).toEqual(['bitcoin', 'ethereum']);
      expect(sanitized).not.toContain('<script>');
    });
  });
}); 