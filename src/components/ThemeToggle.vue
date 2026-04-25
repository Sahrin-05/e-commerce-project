<template>
  <button 
    @click="toggleTheme" 
    class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
    aria-label="Toggle Dark Mode"
  >
    <SunIcon v-if="isDark" class="w-5 h-5" />
    <MoonIcon v-else class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme';
import { SunIcon, MoonIcon } from 'lucide-vue-next';

const { isDark, toggleTheme } = useTheme();
</script>
