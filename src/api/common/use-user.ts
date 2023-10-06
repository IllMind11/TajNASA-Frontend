import { client } from '../client';
import type { User } from '../types';
import { getToken } from '../utils';

type Response = User;

export const useUser = async () => {
  const token = getToken();

  if (!token) return null;

  const user: unknown = await client
    .get(`user`, {
      hooks: {
        afterResponse: [
          (_input, _options, response) => {
            if (!response.ok) return new Response(null, { status: 401 });

            return response;
          },
        ],
      },

      throwHttpErrors: false,
    })
    .json();

  return user as Response;
};
