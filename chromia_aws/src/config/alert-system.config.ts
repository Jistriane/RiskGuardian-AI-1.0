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

export interface AlertSystemConfig {
    aws: {
        region: string;
        credentials: {
            accessKeyId: string;
            secretAccessKey: string;
        };
    };
    chromia: {
        nodeUrl: string;
        dappName: string;
    };
    websocket: {
        port: number;
        path: string;
    };
    ml: {
        modelEndpoint: string;
        anomalyThreshold: number;
    };
}

export const defaultConfig: AlertSystemConfig = {
    aws: {
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
        }
    },
    chromia: {
        nodeUrl: process.env.CHROMIA_NODE_URL || 'http://localhost:7740',
        dappName: process.env.CHROMIA_DAPP_NAME || 'risk-guardian'
    },
    websocket: {
        port: parseInt(process.env.WEBSOCKET_PORT || '3002'),
        path: '/alerts'
    },
    ml: {
        modelEndpoint: process.env.ML_MODEL_ENDPOINT || '',
        anomalyThreshold: parseFloat(process.env.ANOMALY_THRESHOLD || '0.95')
    }
}; 