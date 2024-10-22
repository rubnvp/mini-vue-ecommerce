<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { fetchGroceries, updateGrocery } from '@/api/groceriesApi';
import type { ItemType } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import ItemCard from '@/components/ItemCard.vue';

const items = ref<ItemType[]>([]);
const cartStore = useCartStore();

const page = ref(1);
const fetchProducts = async (newPage: number) => {
  page.value = newPage;
  const groceries = await fetchGroceries({ page: page.value, limit: 24 });
  if (newPage === 1) items.value = groceries;
  else {
    items.value = [...items.value, ...groceries];
  }
};

async function toggleFavorite(item: ItemType) {
  const updatedItem = await updateGrocery({
    id: item.id,
    favorite: !item.favorite,
  });
  item.favorite = updatedItem.favorite;
}

const unsubscribeStore = cartStore.$onAction(({ name, after }) => {
  after(result => {
    if (name === 'checkout' && result === true) {
      // Reset the page to 1 after a successful checkout
      fetchProducts(1);
    }
  });
});

onMounted(async () => {
  fetchProducts(1);
});

onUnmounted(() => {
  unsubscribeStore();
});
</script>

<template>
  <div>
    <div v-auto-animate class="products-view__cards">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        :stock="cartStore.getStock(item)"
        :selectedAmount="cartStore.getSelectedAmount(item)"
        @onAdd="cartStore.addItem"
        @onRemove="cartStore.removeItem"
        @onFavorite="toggleFavorite"
      />
    </div>
    <div class="products-view__load-more">
      <p>Showing {{ items.length }} out of 1,000 products</p>
      <button class="ds-primary-button" @click="fetchProducts(page + 1)">
        ⚡️ Load more
      </button>
    </div>
  </div>
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
