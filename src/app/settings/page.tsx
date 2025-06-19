'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Settings, 
  User, 
  Shield, 
  Bell,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Smartphone,
  Zap,
  AlertTriangle
} from 'lucide-react'

export default function SettingsPage() {
  const profileSettings = [
    {
      title: 'Informações Pessoais',
      items: [
        { label: 'Nome de usuário', value: 'crypto_trader_01', type: 'input' },
        { label: 'Email', value: 'user@example.com', type: 'input' },
        { label: 'Telefone', value: '+55 (11) 99999-9999', type: 'input' },
        { label: 'Fuso horário', value: 'America/Sao_Paulo', type: 'select' }
      ]
    }
  ]

  const securitySettings = [
    {
      title: 'Autenticação',
      items: [
        { label: '2FA ativado', value: true, type: 'toggle' },
        { label: 'Biometria', value: false, type: 'toggle' },
        { label: 'Sessions ativas', value: '3 dispositivos', type: 'info' },
        { label: 'Último login', value: '15/01/2024 às 14:30', type: 'info' }
      ]
    }
  ]

  const notificationSettings = [
    {
      title: 'Alertas de Risco',
      items: [
        { label: 'Risco alto', value: true, type: 'toggle' },
        { label: 'Liquidação próxima', value: true, type: 'toggle' },
        { label: 'Impermanent loss > 5%', value: true, type: 'toggle' },
        { label: 'Falha de smart contract', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Oportunidades',
      items: [
        { label: 'Novo farming pool', value: false, type: 'toggle' },
        { label: 'APY acima de 15%', value: true, type: 'toggle' },
        { label: 'Arbitrage detectada', value: false, type: 'toggle' },
        { label: 'Recomendações IA', value: true, type: 'toggle' }
      ]
    }
  ]

  const appSettings = [
    {
      title: 'Interface',
      items: [
        { label: 'Tema', value: 'dark', type: 'select', options: ['light', 'dark', 'system'] },
        { label: 'Idioma', value: 'pt-BR', type: 'select', options: ['pt-BR', 'en-US', 'es-ES'] },
        { label: 'Moeda padrão', value: 'USD', type: 'select', options: ['USD', 'BRL', 'EUR'] },
        { label: 'Refresh automático', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Dados e Privacy',
      items: [
        { label: 'Analytics', value: true, type: 'toggle' },
        { label: 'Cache local', value: true, type: 'toggle' },
        { label: 'Histórico de transações', value: '90 dias', type: 'select' },
        { label: 'Backup automático', value: false, type: 'toggle' }
      ]
    }
  ]

  const apiSettings = [
    {
      title: 'Integrações',
      items: [
        { label: 'ElizaOS Agent', status: 'connected', lastSync: '2 min ago' },
        { label: 'Chainlink Oracle', status: 'connected', lastSync: '30 sec ago' },
        { label: 'Market Data API', status: 'error', lastSync: '30 min ago' },
        { label: 'Chromia Database', status: 'connected', lastSync: '1 min ago' }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Configurações
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Gerencie suas preferências e configurações da plataforma
            </p>
          </div>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Perfil do Usuário</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileSettings[0].items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <label className="text-sm font-medium">{item.label}</label>
                    <div className="w-48">
                      {item.type === 'input' ? (
                        <input
                          type="text"
                          value={item.value}
                          className="w-full px-3 py-2 border border-border rounded-md text-sm"
                          aria-label={item.label}
                          readOnly
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Segurança</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securitySettings[0].items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <label className="text-sm font-medium">{item.label}</label>
                    <div>
                      {item.type === 'toggle' ? (
                        <div className={`w-10 h-6 rounded-full ${item.value ? 'bg-blue-600' : 'bg-gray-300'} relative transition-colors`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${item.value ? 'translate-x-5' : 'translate-x-1'}`}></div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <Button variant="outline" size="sm" className="w-full">
                    <Key className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notificationSettings.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h4 className="font-medium mb-4">{section.title}</h4>
                  <div className="space-y-3">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <label className="text-sm">{item.label}</label>
                        <div className={`w-10 h-6 rounded-full ${item.value ? 'bg-blue-600' : 'bg-gray-300'} relative transition-colors`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${item.value ? 'translate-x-5' : 'translate-x-1'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Configurações do App</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appSettings.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h4 className="font-medium mb-4">{section.title}</h4>
                  <div className="space-y-3">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <label className="text-sm">{item.label}</label>
                        <div>
                          {item.type === 'toggle' ? (
                            <div className={`w-10 h-6 rounded-full ${item.value ? 'bg-blue-600' : 'bg-gray-300'} relative transition-colors`}>
                              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${item.value ? 'translate-x-5' : 'translate-x-1'}`}></div>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">{item.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API & Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>APIs e Integrações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiSettings[0].items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">
                        Última sincronização: {item.lastSync}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status === 'connected' ? 'Conectado' : 
                       item.status === 'error' ? 'Erro' : 'Atenção'}
                    </span>
                    <Button variant="outline" size="sm">
                      {item.status === 'connected' ? 'Testar' : 'Reconectar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span>Zona de Perigo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Limpar Cache Local</div>
                  <div className="text-sm text-muted-foreground">
                    Remove todos os dados armazenados localmente
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Limpar Cache
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Resetar Configurações</div>
                  <div className="text-sm text-muted-foreground">
                    Volta todas as configurações para o padrão
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Resetar
                </Button>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-red-200 dark:border-red-800">
                <div>
                  <div className="font-medium text-red-600">Excluir Conta</div>
                  <div className="text-sm text-muted-foreground">
                    Remove permanentemente sua conta e todos os dados
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  Excluir Conta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
