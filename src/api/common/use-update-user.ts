import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  photo: any;
  firstname: string;
  lastname: string;
  gender: number;
  country: number;
  email: string;
  password?: string;
  phone: number;
};

type Response = {
  status: boolean;
  message: string;
  errors?: unknown;
};

export const useUpdateUser = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');

    for (const [key, value] of Object.entries(variables)) {
      formData.append(key, value);
    }

    return client
      .post('updateUser', {
        body: formData,
      })
      .json();
  },
});
