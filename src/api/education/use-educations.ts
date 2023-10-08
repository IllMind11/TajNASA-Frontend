import { client } from '../client';
import type { Education } from '../types';

type Response = Education[];

export const useEducations = async () => {
  const educations: any = await client.get(`educations`).json();

  return educations?.data as Response;
};
