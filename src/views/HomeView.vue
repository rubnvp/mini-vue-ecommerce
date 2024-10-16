<script setup lang="ts">
import { ref } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'
const items = ref<unknown>([]);

fetch('/api/grocery?_page=1&_per_page=20')
  .then((res) => res.json())
  .then((data) => {
    items.value = data;
  })
  .catch((err) => {
    console.error(err);
  });
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    Groceries:
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </main>
</template>
