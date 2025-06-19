interface AIInsightsProps {
  address?: string
}

export default function AIInsights({ address }: AIInsightsProps) {
  const mockInsights = [
    {
      id: '1',
      type: 'recommendation' as const,
      title: 'Diversificação Recomendada',
      content: 'Considere adicionar stablecoins para reduzir volatilidade do portfolio.',
      confidence: 85
    },
    {
      id: '2',
      type: 'warning' as const, 
      title: 'Correlação Alta',
      content: 'ETH e AVAX apresentam correlação de 0.89, aumentando risco sistêmico.',
      confidence: 92
    },
    {
      id: '3',
      type: 'insight' as const,
      title: 'Oportunidade DeFi',
      content: 'Pools de liquidez Uniswap ETH/USDC oferecem 12% APY com baixo risco.',
      confidence: 78
    }
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return '💡'
      case 'warning': return '⚠️'
      default: return '🔍'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-500'
    if (confidence >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          🤖 AI Insights
        </h2>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-4">
        {mockInsights.map((insight) => (
          <div key={insight.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <span className="text-lg">{getInsightIcon(insight.type)}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{insight.title}</h3>
                  <span className={`text-xs font-bold ${getConfidenceColor(insight.confidence)}`}>
                    {insight.confidence}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{insight.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Análise atualizada há 30 segundos via ElizaOS
        </p>
      </div>
    </div>
  )
} 