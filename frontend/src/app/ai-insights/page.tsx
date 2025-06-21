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

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useClientTime } from '@/hooks/useClientTime';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  User, 
  Send, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle,
  Zap,
  Target,
  Brain,
  BarChart3
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

const aiResponses = [
  "Com base na análise atual do mercado, ETH mostra sinais de recuperação. Recomendo manter posição.",
  "Detectei aumento na volatilidade do BTC. Considere hedge de 10-15% da posição.",
  "USDC mantém estabilidade. Boa opção para reserva de valor durante correções.",
  "Análise técnica indica possível breakout do LINK. Monitore níveis de resistência.",
  "Portfolio bem diversificado. Risco atual dentro dos parâmetros aceitáveis.",
  "Oportunidade: Yield farming em protocolos seguros pode aumentar rendimento em 3-5%.",
  "Alerta: Concentração alta em DeFi. Considere rebalanceamento para reduzir exposição.",
  "Tendência bullish confirmada para próximas 48h. Mantenha estratégia atual."
];

export default function AIInsightsPage() {
  const { t } = useTranslation();
  const { formatTime, isClient } = useClientTime();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Inicializar mensagens apenas no cliente para evitar erro de hidratação
  useEffect(() => {
    if (isClient && !isInitialized) {
      setChatMessages([
        {
          id: '1',
          type: 'ai',
          message: 'Olá! Sou a ElizaOS AI. Como posso ajudar com sua análise de risco hoje?',
          timestamp: new Date()
        }
      ]);
      setIsInitialized(true);
    }
  }, [isClient, isInitialized]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular resposta da IA
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };

  const quickActions = [
    "Analisar risco do portfolio",
    "Sugerir rebalanceamento",
    "Oportunidades de yield",
    "Análise de mercado"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('aiInsights.title')}</h1>
          <p className="text-gray-400 mt-2">{t('aiInsights.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-900/20 border-green-800/30 text-green-400">
            🟢 Online
          </Badge>
          <Badge variant="outline" className="bg-blue-900/20 border-blue-800/30 text-blue-400">
            <Brain className="h-3 w-3 mr-1" />
            ElizaOS v2.1
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                Chat com ElizaOS AI
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === 'ai' && <Bot className="h-4 w-4 mt-1 text-blue-500" />}
                        {message.type === 'user' && <User className="h-4 w-4 mt-1" />}
                        <div className="flex-1">
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {formatTime(message.timestamp.toISOString())}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-500" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex gap-2 mb-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite sua pergunta sobre análise de risco..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <BarChart3 className="h-4 w-4" />
                {t('aiInsights.marketAnalysis')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Bitcoin</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+2.4%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Ethereum</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+1.8%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">DeFi TVL</span>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-500">-0.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" />
                {t('aiInsights.riskAssessment')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Portfolio Risk</span>
                <Badge variant="outline" className="bg-yellow-900/20 border-yellow-800/30 text-yellow-400">
                  Moderado
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Volatilidade</span>
                <span className="text-xs text-gray-300">18.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Diversificação</span>
                <span className="text-xs text-green-500">Boa</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4" />
                {t('aiInsights.recommendations')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2 bg-blue-900/20 border border-blue-800/30 rounded text-xs">
                <div className="flex items-center gap-1 text-blue-400 font-medium">
                  <Zap className="h-3 w-3" />
                  Rebalanceamento
                </div>
                <p className="text-gray-400 mt-1">Reduzir exposição BTC em 5%</p>
              </div>
              
              <div className="p-2 bg-green-900/20 border border-green-800/30 rounded text-xs">
                <div className="flex items-center gap-1 text-green-400 font-medium">
                  <TrendingUp className="h-3 w-3" />
                  Oportunidade
                </div>
                <p className="text-gray-400 mt-1">Yield farming USDC/ETH</p>
              </div>
              
              <div className="p-2 bg-yellow-900/20 border border-yellow-800/30 rounded text-xs">
                <div className="flex items-center gap-1 text-yellow-400 font-medium">
                  <AlertTriangle className="h-3 w-3" />
                  Alerta
                </div>
                <p className="text-gray-400 mt-1">Alta correlação entre ativos</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 