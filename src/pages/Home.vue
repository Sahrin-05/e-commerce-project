<template>
  <div class="flex flex-col gap-16 pb-16">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-32 flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-slate-900/90"></div>
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" alt="Hero background" class="w-full h-full object-cover mix-blend-overlay">
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-glow">
          Discover Premium Lifestyle
        </h1>
        <p class="mt-4 text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
          Curated products for modern living. Fast shipping, secure checkout, and exceptional quality.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/products" class="btn-primary text-lg px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 hover:text-primary-600 font-bold border border-transparent hover:border-white/20 transition-all">
            Shop Collection
          </router-link>
          <a href="#featured" class="btn-secondary text-lg px-8 py-4 bg-transparent text-white border-white/30 hover:bg-white/10 dark:bg-transparent dark:text-white dark:border-white/30 dark:hover:bg-white/10 font-bold">
            View Featured
          </a>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-24">
      
      <!-- Search & Filters (Quick access) -->
      <section class="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 -mt-24 relative z-20">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="relative flex-grow">
            <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Search for products..." 
              class="input-field pl-12 py-4 w-full text-lg shadow-sm"
            >
          </div>
          <button @click="handleSearch" class="btn-primary py-4 px-8 text-lg md:w-auto w-full">Search</button>
        </div>
        
        <div class="mt-6 flex flex-wrap gap-2">
          <span class="text-sm font-medium text-slate-500 dark:text-slate-400 py-2 mr-2">Trending:</span>
          <button v-for="cat in productStore.categories.slice(0, 5)" :key="cat" @click="goToCategory(cat)" class="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-slate-700 transition-colors capitalize">
            {{ cat }}
          </button>
        </div>
      </section>

      <!-- Featured Products -->
      <section id="featured">
        <div class="flex justify-between items-end mb-8">
          <div>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
            <p class="text-slate-500 dark:text-slate-400 mt-2">Handpicked selections just for you.</p>
          </div>
          <router-link to="/products" class="text-primary-600 dark:text-primary-400 font-medium hover:underline hidden sm:block">View all &rarr;</router-link>
        </div>

        <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <LoadingSkeleton v-for="i in 4" :key="i" />
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in productStore.featuredProducts" :key="product.id" :product="product" />
        </div>
      </section>
      
      <!-- Value Props -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
        <div class="p-6 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100">
          <TruckIcon class="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 class="text-xl font-bold mb-2">Free Shipping</h3>
          <p class="opacity-80">On all orders over $100.</p>
        </div>
        <div class="p-6 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100">
          <ShieldCheckIcon class="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 class="text-xl font-bold mb-2">Secure Payment</h3>
          <p class="opacity-80">100% secure payment methods.</p>
        </div>
        <div class="p-6 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100">
          <RefreshCcwIcon class="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 class="text-xl font-bold mb-2">Easy Returns</h3>
          <p class="opacity-80">30 day return policy.</p>
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
