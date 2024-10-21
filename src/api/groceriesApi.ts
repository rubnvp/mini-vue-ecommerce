import type { ItemType } from '@/types';

const BASE_API = '/api';

interface FetchGroceriesParams {
  page?: number;
  limit?: number;
}
export async function fetchGroceries(
  params: FetchGroceriesParams,
): Promise<ItemType[]> {
  const { page = 1, limit = 24 } = params || {};
  const urlParams = new URLSearchParams({
    _page: page.toString(),
    _limit: limit.toString(),
  });
  const response = await fetch(`${BASE_API}/grocery?${urlParams.toString()}`);
  const groceries = await response.json();
  // override the imageUrl with a random cat image (the original links are broken)
  return groceries.map((grocery: ItemType) => ({
    ...grocery,
    imageUrl: getUrl(grocery.id),
  }));
}

function getUrl(id: string) {
  // get a unique number base on the id
  const index = parseInt(id, 36) % catImages.length;
  return `https://cataas.com/cat/${catImages[index]}`;
}

const catImages = [
  '4CGBn8ySN95C7cG6',
  'ToFVsijtJWykEzKp',
  'rilqOJoJRM69WoBH',
  'M4DUvi2bUcMcsSer',
  'BqlXjucTHW3X2dRR',
  'CkefUHO2wZ8yKP0a',
  'Po5DV4RYoDJnP8q1',
  '6Nb0ipGrHDHqCEmZ',
  'Y1shS7QNwQb4dIZl',
  'nIn0zX5hhCHD2fCy',
  'kEHu1rdH5OaEvFuT',
  'HursVDlr7XFohoEX',
  'OaSGgoiIbru4HmQZ',
  'bJVQV9lXvBWL2JkS',
  'wca4g8pxkOtoV0LU',
  'ynCeHoLB0eLOYkf0',
  '4C8ddOpQHfclegrD',
  'mcje1vkz08SlYsHK',
  'd7clDFHemNcNmVHX',
  '93kOMxx7Vy0zGAem',
  'SLMTdcNF7ehesGFU',
  'rmVXw1gxcgumK5hE',
  'EBSDIBSEEMzpx1gv',
  'MXKi9Rdi8SAuFq8k',
  'Lss8Q65L5WJAP4T9',
  'LMR5STcMXVSXk5Br',
  'zNsUJk0e4l7FdJU6',
  'lPcuLeUbv9dsfIfh',
  'n1OhKOZKgY7Zfh0X',
  'bbP8lAlUvARy5vPM',
  'U8JGJIRDIm0hXDdN',
  'vApOk1caVn8qmmU8',
  '0GC9MRUAqxhBzPyA',
  'kIRC9nFiRb40y2wO',
  'MBMQe21X1OtG4oSE',
  'sCIcMMJRDZQ90xIs',
  'm0O3lbu9KDJK5ful',
  'BL3n6HsRCgEq8lwV',
  'Ln7yUO5Knl0rzXhi',
  '6mUKM01HMW9U2ClR',
  'BcBdLFp6n00qaTAm',
  'qDoObiG0g8mYSUiQ',
  'bOakL3BtHlryCLW3',
  'TLTXq3NP85kWcQDS',
  'Q1LZ2NgVrxIxYIvA',
  'G04VGxtXYFvJFRZk',
  'jhh8h4vevwEFW4l1',
  'qQz8sOQmC1whRlvV',
  'efxqaKTsDx8IyGPv',
  'U6e5hHIkrwQGrr9r',
];
