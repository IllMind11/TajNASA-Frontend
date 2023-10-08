import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';
import type { Project } from '../types';

export type Variables = {
  name: string;
  description: string;
  content: string;
  photo?: any;
  tags: number[];
  project_id: number;
};

type Response = {
  message: string;
  data: Project;
};

export const useEditProject = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');

    for (const [key, value] of Object.entries(variables)) {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value,
      );
    }

    return client
      .post(`projects/${variables.project_id}`, {
        body: formData,
      })
      .json();
  },
});
