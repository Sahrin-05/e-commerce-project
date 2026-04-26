<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-md flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-white/10 bg-dark-bg/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary-500 rounded-none flex items-center justify-center">
              <span class="text-dark-bg font-bold text-lg">S</span>
            </div>
            <span class="font-bold text-xl tracking-tight text-white uppercase tracking-widest text-glow">Sahrin Collective</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link to="/" class="text-slate-300 hover:text-primary-500 font-medium transition-colors uppercase text-sm tracking-wider">Home</router-link>
          <router-link to="/products" class="text-slate-300 hover:text-primary-500 font-medium transition-colors uppercase text-sm tracking-wider">Shop</router-link>
          <a href="#" class="text-slate-300 hover:text-primary-500 font-medium transition-colors uppercase text-sm tracking-wider">Categories</a>
          <a href="#" class="text-slate-300 hover:text-primary-500 font-medium transition-colors uppercase text-sm tracking-wider">About</a>
          <a href="#" class="text-slate-300 hover:text-primary-500 font-medium transition-colors uppercase text-sm tracking-wider">Contact</a>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-4">
          <button @click="cartStore.toggleDrawer" class="relative p-2 text-slate-300 hover:text-primary-500 transition-colors">
            <ShoppingCartIcon class="w-6 h-6" />
            <span v-if="cartStore.totalItems > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <div class="hidden md:flex items-center">
            <router-link v-if="!authStore.token" to="/login" class="btn-primary ml-2 text-sm">Login</router-link>
            <div v-else class="relative ml-2">
              <router-link to="/dashboard" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img :src="authStore.user?.image || `https://ui-avatars.com/api/?name=${authStore.user?.username}&background=random`" alt="avatar" class="w-8 h-8 rounded-full border border-slate-700">
              </router-link>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-slate-300 hover:text-primary-500">
            <MenuIcon v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <XIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition name="slide-up">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-dark-surface border-t border-slate-800">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link to="/" @click="isMobileMenuOpen = false" class="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary-500 hover:bg-slate-800 uppercase tracking-wider">Home</router-link>
          <router-link to="/products" @click="isMobileMenuOpen = false" class="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary-500 hover:bg-slate-800 uppercase tracking-wider">Shop</router-link>
          <a href="#" @click="isMobileMenuOpen = false" class="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary-500 hover:bg-slate-800 uppercase tracking-wider">Categories</a>
          <a href="#" @click="isMobileMenuOpen = false" class="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary-500 hover:bg-slate-800 uppercase tracking-wider">About</a>
          <a href="#" @click="isMobileMenuOpen = false" class="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary-500 hover:bg-slate-800 uppercase tracking-wider">Contact</a>
          <router-link v-if="!authStore.token" to="/login" @click="isMobileMenuOpen = false" class="block px-3 py-2 text-base font-medium text-primary-500 hover:bg-slate-800 uppercase tracking-wider mt-4">Login</router-link>
          <router-link v-else to="/dashboard" @click="isMobileMenuOpen = false" class="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary-500 hover:bg-slate-800 uppercase tracking-wider mt-4">Dashboard</router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ShoppingBagIcon, ShoppingCartIcon, MenuIcon, XIcon } from 'lucide-vue-next';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);
</script>
