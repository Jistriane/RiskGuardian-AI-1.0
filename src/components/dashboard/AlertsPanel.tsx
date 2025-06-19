export default function AlertsPanel() {
  const mockAlerts = [
    {
      id: '1',
      type: 'warning' as const,
      title: 'Volatilidade Alta',
      message: 'ETH apresenta volatilidade de 15% nas últimas 4h',
      timestamp: '2 min atrás'
    },
    {
      id: '2', 
      type: 'info' as const,
      title: 'Rebalanceamento Sugerido',
      message: 'IA sugere reduzir exposição a AVAX em 5%',
      timestamp: '15 min atrás'
    },
    {
      id: '3',
      type: 'critical' as const,
      title: 'Health Factor Baixo',
      message: 'Health factor próximo do limite de liquidação',
      timestamp: '1h atrás'
    }
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️'
      case 'critical': return '🚨'
      default: return 'ℹ️'
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-900/20'
      default: return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Alertas Recentes
      </h2>
      
      <div className="space-y-3">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className={`p-4 border-l-4 rounded ${getAlertColor(alert.type)}`}>
            <div className="flex items-start space-x-3">
              <span className="text-lg">{getAlertIcon(alert.type)}</span>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">{alert.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{alert.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{alert.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 