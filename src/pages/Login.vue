<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-dark-bg">
    <!-- Decorative background elements -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>

    <div class="max-w-md w-full space-y-8 glass-card p-10 relative z-10 border-white/10 rounded-none shadow-2xl bg-dark-surface/90">
      <div>
        <div class="mx-auto w-16 h-16 bg-primary-500 rounded-none flex items-center justify-center shadow-lg shadow-primary-500/10 mb-8 border border-primary-500/30">
          <span class="text-dark-bg font-bold text-3xl">S</span>
        </div>
        <h2 class="text-center text-3xl font-light text-white uppercase tracking-widest">
          Welcome back
        </h2>
        <p class="mt-4 text-center text-sm text-slate-400 font-light tracking-wide">
          Sign in to your account
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-5">
          <div>
            <label for="username" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Username</label>
            <input 
              id="username" 
              name="username" 
              type="text" 
              required 
              v-model="username"
              class="input-field border-b-2 border-transparent focus:border-primary-500" 
              placeholder="e.g. emilys"
            >
          </div>
          <div>
            <label for="password" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              v-model="password"
              class="input-field border-b-2 border-transparent focus:border-primary-500" 
              placeholder="e.g. emilyspass"
            >
          </div>
        </div>

        <div v-if="authStore.error" class="p-4 bg-red-900/20 text-red-400 text-sm rounded-none border border-red-500/30 font-light">
          {{ authStore.error }}
        </div>
        
        <div class="text-xs text-slate-500 font-light tracking-wide bg-dark-bg p-4 border border-white/5">
          <p class="mb-2 text-slate-400 uppercase tracking-widest font-semibold">Demo Credentials:</p>
          <p>Username: <strong class="text-white font-normal">emilys</strong></p>
          <p>Password: <strong class="text-white font-normal">emilyspass</strong></p>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="authStore.isLoading"
            class="w-full btn-primary py-4 uppercase tracking-widest text-sm flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <LoaderIcon v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { LoaderIcon } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('emilys');
const password = ref('emilyspass');

async function handleLogin() {
  try {
    await authStore.login({ username: username.value, password: password.value });
    router.push('/dashboard');
  } catch (error) {
    // Error is handled in the store
  }
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
