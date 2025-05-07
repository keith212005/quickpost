export type PostType = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  // add other fields as needed
};

export type LikeType = {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
  // add other fields as needed
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  isOAuth: boolean;
  isActive: boolean;
  createdAt: Date;
  lastLogin: Date | null;
  emailVerified: Date | null;
  posts: PostType[];
  likes: LikeType[];
};
