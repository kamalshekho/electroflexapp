import { User } from './user.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}
