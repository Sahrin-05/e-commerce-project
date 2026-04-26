<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="h-96 bg-white/5 animate-pulse rounded-none"></div>
      <div class="space-y-6">
        <div class="h-8 bg-white/5 animate-pulse rounded-none w-3/4"></div>
        <div class="h-4 bg-white/5 animate-pulse rounded-none w-1/4"></div>
        <div class="h-24 bg-white/5 animate-pulse rounded-none"></div>
      </div>
    </div>

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Image Gallery -->
      <div class="space-y-4">
        <div class="aspect-square bg-dark-bg rounded-none overflow-hidden border border-white/5 shadow-2xl">
          <img :src="activeImage" :alt="product.title" class="w-full h-full object-cover">
        </div>
        <div class="grid grid-cols-5 gap-4">
          <button 
            v-for="(img, idx) in product.images.slice(0, 5)" 
            :key="idx"
            @click="activeImage = img"
            :class="['aspect-square rounded-none overflow-hidden border transition-all', activeImage === img ? 'border-primary-500' : 'border-transparent hover:border-white/30']"
          >
            <img :src="img" :alt="`${product.title} ${idx}`" class="w-full h-full object-cover">
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex flex-col">
        <nav class="flex text-xs uppercase tracking-widest text-slate-400 mb-8 font-light">
          <router-link to="/" class="hover:text-primary-500 transition-colors">Home</router-link>
          <span class="mx-3 text-slate-600">/</span>
          <router-link to="/products" class="hover:text-primary-500 transition-colors">Shop</router-link>
          <span class="mx-3 text-slate-600">/</span>
          <span class="text-white">{{ product.category }}</span>
        </nav>

        <h1 class="text-3xl sm:text-4xl font-light text-white uppercase tracking-wider mb-6">{{ product.title }}</h1>
        
        <div class="flex flex-wrap items-center gap-4 mb-8">
          <div class="flex items-center gap-2 bg-primary-500/5 border border-primary-500/30 text-primary-500 px-4 py-1 rounded-none text-xs tracking-widest uppercase">
            <StarIcon class="w-3 h-3 fill-current" />
            {{ product.rating }}
          </div>
          <span class="text-slate-400 text-xs uppercase tracking-widest">Brand: <span class="font-normal text-white">{{ product.brand || 'Generic' }}</span></span>
          <span v-if="product.stock > 0" class="text-green-500 text-xs uppercase tracking-widest font-normal flex items-center gap-1">
            <CheckCircleIcon class="w-3 h-3" /> In Stock ({{ product.stock }})
          </span>
          <span v-else class="text-red-500 text-xs uppercase tracking-widest font-normal flex items-center gap-1">
            <XCircleIcon class="w-3 h-3" /> Out of Stock
          </span>
        </div>

        <div class="flex items-end gap-6 mb-10 pb-10 border-b border-white/5">
          <span class="text-4xl font-light text-white">
            ${{ discountedPrice }}
          </span>
          <div v-if="product.discountPercentage > 0" class="flex flex-col mb-1">
            <span class="text-lg text-slate-500 line-through">${{ product.price }}</span>
            <span class="text-xs font-semibold text-red-500 tracking-widest uppercase">{{ Math.round(product.discountPercentage) }}% OFF</span>
          </div>
        </div>

        <p class="text-slate-400 text-base mb-10 leading-relaxed font-light">
          {{ product.description }}
        </p>

        <div class="mt-auto space-y-8">
          <div class="flex items-center gap-6">
            <label class="text-xs uppercase tracking-widest text-white">Quantity</label>
            <div class="flex items-center border border-white/10 rounded-none bg-dark-bg">
              <button @click="quantity > 1 && quantity--" class="p-4 text-slate-500 hover:text-primary-500 transition-colors">
                <MinusIcon class="w-4 h-4" />
              </button>
              <span class="w-12 text-center font-light text-white">{{ quantity }}</span>
              <button @click="quantity < product.stock && quantity++" class="p-4 text-slate-500 hover:text-primary-500 transition-colors">
                <PlusIcon class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex gap-4">
            <button @click="handleAddToCart" :disabled="product.stock === 0" class="flex-1 btn-primary py-4 text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
              <ShoppingCartIcon class="w-4 h-4" />
              Add to Cart
            </button>
            <button class="p-4 rounded-none border border-white/10 text-slate-400 hover:bg-white/5 hover:text-primary-500 transition-colors">
              <HeartIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-32 bg-dark-surface border border-white/5 shadow-2xl">
      <h2 class="text-2xl font-light text-white mb-6 uppercase tracking-widest">Product Not Found</h2>
      <router-link to="/products" class="btn-primary py-3 px-8 text-sm uppercase tracking-widest">Back to Collection</router-link>
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
