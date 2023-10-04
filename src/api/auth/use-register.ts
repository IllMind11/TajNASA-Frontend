import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  firstname: string;
  lastname: string;
  gender: number;
  country: number;
  email: string;
  password: string;
  phone: number;
};

type Response = {
  status: boolean;
  message: string;
  token: string;
  errors?: unknown;
};

export const useRegister = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) =>
    client.post('auth/register', { json: { ...variables } }).json(),
});
