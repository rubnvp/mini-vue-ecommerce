<script setup lang="ts">
import { RouterLink } from 'vue-router';
import CartView from '@/views/CartView.vue';

const toggleId = 'cart-toggle';
</script>

<template>
  <header>
    <div class="inner-header">
      <RouterLink to="/">
        <img src="@/assets/images/logo.png" alt="Main logo" class="logo" />
      </RouterLink>
      <nav class="navbar">
        <RouterLink class="navbar-item" to="/">Products</RouterLink>
        <RouterLink class="navbar-item" to="/favorites">Favorites</RouterLink>
        <RouterLink class="navbar-item" to="/about">About</RouterLink>
        <span :id="toggleId"></span>
      </nav>
    </div>
    <CartView :toggleId="toggleId" />
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.inner-header {
  color: inherit;
  padding: 1rem;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 3rem;
}

.navbar {
  display: flex;
  align-items: center;
}

.navbar-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem;

  &:first-child {
    // Hide the first item on small mobile
    display: none;

    @media (min-width: $small-mobile) {
      display: block;
    }
  }
}
</style>
