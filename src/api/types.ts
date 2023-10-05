export type Project = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  country: string;
  gender: string;
  email: string;
  phone: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
};
