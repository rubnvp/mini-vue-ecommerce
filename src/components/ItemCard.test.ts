import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ItemCard from './ItemCard.vue';

describe('ItemCard', () => {
  it('renders properly', () => {
    // ARRANGE
    const item = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    const stock = 10;
    const selectedAmount = 0;
    // ACT
    const wrapper = mount(ItemCard, { props: { item, stock, selectedAmount } });
    // ASSERT
    expect(wrapper.text()).toContain('Item 1');
  });

  it('emits onAdd event when add to cart button is clicked', async () => {
    // ARRANGE
    const item = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 10,
      favorite: false,
    };
    const stock = 10;
    const selectedAmount = 0;
    const wrapper = mount(ItemCard, { props: { item, stock, selectedAmount } });
    // ACT
    await wrapper.find('img[alt="add product"]').trigger('click');
    // ASSERT
    expect(wrapper.emitted('onAdd')).toBeTruthy();
  });

  it('does not emit onAdd event when add to cart button is clicked and stock is 0', async () => {
    // ARRANGE
    const item = {
      id: '1',
      name: 'Item 1',
      price: 100,
      imageUrl: '',
      description: '',
      stock: 0,
      favorite: false,
    };
    const stock = 0;
    const selectedAmount = 0;
    const wrapper = mount(ItemCard, { props: { item, stock, selectedAmount } });
    // ACT
    await wrapper.find('img[alt="add product"]').trigger('click');
    // ASSERT
    expect(wrapper.emitted('onAdd')).toBeFalsy();
  });
});
