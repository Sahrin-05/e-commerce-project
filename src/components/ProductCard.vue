<template>
  <div class="group bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
    <!-- Image Container -->
    <div class="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer" @click="$router.push(`/product/${product.id}`)">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span v-if="product.discountPercentage > 10" class="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
          -{{ Math.round(product.discountPercentage) }}%
        </span>
        <span class="px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-full shadow-sm backdrop-blur-sm flex items-center gap-1">
          <StarIcon class="w-3 h-3 text-yellow-400 fill-current" />
          {{ product.rating }}
        </span>
      </div>

      <!-- Quick Actions -->
      <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button @click.stop="addToCart" class="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors">
          <ShoppingCartIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-grow">
      <div class="text-xs font-medium text-primary-600 dark:text-primary-400 mb-2 uppercase tracking-wider">{{ product.category }}</div>
      
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 cursor-pointer hover:text-primary-600 transition-colors" @click="$router.push(`/product/${product.id}`)">
        {{ product.title }}
      </h3>
      
      <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mt-auto">
        <div class="flex flex-col">
          <span class="text-lg font-bold text-slate-900 dark:text-white">
            ${{ (product.price * (1 - product.discountPercentage / 100)).toFixed(2) }}
          </span>
          <span v-if="product.discountPercentage > 0" class="text-sm text-slate-400 line-through">
            ${{ product.price }}
          </span>
        </div>
        
        <button @click="addToCart" class="btn-primary text-sm px-4 py-2 flex items-center gap-2">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Product } from '../types';
import { useCartStore } from '../stores/cart';
import { StarIcon, ShoppingCartIcon } from 'lucide-vue-next';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});

const cartStore = useCartStore();

function addToCart() {
  cartStore.addToCart(props.product);
}
</script>
