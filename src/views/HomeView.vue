<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchGroceries } from '@/api/groceriesApi';
import type { ItemType } from '@/types';
import { useCartStore } from '@/stores/cartStore';

const items = ref<ItemType[]>([]);
const cartStore = useCartStore();

onMounted(async () => {
  const groceries = await fetchGroceries();
  items.value = groceries;
});
</script>

<template>
  <main>
    <div v-if="false">
      CART:
      <ul>
        <li v-for="{ item, amount } in cartStore.cartItems" :key="item.id">
          {{ item.name }} ({{ item.price }}) {{ amount }}
          <button @click="cartStore.addItem(item)">Add</button>
          <button @click="cartStore.removeItem(item)">Remove</button>
        </li>
      </ul>
      Total: {{ cartStore.totalPrice }}€
    </div>

    Groceries:
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} (STOCK: {{ cartStore.getStock(item) }}, PRICE: {{ item.price }}€)
        <button @click="cartStore.addItem(item)">Add</button>
        <button @click="cartStore.removeItem(item)">Remove</button>
      </li>
    </ul>
  </main>
</template>
