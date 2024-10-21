import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useCartStore, type CartItem } from './cartStore';
import { updateGrocery } from '@/api/groceriesApi';
import { useStorage } from '@vueuse/core';

//mock updateGrocery function
vi.mock('@/api/groceriesApi', () => ({
  updateGrocery: vi.fn(),
}));

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.restoreAllMocks();
    const cartItems = useStorage<CartItem[]>('cart-items', []);
    cartItems.value = []; // reset cartItems
  });

  test('adds item to cart', () => {
    // ARRANGE
    const cartStore = useCartStore();
    const item = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    // ACT
    cartStore.addItem(item);
    // ASSERT
    const cartItems = cartStore.cartItems as unknown as CartItem[];
    expect(cartItems[0].item).toEqual(item);
  });

  test('does not add item to cart if stock is 0', () => {
    // ARRANGE
    const cartStore = useCartStore();
    const item = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 0,
      favorite: false,
    };
    // ACT
    cartStore.addItem(item);
    // ASSERT
    expect(cartStore.cartItems).toEqual([]);
  });

  test('removes item from cart', () => {
    // ARRANGE
    const cartStore = useCartStore();
    const item = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    // ACT
    cartStore.addItem(item);
    cartStore.removeItem(item);
    // ASSERT
    expect(cartStore.cartItems).toEqual([]);
  });

  test('calculates total length', () => {
    // ARRANGE
    const cartStore = useCartStore();
    const item1 = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    const item2 = {
      id: '2',
      name: 'Item 2',
      price: 200,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    // ACT
    cartStore.addItem(item1);
    cartStore.addItem(item1);
    cartStore.addItem(item2);
    // ASSERT
    expect(cartStore.totalLength).toEqual(3);
  });

  test('calculates total price', () => {
    // ARRANGE
    const cartStore = useCartStore();
    const item1 = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    const item2 = {
      id: '2',
      name: 'Item 2',
      price: 200,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    // ACT
    cartStore.addItem(item1);
    cartStore.addItem(item2);
    // ASSERT
    expect(cartStore.totalPrice).toEqual(300);
  });

  test('checkout call updateGrocery for each item', async () => {
    // ARRANGE
    const cartStore = useCartStore();
    const item1 = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    const item2 = {
      id: '2',
      name: 'Item 2',
      price: 200,
      imageUrl: '',
      description: '',
      stock: 5,
      favorite: false,
    };
    // ACT
    cartStore.addItem(item1);
    cartStore.addItem(item2);
    await cartStore.checkout();
    // ASSERT
    expect(cartStore.cartItems).toEqual([]); // cart is empty
    expect(updateGrocery).toHaveBeenCalledTimes(2);
    expect(updateGrocery).toHaveBeenCalledWith({ id: '1', stock: 9 });
    expect(updateGrocery).toHaveBeenCalledWith({ id: '2', stock: 4 });
  });
});
