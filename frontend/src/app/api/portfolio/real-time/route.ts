import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://riskguardian-backend.onrender.com';
    
    const response = await fetch(`${backendUrl}/api/portfolio/real-time`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  } catch (error) {
    console.error('Error fetching from backend:', error);
    
    // Fallback data se o backend não estiver disponível
    const fallbackData = {
      timestamp: new Date().toISOString(),
      prices: {
        BTC: { price: 45000, change24h: 2.5 },
        ETH: { price: 3000, change24h: -1.2 },
        USDC: { price: 1.0, change24h: 0.01 }
      },
      portfolio: {
        totalValue: 52500,
        totalChange24h: 250,
        assets: [
          { symbol: 'BTC', balance: 0.5, value: 22500, change24h: 125 },
          { symbol: 'ETH', balance: 2, value: 6000, change24h: -24 },
          { symbol: 'USDC', balance: 10000, value: 10000, change24h: 1 }
        ]
      },
      riskMetrics: {
        volatility: 45.2,
        sharpeRatio: 1.8,
        maxDrawdown: -12.5,
        var95: -850,
        beta: 0.9,
        diversificationScore: 75.5
      },
      lastUpdate: new Date().toISOString()
    };
    
    return NextResponse.json(fallbackData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
} 