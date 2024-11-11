<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarView from '@/views/NavbarView.vue';
</script>

<template>
  <NavbarView class="header" />
  <RouterView v-slot="{ Component }">
    <main v-auto-animate class="view">
      <component :is="Component" />
    </main>
  </RouterView>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.header {
  background-color: #0f1e25;
  position: fixed;
  top: 0;
  height: 87px;
  width: 100%;
  z-index: 1;
}

.view {
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
</style>
