export interface DataInput {
  title: string;
  content: string;
  tags: string[];
}

export interface UserType {
  name: string;
  email: string;
  isVerified: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
}
