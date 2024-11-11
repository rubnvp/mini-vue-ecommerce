<script setup lang="ts">
import type { ItemType } from '@/types';

const { item, amount } = defineProps<{
  item: ItemType;
  amount: number;
}>();

const emit = defineEmits<{
  onAdd: [item: ItemType];
  onRemove: [item: ItemType];
}>();
</script>

<template>
  <div class="cart-item">
    <img class="image" :src="item.imageUrl" alt="product image" />
    <div class="body">
      <div class="info">
        <h3 class="name">{{ item.name }}</h3>
        <p class="price">{{ amount }} x {{ item.price }}€</p>
      </div>
      <div class="buttons">
        <button class="ds-primary-button ds-primary-button--round" @click="emit('onRemove', item)">
          <img src="@/assets/images/minus.svg" alt="remove product" />
        </button>
        <button class="ds-primary-button ds-primary-button--round" @click="emit('onAdd', item)">
          <img src="@/assets/images/plus.svg" alt="add product" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.image {
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin-right: 1rem;
}

.body {
  width: 100%;
}

.info {
  display: flex;
  margin-bottom: 10px;
}

.name {
  margin-right: 1rem;
  flex-grow: 1;
}

.price {
  text-wrap: nowrap;
}

.buttons {
  display: flex;
  justify-content: right;
  gap: 4px;
}
</style>
