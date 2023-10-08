import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../../client';

export type Variables = {
  name: string;
  project_id: number;
};

type Response = void;

export const useCreateForum = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(variables)) {
      formData.append(key, value.toString());
    }

    return client
      .post('forums', {
        body: formData,
      })
      .json();
  },
});
