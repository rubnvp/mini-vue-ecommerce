import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { ItemType } from '@/types';

type CartItem = {
  item: ItemType;
  amount: number;
};

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([]);

  const itemIdToAmountMap = computed<Record<string, number>>(() => {
    const entries = cartItems.value.map(({ item, amount }) => [
      item.id,
      amount,
    ]);
    return Object.fromEntries(entries);
  });

  const length = computed<number>(() =>
    cartItems.value.reduce((total, { amount }) => total + amount, 0),
  );

  const getStock = (item: ItemType) => {
    const selectedStock = itemIdToAmountMap.value[item.id] ?? 0;
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

  const totalPrice = computed<number>(() => {
    return cartItems.value.reduce(
      (total, { item, amount }) => total + item.price * amount,
      0,
    );
  });

  return {
    cartItems,
    length,
    getStock,
    addItem,
    removeItem,
    totalPrice,
  };
});
