import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';
import type { Member } from '../types';

export type Variables = {
  project_id?: number;
  user_id?: number;
  type: number;
  status: number;
};

type Response = Member;

export const useCreateMember = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(variables)) {
      formData.append(key, value.toString());
    }

    return client
      .post('project-members', {
        body: formData,
      })
      .json();
  },
});
