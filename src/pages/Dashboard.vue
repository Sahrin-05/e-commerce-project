<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex flex-col md:flex-row gap-8">
      
      <!-- Sidebar -->
      <aside class="w-full md:w-64 shrink-0 space-y-6">
        <div class="bg-dark-surface rounded-none p-8 border border-white/5 text-center shadow-2xl">
          <img :src="authStore.user?.image" :alt="authStore.user?.username" class="w-24 h-24 rounded-none mx-auto border border-primary-500/50 shadow-sm mb-6 object-cover p-1">
          <h2 class="text-xl font-light text-white uppercase tracking-widest">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</h2>
          <p class="text-sm text-slate-400 mb-8 font-light">{{ authStore.user?.email }}</p>
          <button @click="handleLogout" class="w-full btn-secondary text-xs uppercase tracking-widest py-3">
            Log Out
          </button>
        </div>

        <nav class="bg-dark-surface rounded-none p-4 border border-white/5 shadow-2xl">
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-none bg-primary-500/5 text-primary-500 font-medium border-l-2 border-primary-500">
                <LayoutDashboardIcon class="w-5 h-5" />
                <span class="uppercase tracking-widest text-xs">Overview</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-none text-slate-400 hover:bg-dark-bg hover:text-primary-500 transition-colors border-l-2 border-transparent hover:border-primary-500/50">
                <ShoppingBagIcon class="w-5 h-5" />
                <span class="uppercase tracking-widest text-xs">Orders</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-none text-slate-400 hover:bg-dark-bg hover:text-primary-500 transition-colors border-l-2 border-transparent hover:border-primary-500/50">
                <HeartIcon class="w-5 h-5" />
                <span class="uppercase tracking-widest text-xs">Wishlist</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-none text-slate-400 hover:bg-dark-bg hover:text-primary-500 transition-colors border-l-2 border-transparent hover:border-primary-500/50">
                <SettingsIcon class="w-5 h-5" />
                <span class="uppercase tracking-widest text-xs">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 space-y-8">
        <h1 class="text-3xl font-light text-white uppercase tracking-widest mb-10">Dashboard</h1>

        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="bg-dark-surface rounded-none p-6 border border-white/5 shadow-2xl flex items-center gap-6">
            <div class="p-4 bg-dark-bg text-primary-500 rounded-none border border-primary-500/30">
              <ShoppingBagIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-slate-400 mb-1">Total Orders</p>
              <p class="text-2xl font-light text-white">12</p>
            </div>
          </div>
          
          <div class="bg-dark-surface rounded-none p-6 border border-white/5 shadow-2xl flex items-center gap-6">
            <div class="p-4 bg-dark-bg text-primary-500 rounded-none border border-primary-500/30">
              <CreditCardIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-slate-400 mb-1">Total Spent</p>
              <p class="text-2xl font-light text-white">$1,245.00</p>
            </div>
          </div>

          <div class="bg-dark-surface rounded-none p-6 border border-white/5 shadow-2xl flex items-center gap-6">
            <div class="p-4 bg-dark-bg text-primary-500 rounded-none border border-primary-500/30">
              <HeartIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-slate-400 mb-1">Wishlist</p>
              <p class="text-2xl font-light text-white">8</p>
            </div>
          </div>
        </div>

        <!-- Recent Orders (Mock Data) -->
        <div class="bg-dark-surface rounded-none border border-white/5 shadow-2xl overflow-hidden">
          <div class="px-8 py-6 border-b border-white/5">
            <h3 class="text-lg font-light text-white uppercase tracking-widest">Recent Orders</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-400">
              <thead class="bg-dark-bg text-slate-300">
                <tr>
                  <th scope="col" class="px-8 py-4 font-semibold uppercase tracking-widest text-xs">Order ID</th>
                  <th scope="col" class="px-8 py-4 font-semibold uppercase tracking-widest text-xs">Date</th>
                  <th scope="col" class="px-8 py-4 font-semibold uppercase tracking-widest text-xs">Status</th>
                  <th scope="col" class="px-8 py-4 font-semibold uppercase tracking-widest text-xs">Total</th>
                </tr>
              </thead>
              <tbody class="font-light">
                <tr class="border-b border-white/5 last:border-0 hover:bg-dark-bg/50 transition-colors">
                  <td class="px-8 py-5 text-white">#ORD-001</td>
                  <td class="px-8 py-5">Oct 24, 2026</td>
                  <td class="px-8 py-5">
                    <span class="px-3 py-1 text-[10px] uppercase tracking-widest border border-green-500/30 text-green-400 rounded-none bg-green-500/5">Delivered</span>
                  </td>
                  <td class="px-8 py-5 text-white">$124.50</td>
                </tr>
                <tr class="border-b border-white/5 last:border-0 hover:bg-dark-bg/50 transition-colors">
                  <td class="px-8 py-5 text-white">#ORD-002</td>
                  <td class="px-8 py-5">Oct 18, 2026</td>
                  <td class="px-8 py-5">
                    <span class="px-3 py-1 text-[10px] uppercase tracking-widest border border-green-500/30 text-green-400 rounded-none bg-green-500/5">Delivered</span>
                  </td>
                  <td class="px-8 py-5 text-white">$89.99</td>
                </tr>
                <tr class="hover:bg-dark-bg/50 transition-colors">
                  <td class="px-8 py-5 text-white">#ORD-003</td>
                  <td class="px-8 py-5">Oct 05, 2026</td>
                  <td class="px-8 py-5">
                    <span class="px-3 py-1 text-[10px] uppercase tracking-widest border border-primary-500/30 text-primary-500 rounded-none bg-primary-500/5">Processing</span>
                  </td>
                  <td class="px-8 py-5 text-white">$299.00</td>
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
