import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';
import type { Member } from '../types';

export type Variables = {
  project_member_id?: number;
  project_id?: number;
  user_id?: number;
  type: number;
  status: number;
};

type Response = Member;

export const useApproveMember = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    return client
      .put(`project-members/${variables.project_member_id}`, {
        json: variables,
      })
      .json();
  },
});
