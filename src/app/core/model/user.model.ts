export interface User {
  id: string;
  userName: string;
  email: string;
  password?: string;
  role: 'admin' | 'client' | 'electrician';
}
