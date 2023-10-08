import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  user_id?: number;
  name: string;
  description: string;
  from: string;
  to: string;
  experience_id: number;
};

type Response = void;

export const useEditExperience = createMutation<Response, Variables, HTTPError>(
  {
    mutationFn: async (variables) => {
      return client
        .put(`experiences/${variables.experience_id}`, {
          json: variables,
        })
        .json();
    },
  },
);
