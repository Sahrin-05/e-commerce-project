<template>
  <transition name="fade">
    <div v-if="cartStore.isDrawerOpen" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50" @click="cartStore.toggleDrawer"></div>
  </transition>

  <transition name="slide-left">
    <div v-if="cartStore.isDrawerOpen" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-dark-surface shadow-2xl flex flex-col transform transition-transform duration-300">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">Shopping Cart</h2>
        <button @click="cartStore.toggleDrawer" class="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-6">
        <div v-if="cartStore.items.length === 0" class="h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
          <ShoppingCartIcon class="w-16 h-16 mb-4 opacity-50" />
          <p class="text-lg">Your cart is empty</p>
          <button @click="cartStore.toggleDrawer" class="mt-4 text-primary-600 dark:text-primary-400 hover:underline">Continue shopping</button>
        </div>

        <ul v-else class="space-y-6">
          <li v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
            <div class="w-20 h-20 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
              <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 flex flex-col">
              <div class="flex justify-between">
                <h3 class="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{{ item.title }}</h3>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">${{ ((item.price * (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2) }}</p>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${{ (item.price * (1 - item.discountPercentage / 100)).toFixed(2) }} each</p>
              
              <div class="flex items-center justify-between mt-auto">
                <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-md">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                    <MinusIcon class="w-4 h-4" />
                  </button>
                  <span class="px-2 text-sm text-slate-900 dark:text-white w-8 text-center">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                    <PlusIcon class="w-4 h-4" />
                  </button>
                </div>
                <button @click="cartStore.removeFromCart(item.id)" class="text-sm text-red-500 hover:text-red-700 transition-colors">Remove</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length > 0" class="border-t border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-800/50">
        <div class="flex justify-between text-base font-medium text-slate-900 dark:text-white mb-4">
          <p>Subtotal</p>
          <p>${{ cartStore.totalPrice.toFixed(2) }}</p>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Shipping and taxes calculated at checkout.</p>
        <button @click="$router.push('/cart'); cartStore.toggleDrawer()" class="w-full btn-primary flex justify-center items-center py-3 text-lg">
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
