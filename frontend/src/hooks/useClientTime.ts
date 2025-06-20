'use client';

import { useState, useEffect } from 'react';

export function useClientTime() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatTime = (dateString: string, locale: string = 'pt-BR') => {
    if (!isClient) {
      return '--:--:--';
    }
    return new Date(dateString).toLocaleTimeString(locale);
  };

  const formatDate = (dateString: string, locale: string = 'pt-BR') => {
    if (!isClient) {
      return '--/--/----';
    }
    return new Date(dateString).toLocaleDateString(locale);
  };

  const formatDateTime = (dateString: string, locale: string = 'pt-BR') => {
    if (!isClient) {
      return '--/--/---- --:--:--';
    }
    return new Date(dateString).toLocaleString(locale);
  };

  return {
    isClient,
    formatTime,
    formatDate,
    formatDateTime
  };
} 