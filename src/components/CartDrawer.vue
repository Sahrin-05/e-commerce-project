<template>
  <transition name="fade">
    <div v-if="cartStore.isDrawerOpen" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50" @click="cartStore.toggleDrawer"></div>
  </transition>

  <transition name="slide-left">
    <div v-if="cartStore.isDrawerOpen" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-dark-surface border-l border-white/5 shadow-2xl flex flex-col transform transition-transform duration-300">
      <!-- Header -->
      <div class="px-8 py-6 border-b border-white/5 flex items-center justify-between">
        <h2 class="text-xl font-light text-white uppercase tracking-widest">Shopping Cart</h2>
        <button @click="cartStore.toggleDrawer" class="p-2 text-slate-400 hover:text-primary-500 transition-colors">
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-8">
        <div v-if="cartStore.items.length === 0" class="h-full flex flex-col items-center justify-center text-slate-500">
          <ShoppingCartIcon class="w-16 h-16 mb-6 opacity-30" />
          <p class="text-lg font-light uppercase tracking-widest text-slate-400">Your cart is empty</p>
          <button @click="cartStore.toggleDrawer" class="mt-6 text-primary-500 uppercase tracking-widest text-xs border-b border-primary-500 pb-1 hover:text-white hover:border-white transition-colors">Continue shopping</button>
        </div>

        <ul v-else class="space-y-8">
          <li v-for="item in cartStore.items" :key="item.id" class="flex gap-6">
            <div class="w-24 h-24 shrink-0 bg-dark-bg rounded-none border border-white/5 overflow-hidden">
              <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 flex flex-col">
              <div class="flex justify-between">
                <h3 class="text-sm font-light text-white uppercase tracking-wider line-clamp-1">{{ item.title }}</h3>
                <p class="text-sm font-medium text-white">${{ ((item.price * (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2) }}</p>
              </div>
              <p class="text-xs text-slate-500 mt-1 uppercase tracking-widest">${{ (item.price * (1 - item.discountPercentage / 100)).toFixed(2) }} each</p>
              
              <div class="flex items-center justify-between mt-auto">
                <div class="flex items-center border border-white/10 rounded-none bg-dark-bg">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="p-1.5 text-slate-500 hover:text-primary-500 transition-colors">
                    <MinusIcon class="w-4 h-4" />
                  </button>
                  <span class="px-2 text-xs font-light text-white w-8 text-center">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="p-1.5 text-slate-500 hover:text-primary-500 transition-colors">
                    <PlusIcon class="w-4 h-4" />
                  </button>
                </div>
                <button @click="cartStore.removeFromCart(item.id)" class="text-xs uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors border-b border-transparent hover:border-red-400 pb-0.5">Remove</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length > 0" class="border-t border-white/5 p-8 bg-dark-bg">
        <div class="flex justify-between text-base font-light text-white uppercase tracking-widest mb-4">
          <p>Subtotal</p>
          <p>${{ cartStore.totalPrice.toFixed(2) }}</p>
        </div>
        <p class="text-xs text-slate-500 uppercase tracking-widest mb-6 font-light">Shipping and taxes calculated at checkout.</p>
        <button @click="$router.push('/cart'); cartStore.toggleDrawer()" class="w-full btn-primary flex justify-center items-center py-4 text-sm uppercase tracking-widest">
          Checkout
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { XIcon, ShoppingCartIcon, PlusIcon, MinusIcon } from 'lucide-vue-next';

const cartStore = useCartStore();
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}
</style>
