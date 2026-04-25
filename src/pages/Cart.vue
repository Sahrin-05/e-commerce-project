<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-24 bg-white dark:bg-dark-surface rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <ShoppingCartIcon class="w-20 h-20 mx-auto text-slate-300 dark:text-slate-600 mb-6" />
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
      <p class="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.</p>
      <router-link to="/products" class="btn-primary py-3 px-8 text-lg">Start Shopping</router-link>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-12">
      <!-- Cart Items list -->
      <div class="flex-1 space-y-6">
        <div v-for="item in cartStore.items" :key="item.id" class="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
          
          <div class="w-32 h-32 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden cursor-pointer" @click="$router.push(`/product/${item.id}`)">
            <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover">
          </div>
          
          <div class="flex-1 flex flex-col justify-center sm:justify-between w-full">
            <div class="flex justify-between items-start gap-4">
              <div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 cursor-pointer hover:text-primary-600 transition-colors" @click="$router.push(`/product/${item.id}`)">{{ item.title }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-2 capitalize">{{ item.category }} | Brand: {{ item.brand || 'Generic' }}</p>
              </div>
              <p class="text-lg font-bold text-slate-900 dark:text-white">${{ ((item.price * (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2) }}</p>
            </div>
            
            <div class="flex items-center justify-between mt-4 sm:mt-auto">
              <div class="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  <MinusIcon class="w-4 h-4" />
                </button>
                <span class="w-10 text-center font-medium text-slate-900 dark:text-white">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>
              
              <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm flex items-center gap-1 transition-colors">
                <Trash2Icon class="w-4 h-4" /> Remove
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Order Summary -->
      <div class="w-full lg:w-96 shrink-0">
        <div class="bg-slate-50 dark:bg-dark-surface rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 sticky top-24">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
          
          <div class="space-y-4 text-sm text-slate-600 dark:text-slate-300 mb-6">
            <div class="flex justify-between">
              <span>Subtotal ({{ cartStore.totalItems }} items)</span>
              <span class="font-medium text-slate-900 dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated Shipping</span>
              <span class="font-medium text-slate-900 dark:text-white">Free</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated Taxes</span>
              <span class="font-medium text-slate-900 dark:text-white">$0.00</span>
            </div>
          </div>
          
          <div class="border-t border-slate-200 dark:border-slate-700 pt-6 mb-8">
            <div class="flex justify-between items-center mb-2">
              <span class="text-lg font-bold text-slate-900 dark:text-white">Total</span>
              <span class="text-2xl font-extrabold text-primary-600 dark:text-primary-400">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Taxes and shipping calculated at checkout</p>
          </div>
          
          <button @click="handleCheckout" class="w-full btn-primary py-4 text-lg font-bold flex justify-center items-center gap-2">
            Proceed to Checkout
            <ArrowRightIcon class="w-5 h-5" />
          </button>
          
          <div class="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <ShieldCheckIcon class="w-4 h-4" />
            Secure checkout guaranteed
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ShoppingCartIcon, MinusIcon, PlusIcon, Trash2Icon, ArrowRightIcon, ShieldCheckIcon } from 'lucide-vue-next';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

function handleCheckout() {
  if (!authStore.token) {
    alert('Please log in to proceed to checkout.');
    router.push('/login');
    return;
  }
  
  // Mock checkout process
  alert('Proceeding to dummy checkout! Order successful.');
  cartStore.clearCart();
  router.push('/dashboard');
}
</script>
