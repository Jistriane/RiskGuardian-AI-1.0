import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { config } from './config/environment';
import { logger } from './utils/logger';
import { multiChainBlockchainService } from './services/blockchain.service';
import { cacheService } from './services/cache.service';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'RiskGuardian AI Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api', routes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    name: 'RiskGuardian Multi-Chain API',
    version: '2.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    features: [
      'Multi-Chain Blockchain Indexing',
      'Chainlink CCIP Integration',
      'Redis Caching',
      'PostgreSQL + Chromia Storage',
      'Real-time Risk Analysis'
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message,
    timestamp: new Date().toISOString(),
  });
});

// Initialize services
async function initializeServices(): Promise<void> {
  try {
    logger.info('🚀 Initializing RiskGuardian Multi-Chain Services...');

    // 1. Connect to Redis
    logger.info('📋 Connecting to Redis...');
    await cacheService.connect();
    
    // 2. Connect to multiple blockchains
    logger.info('🔗 Connecting to multiple blockchains...');
    const blockchainConnected = await multiChainBlockchainService.connect();
    
    if (!blockchainConnected) {
      logger.warn('⚠️ Some blockchain connections failed, but continuing...');
    }

    // 3. Verify service health
    const services = {
      cache: cacheService.isHealthy(),
      blockchain: multiChainBlockchainService.isHealthy(),
    };

    logger.info('📊 Service Health Check:', services);
    
    const healthyServices = Object.values(services).filter(Boolean).length;
    const totalServices = Object.keys(services).length;
    
    logger.info(`✅ Services initialized: ${healthyServices}/${totalServices} healthy`);

  } catch (error) {
    logger.error('❌ Failed to initialize services:', error);
    throw error;
  }
}

// Start server
async function startServer(): Promise<void> {
  try {
    // Initialize services first
    await initializeServices();
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      logger.info(`🌐 RiskGuardian Multi-Chain API running on port ${PORT}`);
      logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    });

    // Configure signal handlers for graceful shutdown
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    // Handle unhandled errors
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start application
startServer().catch((error) => {
  logger.error('❌ Startup failed:', error);
  process.exit(1);
});

// Graceful shutdown
async function gracefulShutdown(signal: string): Promise<void> {
  logger.info(`📴 Received ${signal}. Starting graceful shutdown...`);
  
  try {
    // Stop services in reverse order
    await multiChainBlockchainService.disconnect();
    await cacheService.disconnect();
    
    logger.info('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
}

export default app;
