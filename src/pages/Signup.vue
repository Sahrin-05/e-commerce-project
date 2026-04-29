<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-500">
    <div class="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(28rem,34rem)]">
      <section class="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1500&q=80"
          alt="Luxury membership styling"
          class="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-300 hover:scale-[1.02]"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/65 to-transparent"></div>
        <div class="relative z-10 flex h-full flex-col justify-end p-12 xl:p-16">
          <span class="luxury-label !mb-4">Membership Atelier</span>
          <h1 class="max-w-2xl text-6xl font-bold uppercase leading-none tracking-tight xl:text-7xl">
            Join The Collective
          </h1>
          <p class="mt-6 max-w-xl text-base leading-8 text-slate-300">
            Create your private client profile for saved edits, order access, and collection-first shopping.
          </p>
          <div class="mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <p class="text-xl font-bold text-primary-300">01</p>
              <p class="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">Apply</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <p class="text-xl font-bold text-primary-300">02</p>
              <p class="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">Curate</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <p class="text-xl font-bold text-primary-300">03</p>
              <p class="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">Collect</p>
            </div>
          </div>
        </div>
      </section>

      <section class="relative flex items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_32%)]"></div>

    <div class="max-w-md w-full space-y-10 bg-slate-50/60 dark:bg-dark-surface/90 backdrop-blur-2xl p-8 sm:p-10 relative z-10 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl fade-in">
      <div class="text-center">
        <div class="mx-auto w-16 h-16 bg-primary-500 rounded-none flex items-center justify-center shadow-2xl shadow-primary-500/20 mb-8 transform rotate-3 transition-transform hover:rotate-0 duration-500">
          <span class="text-white dark:text-dark-bg font-bold text-3xl">S</span>
        </div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
          Join The Collective
        </h2>
        <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] font-bold">
          Apply for exclusive membership access
        </p>
      </div>
      
      <form class="space-y-6" @submit.prevent="handleSignup">
        <div class="grid grid-cols-2 gap-4">
          <div class="group">
            <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">First Name</label>
            <input v-model="form.firstName" type="text" required class="input-field !rounded-xl !py-3 text-xs" placeholder="John">
          </div>
          <div class="group">
            <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Last Name</label>
            <input v-model="form.lastName" type="text" required class="input-field !rounded-xl !py-3 text-xs" placeholder="Doe">
          </div>
        </div>

        <div class="group">
          <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
          <input v-model="form.email" type="email" required class="input-field !rounded-xl !py-3 text-xs" placeholder="john.doe@example.com">
        </div>

        <div class="group">
          <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Desired Username</label>
          <input v-model="form.username" type="text" required class="input-field !rounded-xl !py-3 text-xs" placeholder="johndoe_luxury">
        </div>

        <div class="group">
          <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Access Password</label>
          <input v-model="form.password" type="password" required class="input-field !rounded-xl !py-3 text-xs" placeholder="••••••••">
        </div>

        <div v-if="authStore.error" class="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-[10px] rounded-xl border border-red-100 dark:border-red-500/20 font-bold uppercase tracking-widest text-center">
          {{ authStore.error }}
        </div>

        <button 
          type="submit" 
          :disabled="authStore.isLoading"
          class="w-full btn-primary py-5 uppercase tracking-[0.2em] text-xs font-bold flex justify-center items-center gap-3 disabled:opacity-70 group"
        >
          <LoaderIcon v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
          <span v-else>Submit Application</span>
          <ArrowRightIcon v-if="!authStore.isLoading" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
      
      <div class="text-center pt-8 border-t border-slate-100 dark:border-white/5">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Already a member? 
          <router-link to="/login" class="text-primary-500 hover:text-primary-400 ml-1 transition-colors">Sign In Here</router-link>
        </p>
      </div>
    </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { LoaderIcon, ArrowRightIcon } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: ''
});

async function handleSignup() {
  try {
    await authStore.signup(form);
    alert('Application received! In this demo, you can now login with the default credentials.');
    router.push('/login');
  } catch (error) {
    // Error is handled in the store
  }
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(50px, -70px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 10s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
