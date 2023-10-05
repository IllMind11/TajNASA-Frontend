import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  email: string;
  password: string;
};

type Response = {
  status: boolean;
  message: string;
  token: string;
  errors?: unknown;
};

export const useLogin = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(variables)) {
      formData.append(key, value);
    }

    return client
      .post('auth/login', {
        body: formData,
      })
      .json();
  },
});
