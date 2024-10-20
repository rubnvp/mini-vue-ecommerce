<script setup lang="ts">
import type { ItemType } from '@/types';
import { defineProps } from 'vue';

const { item, amount } = defineProps<{
    item: ItemType;
    amount: number;
}>();

const emit = defineEmits<{
    onAdd: [item: ItemType]
    onRemove: [item: ItemType]
}>();
</script>

<template>
    <div class="cart-item">
        <img class="cart-item__image" :src="item.imageUrl" alt="product image">
        <div class="cart-item__body">
            <div class="cart-item__info">
                <h3 class="cart-item__name">{{ item.name }}</h3>
                <p class="cart-item__price">{{ amount }} x {{ item.price }}€</p>
            </div>
            <div class="cart-item__buttons">
                <button class="ds-primary-button ds-primary-button--round" @click="emit('onRemove', item)">
                    <img src="@/assets/images/minus.svg" alt="remove product">
                </button>
                <button class="ds-primary-button ds-primary-button--round" @click="emit('onAdd', item)">
                    <img src="@/assets/images/plus.svg" alt="add product">
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.cart-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;

    &__image {
        height: 100px;
        width: 100px;
        object-fit: cover;
        margin-right: 1rem;
    }

    &__body {
        width: 100%;
    }

    &__info {
        display: flex;
        margin-bottom: 10px;
    }

    &__name {
        margin-right: 1rem;
        flex-grow: 1;
    }

    &__price {
        text-wrap: nowrap;
    }

    &__buttons {
        display: flex;
        justify-content: right;
        gap: 4px;
    }
}
</style>