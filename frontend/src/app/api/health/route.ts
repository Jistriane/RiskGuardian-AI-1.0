import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const timestamp = new Date().toISOString();
  
  return NextResponse.json({
    status: 'healthy',
    timestamp,
    message: 'RiskGuardian AI API is running',
    realTime: true,
    environment: process.env.NODE_ENV || 'development'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: 'Data received successfully',
      timestamp: new Date().toISOString(),
      data: body
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }
} 