import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  user_id?: number;
  name: string;
  description: string;
  from: string;
  to: string;
};

type Response = void;

export const useCreateExperience = createMutation<
  Response,
  Variables,
  HTTPError
>({
  mutationFn: async (variables) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(variables)) {
      formData.append(key, value.toString());
    }

    return client
      .post('experiences', {
        body: formData,
      })
      .json();
  },
});
