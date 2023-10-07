import type { HTTPError } from 'ky';
import { createMutation } from 'react-query-kit';

import { client } from '../client';
import type { Project } from '../types';

export type Variables = {
  name: string;
  description: string;
  content: string;
  photo: any;
  tags: number[];
};

type Response = {
  message: string;
  data: Project;
};

export const useCreateProject = createMutation<Response, Variables, HTTPError>({
  mutationFn: async (variables) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(variables)) {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value,
      );
    }

    return client
      .post('projects', {
        body: formData,
      })
      .json();
  },
});
