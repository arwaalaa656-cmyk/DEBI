import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const AppContext = createContext();

const FAVORITES_STORAGE_KEY = 'grandatlas_favorites';
const LANG_STORAGE_KEY = 'grandatlas_lang';

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  MAD: { symbol: 'MAD ', rate: 10.15, label: 'MAD (د.م.)' },
};

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'properties' | 'property-detail' | 'destinations' | 'contact' | 'about'
  const [selectedPropertyId, setSelectedPropertyId] = useState('ga-101');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY) || 'en';
    } catch {
      return 'en';
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '["ga-101"]');
    } catch {
      return ['ga-101'];
    }
  });

  const [toast, setToast] = useState(null);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleTargetProperty, setScheduleTargetProperty] = useState(null);
  const [searchFilterParams, setSearchFilterParams] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    } catch (e) {
      console.warn(e);
    }
  }, [language]);

  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const exists = prev.includes(propertyId);
      const updated = exists ? prev.filter((id) => id !== propertyId) : [...prev, propertyId];
      showToast(exists ? 'Removed from saved properties' : 'Added to saved luxury properties', 'info');
      return updated;
    });
  };

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const navigateTo = (page, propertyId = null, filterParams = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (propertyId) setSelectedPropertyId(propertyId);
    if (filterParams) setSearchFilterParams(filterParams);
    setCurrentPage(page);
  };

  const openScheduleModal = (property = null) => {
    setScheduleTargetProperty(property);
    setIsScheduleModalOpen(true);
  };

  const formatPrice = (priceInUsd) => {
    if (!priceInUsd) return 'Price upon request';
    const c = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = Math.round(priceInUsd * c.rate);
    return `${c.symbol}${converted.toLocaleString()}`;
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedPropertyId,
        setSelectedPropertyId,
        currency,
        setCurrency,
        language,
        setLanguage,
        t,
        isRtl: language === 'ar',
        favorites,
        toggleFavorite,
        toast,
        showToast,
        navigateTo,
        isApiModalOpen,
        setIsApiModalOpen,
        isScheduleModalOpen,
        setIsScheduleModalOpen,
        scheduleTargetProperty,
        openScheduleModal,
        formatPrice,
        searchFilterParams,
        setSearchFilterParams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
