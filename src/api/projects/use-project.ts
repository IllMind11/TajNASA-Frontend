import { client } from '../client';
import type { Project } from '../types';

type Response = {
  project: Project;
  is_admin: boolean;
};

type Variables = {
  id: number | undefined;
};

export const useProject = async (variables: Variables) => {
  const projects: any = await client.get(`projects/${variables.id}`).json();

  return projects?.data as Response;
};
