<template>
  <section class="relative min-h-screen overflow-hidden bg-slate-950 text-white">
    <img
      src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1900&q=88"
      alt="Elegant luxury fashion man"
      class="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-90"
    >
    <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/72 to-slate-950/10"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20"></div>
    <div class="absolute left-[40%] top-[24%] h-80 w-80 rounded-full bg-primary-500/25 blur-[110px] md:h-[34rem] md:w-[34rem]"></div>
    <div class="absolute left-[48%] top-[34%] h-52 w-52 rounded-full bg-rose-500/15 blur-[90px] md:h-80 md:w-80"></div>

    <div class="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28 sm:px-10 lg:px-12">
      <div class="max-w-3xl text-center sm:text-left">
        <span class="luxury-label !mb-5 !text-primary-300 hero-soft-enter">The 2026 Luxury Edit</span>
        <h1 class="hero-soft-enter text-5xl font-light uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
          Sahrin
          <span class="block font-bold text-primary-400">Collective</span>
        </h1>
        <p class="hero-soft-enter mx-auto mt-8 max-w-xl text-lg font-light leading-8 text-slate-200 sm:mx-0 sm:text-xl">
          Luxury Fashion & Premium Lifestyle
        </p>

        <div class="hero-soft-enter mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:justify-start">
          <router-link to="/products" class="btn-primary !rounded-full !px-10 !py-5">
            Shop Now
            <ArrowRightIcon class="h-4 w-4" />
          </router-link>
          <router-link to="/categories" class="btn-secondary !rounded-full !border-white/25 !px-10 !py-5 !text-white/90 backdrop-blur-sm hover:!bg-white/10">
            Explore Collection
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next';
</script>

<style scoped>
.hero-soft-enter {
  animation: heroSoftEnter 0.9s ease both;
}

.hero-soft-enter:nth-child(2) {
  animation-delay: 0.08s;
}

.hero-soft-enter:nth-child(3) {
  animation-delay: 0.16s;
}

.hero-soft-enter:nth-child(4) {
  animation-delay: 0.24s;
}

@keyframes heroSoftEnter {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
