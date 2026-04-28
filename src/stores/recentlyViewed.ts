import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '../types';

const STORAGE_KEY = 'recentlyViewedProducts';

export const useRecentlyViewedStore = defineStore('recentlyViewed', () => {
  const items = ref<Product[]>([]);

  // Load from localStorage on initialization
  const loadFromStorage = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Product[];
        items.value = parsed;
      } catch (e) {
        console.warn('Failed to parse recently viewed products', e);
        items.value = [];
      }
    }
  };

  // Save current list to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
    } catch (e) {
      console.warn('Failed to save recently viewed products', e);
    }
  };

  const add = (product: Product) => {
    // Remove if already present
    items.value = items.value.filter(p => p.id !== product.id);
    // Add to beginning
    items.value.unshift(product);
    // Trim to max 8
    if (items.value.length > 8) {
      items.value = items.value.slice(0, 8);
    }
    saveToStorage();
  };

  // Initialize store on first use
  loadFromStorage();

  return {
    items,
    add,
  };
});
