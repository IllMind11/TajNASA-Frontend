import { client } from '../client';
import type { Project } from '../types';

type Response = {
  data: {
    current_page: number;
    data: Project[];
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
};

type Variables = {
  page_param?: number;
};

export const useMyProjects = async ({ page_param }: Variables) => {
  const projects: unknown = await client
    .get(`my-projects?page=${page_param ?? 1}`)
    .json();

  return projects as Response;
};
