<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchGroceries, updateGrocery } from '@/api/groceriesApi';
import type { ItemType } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import ItemCard from '@/components/ItemCard.vue';

const cartStore = useCartStore();

const items = ref<ItemType[]>([]);

async function removeFavorite(item: ItemType) {
  await updateGrocery({ id: item.id, favorite: false });
  await fetchFavorites();
}

async function fetchFavorites() {
  const groceries = await fetchGroceries({ favorite: true, limit: 100 });
  items.value = groceries;
}

onMounted(async () => {
  fetchFavorites();
});
</script>

<template>
  <main>
    <div class="favorites-view__cards">
      <ItemCard v-for="item in items" :key="item.id" :item="item" :stock="cartStore.getStock(item)"
        :selectedAmount="cartStore.itemIdToAmountMap[item.id]" @onAdd="cartStore.addItem"
        @onRemove="cartStore.removeItem" @onFavorite="removeFavorite" />
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
