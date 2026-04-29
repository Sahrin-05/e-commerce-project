<template>
  <div class="min-h-screen bg-white py-14 transition-colors duration-500 dark:bg-dark-bg md:py-24">
    <ToastNotification
      v-if="toast.visible"
      :message="toast.message"
      :type="toast.type"
      :duration="2600"
      @dismiss="toast.visible = false"
    />

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <span class="luxury-label">Private Checkout</span>
          <h1 class="text-4xl font-bold uppercase leading-none tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Secure Payment
          </h1>
        </div>
        <p class="max-w-xl text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Complete your order through a refined, encrypted checkout experience.
        </p>
      </div>

      <div
        v-if="cartStore.items.length === 0"
        class="glass-card mx-auto max-w-2xl p-8 text-center md:p-12"
      >
        <CheckCircleIcon class="mx-auto mb-6 h-12 w-12 text-primary-500/60" />
        <h2 class="mb-3 text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">
          Your bag is empty
        </h2>
        <p class="mb-8 text-sm text-slate-500 dark:text-slate-400">
          Add a piece to your collection before entering checkout.
        </p>
        <router-link to="/products" class="btn-primary">
          Shop Collections
          <ArrowRightIcon class="h-4 w-4" />
        </router-link>
      </div>

      <form v-else class="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_25rem]" @submit.prevent="processPayment">
        <div class="space-y-8">
          <section class="glass-card overflow-hidden p-6 md:p-8">
            <div class="mb-8 flex items-center gap-4">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                <MapPinIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-[0.28em] text-primary-500">Shipping Address</p>
                <h2 class="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">Delivery Details</h2>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div class="field-wrap">
                <label for="fullName" class="checkout-label">Full Name</label>
                <input
                  id="fullName"
                  v-model.trim="shipping.fullName"
                  class="checkout-input"
                  :class="{ 'checkout-input-error': errors.fullName }"
                  autocomplete="name"
                  placeholder="Aaliyah Fernando"
                >
                <p v-if="errors.fullName" class="checkout-error">{{ errors.fullName }}</p>
              </div>

              <div class="field-wrap">
                <label for="phone" class="checkout-label">Phone Number</label>
                <input
                  id="phone"
                  v-model="shipping.phone"
                  class="checkout-input"
                  :class="{ 'checkout-input-error': errors.phone }"
                  inputmode="tel"
                  autocomplete="tel"
                  placeholder="+94 77 123 4567"
                  @input="formatPhone"
                >
                <p v-if="errors.phone" class="checkout-error">{{ errors.phone }}</p>
              </div>

              <div class="field-wrap md:col-span-2">
                <label for="email" class="checkout-label">Email Address</label>
                <input
                  id="email"
                  v-model.trim="shipping.email"
                  class="checkout-input"
                  :class="{ 'checkout-input-error': errors.email }"
                  type="email"
                  autocomplete="email"
                  placeholder="client@sahrincollective.com"
                >
                <p v-if="errors.email" class="checkout-error">{{ errors.email }}</p>
              </div>

              <div class="field-wrap md:col-span-2">
                <label for="street" class="checkout-label">Street Address</label>
                <input
                  id="street"
                  v-model.trim="shipping.street"
                  class="checkout-input"
                  :class="{ 'checkout-input-error': errors.street }"
                  autocomplete="street-address"
                  placeholder="No. 24, Galle Road"
                >
                <p v-if="errors.street" class="checkout-error">{{ errors.street }}</p>
              </div>

              <div class="field-wrap">
                <label for="city" class="checkout-label">City</label>
                <input
                  id="city"
                  v-model.trim="shipping.city"
                  class="checkout-input"
                  :class="{ 'checkout-input-error': errors.city }"
                  autocomplete="address-level2"
                  placeholder="Colombo"
                >
                <p v-if="errors.city" class="checkout-error">{{ errors.city }}</p>
              </div>

              <div class="field-wrap">
                <label for="district" class="checkout-label">District / State</label>
                <input
                  id="district"
                  v-model.trim="shipping.district"
                  class="checkout-input"
                  :class="{ 'checkout-input-error': errors.district }"
                  autocomplete="address-level1"
                  placeholder="Western Province"
                >
                <p v-if="errors.district" class="checkout-error">{{ errors.district }}</p>
              </div>

              <div class="field-wrap">
                <label for="postalCode" class="checkout-label">Postal Code</label>
                <input
                  id="postalCode"
                  v-model.trim="shipping.postalCode"
                  class="checkout-input"
                  :class="{ 'checkout-input-error': errors.postalCode }"
                  inputmode="numeric"
                  autocomplete="postal-code"
                  placeholder="00300"
                >
                <p v-if="errors.postalCode" class="checkout-error">{{ errors.postalCode }}</p>
              </div>

              <div class="field-wrap">
                <label for="country" class="checkout-label">Country</label>
                <input
                  id="country"
                  v-model.trim="shipping.country"
                  class="checkout-input"
                  :class="{ 'checkout-input-error': errors.country }"
                  autocomplete="country-name"
                  placeholder="Sri Lanka"
                >
                <p v-if="errors.country" class="checkout-error">{{ errors.country }}</p>
              </div>
            </div>
          </section>

          <section class="glass-card p-6 md:p-8">
            <div class="mb-8 flex items-center gap-4">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                <CreditCardIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-[0.28em] text-primary-500">Payment Method</p>
                <h2 class="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">Choose Settlement</h2>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label
                v-for="method in paymentMethods"
                :key="method.value"
                class="payment-card"
                :class="{ 'payment-card-active': paymentMethod === method.value }"
              >
                <input v-model="paymentMethod" type="radio" class="sr-only" name="payment-method" :value="method.value">
                <span class="payment-radio" aria-hidden="true"></span>
                <span class="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-primary-500 shadow-sm dark:bg-white/5">
                  <component :is="method.icon" class="h-5 w-5" />
                </span>
                <span class="min-w-0">
                  <span class="block text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">{{ method.label }}</span>
                  <span class="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{{ method.description }}</span>
                </span>
              </label>
            </div>

            <Transition name="card-form">
              <div v-if="paymentMethod === 'card'" class="mt-8 overflow-hidden rounded-2xl border border-primary-500/20 bg-primary-500/[0.04] p-5 dark:bg-white/[0.03] md:p-6">
                <div class="mb-6 flex flex-col gap-4 rounded-2xl border border-white/50 bg-slate-950 p-6 text-white shadow-2xl dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p class="mb-10 text-[10px] font-bold uppercase tracking-[0.35em] text-primary-300">Sahrin Collective</p>
                    <p class="text-lg font-bold tracking-[0.2em]">{{ maskedCardNumber }}</p>
                  </div>
                  <div class="grid grid-cols-2 gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                    <span>
                      Holder
                      <strong class="mt-1 block max-w-[9rem] truncate text-xs text-white">{{ card.holderName || 'Your Name' }}</strong>
                    </span>
                    <span>
                      Expires
                      <strong class="mt-1 block text-xs text-white">{{ card.expiry || 'MM / YY' }}</strong>
                    </span>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div class="field-wrap md:col-span-2">
                    <label for="cardHolder" class="checkout-label">Card Holder Name</label>
                    <input
                      id="cardHolder"
                      v-model.trim="card.holderName"
                      class="checkout-input uppercase tracking-[0.14em]"
                      :class="{ 'checkout-input-error': errors.cardHolderName }"
                      autocomplete="cc-name"
                      placeholder="AALIYAH FERNANDO"
                    >
                    <p v-if="errors.cardHolderName" class="checkout-error">{{ errors.cardHolderName }}</p>
                  </div>

                  <div class="field-wrap md:col-span-2">
                    <label for="cardNumber" class="checkout-label">Card Number</label>
                    <input
                      id="cardNumber"
                      v-model="card.number"
                      class="checkout-input tracking-[0.18em]"
                      :class="{ 'checkout-input-error': errors.cardNumber }"
                      inputmode="numeric"
                      autocomplete="cc-number"
                      maxlength="19"
                      placeholder="0000 0000 0000 0000"
                      @input="formatCardNumber"
                    >
                    <p v-if="errors.cardNumber" class="checkout-error">{{ errors.cardNumber }}</p>
                  </div>

                  <div class="field-wrap">
                    <label for="expiry" class="checkout-label">Expiry Date</label>
                    <input
                      id="expiry"
                      v-model="card.expiry"
                      class="checkout-input tracking-[0.2em]"
                      :class="{ 'checkout-input-error': errors.expiry }"
                      inputmode="numeric"
                      autocomplete="cc-exp"
                      maxlength="7"
                      placeholder="MM / YY"
                      @input="formatExpiry"
                    >
                    <p v-if="errors.expiry" class="checkout-error">{{ errors.expiry }}</p>
                  </div>

                  <div class="field-wrap">
                    <label for="cvv" class="checkout-label">CVV</label>
                    <input
                      id="cvv"
                      v-model="card.cvv"
                      class="checkout-input tracking-[0.45em]"
                      :class="{ 'checkout-input-error': errors.cvv }"
                      type="password"
                      inputmode="numeric"
                      autocomplete="cc-csc"
                      maxlength="4"
                      placeholder="***"
                      @input="formatCvv"
                    >
                    <p v-if="errors.cvv" class="checkout-error">{{ errors.cvv }}</p>
                  </div>
                </div>
              </div>
            </Transition>
          </section>
        </div>

        <aside class="lg:sticky lg:top-28 lg:self-start">
          <div class="glass-card overflow-hidden p-6 md:p-8">
            <div class="mb-7 flex items-center justify-between border-b border-slate-200/70 pb-5 dark:border-white/10">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-[0.28em] text-primary-500">Order Summary</p>
                <h2 class="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">Your Selection</h2>
              </div>
              <span class="rounded-full border border-primary-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-500">
                {{ cartStore.totalItems }} items
              </span>
            </div>

            <div class="mb-7 max-h-72 space-y-4 overflow-y-auto pr-1">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
                <img :src="item.thumbnail" :alt="item.title" class="h-16 w-16 rounded-xl bg-slate-100 object-cover dark:bg-dark-bg">
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-bold uppercase tracking-tight text-slate-900 dark:text-white">{{ item.title }}</p>
                  <p class="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Qty {{ item.quantity }}</p>
                </div>
                <p class="text-sm font-bold text-slate-900 dark:text-white">${{ lineTotal(item).toFixed(2) }}</p>
              </div>
            </div>

            <div class="space-y-4 border-t border-slate-200/70 pt-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:text-slate-400">
              <div class="flex justify-between gap-6">
                <span>Subtotal</span>
                <span class="text-slate-900 dark:text-white">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between gap-6">
                <span>Shipping Fee</span>
                <span :class="shippingFee === 0 ? 'text-green-500' : 'text-slate-900 dark:text-white'">
                  {{ shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}` }}
                </span>
              </div>
              <div class="flex justify-between gap-6">
                <span>Tax</span>
                <span class="text-slate-900 dark:text-white">${{ tax.toFixed(2) }}</span>
              </div>
            </div>

            <div class="my-7 border-t border-slate-200/70 pt-6 dark:border-white/10">
              <div class="flex items-end justify-between gap-6">
                <span class="text-sm font-bold uppercase tracking-[0.22em] text-slate-900 dark:text-white">Total</span>
                <span class="text-3xl font-bold tracking-tight text-primary-500">${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isProcessing"
              class="btn-primary w-full py-5"
            >
              <span v-if="!isProcessing" class="flex items-center gap-3">
                Place Order
                <ArrowRightIcon class="h-4 w-4" />
              </span>
              <span v-else class="flex items-center gap-3">
                <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-dark-bg/30 dark:border-t-dark-bg"></span>
                Processing
              </span>
            </button>

            <div class="mt-6 flex items-start gap-3 border-t border-slate-200/70 pt-6 dark:border-white/10">
              <ShieldCheckIcon class="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
              <p class="text-[10px] font-bold uppercase leading-relaxed tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Frontend payment simulation. No real card transaction will be processed.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  ArrowRightIcon,
  BanknoteIcon,
  CheckCircleIcon,
  CreditCardIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from 'lucide-vue-next';
import ToastNotification from '../components/ToastNotification.vue';
import { useCartStore } from '../stores/cart';
import { useOrderStore } from '../stores/order';
import type { CartItem } from '../types';

type PaymentMethod = 'cod' | 'card';
type ToastType = 'success' | 'error' | 'info';

const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const isProcessing = ref(false);
const paymentMethod = ref<PaymentMethod>('cod');

const shipping = reactive({
  fullName: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  district: '',
  postalCode: '',
  country: 'Sri Lanka',
});

const card = reactive({
  holderName: '',
  number: '',
  expiry: '',
  cvv: '',
});

const errors = reactive<Record<string, string>>({});
const toast = reactive<{ visible: boolean; message: string; type: ToastType }>({
  visible: false,
  message: '',
  type: 'success',
});

const paymentMethods = [
  {
    value: 'cod' as const,
    label: 'Cash on Delivery',
    description: 'Pay when your curated order arrives at your door.',
    icon: BanknoteIcon,
  },
  {
    value: 'card' as const,
    label: 'Card Payment',
    description: 'Use a simulated secure card payment for this checkout.',
    icon: CreditCardIcon,
  },
];

const subtotal = computed(() => cartStore.totalPrice);
const shippingFee = computed(() => (subtotal.value >= 250 || subtotal.value === 0 ? 0 : 15));
const tax = computed(() => Number((subtotal.value * 0.08).toFixed(2)));
const total = computed(() => Number((subtotal.value + shippingFee.value + tax.value).toFixed(2)));

const maskedCardNumber = computed(() => {
  const digits = card.number.replace(/\D/g, '').padEnd(16, '*').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
});

function lineTotal(item: CartItem) {
  const discountedPrice = item.price * (1 - item.discountPercentage / 100);
  return discountedPrice * item.quantity;
}

function setToast(message: string, type: ToastType = 'success') {
  toast.visible = false;
  requestAnimationFrame(() => {
    toast.message = message;
    toast.type = type;
    toast.visible = true;
  });
}

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    delete errors[key];
  });
}

function formatPhone(event: Event) {
  const target = event.target as HTMLInputElement;
  shipping.phone = target.value.replace(/[^\d+\s-]/g, '').slice(0, 18);
}

function formatCardNumber(event: Event) {
  const target = event.target as HTMLInputElement;
  const digits = target.value.replace(/\D/g, '').slice(0, 16);
  card.number = digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(event: Event) {
  const target = event.target as HTMLInputElement;
  const digits = target.value.replace(/\D/g, '').slice(0, 4);
  card.expiry = digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

function formatCvv(event: Event) {
  const target = event.target as HTMLInputElement;
  card.cvv = target.value.replace(/\D/g, '').slice(0, 4);
}

function isValidExpiry(value: string) {
  const match = value.match(/^(\d{2})\s\/\s(\d{2})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiryDate = new Date(year, month, 0);
  return expiryDate >= new Date(now.getFullYear(), now.getMonth(), 1);
}

function validateCheckout() {
  clearErrors();

  if (cartStore.items.length === 0) {
    errors.cart = 'Your bag is empty.';
  }

  if (shipping.fullName.length < 3) errors.fullName = 'Enter the recipient full name.';
  if (shipping.phone.replace(/\D/g, '').length < 9) errors.phone = 'Enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) errors.email = 'Enter a valid email address.';
  if (shipping.street.length < 5) errors.street = 'Enter a complete street address.';
  if (shipping.city.length < 2) errors.city = 'Enter the city.';
  if (shipping.district.length < 2) errors.district = 'Enter the district or state.';
  if (!/^[A-Za-z0-9 -]{3,10}$/.test(shipping.postalCode)) errors.postalCode = 'Enter a valid postal code.';
  if (shipping.country.length < 2) errors.country = 'Enter the country.';

  if (paymentMethod.value === 'card') {
    if (card.holderName.length < 3) errors.cardHolderName = 'Enter the card holder name.';
    if (card.number.replace(/\D/g, '').length !== 16) errors.cardNumber = 'Enter a 16 digit card number.';
    if (!isValidExpiry(card.expiry)) errors.expiry = 'Enter a valid future expiry date.';
    if (!/^\d{3,4}$/.test(card.cvv)) errors.cvv = 'Enter a valid CVV.';
  }

  return Object.keys(errors).length === 0;
}

async function processPayment() {
  if (isProcessing.value) return;

  if (!validateCheckout()) {
    setToast('Please complete the highlighted checkout details.', 'error');
    return;
  }

  isProcessing.value = true;

  window.setTimeout(() => {
    orderStore.createOrder(cartStore.items, total.value);
    cartStore.clearCart();
    isProcessing.value = false;
    setToast('Order placed successfully. Preparing tracking details...', 'success');

    window.setTimeout(() => {
      router.push({ path: '/order-tracking' });
    }, 900);
  }, 1400);
}
</script>

<style scoped>
.field-wrap {
  @apply min-w-0 space-y-2;
}

.checkout-label {
  @apply block text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500 transition-colors dark:text-slate-400;
}

.checkout-input {
  @apply w-full rounded-2xl border border-slate-200/70 bg-white/75 px-5 py-4 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:shadow-gold dark:border-white/10 dark:bg-dark-bg/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:bg-dark-bg;
}

.checkout-input-error {
  @apply border-red-400/80 focus:border-red-500;
}

.checkout-error {
  @apply text-[10px] font-bold uppercase tracking-widest text-red-500;
}

.payment-card {
  @apply relative flex min-h-[9rem] cursor-pointer gap-4 rounded-2xl border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/40 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03];
}

.payment-card-active {
  @apply border-primary-500/70 bg-primary-500/10 shadow-gold;
}

.payment-radio {
  @apply absolute right-5 top-5 h-4 w-4 rounded-full border border-slate-300 bg-white transition-all duration-300 dark:border-white/20 dark:bg-dark-bg;
}

.payment-card-active .payment-radio {
  @apply border-primary-500 bg-primary-500 shadow-[0_0_0_4px_rgba(212,175,55,0.16)];
}

.card-form-enter-active,
.card-form-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease, max-height 0.35s ease;
  max-height: 42rem;
}

.card-form-enter-from,
.card-form-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>
