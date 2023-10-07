export type Project = {
  id: number;
  name: string;
  description: string;
  content?: string;
  members_count: number;
  created_at: Date;
  updated_at: Date;
  photos: {
    id: number;
    url: string;
    photoable_type: string;
    photoable_id: number;
    created_at: Date;
    updated_at: Date;
  }[];
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

export type Member = {
  id: number;
  project_id: number;
  user_id: number;
  type: string;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type Tag = {
  id: number;
  name: string;
};
