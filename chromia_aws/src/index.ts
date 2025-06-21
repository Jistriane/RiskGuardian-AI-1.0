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

/**
 * RiskGuardian Chromia AWS - Sistema Principal
 * Integração completa com nó Chromia real e PostgreSQL
 */

require('dotenv').config();

import * as http from 'http';

/**
 * RiskGuardian ChromiaAWS Service - Versão Simplificada e Funcional
 */
class RiskGuardianChromiaAWSSimple {
    private server: http.Server | null = null;
    private port: number;
    
    constructor() {
        this.port = parseInt(process.env.PORT || '3004');
        console.log('✅ ChromiaAWS configurado para porta:', this.port);
    }

    /**
     * Inicia o serviço
     */
    public async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.server = http.createServer(this.handleRequest.bind(this));
                
                this.server.listen(this.port, () => {
                    console.log(`🚀 ChromiaAWS Service rodando na porta ${this.port}`);
                    console.log(`📡 Health check: http://localhost:${this.port}/health`);
                    console.log(`🌐 Status page: http://localhost:${this.port}/`);
                    resolve();
                });

                this.server.on('error', (error: Error) => {
                    console.error('❌ Erro no servidor:', error);
                    reject(error);
                });

            } catch (error) {
                console.error('❌ Erro ao iniciar servidor:', error);
                reject(error);
            }
        });
    }

    /**
     * Manipula requisições HTTP
     */
    private handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control');

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        const url = req.url || '';
        
        // Health check endpoint
        if (url === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'healthy',
                service: 'chromia-aws',
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                port: this.port
            }));
            return;
        }

        // API endpoints
        if (url.startsWith('/api/')) {
            this.handleApiRequest(url, req.method || 'GET', res);
            return;
        }

        // Status page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>ChromiaAWS Service</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
                    .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    .status { color: #28a745; font-size: 18px; margin: 20px 0; }
                    .info { background: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .endpoint { background: #f8f9fa; padding: 10px; margin: 5px 0; border-left: 4px solid #007bff; }
                    h1 { color: #343a40; }
                    h3 { color: #495057; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🚀 RiskGuardian ChromiaAWS Service</h1>
                    <div class="status">✅ Service is running successfully</div>
                    
                    <div class="info">
                        <h3>Service Information:</h3>
                        <p><strong>Port:</strong> ${this.port}</p>
                        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
                        <p><strong>Chromia Node URL:</strong> ${process.env.CHROMIA_NODE_URL || 'http://localhost:7740'}</p>
                        <p><strong>Started:</strong> ${new Date().toISOString()}</p>
                    </div>

                    <h3>Available Endpoints:</h3>
                    <div class="endpoint">
                        <strong>GET /health</strong> - Health check endpoint
                    </div>
                    <div class="endpoint">
                        <strong>GET /api/status</strong> - Service status
                    </div>
                    <div class="endpoint">
                        <strong>GET /api/portfolio</strong> - Portfolio data (mock)
                    </div>
                    <div class="endpoint">
                        <strong>GET /api/alerts</strong> - Alert system (mock)
                    </div>
                    
                    <p style="margin-top: 30px; color: #6c757d; font-size: 14px;">
                        RiskGuardian AI - Dashboard Analítico de Risco DeFi
                    </p>
                </div>
            </body>
            </html>
        `);
    }

    /**
     * Manipula requisições da API
     */
    private handleApiRequest(url: string, method: string, res: http.ServerResponse): void {
        try {
            const response = { method, url, timestamp: new Date().toISOString() };

            switch (url) {
                case '/api/status':
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        ...response,
                        status: 'operational',
                        service: 'chromia-aws',
                        version: '1.0.0',
                        uptime: process.uptime()
                    }));
                    break;

                case '/api/portfolio':
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        ...response,
                        message: 'Portfolio API endpoint',
                        data: {
                            portfolios: [],
                            totalValue: 0,
                            lastUpdated: new Date().toISOString()
                        }
                    }));
                    break;

                case '/api/alerts':
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        ...response,
                        message: 'Alerts API endpoint',
                        data: {
                            alerts: [],
                            totalAlerts: 0,
                            lastCheck: new Date().toISOString()
                        }
                    }));
                    break;

                default:
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        ...response,
                        error: 'Endpoint not found',
                        availableEndpoints: ['/api/status', '/api/portfolio', '/api/alerts']
                    }));
            }
        } catch (error) {
            console.error('❌ Erro na API:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            }));
        }
    }

    /**
     * Para o serviço
     */
    public async stop(): Promise<void> {
        return new Promise((resolve) => {
            if (this.server) {
                console.log('🛑 Parando ChromiaAWS service...');
                this.server.close(() => {
                    console.log('✅ ChromiaAWS service parado');
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}

/**
 * Função principal
 */
async function main() {
    console.log('🚀 Iniciando RiskGuardian ChromiaAWS Service...');
    
    const service = new RiskGuardianChromiaAWSSimple();
    
    try {
        await service.start();

        // Graceful shutdown
        const shutdown = async (signal: string) => {
            console.log(`\n📡 Recebido sinal ${signal}, parando sistema...`);
            await service.stop();
            process.exit(0);
        };

        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));

        console.log('🎉 ChromiaAWS Service inicializado com sucesso!');
        console.log('👍 Pressione Ctrl+C para parar o serviço');

    } catch (error) {
        console.error('❌ Erro fatal:', error);
        process.exit(1);
    }
}

// Executar se for o arquivo principal
if (require.main === module) {
    main().catch(console.error);
}

export { RiskGuardianChromiaAWSSimple }; 