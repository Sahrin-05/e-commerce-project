<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-light text-white uppercase tracking-widest mb-10">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-32 bg-dark-surface rounded-none border border-white/5 shadow-2xl">
      <ShoppingCartIcon class="w-20 h-20 mx-auto text-slate-600 mb-6 opacity-50" />
      <h2 class="text-2xl font-light text-white uppercase tracking-widest mb-4">Your cart is empty</h2>
      <p class="text-slate-400 mb-10 max-w-md mx-auto font-light leading-relaxed">Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.</p>
      <router-link to="/products" class="btn-primary py-4 px-10 text-sm uppercase tracking-widest">Start Shopping</router-link>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-12">
      <!-- Cart Items list -->
      <div class="flex-1 space-y-6">
        <div v-for="item in cartStore.items" :key="item.id" class="bg-dark-surface p-8 rounded-none border border-white/5 shadow-xl flex flex-col sm:flex-row gap-8 items-center sm:items-stretch">
          
          <div class="w-32 h-32 shrink-0 bg-dark-bg rounded-none border border-white/5 overflow-hidden cursor-pointer" @click="$router.push(`/product/${item.id}`)">
            <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover mix-blend-lighten">
          </div>
          
          <div class="flex-1 flex flex-col justify-center sm:justify-between w-full">
            <div class="flex justify-between items-start gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 class="text-lg font-light text-white uppercase tracking-wider mb-2 cursor-pointer hover:text-primary-500 transition-colors" @click="$router.push(`/product/${item.id}`)">{{ item.title }}</h3>
                <p class="text-xs text-slate-400 uppercase tracking-widest">{{ item.category }} | Brand: {{ item.brand || 'Generic' }}</p>
              </div>
              <p class="text-lg font-medium text-white">${{ ((item.price * (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2) }}</p>
            </div>
            
            <div class="flex items-center justify-between mt-6 sm:mt-auto pt-2">
              <div class="flex items-center border border-white/10 rounded-none bg-dark-bg">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="p-3 text-slate-500 hover:text-primary-500 transition-colors">
                  <MinusIcon class="w-4 h-4" />
                </button>
                <span class="w-12 text-center font-light text-white">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="p-3 text-slate-500 hover:text-primary-500 transition-colors">
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>
              
              <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 hover:text-red-400 uppercase tracking-widest text-xs flex items-center gap-2 transition-colors border-b border-transparent hover:border-red-400 pb-1">
                <Trash2Icon class="w-4 h-4" /> Remove
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Order Summary -->
      <div class="w-full lg:w-96 shrink-0">
        <div class="bg-dark-surface rounded-none p-8 md:p-10 border border-white/5 shadow-2xl sticky top-24">
          <h2 class="text-xl font-light text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Order Summary</h2>
          
          <div class="space-y-6 text-sm text-slate-400 mb-8 font-light tracking-wide">
            <div class="flex justify-between">
              <span>Subtotal ({{ cartStore.totalItems }} items)</span>
              <span class="text-white">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated Shipping</span>
              <span class="text-white">Complimentary</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated Taxes</span>
              <span class="text-white">$0.00</span>
            </div>
          </div>
          
          <div class="border-t border-white/10 pt-6 mb-10">
            <div class="flex justify-between items-center mb-3">
              <span class="text-lg font-light text-white uppercase tracking-widest">Total</span>
              <span class="text-2xl font-medium text-primary-500">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <p class="text-xs text-slate-500 font-light uppercase tracking-widest">Taxes and shipping calculated at checkout</p>
          </div>
          
          <button @click="handleCheckout" class="w-full btn-primary py-4 text-sm uppercase tracking-widest flex justify-center items-center gap-3">
            Proceed to Checkout
            <ArrowRightIcon class="w-4 h-4" />
          </button>
          
          <div class="mt-8 flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-slate-500">
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
