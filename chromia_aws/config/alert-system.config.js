"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.defaultConfig = {
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
//# sourceMappingURL=alert-system.config.js.map