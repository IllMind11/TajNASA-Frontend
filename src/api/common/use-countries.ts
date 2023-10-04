import type { HTTPError } from 'ky';
import { createQuery } from 'react-query-kit';

import { client } from '../client';

type Response = {
  status: boolean;
  message: string;
  data: {
    id: number;
    name: string;
  }[];
};

type Variables = void;

export const useCountries = createQuery<Response, Variables, HTTPError>({
  primaryKey: 'countries',
  queryFn: ({ queryKey: [primaryKey] }) => {
    return client.get(`${primaryKey}`).json();
  },
});
