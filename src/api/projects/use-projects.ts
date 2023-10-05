import { client } from '../client';
import type { Project } from '../types';

type Response = {
  data: Project[];
};

export const useProjects = async () => {
  const projects: unknown = await client.get(`projects`).json();

  return projects as Response;
};
