<template>
  <div class="group bg-dark-surface rounded-none shadow-xl border border-white/5 overflow-hidden hover:shadow-2xl hover:border-primary-500/30 transition-all duration-500 flex flex-col h-full">
    <!-- Image Container -->
    <div class="relative w-full aspect-[4/3] bg-dark-bg overflow-hidden cursor-pointer" @click="$router.push(`/product/${product.id}`)">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span v-if="product.discountPercentage > 10" class="px-3 py-1 bg-red-900/80 text-red-100 border border-red-500/30 text-xs font-medium rounded-none shadow-sm uppercase tracking-wider backdrop-blur-sm">
          -{{ Math.round(product.discountPercentage) }}%
        </span>
        <span class="px-3 py-1 bg-dark-bg/90 text-white text-xs font-medium border border-white/10 rounded-none shadow-sm backdrop-blur-sm flex items-center gap-1">
          <StarIcon class="w-3 h-3 text-primary-500 fill-current" />
          {{ product.rating }}
        </span>
      </div>

      <!-- Quick Actions -->
      <div class="absolute bottom-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <button @click.stop="addToCart" class="p-3 bg-dark-bg text-primary-500 border border-primary-500/30 hover:bg-primary-500 hover:text-dark-bg transition-colors shadow-lg">
          <ShoppingCartIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <div class="text-[10px] font-semibold text-primary-500 mb-2 uppercase tracking-[0.2em]">{{ product.category }}</div>
      
      <h3 class="text-lg font-light text-white mb-3 line-clamp-1 cursor-pointer hover:text-primary-500 transition-colors" @click="$router.push(`/product/${product.id}`)">
        {{ product.title }}
      </h3>
      
      <p class="text-slate-400 text-sm font-light mb-6 line-clamp-2 flex-grow leading-relaxed">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
        <div class="flex flex-col">
          <span class="text-lg font-medium text-white">
            ${{ (product.price * (1 - product.discountPercentage / 100)).toFixed(2) }}
          </span>
          <span v-if="product.discountPercentage > 0" class="text-xs text-slate-500 line-through">
            ${{ product.price }}
          </span>
        </div>
        <button @click="addToCart" class="text-xs font-semibold uppercase tracking-widest text-primary-500 hover:text-white transition-colors py-2">
          + Add
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
