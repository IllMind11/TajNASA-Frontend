import { client } from '../client';
import type { Education } from '../types';

type Response = Education[];

export const useExperiences = async () => {
  const educations: any = await client.get(`experiences`).json();

  return educations?.data as Response;
};
