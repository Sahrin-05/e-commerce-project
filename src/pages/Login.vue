<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

    <div class="max-w-md w-full space-y-8 glass-card p-8 relative z-10">
      <div>
        <div class="mx-auto w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 mb-6">
          <span class="text-white font-bold text-3xl">N</span>
        </div>
        <h2 class="text-center text-3xl font-extrabold text-slate-900 dark:text-white">
          Welcome back
        </h2>
        <p class="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Sign in to your account
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
            <input 
              id="username" 
              name="username" 
              type="text" 
              required 
              v-model="username"
              class="input-field" 
              placeholder="e.g. emilys"
            >
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              v-model="password"
              class="input-field" 
              placeholder="e.g. emilyspass"
            >
          </div>
        </div>

        <div v-if="authStore.error" class="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
          {{ authStore.error }}
        </div>
        
        <div class="text-sm text-slate-500 dark:text-slate-400">
          <p>Demo Credentials:</p>
          <p>Username: <strong>emilys</strong></p>
          <p>Password: <strong>emilyspass</strong></p>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="authStore.isLoading"
            class="w-full btn-primary py-3 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
