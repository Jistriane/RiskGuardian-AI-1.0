interface RiskMetricsProps {
  address?: string
}

export default function RiskMetrics({ address }: RiskMetricsProps) {
  const mockMetrics = {
    healthFactor: 1.8,
    riskScore: 35,
    liquidationPrice: 1650,
    volatilityScore: 42
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-500'
    if (score < 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Métricas de Risco
      </h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Risk Score</span>
            <span className={`font-bold ${getRiskColor(mockMetrics.riskScore)}`}>
              {mockMetrics.riskScore}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${mockMetrics.riskScore < 30 ? 'bg-green-500' : mockMetrics.riskScore < 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${mockMetrics.riskScore}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">Health Factor</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{mockMetrics.healthFactor}</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">Liquidation Price</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${mockMetrics.liquidationPrice}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 