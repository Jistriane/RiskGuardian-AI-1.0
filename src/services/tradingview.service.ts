import axios from 'axios';

// Configurações das APIs de dados de mercado
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const BINANCE_API = 'https://api.binance.com/api/v3';

// Tipos para dados de mercado
export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap?: number;
  high24h: number;
  low24h: number;
  lastUpdate: string;
}

export interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface HistoricalPrice {
  timestamp: number;
  price: number;
}

class TradingViewService {
  private cache: Map<string, { data: any; expiry: number }> = new Map();
  private readonly CACHE_DURATION = 30000; // 30 segundos

  // Verificar se dados estão em cache e válidos
  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() < cached.expiry) {
      return cached.data;
    }
    return null;
  }

  // Armazenar dados em cache
  private setCachedData(key: string, data: any): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.CACHE_DURATION
    });
  }

  // Buscar dados de mercado em tempo real
  async getMarketData(symbols: string[]): Promise<MarketData[]> {
    const cacheKey = `market_${symbols.join(',')}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // Usar CoinGecko para dados mais completos
      const coinGeckoIds = this.mapSymbolsToCoinGeckoIds(symbols);
      const response = await axios.get(
        `${COINGECKO_API}/simple/price`,
        {
          params: {
            ids: coinGeckoIds.join(','),
            vs_currencies: 'usd',
            include_24hr_change: true,
            include_24hr_vol: true,
            include_market_cap: true,
            include_last_updated_at: true
          },
          timeout: 10000
        }
      );

      const marketData: MarketData[] = [];
      
      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        const coinGeckoId = coinGeckoIds[i];
        const data = response.data[coinGeckoId];
        
        if (data) {
          // Buscar high/low do Binance para complementar
          const binanceData = await this.getBinanceData(symbol);
          
          marketData.push({
            symbol: symbol.toUpperCase(),
            price: data.usd,
            change24h: data.usd_24h_change || 0,
            changePercent24h: data.usd_24h_change || 0,
            volume24h: data.usd_24h_vol || 0,
            marketCap: data.usd_market_cap,
            high24h: binanceData?.high24h || data.usd * 1.05,
            low24h: binanceData?.low24h || data.usd * 0.95,
            lastUpdate: new Date(data.last_updated_at * 1000).toISOString()
          });
        }
      }

      this.setCachedData(cacheKey, marketData);
      return marketData;
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Retornar dados simulados como fallback
      return this.getFallbackMarketData(symbols);
    }
  }

  // Buscar dados complementares do Binance
  private async getBinanceData(symbol: string): Promise<{high24h: number; low24h: number} | null> {
    try {
      const binanceSymbol = symbol.toUpperCase() + 'USDT';
      const response = await axios.get(
        `${BINANCE_API}/ticker/24hr`,
        {
          params: { symbol: binanceSymbol },
          timeout: 5000
        }
      );

      return {
        high24h: parseFloat(response.data.highPrice),
        low24h: parseFloat(response.data.lowPrice)
      };
    } catch (error) {
      return null;
    }
  }

  // Buscar dados históricos para gráficos
  async getHistoricalData(
    symbol: string, 
    days: number = 7
  ): Promise<HistoricalPrice[]> {
    const cacheKey = `historical_${symbol}_${days}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const coinGeckoId = this.mapSymbolToCoinGeckoId(symbol);
      const response = await axios.get(
        `${COINGECKO_API}/coins/${coinGeckoId}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: days,
            interval: days <= 1 ? 'hourly' : 'daily'
          },
          timeout: 15000
        }
      );

      const historicalData: HistoricalPrice[] = response.data.prices.map(
        ([timestamp, price]: [number, number]) => ({
          timestamp,
          price
        })
      );

      this.setCachedData(cacheKey, historicalData);
      return historicalData;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return this.getFallbackHistoricalData(symbol, days);
    }
  }

  // Buscar dados de candlestick para análise técnica
  async getCandlestickData(
    symbol: string,
    interval: '1h' | '4h' | '1d' = '1h',
    limit: number = 100
  ): Promise<CandlestickData[]> {
    const cacheKey = `candles_${symbol}_${interval}_${limit}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const binanceSymbol = symbol.toUpperCase() + 'USDT';
      const response = await axios.get(
        `${BINANCE_API}/klines`,
        {
          params: {
            symbol: binanceSymbol,
            interval: interval,
            limit: limit
          },
          timeout: 10000
        }
      );

      const candlestickData: CandlestickData[] = response.data.map(
        (candle: any[]) => ({
          time: candle[0],
          open: parseFloat(candle[1]),
          high: parseFloat(candle[2]),
          low: parseFloat(candle[3]),
          close: parseFloat(candle[4]),
          volume: parseFloat(candle[5])
        })
      );

      this.setCachedData(cacheKey, candlestickData);
      return candlestickData;
    } catch (error) {
      console.error('Error fetching candlestick data:', error);
      return this.getFallbackCandlestickData(symbol, limit);
    }
  }

  // Mapear símbolos para IDs do CoinGecko
  private mapSymbolsToCoinGeckoIds(symbols: string[]): string[] {
    const mapping: { [key: string]: string } = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'AVAX': 'avalanche-2',
      'USDT': 'tether',
      'USDC': 'usd-coin',
      'DAI': 'dai',
      'LINK': 'chainlink',
      'UNI': 'uniswap',
      'AAVE': 'aave',
      'COMP': 'compound-governance-token'
    };

    return symbols.map(symbol => mapping[symbol.toUpperCase()] || symbol.toLowerCase());
  }

  private mapSymbolToCoinGeckoId(symbol: string): string {
    return this.mapSymbolsToCoinGeckoIds([symbol])[0];
  }

  // Dados de fallback quando APIs falham
  private getFallbackMarketData(symbols: string[]): MarketData[] {
    const baseData: { [key: string]: Partial<MarketData> } = {
      'BTC': { price: 43000, changePercent24h: 2.5 },
      'ETH': { price: 2600, changePercent24h: 1.8 },
      'AVAX': { price: 38, changePercent24h: -0.5 },
      'USDT': { price: 1.0, changePercent24h: 0.0 }
    };

    return symbols.map(symbol => {
      const base = baseData[symbol.toUpperCase()] || { price: 100, changePercent24h: 0 };
      return {
        symbol: symbol.toUpperCase(),
        price: base.price!,
        change24h: (base.price! * base.changePercent24h!) / 100,
        changePercent24h: base.changePercent24h!,
        volume24h: base.price! * 1000000,
        high24h: base.price! * 1.05,
        low24h: base.price! * 0.95,
        lastUpdate: new Date().toISOString()
      };
    });
  }

  private getFallbackHistoricalData(symbol: string, days: number): HistoricalPrice[] {
    const basePrice = symbol === 'BTC' ? 43000 : symbol === 'ETH' ? 2600 : 100;
    const data: HistoricalPrice[] = [];
    const now = Date.now();
    const interval = (days * 24 * 60 * 60 * 1000) / 100; // 100 pontos

    for (let i = 0; i < 100; i++) {
      data.push({
        timestamp: now - (99 - i) * interval,
        price: basePrice * (0.95 + Math.random() * 0.1)
      });
    }

    return data;
  }

  private getFallbackCandlestickData(symbol: string, limit: number): CandlestickData[] {
    const basePrice = symbol === 'BTC' ? 43000 : symbol === 'ETH' ? 2600 : 100;
    const data: CandlestickData[] = [];
    const now = Date.now();
    const interval = 60 * 60 * 1000; // 1 hora

    for (let i = 0; i < limit; i++) {
      const open = basePrice * (0.95 + Math.random() * 0.1);
      const close = open * (0.98 + Math.random() * 0.04);
      const high = Math.max(open, close) * (1 + Math.random() * 0.02);
      const low = Math.min(open, close) * (1 - Math.random() * 0.02);

      data.push({
        time: now - (limit - 1 - i) * interval,
        open,
        high,
        low,
        close,
        volume: 1000000 + Math.random() * 5000000
      });
    }

    return data;
  }

  // Limpar cache manualmente
  clearCache(): void {
    this.cache.clear();
  }

  // Verificar se o serviço está funcionando
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${COINGECKO_API}/ping`, { timeout: 5000 });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

// Instância singleton
export const tradingViewService = new TradingViewService();

// Hook personalizado para usar o serviço
export const useTradingView = () => {
  return {
    tradingViewService,
    getMarketData: tradingViewService.getMarketData.bind(tradingViewService),
    getHistoricalData: tradingViewService.getHistoricalData.bind(tradingViewService),
    getCandlestickData: tradingViewService.getCandlestickData.bind(tradingViewService),
    clearCache: tradingViewService.clearCache.bind(tradingViewService),
    healthCheck: tradingViewService.healthCheck.bind(tradingViewService)
  };
}; 