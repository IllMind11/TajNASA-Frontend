import { client } from '../client';
import type { Tag } from '../types';

type Response = Tag[];

export const useTags = async () => {
  const tags: any = await client.get(`tags`).json();

  return tags.data as Response;
};
