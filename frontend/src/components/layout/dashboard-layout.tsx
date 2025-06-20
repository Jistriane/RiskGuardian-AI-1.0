'use client';

import { useState } from 'react';
import { WalletButton } from '@/components/wallet/wallet-button';
import { useI18n } from '@/contexts/i18n-context';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();
  const isEnglish = language === 'en';

  const toggleLanguage = () => {
    setLanguage(isEnglish ? 'pt-BR' : 'en');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Trading', href: '/trading', icon: '📈' },
    { name: 'Portfolio', href: '/portfolio', icon: '💼' },
    { name: t.navigation.lending, href: '/lending', icon: '💰' },
    { name: t.navigation.riskAnalysis, href: '/risk-analysis', icon: '⚠️' },
    { name: t.navigation.automation, href: '/automation', icon: '🤖' },
    { name: t.navigation.insurance, href: '/insurance', icon: '🛡️' },
    { name: t.navigation.aiInsights, href: '/ai-insights', icon: '🧠' },
    { name: t.navigation.monitoring, href: '/monitoring', icon: '📈' },
    { name: t.navigation.settings, href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 lg:hidden"
              aria-label="Abrir menu"
            >
              <span className="sr-only">Abrir menu</span>
              ☰
            </button>
            <h1 className="ml-4 text-xl font-bold text-white lg:ml-0">
              🛡️ RiskGuardian AI
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Botão de Idioma */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title={isEnglish ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            >
              <span className="text-lg">{isEnglish ? '🇺🇸' : '🇧🇷'}</span>
              <span className="hidden sm:block">
                {isEnglish ? 'English' : 'Português'}
              </span>
            </button>
            
            <div className="w-64">
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/95 backdrop-blur-sm transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          border-r border-gray-700
        `}>
          <nav className="mt-16 lg:mt-5 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-0">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}
    </div>
  );
} 