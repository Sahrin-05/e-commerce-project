<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="h-96 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl"></div>
      <div class="space-y-6">
        <div class="h-8 bg-slate-200 dark:bg-slate-700 animate-pulse rounded w-3/4"></div>
        <div class="h-4 bg-slate-200 dark:bg-slate-700 animate-pulse rounded w-1/4"></div>
        <div class="h-24 bg-slate-200 dark:bg-slate-700 animate-pulse rounded"></div>
      </div>
    </div>

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Image Gallery -->
      <div class="space-y-4">
        <div class="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <img :src="activeImage" :alt="product.title" class="w-full h-full object-cover">
        </div>
        <div class="grid grid-cols-5 gap-4">
          <button 
            v-for="(img, idx) in product.images.slice(0, 5)" 
            :key="idx"
            @click="activeImage = img"
            :class="['aspect-square rounded-lg overflow-hidden border-2 transition-all', activeImage === img ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600']"
          >
            <img :src="img" :alt="`${product.title} ${idx}`" class="w-full h-full object-cover">
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex flex-col">
        <nav class="flex text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
          <router-link to="/" class="hover:text-primary-600 dark:hover:text-primary-400">Home</router-link>
          <span class="mx-2">/</span>
          <router-link to="/products" class="hover:text-primary-600 dark:hover:text-primary-400">Products</router-link>
          <span class="mx-2">/</span>
          <span class="capitalize text-slate-900 dark:text-slate-200">{{ product.category }}</span>
        </nav>

        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{{ product.title }}</h1>
        
        <div class="flex items-center gap-4 mb-6">
          <div class="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 px-3 py-1 rounded-full text-sm font-bold">
            <StarIcon class="w-4 h-4 fill-current" />
            {{ product.rating }}
          </div>
          <span class="text-slate-500 dark:text-slate-400 text-sm">Brand: <span class="font-semibold text-slate-900 dark:text-slate-200">{{ product.brand || 'Generic' }}</span></span>
          <span v-if="product.stock > 0" class="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1">
            <CheckCircleIcon class="w-4 h-4" /> In Stock ({{ product.stock }})
          </span>
          <span v-else class="text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-1">
            <XCircleIcon class="w-4 h-4" /> Out of Stock
          </span>
        </div>

        <div class="flex items-end gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          <span class="text-4xl font-extrabold text-slate-900 dark:text-white">
            ${{ discountedPrice }}
          </span>
          <div v-if="product.discountPercentage > 0" class="flex flex-col">
            <span class="text-lg text-slate-400 line-through">${{ product.price }}</span>
            <span class="text-sm font-bold text-red-500">{{ Math.round(product.discountPercentage) }}% OFF</span>
          </div>
        </div>

        <p class="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
          {{ product.description }}
        </p>

        <div class="mt-auto space-y-6">
          <div class="flex items-center gap-4">
            <label class="font-medium text-slate-900 dark:text-white">Quantity</label>
            <div class="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
              <button @click="quantity > 1 && quantity--" class="p-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                <MinusIcon class="w-5 h-5" />
              </button>
              <span class="w-12 text-center font-semibold text-slate-900 dark:text-white">{{ quantity }}</span>
              <button @click="quantity < product.stock && quantity++" class="p-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                <PlusIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex gap-4">
            <button @click="handleAddToCart" :disabled="product.stock === 0" class="flex-1 btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <ShoppingCartIcon class="w-5 h-5" />
              Add to Cart
            </button>
            <button class="p-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <HeartIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-24">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Product Not Found</h2>
      <router-link to="/products" class="btn-primary">Back to Products</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '../types';
import api from '../services/api';
import { useCartStore } from '../stores/cart';
import { StarIcon, CheckCircleIcon, XCircleIcon, MinusIcon, PlusIcon, ShoppingCartIcon, HeartIcon } from 'lucide-vue-next';

const route = useRoute();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const isLoading = ref(true);
const activeImage = ref('');
const quantity = ref(1);

const discountedPrice = computed(() => {
  if (!product.value) return '0.00';
  return (product.value.price * (1 - product.value.discountPercentage / 100)).toFixed(2);
});

onMounted(async () => {
  try {
    const id = route.params.id as string;
    const response = await api.getProduct(id);
    product.value = response.data;
    activeImage.value = product.value.images[0] || product.value.thumbnail;
  } catch (err) {
    console.error('Failed to load product', err);
  } finally {
    isLoading.value = false;
  }
});

function handleAddToCart() {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value);
  }
}
</script>
