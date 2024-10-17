<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app__header">
    <div class="app__inner-header">
      <img src="@/assets/logo.png" alt="Main logo" class="app__logo">
      <nav class="app__nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="app__view" />
</template>

<style lang="scss">
.app {
  &__header {
    background-color: #0f1e25;
    color: white;
  }

  &__inner-header {
    padding: 1rem;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__nav {
    a {
      color: white;
      text-decoration: none;
      margin-left: 1rem;
    }
  }

  &__logo {
    height: 3rem;
  }

  &__view {
    max-width: 1024px;
    margin: 0 auto;
    padding: 1rem;
  }
}
</style>
