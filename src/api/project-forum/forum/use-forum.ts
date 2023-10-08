import type { Forum } from '@/api/types';

import { client } from '../../client';

type Response = Forum;

type Variables = {
  forum_id: number;
};

export const useForum = async ({ forum_id }: Variables) => {
  const forum: any = await client.get(`forums/${forum_id}`).json();

  return forum?.data as Response;
};
