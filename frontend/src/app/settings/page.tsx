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

'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useI18n } from '@/contexts/i18n-context';
import { useClientTime } from '@/hooks/useClientTime';
import { 
  Settings, 
  Bell, 
  Shield, 
  Zap, 
  User, 
  Globe, 
  Moon, 
  Sun, 
  Palette, 
  Volume2, 
  VolumeX,
  Smartphone,
  Mail,
  AlertTriangle,
  CheckCircle,
  DollarSign
} from 'lucide-react';

export default function SettingsPage() {
  const { t } = useI18n();
  const { formatDateTime, isClient } = useClientTime();
  
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    riskAlerts: true,
    portfolioUpdates: false,
    systemUpdates: true,
    emailNotifications: false,
    pushNotifications: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    biometricLogin: true,
    sessionTimeout: '30',
    autoLogout: true,
  });

  const [trading, setTrading] = useState({
    autoHedging: true,
    stopLossEnabled: true,
    rebalanceEnabled: false,
    maxSlippage: '1',
    gasOptimization: true,
  });

  const [display, setDisplay] = useState({
    darkMode: true,
    soundEnabled: true,
    language: 'pt-BR',
    currency: 'USD',
    timeFormat: '24h',
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSecurity = (key: keyof typeof security) => {
    setSecurity(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTrading = (key: keyof typeof trading) => {
    setTrading(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDisplay = (key: keyof typeof display) => {
    setDisplay(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">⚙️ {t.settings.title}</h1>
          <p className="text-muted-foreground">
            {t.settings.subtitle}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {t.settings.notifications}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">{t.settings.priceAlerts}</p>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando os preços atingirem seus limites
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.priceAlerts}
                onCheckedChange={() => toggleNotification('priceAlerts')}
                aria-label={t.settings.priceAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">{t.settings.riskAlerts}</p>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre mudanças no nível de risco do portfólio
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.riskAlerts}
                onCheckedChange={() => toggleNotification('riskAlerts')}
                aria-label={t.settings.riskAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{t.settings.portfolioUpdates}</p>
                  <p className="text-sm text-muted-foreground">
                    Resumos diários do desempenho do seu portfólio
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.portfolioUpdates}
                onCheckedChange={() => toggleNotification('portfolioUpdates')}
                aria-label={t.settings.portfolioUpdates}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{t.settings.systemUpdates}</p>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre novas funcionalidades e manutenções
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.systemUpdates}
                onCheckedChange={() => toggleNotification('systemUpdates')}
                aria-label={t.settings.systemUpdates}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">{t.settings.emailNotifications}</p>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações importantes por email
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={() => toggleNotification('emailNotifications')}
                aria-label={t.settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-indigo-500" />
                <div>
                  <p className="font-medium">{t.settings.pushNotifications}</p>
                  <p className="text-sm text-muted-foreground">
                    Notificações em tempo real no navegador
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={() => toggleNotification('pushNotifications')}
                aria-label={t.settings.pushNotifications}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t.settings.security}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">{t.settings.twoFactorAuth}</p>
                  <p className="text-sm text-muted-foreground">
                    Autenticação de dois fatores
                  </p>
                </div>
              </div>
              <Switch
                checked={security.twoFactorAuth}
                onCheckedChange={() => toggleSecurity('twoFactorAuth')}
                aria-label={t.settings.twoFactorAuth}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{t.settings.biometricLogin}</p>
                  <p className="text-sm text-muted-foreground">
                    Login com biometria
                  </p>
                </div>
              </div>
              <Switch
                checked={security.biometricLogin}
                onCheckedChange={() => toggleSecurity('biometricLogin')}
                aria-label={t.settings.biometricLogin}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">{t.settings.autoLogout}</p>
                  <p className="text-sm text-muted-foreground">
                    Logout automático por inatividade
                  </p>
                </div>
              </div>
              <Switch
                checked={security.autoLogout}
                onCheckedChange={() => toggleSecurity('autoLogout')}
                aria-label={t.settings.autoLogout}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{t.settings.sessionTimeout}</p>
                  <p className="text-sm text-muted-foreground">
                    Tempo limite da sessão
                  </p>
                </div>
              </div>
              <select 
                value={security.sessionTimeout}
                onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                className="px-3 py-1 border rounded-md bg-background"
                aria-label={t.settings.sessionTimeout}
              >
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">1 hora</option>
                <option value="120">2 horas</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              {t.settings.tradingAutomation}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">{t.settings.autoHedging}</p>
                  <p className="text-sm text-muted-foreground">
                    Hedge automático baseado em risco
                  </p>
                </div>
              </div>
              <Switch
                checked={trading.autoHedging}
                onCheckedChange={() => toggleTrading('autoHedging')}
                aria-label={t.settings.autoHedging}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">{t.settings.autoStopLoss}</p>
                  <p className="text-sm text-muted-foreground">
                    Stop loss automático
                  </p>
                </div>
              </div>
              <Switch
                checked={trading.stopLossEnabled}
                onCheckedChange={() => toggleTrading('stopLossEnabled')}
                aria-label={t.settings.autoStopLoss}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{t.settings.autoRebalancing}</p>
                  <p className="text-sm text-muted-foreground">
                    Rebalanceamento automático do portfolio
                  </p>
                </div>
              </div>
              <Switch
                checked={trading.rebalanceEnabled}
                onCheckedChange={() => toggleTrading('rebalanceEnabled')}
                aria-label={t.settings.autoRebalancing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">{t.settings.gasOptimization}</p>
                  <p className="text-sm text-muted-foreground">
                    Otimização automática de taxas de gas
                  </p>
                </div>
              </div>
              <Switch
                checked={trading.gasOptimization}
                onCheckedChange={() => toggleTrading('gasOptimization')}
                aria-label={t.settings.gasOptimization}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">{t.settings.maxSlippage}</p>
                  <p className="text-sm text-muted-foreground">
                    Slippage máximo permitido
                  </p>
                </div>
              </div>
              <select 
                value={trading.maxSlippage}
                onChange={(e) => setTrading(prev => ({ ...prev, maxSlippage: e.target.value }))}
                className="px-3 py-1 border rounded-md bg-background"
                aria-label={t.settings.maxSlippage}
              >
                <option value="0.5">0.5%</option>
                <option value="1">1%</option>
                <option value="2">2%</option>
                <option value="3">3%</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {t.settings.appearance}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {display.darkMode ? <Moon className="h-5 w-5 text-blue-500" /> : <Sun className="h-5 w-5 text-yellow-500" />}
                <div>
                  <p className="font-medium">{t.settings.darkMode}</p>
                  <p className="text-sm text-muted-foreground">
                    Alternar entre tema claro e escuro
                  </p>
                </div>
              </div>
              <Switch
                checked={display.darkMode}
                onCheckedChange={() => toggleDisplay('darkMode')}
                aria-label={t.settings.darkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {display.soundEnabled ? <Volume2 className="h-5 w-5 text-green-500" /> : <VolumeX className="h-5 w-5 text-gray-500" />}
                <div>
                  <p className="font-medium">{t.settings.systemSounds}</p>
                  <p className="text-sm text-muted-foreground">
                    Sons de notificação e alertas
                  </p>
                </div>
              </div>
              <Switch
                checked={display.soundEnabled}
                onCheckedChange={() => toggleDisplay('soundEnabled')}
                aria-label={t.settings.systemSounds}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{t.settings.language}</p>
                  <p className="text-sm text-muted-foreground">
                    Idioma da interface
                  </p>
                </div>
              </div>
              <select 
                value={display.language}
                onChange={(e) => setDisplay(prev => ({ ...prev, language: e.target.value }))}
                className="px-3 py-1 border rounded-md bg-background"
                aria-label={t.settings.language}
              >
                <option value="pt-BR">Português (BR)</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">{t.settings.defaultCurrency}</p>
                  <p className="text-sm text-muted-foreground">
                    Moeda padrão para exibição
                  </p>
                </div>
              </div>
              <select 
                value={display.currency}
                onChange={(e) => setDisplay(prev => ({ ...prev, currency: e.target.value }))}
                className="px-3 py-1 border rounded-md bg-background"
                aria-label={t.settings.defaultCurrency}
              >
                <option value="USD">USD ($)</option>
                <option value="BRL">BRL (R$)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{t.settings.timeFormat}</p>
                  <p className="text-sm text-muted-foreground">
                    Formato de exibição da hora
                  </p>
                </div>
              </div>
              <select 
                value={display.timeFormat}
                onChange={(e) => setDisplay(prev => ({ ...prev, timeFormat: e.target.value }))}
                className="px-3 py-1 border rounded-md bg-background"
                aria-label={t.settings.timeFormat}
              >
                <option value="12h">12 horas</option>
                <option value="24h">24 horas</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t.settings.account}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              {t.settings.exportData}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              {t.settings.backupWallet}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              {t.settings.clearCache}
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {t.settings.resetSettings}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {t.settings.systemStatus}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium">{t.settings.version}</p>
                <p className="text-muted-foreground">v1.0.0</p>
              </div>
              <div className="text-center">
                <p className="font-medium">{t.settings.lastSync}</p>
                <p className="text-muted-foreground">
                  {isClient ? formatDateTime(new Date().toISOString()) : '--/--/---- --:--:--'}
                </p>
              </div>
              <div className="text-center">
                <p className="font-medium">{t.settings.status}</p>
                <p className="text-green-500 font-medium">✅ Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
