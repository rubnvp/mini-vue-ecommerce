import type { ItemType } from '@/types';

const BASE_API = '/api';

export async function fetchGroceries(): Promise<ItemType[]> {
  const response = await fetch(`${BASE_API}/grocery?_page=1&_per_page=20`);
  const groceries = await response.json();
  return groceries;
}
