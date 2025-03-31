import { defaultNewsArray, NewsItem, STORAGE_KEY } from '@/shared/const';
import { useState, useEffect } from 'react';

export const useNewsData = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setNewsList(JSON.parse(savedData));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newsList));
    }
  }, [newsList, isInitialized]);

  const initializeWithDefault = () => {
    setNewsList(defaultNewsArray);
  };

  return {
    newsList,
    setNewsList,
    initializeWithDefault
  };
};