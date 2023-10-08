import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  user_id?: number;
  name: string;
  description: string;
  from: string;
  to: string;
  education_id: number;
};

type Response = void;

export const useEditEducation = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    return client
      .put(`educations/${variables.education_id}`, {
        json: variables,
      })
      .json();
  },
});
