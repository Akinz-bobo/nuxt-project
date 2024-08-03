export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

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

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
}
