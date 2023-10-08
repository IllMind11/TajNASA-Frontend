import { client } from '../../client';
import type { Forum } from '../../types';

type Response = {
  current_page: number;
  data: Forum[];
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
  project_id: number;
  q?: string;
};

export const useForums = async ({ project_id, q }: Variables) => {
  const forum: any = await client
    .get(`forums?p=${project_id}&${q ? `q=${q}` : ''}`)
    .json();

  return forum?.data as Response;
};
