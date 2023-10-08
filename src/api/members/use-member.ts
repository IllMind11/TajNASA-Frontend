import type { Education, User } from '@/api/types';

import { client } from '../client';

type Response = User & { educations: Education[]; experiences: Education[] };

type Variables = {
  member_id: number;
};

export const useMember = async ({ member_id }: Variables) => {
  const member: any = await client.get(`member/${member_id}`).json();

  return member?.user as Response;
};
