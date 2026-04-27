<template>
  <div class="flex flex-col gap-24 pb-24">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-slate-900 dark:bg-dark-bg text-white py-32 sm:py-48 flex items-center justify-center min-h-[85vh]">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent dark:from-dark-bg/95 dark:via-dark-bg/80 dark:to-transparent"></div>
        <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1788&q=80" alt="Hero background" class="w-full h-full object-cover mix-blend-overlay opacity-60">
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full flex flex-col items-center sm:items-start">
        <div class="overflow-hidden mb-4">
          <span class="text-primary-500 uppercase tracking-[0.4em] text-xs font-bold block animate-slide-up">Welcome to Luxury</span>
        </div>
        <h1 class="text-6xl sm:text-8xl font-light tracking-tight mb-8 uppercase text-glow font-sans leading-none">
          Sahrin <br class="hidden sm:block" /> <span class="font-bold text-primary-500">Collective</span>
        </h1>
        <p class="mt-4 text-lg sm:text-xl text-slate-300 max-w-xl mb-12 font-light leading-relaxed">
          Curated products for the modern aesthete. Experience unparalleled craftsmanship and exclusive design in every piece.
        </p>
        <div class="flex flex-col sm:flex-row gap-6">
          <router-link to="/products" class="btn-primary text-sm uppercase tracking-widest px-12 py-5">
            Shop Now
          </router-link>
          <router-link to="/categories" class="btn-secondary text-sm uppercase tracking-widest px-12 py-5 bg-white/5 backdrop-blur-sm">
            Categories
          </router-link>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div class="w-1 h-2 bg-primary-500 rounded-full"></div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-32">
      
      <!-- Quick Collections Spotlight (Replacing old search) -->
      <section class="glass-card p-8 sm:p-12 -mt-32 relative z-20">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div class="space-y-2">
            <span class="text-primary-500 uppercase tracking-[0.3em] text-[10px] font-bold block">Exclusive Discovery</span>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Curated Collections</h3>
          </div>
          <div class="flex flex-wrap gap-3 items-center justify-center sm:justify-end">
            <button 
              v-for="cat in productStore.categories.slice(0, 6)" 
              :key="cat" 
              @click="goToCategory(cat)" 
              class="px-6 py-2.5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[10px] tracking-widest uppercase hover:border-primary-500 hover:text-primary-500 transition-all capitalize hover:bg-primary-500/5 font-bold"
            >
              {{ typeof cat === 'object' ? cat.name : cat }}
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section id="featured">
        <div class="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div class="space-y-2">
            <span class="text-primary-500 uppercase tracking-widest text-xs font-bold block">Selection of Excellence</span>
            <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Featured</h2>
            <div class="w-12 h-1 bg-primary-500"></div>
          </div>
          <router-link to="/products" class="group flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs tracking-widest uppercase hover:text-primary-500 transition-colors">
            View all collections
            <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </router-link>
        </div>


        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <ProductCard v-for="product in featuredProductsCurated" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- Premium Collections Gallery -->
      <section class="space-y-12">
        <div class="text-center space-y-4">
          <span class="text-primary-500 uppercase tracking-[0.4em] text-[10px] font-bold block">The Curated Archive</span>
          <h2 class="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Exclusive Collections</h2>
          <div class="w-24 h-1 bg-primary-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[900px]">
          <!-- Large Card 1: Luxury Sneakers -->
          <router-link 
            :to="{ path: '/products', query: { category: 'mens-shoes' } }" 
            class="md:col-span-7 relative group overflow-hidden rounded-3xl shadow-2xl transition-all duration-700"
          >
            <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
            <div class="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-white">
              <span class="uppercase tracking-[0.4em] text-[10px] font-bold mb-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">Performance & Style</span>
              <h3 class="text-3xl md:text-5xl font-bold uppercase mb-4 tracking-tighter">Luxury Sneakers</h3>
              <p class="text-slate-300 max-w-md text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">Uncompromising craftsmanship meets contemporary silhouettes.</p>
              <div class="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                Explore Collection
                <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </router-link>

          <!-- Large Card 2: Premium Watches -->
          <router-link 
            :to="{ path: '/products', query: { category: 'mens-watches' } }" 
            class="md:col-span-5 relative group overflow-hidden rounded-3xl shadow-2xl transition-all duration-700"
          >
            <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
            <div class="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
              <span class="uppercase tracking-[0.4em] text-[10px] font-bold mb-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">Precision Engineering</span>
              <h3 class="text-3xl font-bold uppercase mb-4 tracking-tighter">Premium Watches</h3>
              <div class="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                Explore Collection
                <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </router-link>

          <!-- Row 2: Smaller Cards -->
          <router-link 
            :to="{ path: '/products', query: { category: 'mens-shirts' } }" 
            class="md:col-span-4 relative group overflow-hidden rounded-3xl shadow-2xl h-[400px] md:h-auto"
          >
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div class="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 class="text-xl font-bold uppercase mb-2 tracking-widest">Streetwear</h3>
              <div class="w-10 h-0.5 bg-primary-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
          </router-link>

          <router-link 
            :to="{ path: '/products', query: { category: 'womens-dresses' } }" 
            class="md:col-span-4 relative group overflow-hidden rounded-3xl shadow-2xl h-[400px] md:h-auto"
          >
            <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div class="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 class="text-xl font-bold uppercase mb-2 tracking-widest">Minimal Fashion</h3>
              <div class="w-10 h-0.5 bg-primary-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
          </router-link>

          <router-link 
            :to="{ path: '/products', query: { category: 'sunglasses' } }" 
            class="md:col-span-4 relative group overflow-hidden rounded-3xl shadow-2xl h-[400px] md:h-auto"
          >
            <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div class="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 class="text-xl font-bold uppercase mb-2 tracking-widest">Urban Essentials</h3>
              <div class="w-10 h-0.5 bg-primary-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Best Sellers -->
      <section id="best-sellers">
        <div class="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div class="space-y-2">
            <span class="text-primary-500 uppercase tracking-widest text-xs font-bold block">Customer Favorites</span>
            <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Best Sellers</h2>
            <div class="w-12 h-1 bg-primary-500"></div>
          </div>
        </div>
        

        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <ProductCard v-for="product in bestSellersCurated" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- Customer Reviews -->
      <section class="py-24 bg-slate-50 dark:bg-white/5 rounded-3xl px-8 md:px-16">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold uppercase tracking-tight text-slate-900 dark:text-white mb-4">The Collective Voice</h2>
          <div class="w-24 h-1 bg-primary-500 mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="glass-card p-10 flex flex-col items-center text-center">
            <div class="flex gap-1 mb-6 text-primary-500">
              <StarIcon v-for="s in 5" :key="s" class="w-4 h-4 fill-current" />
            </div>
            <p class="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed">
              "The attention to detail and quality of the products I've received from Sahrin Collective is truly remarkable. A premium experience from start to finish."
            </p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              <div class="text-left">
                <p class="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider">Julianne V.</p>
                <p class="text-[10px] text-slate-500 uppercase tracking-widest">Verified Collector</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Newsletter -->
      <section class="relative bg-slate-900 dark:bg-dark-surface rounded-3xl p-12 sm:p-24 text-center overflow-hidden shadow-2xl">
        <div class="absolute inset-0 bg-primary-500/5 mix-blend-overlay"></div>
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        
        <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span class="text-primary-500 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Newsletter</span>
          <h2 class="text-4xl md:text-5xl font-light text-white uppercase tracking-wider mb-8">Join The <span class="font-bold text-primary-500">Collective</span></h2>
          <p class="text-slate-400 font-light mb-12 text-lg">Receive exclusive previews of new arrivals, limited editions, and curated styling guides.</p>
          <div class="flex flex-col sm:flex-row w-full gap-4 max-w-lg">
            <input type="email" placeholder="Email Address" class="input-field !rounded-none flex-grow text-center sm:text-left bg-white/5 border-white/10 text-white focus:border-primary-500" />
            <button class="btn-primary px-10 py-4 uppercase tracking-widest text-xs">Subscribe</button>
          </div>
        </div>
      </section>

      <!-- Quality Indicators -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-16 text-center py-16">
        <div class="flex flex-col items-center group">
          <div class="w-20 h-20 rounded-full border border-slate-200 dark:border-primary-500/20 flex items-center justify-center mb-8 text-primary-500 bg-white dark:bg-primary-500/5 group-hover:scale-110 transition-transform shadow-lg">
            <TruckIcon class="w-8 h-8" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Complimentary Logistics</h3>
          <p class="text-slate-500 dark:text-slate-400 font-light text-sm leading-relaxed">Seamless worldwide shipping on all curated orders.</p>
        </div>
        <div class="flex flex-col items-center group">
          <div class="w-20 h-20 rounded-full border border-slate-200 dark:border-primary-500/20 flex items-center justify-center mb-8 text-primary-500 bg-white dark:bg-primary-500/5 group-hover:scale-110 transition-transform shadow-lg">
            <ShieldCheckIcon class="w-8 h-8" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Authenticity Guaranteed</h3>
          <p class="text-slate-500 dark:text-slate-400 font-light text-sm leading-relaxed">Every piece is verified for quality and craftsmanship.</p>
        </div>
        <div class="flex flex-col items-center group">
          <div class="w-20 h-20 rounded-full border border-slate-200 dark:border-primary-500/20 flex items-center justify-center mb-8 text-primary-500 bg-white dark:bg-primary-500/5 group-hover:scale-110 transition-transform shadow-lg">
            <RefreshCcwIcon class="w-8 h-8" />
          </div>
          <h3 class="text-lg uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Concierge Returns</h3>
          <p class="text-slate-500 dark:text-slate-400 font-light text-sm leading-relaxed">Effortless 30-day return policy for our discerning clientele.</p>
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
import { 
  SearchIcon, TruckIcon, ShieldCheckIcon, RefreshCcwIcon, 
  ArrowRightIcon, StarIcon 
} from 'lucide-vue-next';

