import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Collapse
} from '@mui/material';
import {
  Psychology as AIIcon,
  TrendingUp as TrendIcon,
  Warning as WarningIcon,
  Security as SecurityIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useWeb3 } from '../../contexts/Web3Context';
import { useElizaOS, PortfolioAnalysis } from '../../services/elizaos.service';

export const AIAnalysisPanel: React.FC = () => {
  const { account } = useWeb3();
  const { elizaOSService, analyzePortfolio, healthCheck } = useElizaOS();
  
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isServiceHealthy, setIsServiceHealthy] = useState<boolean | null>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    risks: false,
    recommendations: true,
    hedgeSuggestions: false
  });

  // Verificar saúde do serviço ao montar
  useEffect(() => {
    checkServiceHealth();
  }, []);

  // Conectar WebSocket para atualizações em tempo real
  useEffect(() => {
    if (isServiceHealthy && account) {
      const connected = elizaOSService.connectWebSocket({
        onAnalysisUpdate: (data) => {
          console.log('Analysis update received:', data);
          if (data.walletAddress === account) {
            setAnalysis(data.analysis);
          }
        },
        onRiskAlert: (data) => {
          console.log('Risk alert received:', data);
          // Aqui podemos mostrar notificações de risco
        },
        onConnect: () => {
          console.log('Connected to ElizaOS WebSocket');
        },
        onDisconnect: () => {
          console.log('Disconnected from ElizaOS WebSocket');
        },
        onError: (error) => {
          console.error('WebSocket error:', error);
        }
      });

      return () => {
        elizaOSService.disconnectWebSocket();
      };
    }
  }, [isServiceHealthy, account, elizaOSService]);

  const checkServiceHealth = async () => {
    try {
      const healthy = await healthCheck();
      setIsServiceHealthy(healthy);
      if (!healthy) {
        setError('ElizaOS Agent não está disponível. Verifique se o serviço está rodando.');
      }
    } catch (err) {
      setIsServiceHealthy(false);
      setError('Erro ao verificar status do ElizaOS Agent');
    }
  };

  const runAnalysis = async () => {
    if (!account) {
      setError('Conecte sua carteira primeiro');
      return;
    }

    if (!isServiceHealthy) {
      setError('ElizaOS Agent não está disponível');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzePortfolio(account, {
        protocols: ['uniswap', 'compound', 'aave'],
        timeframe: '24h',
        riskTolerance: 'medium'
      });

      if (result.success && result.data) {
        setAnalysis(result.data);
      } else {
        setError(result.error || 'Falha na análise');
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado durante análise');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'success';
      case 'MEDIUM': return 'warning';
      case 'HIGH': return 'error';
      case 'CRITICAL': return 'error';
      default: return 'default';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'LOW': return <SecurityIcon color="success" />;
      case 'MEDIUM': return <WarningIcon color="warning" />;
      case 'HIGH': return <WarningIcon color="error" />;
      case 'CRITICAL': return <WarningIcon color="error" />;
      default: return <SecurityIcon />;
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <AIIcon color="primary" />
            <Typography variant="h6">
              Análise de IA - ElizaOS Agent
            </Typography>
            <Chip 
              label={isServiceHealthy ? 'Online' : 'Offline'} 
              color={isServiceHealthy ? 'success' : 'error'}
              size="small"
            />
          </Box>
          <IconButton onClick={checkServiceHealth} size="small">
            <RefreshIcon />
          </IconButton>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box display="flex" gap={2} mb={3}>
          <Button
            variant="contained"
            onClick={runAnalysis}
            disabled={loading || !account || !isServiceHealthy}
            startIcon={loading ? <CircularProgress size={20} /> : <AIIcon />}
          >
            {loading ? 'Analisando...' : 'Analisar Portfólio'}
          </Button>
          
          {!account && (
            <Alert severity="info" sx={{ flexGrow: 1 }}>
              Conecte sua carteira para análise de IA
            </Alert>
          )}
        </Box>

        {analysis && (
          <Grid container spacing={3}>
            {/* Score de Risco */}
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {analysis.riskScore}/100
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={1}>
                    {getRiskIcon(analysis.riskLevel)}
                    <Chip 
                      label={analysis.riskLevel} 
                      color={getRiskColor(analysis.riskLevel) as any}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    Score de Risco Geral
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Resumo */}
            <Grid item xs={12} md={8}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Resumo da Análise
                  </Typography>
                  <Typography variant="body2">
                    {analysis.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Recomendações */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="between">
                    <Typography variant="h6">
                      Recomendações ({analysis.recommendations.length})
                    </Typography>
                    <IconButton onClick={() => toggleSection('recommendations')}>
                      {expandedSections.recommendations ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={expandedSections.recommendations}>
                    <List>
                      {analysis.recommendations.map((rec, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText 
                              primary={rec}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          {index < analysis.recommendations.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>

            {/* Riscos Detectados */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="between">
                    <Typography variant="h6">
                      Riscos Detectados ({analysis.detectedRisks.length})
                    </Typography>
                    <IconButton onClick={() => toggleSection('risks')}>
                      {expandedSections.risks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={expandedSections.risks}>
                    <List>
                      {analysis.detectedRisks.map((risk, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText 
                              primary={risk.type}
                              secondary={risk.description}
                              primaryTypographyProps={{ variant: 'subtitle2' }}
                            />
                            <Chip 
                              label={risk.severity} 
                              color={getRiskColor(risk.severity) as any}
                              size="small"
                            />
                          </ListItem>
                          {index < analysis.detectedRisks.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>

            {/* Sugestões de Hedge */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="between">
                    <Typography variant="h6">
                      Sugestões de Hedge ({analysis.hedgeSuggestions.length})
                    </Typography>
                    <IconButton onClick={() => toggleSection('hedgeSuggestions')}>
                      {expandedSections.hedgeSuggestions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={expandedSections.hedgeSuggestions}>
                    <List>
                      {analysis.hedgeSuggestions.map((hedge, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText 
                              primary={hedge.strategy}
                              secondary={hedge.reasoning}
                              primaryTypographyProps={{ variant: 'subtitle2' }}
                            />
                            <Chip 
                              label={hedge.urgency} 
                              color={hedge.urgency === 'HIGH' ? 'error' : hedge.urgency === 'MEDIUM' ? 'warning' : 'success'}
                              size="small"
                            />
                          </ListItem>
                          {index < analysis.hedgeSuggestions.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {!analysis && !loading && isServiceHealthy && account && (
          <Alert severity="info">
            Clique em "Analisar Portfólio" para obter insights de IA sobre seus ativos e riscos.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}; 