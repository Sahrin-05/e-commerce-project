<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/70 dark:bg-dark-bg/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <ShoppingBagIcon class="w-5 h-5 text-white" />
            </div>
            <span class="font-bold text-xl tracking-tight text-slate-900 dark:text-white">NexusCart</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link to="/" class="text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 font-medium transition-colors">Home</router-link>
          <router-link to="/products" class="text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 font-medium transition-colors">Products</router-link>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-4">
          <ThemeToggle />
          
          <button @click="cartStore.toggleDrawer" class="relative p-2 text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors">
            <ShoppingCartIcon class="w-6 h-6" />
            <span v-if="cartStore.totalItems > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <div class="hidden md:flex items-center">
            <router-link v-if="!authStore.token" to="/login" class="btn-primary ml-2">Login</router-link>
            <div v-else class="relative ml-2">
              <router-link to="/dashboard" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img :src="authStore.user?.image || `https://ui-avatars.com/api/?name=${authStore.user?.username}&background=random`" alt="avatar" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700">
              </router-link>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-slate-600 dark:text-slate-300">
            <MenuIcon v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <XIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition name="slide-up">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-slate-700">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link to="/" @click="isMobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">Home</router-link>
          <router-link to="/products" @click="isMobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">Products</router-link>
          <router-link v-if="!authStore.token" to="/login" @click="isMobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">Login</router-link>
          <router-link v-else to="/dashboard" @click="isMobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">Dashboard</router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ShoppingBagIcon, ShoppingCartIcon, MenuIcon, XIcon } from 'lucide-vue-next';
import ThemeToggle from './ThemeToggle.vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);
</script>
