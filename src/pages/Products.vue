<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex flex-col md:flex-row gap-8">
      
      <!-- Sidebar Filters -->
      <aside class="w-full md:w-64 shrink-0 space-y-8">
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Categories</h3>
          <div v-if="productStore.categories.length === 0" class="space-y-2">
            <div v-for="i in 5" :key="i" class="h-8 bg-slate-200 dark:bg-slate-700 animate-pulse rounded"></div>
          </div>
          <ul v-else class="space-y-2">
            <li>
              <button @click="clearFilters" :class="['w-full text-left px-3 py-2 rounded-lg transition-colors capitalize text-sm font-medium', !activeCategory ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800']">
                All Products
              </button>
            </li>
            <li v-for="cat in productStore.categories" :key="cat">
              <button @click="selectCategory(cat)" :class="['w-full text-left px-3 py-2 rounded-lg transition-colors capitalize text-sm font-medium', activeCategory === cat ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800']">
                {{ cat }}
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white capitalize">
            {{ activeCategory ? activeCategory : (searchQuery ? `Search: "${searchQuery}"` : 'All Products') }}
          </h1>
          
          <div class="relative w-full sm:w-64">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              v-model="searchInput" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Search products..." 
              class="input-field pl-9 py-2 text-sm"
            >
          </div>
        </div>

        <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingSkeleton v-for="i in 6" :key="i" />
        </div>

        <div v-else-if="productStore.products.length === 0" class="text-center py-24 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800">
          <PackageIcon class="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
          <p class="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
          <button @click="clearFilters" class="btn-primary mt-6">Clear All Filters</button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in productStore.products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import ProductCard from '../components/ProductCard.vue';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import { SearchIcon, PackageIcon } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const activeCategory = ref(route.query.category as string || '');
const searchQuery = ref(route.query.q as string || '');
const searchInput = ref(searchQuery.value);

onMounted(async () => {
  if (productStore.categories.length === 0) {
    productStore.fetchCategories();
  }
  loadProducts();
});

watch(() => route.query, () => {
  activeCategory.value = route.query.category as string || '';
  searchQuery.value = route.query.q as string || '';
  searchInput.value = searchQuery.value;
  loadProducts();
});

async function loadProducts() {
  if (searchQuery.value) {
    await productStore.searchProducts(searchQuery.value);
  } else if (activeCategory.value) {
    await productStore.filterByCategory(activeCategory.value);
  } else {
    await productStore.fetchProducts(24, 0); // Load more on initial
  }
}

function handleSearch() {
  if (searchInput.value.trim()) {
    router.push({ query: { q: searchInput.value } });
  } else {
    clearFilters();
  }
}

function selectCategory(category: string) {
  router.push({ query: { category } });
}

function clearFilters() {
  searchInput.value = '';
  router.push({ query: {} });
}
</script>
