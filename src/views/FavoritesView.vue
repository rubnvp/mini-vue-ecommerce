<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
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

const unsubscribeStore = cartStore.$onAction(({ name, after }) => {
  after(result => {
    if (name === 'checkout' && result === true) {
      // Reset the view after a successful checkout
      fetchFavorites();
    }
  });
});

onMounted(async () => {
  fetchFavorites();
});

onUnmounted(() => {
  unsubscribeStore();
});
</script>

<template>
  <div v-auto-animate class="favorites-view__cards">
    <ItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :stock="cartStore.getStock(item)"
      :selectedAmount="cartStore.getSelectedAmount(item)"
      @onAdd="cartStore.addItem"
      @onRemove="cartStore.removeItem"
      @onFavorite="removeFavorite"
    />
  </div>
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
