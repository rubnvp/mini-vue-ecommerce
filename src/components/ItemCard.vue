<script setup lang="ts">
import { computed } from 'vue';
import type { ItemType } from '@/types';

const { item, stock, selectedAmount = 0 } = defineProps<{
  item: ItemType;
  stock: number;
  selectedAmount: number;
}>();

const emit = defineEmits<{
  onAdd: [item: ItemType]
  onRemove: [item: ItemType]
}>();

const isSelected = computed(() => selectedAmount > 0);
const isOutOfStock = computed(() => stock <= 0);
</script>

<template>
  <div class="item-card">
    <button class="item-card__favorite" aria-label="favorite">
      <img v-if="item.favorite" src="@/assets/images/heart-fill.svg">
      <img v-else src="@/assets/images/heart-outline.svg">
    </button>
    <div :class="{ 'item-card--no-stock': isOutOfStock }">
      <img class="item-card__image" :src="item.imageUrl" alt="product image">
      <div>
        <div class="item-card__title">
          <h3>{{ item.name }}</h3>
          <span class="item-card__price">{{ item.price }}€</span>
        </div>
        <p class="item-card__description" :title="item.description">{{ item.description }}</p>
      </div>
    </div>
    <div class="item-card__bottom">
      <p>{{ stock }} left</p>
      <div class="item-card__bottom-buttons">
        <button v-if="isSelected" class="ds-primary-button ds-primary-button--round item-card__round-button"
          @click="emit('onRemove', item)">
          <img src="@/assets/images/minus.svg" alt="remove product">
        </button>
        <button class="ds-primary-button item-card__text-button" @click="emit('onAdd', item)" :disabled="isOutOfStock"
          :title="stock <= 0 ? 'Out of stock' : ''">
          <img src="@/assets/images/plus.svg" alt="add product">
          {{ isSelected ? selectedAmount : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  position: relative;

  &--no-stock {
    opacity: 0.5;
  }

  &__favorite {
    background: none;
    border: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;

    &:hover {
      filter: invert(0.2);
    }
  }

  &__image {
    height: 200px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 8px;

    h3 {
      margin: 0;
      margin-right: 10px;
      line-height: 1.5rem;
    }
  }

  &__price {
    font-weight: bold;
  }

  &__description {
    height: 5em;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 10px;
  }

  &__bottom {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__bottom-buttons {
    display: flex;
    align-items: center;
  }

  &__text-button {
    margin-left: 0.5rem;

    img {
      height: 1rem;
      margin-right: 0.5rem;
    }
  }
}
</style>