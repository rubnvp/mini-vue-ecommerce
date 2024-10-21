<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchGroceries } from '@/api/groceriesApi';
import type { ItemType } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import ItemCard from '@/components/ItemCard.vue';

const items = ref<ItemType[]>([]);
const cartStore = useCartStore();

onMounted(async () => {
  const groceries = await fetchGroceries();
  items.value = groceries;
});
</script>

<template>
  <main>
    <div class="favorites-view__cards">
      <ItemCard v-for="item in items" :key="item.id" :item="item" :stock="cartStore.getStock(item)"
        :selectedAmount="cartStore.itemIdToAmountMap[item.id]" @onAdd="cartStore.addItem"
        @onRemove="cartStore.removeItem" />
    </div>
  </main>
</template>

<style lang="scss">
.favorites-view {
  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}
</style>
