<template>
  <div class="flex flex-col gap-16 pb-16">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-dark-bg text-white py-32 sm:py-48 flex items-center justify-center min-h-[80vh]">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/80 to-transparent"></div>
        <img src="/hero.png" alt="Hero background" class="w-full h-full object-cover mix-blend-overlay opacity-50">
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full flex flex-col items-center sm:items-start">
        <span class="text-primary-500 uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">Welcome to Luxury</span>
        <h1 class="text-5xl sm:text-7xl font-light tracking-tight mb-6 uppercase text-glow font-sans">
          Sahrin <br class="hidden sm:block" /> <span class="font-bold text-primary-500">Collective</span>
        </h1>
        <p class="mt-4 text-lg sm:text-xl text-slate-300 max-w-xl mb-12 font-light leading-relaxed">
          Curated products for the modern aesthete. Experience unparalleled craftsmanship and exclusive design.
        </p>
        <div class="flex flex-col sm:flex-row gap-6">
          <router-link to="/products" class="btn-primary text-sm uppercase tracking-widest px-10 py-4">
            Shop Now
          </router-link>
          <a href="#featured" class="btn-secondary text-sm uppercase tracking-widest px-10 py-4">
            Explore Collection
          </a>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-32">
      
      <!-- Search & Filters (Quick access) -->
      <section class="bg-dark-surface/90 backdrop-blur-md p-8 sm:p-10 rounded-none border border-white/5 shadow-2xl -mt-24 relative z-20 mx-4 sm:mx-0">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="relative flex-grow">
            <SearchIcon class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Discover something extraordinary..." 
              class="input-field pl-14 py-4 w-full text-lg border-b-2 border-transparent focus:border-primary-500 bg-dark-bg rounded-none"
            >
          </div>
          <button @click="handleSearch" class="btn-primary py-4 px-10 text-sm tracking-widest uppercase md:w-auto w-full">Search</button>
        </div>
        
        <div class="mt-8 flex flex-wrap gap-4 items-center">
          <span class="text-xs uppercase tracking-widest text-slate-400 mr-2">Trending:</span>
          <button v-for="cat in productStore.categories.slice(0, 5)" :key="cat" @click="goToCategory(cat)" class="px-5 py-2 border border-white/10 text-slate-300 text-xs tracking-wider uppercase hover:border-primary-500 hover:text-primary-500 transition-colors capitalize">
            {{ cat }}
          </button>
        </div>
      </section>

      <!-- Featured Products -->
      <section id="featured">
        <div class="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span class="text-primary-500 uppercase tracking-widest text-xs font-semibold mb-2 block">Curated Selection</span>
            <h2 class="text-4xl font-light text-white uppercase tracking-wider">Featured</h2>
          </div>
          <router-link to="/products" class="text-slate-400 text-sm tracking-widest uppercase hover:text-primary-500 transition-colors border-b border-transparent hover:border-primary-500 pb-1">View all</router-link>
        </div>

        <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <LoadingSkeleton v-for="i in 4" :key="i" />
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in productStore.featuredProducts" :key="product.id" :product="product" />
        </div>
      </section>
      <!-- New Arrivals -->
      <section id="new-arrivals">
        <div class="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span class="text-primary-500 uppercase tracking-widest text-xs font-semibold mb-2 block">Latest Additions</span>
            <h2 class="text-4xl font-light text-white uppercase tracking-wider">New Arrivals</h2>
          </div>
          <router-link to="/products" class="text-slate-400 text-sm tracking-widest uppercase hover:text-primary-500 transition-colors border-b border-transparent hover:border-primary-500 pb-1">View all</router-link>
        </div>
        
        <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <LoadingSkeleton v-for="i in 4" :key="i" />
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard v-for="product in productStore.products.slice(0, 4)" :key="product.id" :product="product" />
        </div>
      </section>
      
      <!-- Value Props -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center py-16 border-y border-white/5">
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 rounded-full border border-primary-500/30 flex items-center justify-center mb-6 text-primary-500 bg-primary-500/5">
            <TruckIcon class="w-6 h-6" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-medium text-white mb-3">Complimentary Shipping</h3>
          <p class="text-slate-400 font-light text-sm">On all orders globally.</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 rounded-full border border-primary-500/30 flex items-center justify-center mb-6 text-primary-500 bg-primary-500/5">
            <ShieldCheckIcon class="w-6 h-6" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-medium text-white mb-3">Secure Transactions</h3>
          <p class="text-slate-400 font-light text-sm">Encrypted and private.</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 rounded-full border border-primary-500/30 flex items-center justify-center mb-6 text-primary-500 bg-primary-500/5">
            <RefreshCcwIcon class="w-6 h-6" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-medium text-white mb-3">Seamless Returns</h3>
          <p class="text-slate-400 font-light text-sm">30-day effortless return policy.</p>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="bg-dark-surface border border-white/5 p-12 sm:p-20 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-primary-500/5 mix-blend-overlay"></div>
        <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span class="text-primary-500 uppercase tracking-widest text-xs font-semibold mb-4 block">Join The Collective</span>
          <h2 class="text-3xl sm:text-4xl font-light text-white uppercase tracking-wider mb-6">Stay Inspired</h2>
          <p class="text-slate-400 font-light mb-10">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div class="flex flex-col sm:flex-row w-full gap-4">
            <input type="email" placeholder="Enter your email address" class="input-field flex-grow text-center sm:text-left bg-dark-bg" />
            <button class="btn-primary px-8">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import ProductCard from '../components/ProductCard.vue';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import { SearchIcon, TruckIcon, ShieldCheckIcon, RefreshCcwIcon } from 'lucide-vue-next';

const router = useRouter();
const productStore = useProductStore();
const searchQuery = ref('');

onMounted(async () => {
  if (productStore.featuredProducts.length === 0) {
    await productStore.fetchFeaturedProducts();
  }
  if (productStore.categories.length === 0) {
    await productStore.fetchCategories();
  }
  if (productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
});

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { q: searchQuery.value } });
  }
}

function goToCategory(category: string) {
  router.push({ path: '/products', query: { category } });
}
</script>
