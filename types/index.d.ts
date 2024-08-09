export interface AuthRequestBody {
  username: string;
  password: string;
}

export interface SignupRequestBody extends AuthRequestBody {
  email: string;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
};

export type Category =
  | "Electronics"
  | "Books"
  | "Clothing"
  | "Home & Kitchen"
  | "Toys & Games";

export type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
  avatar: string;
  age: number;
  phone: string;
};

export interface Data {
  status: number;
  body: USer[];
}
