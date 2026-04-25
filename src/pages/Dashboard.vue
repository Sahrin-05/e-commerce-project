<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex flex-col md:flex-row gap-8">
      
      <!-- Sidebar -->
      <aside class="w-full md:w-64 shrink-0 space-y-6">
        <div class="bg-white dark:bg-dark-surface rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center">
          <img :src="authStore.user?.image" :alt="authStore.user?.username" class="w-24 h-24 rounded-full mx-auto border-4 border-slate-50 dark:border-slate-800 shadow-sm mb-4">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">{{ authStore.user?.email }}</p>
          <button @click="handleLogout" class="w-full btn-secondary text-sm">
            Log Out
          </button>
        </div>

        <nav class="bg-white dark:bg-dark-surface rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
          <ul class="space-y-1">
            <li>
              <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 font-medium">
                <LayoutDashboardIcon class="w-5 h-5" />
                Overview
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                <ShoppingBagIcon class="w-5 h-5" />
                Orders
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                <HeartIcon class="w-5 h-5" />
                Wishlist
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                <SettingsIcon class="w-5 h-5" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 space-y-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>

        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-dark-surface rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div class="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <ShoppingBagIcon class="w-8 h-8" />
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">12</p>
            </div>
          </div>
          
          <div class="bg-white dark:bg-dark-surface rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div class="p-4 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <CreditCardIcon class="w-8 h-8" />
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Spent</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">$1,245.00</p>
            </div>
          </div>

          <div class="bg-white dark:bg-dark-surface rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div class="p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
              <HeartIcon class="w-8 h-8" />
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Wishlist Items</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">8</p>
            </div>
          </div>
        </div>

        <!-- Recent Orders (Mock Data) -->
        <div class="bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-500 dark:text-slate-400">
              <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
                <tr>
                  <th scope="col" class="px-6 py-3 font-medium">Order ID</th>
                  <th scope="col" class="px-6 py-3 font-medium">Date</th>
                  <th scope="col" class="px-6 py-3 font-medium">Status</th>
                  <th scope="col" class="px-6 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">#ORD-001</td>
                  <td class="px-6 py-4">Oct 24, 2023</td>
                  <td class="px-6 py-4">
                    <span class="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">Delivered</span>
                  </td>
                  <td class="px-6 py-4 font-medium">$124.50</td>
                </tr>
                <tr class="border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">#ORD-002</td>
                  <td class="px-6 py-4">Oct 18, 2023</td>
                  <td class="px-6 py-4">
                    <span class="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">Delivered</span>
                  </td>
                  <td class="px-6 py-4 font-medium">$89.99</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">#ORD-003</td>
                  <td class="px-6 py-4">Oct 05, 2023</td>
                  <td class="px-6 py-4">
                    <span class="px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">Processing</span>
                  </td>
                  <td class="px-6 py-4 font-medium">$299.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { LayoutDashboardIcon, ShoppingBagIcon, HeartIcon, SettingsIcon, CreditCardIcon } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>
