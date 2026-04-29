<template>
  <div class="py-10 md:py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section class="luxury-page-hero group mb-12 md:mb-16 fade-in">
        <img
          src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury category editorial"
          class="luxury-hero-bg group-hover:scale-[1.03]"
          loading="eager"
        >
        <div class="luxury-hero-overlay"></div>
        <div class="luxury-hero-content">
          <span class="luxury-label !mb-3">Curated Departments</span>
          <h1 class="luxury-hero-title">Shop By Category</h1>
          <p class="luxury-hero-copy">
            Move through focused edits across fashion, technology, accessories, and refined living.
          </p>
        </div>
      </section>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <router-link 
          v-for="category in categories" 
          :key="category.id" 
          :to="`/products?category=${category.slug}`"
          class="group relative h-96 overflow-hidden rounded-[2rem] block shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/10"
        >
          <!-- Background Image -->
          <div class="absolute inset-0">
            <img 
              :src="category.image" 
              :alt="category.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <!-- Content -->
          <div class="absolute inset-0 p-8 flex flex-col justify-end">
            <h3 class="text-2xl font-bold text-white mb-2 uppercase tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{{ category.name }}</h3>
            <p class="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-2">
              Explore Collection
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = [
  {
    id: 1,
    name: 'Fashion',
    slug: 'womens-dresses',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: 2,
    name: 'Electronics',
    slug: 'laptops',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: 3,
    name: 'Accessories',
    slug: 'womens-watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1598&q=80'
  },
  {
    id: 4,
    name: 'Lifestyle',
    slug: 'home-decoration',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80'
  }
];
</script>
