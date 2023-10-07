import { client } from '../client';
import type { Member } from '../types';

type Response = Member | null;

type Variables = {
  project_id: number | undefined;
  member_id: number | undefined;
};

export const useProjectMember = async (variables: Variables) => {
  const projects: any = await client
    .get(`project-members/${variables.project_id}/${variables.member_id}`)
    .json();

  return projects?.data as Response;
};
