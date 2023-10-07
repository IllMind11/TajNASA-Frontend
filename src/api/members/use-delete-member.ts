import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  project_member_id?: number;
};

type Response = void;

export const useDeleteMember = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    return client
      .delete(`project-members/${variables.project_member_id}`)
      .json();
  },
});
