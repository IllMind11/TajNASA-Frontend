import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';

export type Variables = {
  project_id?: number;
};

type Response = void;

export const useDeleteProject = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    return client.delete(`projects/${variables.project_id}`).json();
  },
});
