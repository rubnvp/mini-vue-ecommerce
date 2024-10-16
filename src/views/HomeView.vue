<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { fetchGroceries } from '@/api/groceriesApi';
import type { ItemType } from '@/types';
// import TheWelcome from '../components/TheWelcome.vue'

type SelectedItem = {
  item: ItemType;
  amount: number;
};

const items = ref<ItemType[]>([]);
const selectedItems = ref<SelectedItem[]>([]);

const itemIdToAmountMap = computed<Record<string, number>>(() => {
  const entries = selectedItems.value.map(({ item, amount }) => [item.id, amount]);
  return Object.fromEntries(entries);
});

const totalPrice = computed<number>(() => {
  return selectedItems.value.reduce((total, { item, amount }) => total + item.price * amount, 0);
});

const getStock = (item: ItemType) => {
  const selectedStock = itemIdToAmountMap.value[item.id] ?? 0;
  return item.stock - selectedStock;
};

const addItem = (item: ItemType) => {
  const selectedItem = selectedItems.value.find((selectedItem) => selectedItem.item.id === item.id);
  const stock = getStock(item);
  if (stock <= 0) return;
  if (selectedItem) {
    selectedItem.amount += 1;
  } else {
    selectedItems.value.push({ item, amount: 1 });
  }
};

const removeItem = (item: ItemType) => {
  const selectedItem = selectedItems.value.find((selectedItem) => selectedItem.item.id === item.id);
  if (!selectedItem) return;
  selectedItem.amount -= 1;
  if (selectedItem.amount <= 0) {
    selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.item.id !== item.id);
  }
};

onMounted(async () => {
  const groceries = await fetchGroceries();
  items.value = groceries;
});
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div>
      CART:
      <ul>
        <li v-for="{ item, amount } in selectedItems" :key="item.id">
          {{ item.name }} ({{ item.price }}) {{ amount }}
          <button @click="addItem(item)">Add</button>
          <button @click="removeItem(item)">Remove</button>
        </li>
      </ul>
      Total: {{ totalPrice }}€
    </div>

    Groceries:
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} (STOCK: {{ getStock(item) }}, PRICE: {{ item.price }}€)
        <button @click="addItem(item)">Add</button>
        <button @click="removeItem(item)">Remove</button>
      </li>
    </ul>
  </main>
</template>
