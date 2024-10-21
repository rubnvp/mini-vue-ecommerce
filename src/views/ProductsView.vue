<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchGroceries, updateGrocery } from '@/api/groceriesApi';
import type { ItemType } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import ItemCard from '@/components/ItemCard.vue';

const items = ref<ItemType[]>([]);
const cartStore = useCartStore();

const page = ref(0);
const loadMore = async () => {
  page.value++;
  const groceries = await fetchGroceries({ page: page.value });
  items.value = [...items.value, ...groceries];
};

async function toggleFavorite(item: ItemType) {
  const updatedItem = await updateGrocery({ id: item.id, favorite: !item.favorite });
  item.favorite = updatedItem.favorite;
}

onMounted(async () => {
  loadMore();
});
</script>

<template>
  <main>
    <div class="products-view__cards">
      <ItemCard v-for="item in items" :key="item.id" :item="item" :stock="cartStore.getStock(item)"
        :selectedAmount="cartStore.itemIdToAmountMap[item.id]" @onAdd="cartStore.addItem"
        @onRemove="cartStore.removeItem" @onFavorite="toggleFavorite" />
    </div>
    <div class="products-view__load-more">
      <p>
        Showing {{ items.length }} out of 1,000 products
      </p>
      <button class="ds-primary-button" @click="loadMore">⚡️ Load more</button>
    </div>
  </main>
</template>

<style lang="scss">
.products-view {
  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  &__load-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    gap: 1rem;
  }
}
</style>
