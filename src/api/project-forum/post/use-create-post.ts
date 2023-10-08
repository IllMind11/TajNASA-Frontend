import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../../client';

export type Variables = {
  content: string;
  forum_id: number;
  user_id?: number;
};

type Response = void;

export const useCreatePost = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(variables)) {
      formData.append(key, value.toString());
    }

    return client
      .post('posts', {
        body: formData,
      })
      .json();
  },
});
