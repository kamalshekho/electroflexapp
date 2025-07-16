import { User } from './user.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface RegisterRequest {
  username: string;    // matches backend
  password: string;    // matches backend
  email: string;       // matches backend
  phone: string;       // matches backend
  role: string;        // matches backend
  firstName: string;   // matches backend
  lastName: string;    // matches backend
  houseNumber: string; // matches backend
  street: string;      // matches backend
  postCode: string;    // matches backend
  city: string;        // matches backend
}
