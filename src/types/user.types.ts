export type User = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordChangeAt?: Date;
  image?: string;
  cloudinary_id?: string;
  role?: string;
  Isverified?: boolean;
  emailToken?: string;
  isActive?: boolean;
  wishlist?: string[];
  addresses?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  reviews?: string[];
  cart?: string;
  orders?: string[];
};
export type SignUpType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
};
export type LoginType = {
  email: string;
  password: string;
};
