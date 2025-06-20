'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useI18n } from '@/contexts/i18n-context';

export default function LendingPage() {
  const { t } = useI18n();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{t.lending.title}</h1>
            <p className="text-gray-400">{t.lending.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview Card */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  {t.lending.overview}
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">{t.lending.totalLent}</div>
                    <div className="text-2xl font-bold text-white">US$ 0,00</div>
                    <div className="text-sm text-gray-500">0 {t.lending.lendingPools}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">{t.lending.totalBorrowed}</div>
                    <div className="text-2xl font-bold text-white">US$ 0,00</div>
                    <div className="text-sm text-gray-500">0 {t.lending.borrowingPools}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">{t.lending.netPosition}</div>
                    <div className="text-2xl font-bold text-green-400">US$ 0,00</div>
                    <div className="text-sm text-gray-500">{t.lending.healthFactor}: --</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-lg font-semibold text-white">Ações Rápidas</h3>
              </div>
              <div className="p-6 pt-0 space-y-3">
                <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                  💰 {t.lending.lend}
                </button>
                <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                  📈 {t.lending.borrow}
                </button>
                <button className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium">
                  📊 Ver Pools
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Pools */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">
              {t.lending.availableOffers}
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Em Desenvolvimento</h3>
              <p className="text-gray-400 mb-6">
                A funcionalidade de empréstimos DeFi está sendo desenvolvida.
                <br />
                Em breve você poderá emprestar e tomar emprestado ativos diretamente na plataforma.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-900/30 border border-blue-800/50 text-blue-300 rounded-full text-sm">
                  Aave Integration
                </span>
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-800/50 text-purple-300 rounded-full text-sm">
                  Compound V3
                </span>
                <span className="px-3 py-1 bg-green-900/30 border border-green-800/50 text-green-300 rounded-full text-sm">
                  Yield Farming
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 