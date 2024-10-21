<script setup lang="ts">
import { RouterLink } from 'vue-router';
import CartView from '@/views/CartView.vue';

const toggleId = 'cart-toggle';
</script>

<template>
  <header class="navbar-view">
    <div class="navbar-view__inner-header">
      <RouterLink to="/">
        <img src="@/assets/images/logo.png" alt="Main logo" class="navbar-view__logo">
      </RouterLink>
      <nav class="navbar-view__navbar">
        <RouterLink class="navbar-view__navbar--item" to="/">Products</RouterLink>
        <RouterLink class="navbar-view__navbar--item" to="/favorites">Favorites</RouterLink>
        <RouterLink class="navbar-view__navbar--item" to="/about">About</RouterLink>
        <span :id="toggleId"></span>
      </nav>
    </div>
    <CartView :toggleId="toggleId" />
  </header>
</template>

<style lang="scss">
.navbar-view {
  z-index: 1;

  &__inner-header {
    color: inherit;
    padding: 1rem;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    height: 3rem;
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
}
</style>