const router = useRouter();
const productStore = useProductStore();


const featuredProductsCurated = [
  { id: 101, title: 'Luxury Sneakers', price: 180, thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', category: 'Footwear', rating: 4.9, discountPercentage: 10 },
  { id: 102, title: 'Premium Watch', price: 250, thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', category: 'Accessories', rating: 4.8, discountPercentage: 0 },
  { id: 103, title: 'Streetwear Hoodie', price: 85, thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', category: 'Apparel', rating: 4.7, discountPercentage: 15 },
  { id: 104, title: 'Minimal Jacket', price: 120, thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', category: 'Apparel', rating: 4.9, discountPercentage: 0 },
  { id: 105, title: 'Urban Essentials', price: 45, thumbnail: 'https://images.unsplash.com/photo-1509941943102-10c232535736?auto=format&fit=crop&w=800&q=80', category: 'Lifestyle', rating: 4.6, discountPercentage: 0 },
  { id: 106, title: 'Premium Sunglasses', price: 150, thumbnail: 'https://images.unsplash.com/photo-1511499767350-a1590fdb7318?auto=format&fit=crop&w=800&q=80', category: 'Accessories', rating: 4.8, discountPercentage: 20 },
];

const bestSellersCurated = [
  { id: 201, title: 'Nike Air Style Sneakers', price: 160, thumbnail: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80', category: 'Footwear', rating: 5.0, discountPercentage: 0 },
  { id: 202, title: 'Classic Leather Watch', price: 195, thumbnail: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80', category: 'Accessories', rating: 4.9, discountPercentage: 5 },
  { id: 203, title: 'Oversized Street Hoodie', price: 75, thumbnail: 'https://images.unsplash.com/photo-1578932750294-f5001e65c1bb?auto=format&fit=crop&w=800&q=80', category: 'Apparel', rating: 4.8, discountPercentage: 10 },
  { id: 204, title: 'Minimal White Sneakers', price: 110, thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', category: 'Footwear', rating: 4.9, discountPercentage: 0 },
  { id: 205, title: 'Urban Backpack', price: 130, thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&w=800&q=80', category: 'Accessories', rating: 4.7, discountPercentage: 0 },
  { id: 206, title: 'Designer Perfume', price: 210, thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80', category: 'Fragrance', rating: 4.9, discountPercentage: 15 },
];

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



function goToCategory(category: string) {
  router.push({ path: '/products', query: { category } });
}
</script>
