import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  education_id?: number;
};

type Response = void;

export const useDeleteExperience = createMutation<
  Response,
  Variables,
  HTTPError
>({
  mutationFn: async (variables) => {
    return client.delete(`experiences/${variables.education_id}`).json();
  },
});
