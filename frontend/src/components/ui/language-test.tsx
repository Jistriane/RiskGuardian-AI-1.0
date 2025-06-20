'use client';

import { useI18n } from '@/contexts/i18n-context';

export function LanguageTest() {
  const { language, setLanguage, t } = useI18n();

  const handleLanguageChange = () => {
    const newLanguage = language === 'pt-BR' ? 'en' : 'pt-BR';
    setLanguage(newLanguage);
    console.log(`Idioma alterado para: ${newLanguage}`);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-white">Teste de Idioma</h3>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-300">Idioma atual: <span className="font-bold text-blue-400">{language}</span></p>
        <p className="text-gray-300">Título: <span className="text-green-400">{t.dashboard.title}</span></p>
        <p className="text-gray-300">Configurações: <span className="text-green-400">{t.navigation.settings}</span></p>
        <p className="text-gray-300">Automação: <span className="text-green-400">{t.navigation.automation}</span></p>
      </div>

      <button
        onClick={handleLanguageChange}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Alternar Idioma ({language === 'pt-BR' ? 'Para Inglês' : 'Para Português'})
      </button>
    </div>
  );
} 