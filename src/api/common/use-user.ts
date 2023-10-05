import { client } from '../client';
import type { User } from '../types';
import { getToken } from '../utils';

type Response = User;

export const useUser = async () => {
  const token = getToken();

  if (!token) return null;

  const user: unknown = await client
    .get(`user`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .json();

  return user as Response;
};
