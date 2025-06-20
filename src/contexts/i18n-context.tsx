'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, I18nContextType, Translations } from '@/types/i18n';
import { ptBR } from '@/locales/pt-BR';
import { en } from '@/locales/en';

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  'pt-BR': ptBR,
  'en': en,
};

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>('pt-BR');
  const [isLoading, setIsLoading] = useState(true);

  // Carregar idioma salvo no localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('riskguardian-language') as Language;
    if (savedLanguage && (savedLanguage === 'pt-BR' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
    setIsLoading(false);
  }, []);

  // Salvar idioma no localStorage quando alterado
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('riskguardian-language', newLanguage);
    
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = newLanguage;
  };

  // Atualizar lang do HTML quando o idioma mudar
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const contextValue: I18nContextType = {
    language,
    setLanguage,
    t: translations[language],
    isLoading,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
} 