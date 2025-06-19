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
export declare const defaultConfig: AlertSystemConfig;
//# sourceMappingURL=alert-system.config.d.ts.map