<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { vOnClickOutside } from '@vueuse/components'
import { useCartStore } from '@/stores/cartStore';
import { ref } from 'vue';

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
  <header class="navbar-view">
    <div class="navbar-view__inner-header">
      <RouterLink to="/">
        <img src="@/assets/images/logo.png" alt="Main logo" class="navbar-view__logo">
      </RouterLink>
      <nav class="navbar-view__navbar">
        <RouterLink class="navbar-view__navbar--item" to="/">Favorites</RouterLink>
        <RouterLink class="navbar-view__navbar--item" to="/about">About</RouterLink>
        <button class="navbar-view__cart-toggle" @click.stop="toggleCart">
          <img class="navbar-view__cart-toggle--icon" src="@/assets/images/cart.svg" alt="cart">
          <div v-if="cartStore.length" class="navbar-view__cart-toggle--counter">{{ cartStore.length }}</div>
        </button>
      </nav>
    </div>
    <aside class="navbar-view__cart" :class="{ 'navbar-view__cart--open': isCartOpen }"
      v-on-click-outside.bubble="closeCart">
      <ul>
        <li v-for="{ item, amount } in cartStore.cartItems" :key="item.id">
          {{ item.name }} ({{ item.price }}) {{ amount }}
          <button @click="cartStore.addItem(item)">Add</button>
          <button @click="cartStore.removeItem(item)">Remove</button>
        </li>
      </ul>
      Total: {{ cartStore.totalPrice }}€
    </aside>
  </header>
</template>

<style lang="scss">
.navbar-view {
  &__inner-header {
    color: white;
    padding: 1rem;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__navbar {
    display: flex;
    align-items: center;

    &--item {
      color: white;
      text-decoration: none;
      padding: 0.5rem;
    }
  }

  &__cart-toggle {
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

  &__cart {
    position: absolute;
    height: 100vh;
    width: 400px;
    right: 0;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    transform: translateX(100%);

    &--open {
      transform: translateX(0);
    }
  }

  &__logo {
    height: 3rem;
  }
}
</style>