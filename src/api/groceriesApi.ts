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
  // override the imageUrl with a random cat image (the original links are broken)
  return groceries.map((grocery: ItemType) => ({
    ...grocery,
    imageUrl: getUrl(grocery.id),
  }));
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

function getUrl(id: string) {
  // get a unique number base on the id
  const index = parseInt(id, 36) % catImages.length;
  return catImages[index];
}

const catImages = [
  'https://cdn2.thecatapi.com/images/l7.jpg',
  'https://cdn2.thecatapi.com/images/6an.jpg',
  'https://cdn2.thecatapi.com/images/8cd.jpg',
  'https://cdn2.thecatapi.com/images/a66.jpg',
  'https://cdn2.thecatapi.com/images/bp9.jpg',
  'https://cdn2.thecatapi.com/images/bps.jpg',
  'https://cdn2.thecatapi.com/images/MTcxNTc1MA.jpg',
  'https://cdn2.thecatapi.com/images/MTk3NTA0OA.jpg',
  'https://cdn2.thecatapi.com/images/cw18Op1Ok.jpg',
  'https://cdn2.thecatapi.com/images/_qUK20W2d.jpg',
  'https://cdn2.thecatapi.com/images/8me.jpg',
  'https://cdn2.thecatapi.com/images/8ot.jpg',
  'https://cdn2.thecatapi.com/images/9p2.jpg',
  'https://cdn2.thecatapi.com/images/aho.jpg',
  'https://cdn2.thecatapi.com/images/aqp.jpg',
  'https://cdn2.thecatapi.com/images/bf4.jpg',
  'https://cdn2.thecatapi.com/images/bl8.jpg',
  'https://cdn2.thecatapi.com/images/MjAzMDk0Mw.jpg',
  'https://cdn2.thecatapi.com/images/MjAzOTQ2MA.jpg',
  'https://cdn2.thecatapi.com/images/Zi4jfH3c6.jpg',
];
