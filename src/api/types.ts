export type Photo = {
  id: number;
  url: string;
  photoable_type: string;
  photoable_id: number;
  created_at: Date;
  updated_at: Date;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  content?: string;
  members_count: number;
  created_at: Date;
  updated_at: Date;
  photos: Photo[];
  tags: Tag[];
  members: Member[];
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
  photos: Photo[];
};

export type Member = {
  id: number;
  project_id: number;
  user_id: number;
  type: string;
  status: string;
  user: User;
  created_at: Date;
  updated_at: Date;
};

export type Tag = {
  id: number;
  name: string;
};

export type Education = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  from: string;
  to: string;
  created_at: Date;
  updated_at: Date;
};

export type Forum = {
  id: number;
  name: string;
  project_id: number;
  created_at: Date;
  updated_at: Date;
};

export type Post = {
  id: number;
  content: string;
  user_id: number;
  forum_id: number;
  user: User;
  created_at: Date;
  updated_at: Date;
};
