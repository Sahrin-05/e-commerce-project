import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { CartItem, Product } from '../types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const isDrawerOpen = ref(false);

  // Initialize from local storage
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      items.value = JSON.parse(savedCart);
    } catch (e) {
      localStorage.removeItem('cart');
    }
  }

  // Save to local storage whenever items change
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems));
  }, { deep: true });

  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0));
  
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  });

  function addItem(product: Product, quantity: number = 1) {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ ...product, quantity });
    }
    isDrawerOpen.value = true;
  }

    function removeItem(productId: number) {
    // Remove the product from the cart
    items.value = items.value.filter(item => item.id !== productId);
    // If the cart is now empty, close the drawer to reflect empty state
    if (items.value.length === 0) {
      isDrawerOpen.value = false;
    }
  }

    function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.id === productId);
    if (item) {
      const newQty = Math.max(0, quantity);
      // If quantity is zero or negative, remove the item from the cart
      if (newQty <= 0) {
        removeItem(productId);
      } else {
        item.quantity = newQty;
      }
    }
  }

  function clearCart() {
    items.value = [];
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value;
  }

  return {
    items,
    isDrawerOpen,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleDrawer
  };
});
