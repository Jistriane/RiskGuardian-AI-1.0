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

#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function testHydration() {
    console.log('🧪 Testando problemas de hidratação...');

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Capturar erros de console
        const consoleErrors = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error' || msg.text().includes('hydration') || msg.text().includes('Hydration')) {
                consoleErrors.push(msg.text());
            }
        });

        // Testar páginas principais
        const pages = [
            'http://localhost:3001',
            'http://localhost:3001/dashboard',
            'http://localhost:3001/settings',
            'http://localhost:3001/ai-insights',
            'http://localhost:3001/insurance'
        ];

        for (const url of pages) {
            console.log(`\n📄 Testando: ${url}`);

            try {
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
                await page.waitForTimeout(2000); // Aguardar hidratação

                const pageErrors = consoleErrors.filter(error =>
                    error.includes('hydration') ||
                    error.includes('Hydration') ||
                    error.includes('Text content did not match')
                );

                if (pageErrors.length === 0) {
                    console.log('✅ Sem erros de hidratação detectados');
                } else {
                    console.log('❌ Erros de hidratação encontrados:');
                    pageErrors.forEach(error => console.log(`   - ${error}`));
                }

                consoleErrors.length = 0; // Limpar erros para próxima página
            } catch (error) {
                console.log(`❌ Erro ao carregar página: ${error.message}`);
            }
        }

    } catch (error) {
        console.log(`❌ Erro no teste: ${error.message}`);
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    console.log('\n🏁 Teste concluído!');
}

// Verificar se o servidor está rodando
const http = require('http');
const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/',
    method: 'GET',
    timeout: 5000
};

const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
        console.log('✅ Servidor Next.js está rodando na porta 3001');
        testHydration();
    } else {
        console.log('❌ Servidor respondeu com status:', res.statusCode);
    }
});

req.on('error', (err) => {
    console.log('❌ Servidor não está rodando na porta 3001');
    console.log('💡 Execute: npm run dev');
    process.exit(1);
});

req.on('timeout', () => {
    console.log('❌ Timeout ao conectar com o servidor');
    req.destroy();
    process.exit(1);
});

req.end();