interface TradingViewChartProps {
  symbol: string
}

export default function TradingViewChart({ symbol }: TradingViewChartProps) {
  // Mock de dados de gráfico
  const mockData = {
    price: 2340.50,
    change: 75.25,
    changePercent: 3.32
  }

  return (
    <div className="w-full h-96 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">📈</div>
        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {symbol}
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          ${mockData.price.toLocaleString()}
        </div>
        <div className={`text-sm ${mockData.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {mockData.change > 0 ? '+' : ''}{mockData.change} ({mockData.changePercent}%)
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Gráfico TradingView será integrado aqui
        </div>
      </div>
    </div>
  )
} 