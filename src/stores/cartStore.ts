import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { ItemType } from '@/types';
import { updateGrocery } from '@/api/groceriesApi';

type CartItem = {
  item: ItemType;
  amount: number;
};

export const useCartStore = defineStore('cart', () => {
  const cartItems = useStorage<CartItem[]>('cart-items', []);

  const itemIdToAmountMap = computed<Record<string, number>>(() => {
    const entries = cartItems.value.map(({ item, amount }) => [
      item.id,
      amount,
    ]);
    return Object.fromEntries(entries);
  });

  const getSelectedAmount = (item: ItemType) => {
    return itemIdToAmountMap.value[item.id] ?? 0;
  };

  const getStock = (item: ItemType) => {
    const selectedStock = getSelectedAmount(item);
    return item.stock - selectedStock;
  };

  const addItem = (item: ItemType) => {
    const stock = getStock(item);
    if (stock <= 0) return;
    const cartItem = cartItems.value.find(
      cartItem => cartItem.item.id === item.id,
    );
    if (cartItem) {
      cartItem.amount += 1;
    } else {
      cartItems.value.push({ item, amount: 1 });
    }
  };

  const removeItem = (item: ItemType) => {
    const cartItem = cartItems.value.find(
      cartItem => cartItem.item.id === item.id,
    );
    if (!cartItem) return;
    cartItem.amount -= 1;
    if (cartItem.amount <= 0) {
      cartItems.value = cartItems.value.filter(
        cartItem => cartItem.item.id !== item.id,
      );
    }
  };

  const totalLength = computed<number>(() =>
    cartItems.value.reduce((total, { amount }) => total + amount, 0),
  );

  const totalPrice = computed<number>(() => {
    return cartItems.value.reduce(
      (total, { item, amount }) => total + item.price * amount,
      0,
    );
  });

  async function checkout() {
    const itemUpdates = cartItems.value.map(({ item }) => ({
      id: item.id,
      stock: getStock(item),
    }));
    await Promise.all(itemUpdates.map(updateGrocery));
    cartItems.value = [];
    return true;
  }

  return {
    cartItems,
    getSelectedAmount,
    getStock,
    addItem,
    removeItem,
    totalLength,
    totalPrice,
    checkout,
  };
});
