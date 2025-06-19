import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Alert,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  NotificationsActive,
  Warning,
  Error as ErrorIcon,
  Info,
  CheckCircle,
  Settings,
  Add,
  Delete,
  Refresh,
  TrendingUp,
  TrendingDown,
  Security,
  Speed,
} from '@mui/icons-material';

interface RiskAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  contract?: string;
  severity: number;
  action?: string;
}

interface AlertConfig {
  id: string;
  name: string;
  type: 'price' | 'volume' | 'contract' | 'network';
  enabled: boolean;
  conditions: Record<string, any>;
  notifications: ('browser' | 'email' | 'webhook')[];
}

export const RealTimeAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [alertConfigs, setAlertConfigs] = useState<AlertConfig[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');
  const [isMounted, setIsMounted] = useState(false);

  // Simular dados de alertas
  const generateMockAlerts = (): RiskAlert[] => {
    const mockAlerts: RiskAlert[] = [
      {
        id: '1',
        type: 'critical',
        title: 'Alto Risco de Liquidação',
        message: 'Posição em AAVE com risco de liquidação em 15 minutos',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
        contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        severity: 95,
        action: 'Add Collateral'
      },
      {
        id: '2',
        type: 'warning',
        title: 'Volatilidade Elevada',
        message: 'ETH apresenta volatilidade acima de 15% na última hora',
        timestamp: new Date(Date.now() - 12 * 60 * 1000),
        isRead: false,
        severity: 70
      },
      {
        id: '3',
        type: 'info',
        title: 'Oportunidade de Arbitragem',
        message: 'Diferencial de preço de 2.3% entre Uniswap e Sushiswap',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        isRead: true,
        severity: 40
      },
      {
        id: '4',
        type: 'success',
        title: 'Hedge Executado',
        message: 'Estratégia de proteção ativada automaticamente',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isRead: true,
        severity: 20
      }
    ];

    return mockAlerts;
  };

  // Configurações padrão de alertas
  const defaultConfigs: AlertConfig[] = [
    {
      id: '1',
      name: 'Alerta de Liquidação',
      type: 'contract',
      enabled: true,
      conditions: { healthFactor: '<1.2', timeToLiquidation: '<30min' },
      notifications: ['browser', 'email']
    },
    {
      id: '2',
      name: 'Volatilidade de Preço',
      type: 'price',
      enabled: true,
      conditions: { volatility: '>10%', timeframe: '1h' },
      notifications: ['browser']
    },
    {
      id: '3',
      name: 'Volume Anômalo',
      type: 'volume',
      enabled: false,
      conditions: { volumeIncrease: '>200%', timeframe: '15min' },
      notifications: ['webhook']
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    const mockAlerts = generateMockAlerts();
    setAlerts(mockAlerts);
    setAlertConfigs(defaultConfigs);
    setUnreadCount(mockAlerts.filter(alert => !alert.isRead).length);

    // Simular novos alertas periodicamente
    const interval = setInterval(() => {
      const newAlert: RiskAlert = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info',
        title: 'Novo Alerta de Risco',
        message: `Detecção automática às ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(),
        isRead: false,
        severity: Math.floor(Math.random() * 100)
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      setUnreadCount(prev => prev + 1);
    }, 30000); // Novo alerta a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <ErrorIcon sx={{ color: '#ef4444' }} />;
      case 'warning': return <Warning sx={{ color: '#f59e0b' }} />;
      case 'info': return <Info sx={{ color: '#3b82f6' }} />;
      case 'success': return <CheckCircle sx={{ color: '#22c55e' }} />;
      default: return <Info />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      case 'success': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
    setUnreadCount(0);
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread': return !alert.isRead;
      case 'critical': return alert.type === 'critical';
      default: return true;
    }
  });

  const formatTimestamp = (timestamp: Date) => {
    if (!isMounted) return '--:--';
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diff < 60) return 'Agora';
    if (diff < 3600) return `${Math.floor(diff / 60)}m atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    return timestamp.toLocaleDateString();
  };

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsActive color="primary" sx={{ fontSize: 32 }} />
            </Badge>
            <Box>
              <Typography variant="h6">
                🚨 Alertas em Tempo Real
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitoramento Contínuo • {alerts.length} alertas
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={1}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filtro</InputLabel>
              <Select
                value={filter}
                label="Filtro"
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="unread">Não Lidos</MenuItem>
                <MenuItem value="critical">Críticos</MenuItem>
              </Select>
            </FormControl>

            <Button
              size="small"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Marcar Todos
            </Button>

            <IconButton onClick={() => setShowConfig(true)}>
              <Settings />
            </IconButton>
          </Box>
        </Box>

        {/* Estatísticas Rápidas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { label: 'Críticos', value: alerts.filter(a => a.type === 'critical').length, color: '#ef4444' },
            { label: 'Avisos', value: alerts.filter(a => a.type === 'warning').length, color: '#f59e0b' },
            { label: 'Não Lidos', value: unreadCount, color: '#3b82f6' },
            { label: 'Total Hoje', value: alerts.length, color: '#22c55e' }
          ].map((stat, index) => (
            <Grid item xs={3} key={index}>
              <Box
                sx={{
                  p: 2,
                  textAlign: 'center',
                  background: `${stat.color}10`,
                  border: `1px solid ${stat.color}30`,
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" sx={{ color: stat.color, fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Lista de Alertas */}
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {filteredAlerts.map((alert, index) => (
            <React.Fragment key={alert.id}>
              <ListItem
                sx={{
                  border: `1px solid ${getAlertColor(alert.type)}30`,
                  borderRadius: 2,
                  mb: 1,
                  background: alert.isRead ? 'transparent' : `${getAlertColor(alert.type)}05`,
                  opacity: alert.isRead ? 0.7 : 1
                }}
              >
                <ListItemIcon>
                  {getAlertIcon(alert.type)}
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {alert.title}
                      </Typography>
                      {alert.severity && (
                        <Chip
                          size="small"
                          label={`${alert.severity}%`}
                          sx={{
                            background: `${getAlertColor(alert.type)}20`,
                            color: getAlertColor(alert.type),
                            fontWeight: 600
                          }}
                        />
                      )}
                      {!alert.isRead && (
                        <Chip size="small" label="NOVO" color="error" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {alert.message}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          {formatTimestamp(alert.timestamp)}
                        </Typography>
                        {alert.contract && (
                          <Typography variant="caption" sx={{ 
                            fontFamily: 'monospace',
                            background: '#f5f5f5',
                            px: 1,
                            borderRadius: 1
                          }}>
                            {alert.contract.slice(0, 10)}...
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  }
                />

                <Box display="flex" flexDirection="column" gap={1}>
                  {alert.action && (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ color: getAlertColor(alert.type) }}
                    >
                      {alert.action}
                    </Button>
                  )}
                  {!alert.isRead && (
                    <Button
                      size="small"
                      onClick={() => markAsRead(alert.id)}
                    >
                      Marcar Lido
                    </Button>
                  )}
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>

        {filteredAlerts.length === 0 && (
          <Box textAlign="center" py={4}>
            <CheckCircle sx={{ fontSize: 48, color: '#22c55e', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Nenhum alerta encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filter === 'all' ? 'Sistema funcionando normalmente' : 
               filter === 'unread' ? 'Todos os alertas foram lidos' :
               'Nenhum alerta crítico no momento'}
            </Typography>
          </Box>
        )}

        {/* Dialog de Configurações */}
        <Dialog open={showConfig} onClose={() => setShowConfig(false)} maxWidth="md" fullWidth>
          <DialogTitle>⚙️ Configurações de Alertas</DialogTitle>
          <DialogContent>
            <List>
              {alertConfigs.map((config, index) => (
                <ListItem key={config.id}>
                  <ListItemText
                    primary={config.name}
                    secondary={`Tipo: ${config.type} • Condições: ${Object.entries(config.conditions).map(([k, v]) => `${k}: ${v}`).join(', ')}`}
                  />
                  <Chip 
                    label={config.enabled ? 'Ativo' : 'Inativo'}
                    color={config.enabled ? 'success' : 'default'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfig(false)}>Fechar</Button>
            <Button variant="contained">Salvar</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}; 