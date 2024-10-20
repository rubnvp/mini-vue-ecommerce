<script setup lang="ts">
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components'
import { useCartStore } from '@/stores/cartStore';
import CartItem from '@/components/CartItem.vue';

const { toggleId } = defineProps<{ toggleId: string }>();

const cartStore = useCartStore();

const isCartOpen = ref(false);

function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}

function closeCart() {
  if (isCartOpen.value) {
    isCartOpen.value = false;
  }
}
</script>

<template>
  <aside class="cart-view" :class="{ 'cart-view--open': isCartOpen }" v-on-click-outside.bubble="closeCart">
    <Teleport :to="`#${toggleId}`" defer>
      <button class="cart-view__toggle" @click.stop="toggleCart">
        <img class="cart-view__toggle--icon" src="@/assets/images/cart.svg" alt="cart">
        <div v-if="cartStore.totalLength" class="cart-view__toggle--counter">{{ cartStore.totalLength }}</div>
      </button>
    </Teleport>
    <div class="cart-view__title">
      {{ cartStore.totalLength }} items selected
      <div class="cart-view__checkout">
        <b>Total {{ cartStore.totalPrice }}€</b>
        <button class="ds-primary-button">Checkout</button>
      </div>
    </div>
    <div class="cart-view__items">
      <CartItem v-for="{ item, amount } in cartStore.cartItems" :key="item.id" :item="item" :amount="amount"
        @onAdd="cartStore.addItem" @onRemove="cartStore.removeItem" />
    </div>
  </aside>
</template>

<style lang="scss">
.cart-view {
  position: absolute;
  height: 100vh;
  width: 400px;
  right: 0;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  transform: translateX(100%);
  padding: 10px;

  &--open {
    transform: translateX(0);
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  &__checkout {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;
    padding-bottom: 40px;
    height: calc(100% - 100px);
  }

  &__toggle {
    position: relative;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    padding: 12px;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &--icon {
      height: 24px;
    }

    &--counter {
      position: absolute;
      font-weight: bold;
      top: -0.5rem;
      right: -0.5rem;
      background-color: red;
      color: white;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>