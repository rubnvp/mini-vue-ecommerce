<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarView from '@/views/NavbarView.vue';
</script>

<template>
  <NavbarView class="app__header" />
  <RouterView class="app__view" />
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.app {
  &__header {
    background-color: #0f1e25;
    position: fixed;
    top: 0;
    height: 87px;
    width: 100%;
    z-index: 1;
  }

  &__view {
    max-width: 1024px;
    margin: 0 auto;
    padding: 1rem;
    padding-top: 100px;

    @media (min-width: $desktop) {
      margin: 0;
      // Keep the view centered with the cart on desktop screens
      margin-left: calc((100vw - 1024px - 400px));
    }

    @media (min-width: $large-desktop) {
      margin: 0 auto;
    }
  }

}
</style>
