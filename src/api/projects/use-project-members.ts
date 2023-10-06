import { client } from '../client';
import type { User } from '../types';

type Response = {
  id: number;
  project_id: number;
  user_id: number;
  type: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  user: User;
}[];

type Variables = {
  id: number | undefined;
};

export const useProjectMembers = async (variables: Variables) => {
  const projects: any = await client
    .get(`project-members/${variables.id}`)
    .json();

  return projects?.data as Response;
};
