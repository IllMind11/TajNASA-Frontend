import { client } from '../../client';
import type { Post } from '../../types';

type Response = {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: null | string; label: string; active: boolean }[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
};

type Variables = {
  f: number;
  q?: string;
};

export const usePosts = async ({ f, q }: Variables) => {
  const posts: any = await client
    .get(`posts?f=${f}&${q ? `q=${q}` : ''}`)
    .json();

  return posts?.posts as Response;
};
