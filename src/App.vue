<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarView from '@/views/NavbarView.vue';
</script>

<template>
  <NavbarView class="app__header" />
  <RouterView class="app__view" />
</template>

<style lang="scss">
.app {
  &__header {
    background-color: #0f1e25;
    position: sticky;
    top: 0;
  }

  &__view {
    max-width: 1024px;
    margin: 0 auto;
    padding: 1rem;
  }
}
</style>
