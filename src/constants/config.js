// constants/config.js
export const SEARCH_DEBOUNCE_TIME = 500;
export const MAX_INGREDIENTS = 20;
export const NOTIFICATION_DURATION = 3000;
export const ITEMS_PER_PAGE = 12;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';
export const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;