import type { ItemType } from '@/types';

const BASE_API = import.meta.env.VITE_BASE_API ?? '';

interface FetchGroceriesParams {
  page?: number;
  limit?: number;
  favorite?: boolean;
}
export async function fetchGroceries(
  params: FetchGroceriesParams,
): Promise<ItemType[]> {
  const { page = 1, limit, favorite } = params || {};
  const urlParams = new URLSearchParams({
    _page: page.toString(),
    ...(limit !== undefined && { _limit: limit.toString() }),
    ...(favorite !== undefined && { favorite: String(favorite) }),
  });
  const response = await fetch(`${BASE_API}/grocery?${urlParams.toString()}`);
  const groceries = (await response.json()) as ItemType[];
  return groceries;
}

export async function updateGrocery(
  grocery: Partial<ItemType>,
): Promise<ItemType> {
  const response = await fetch(`${BASE_API}/grocery/${grocery.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(grocery),
  });
  return response.json() as Promise<ItemType>;
}
