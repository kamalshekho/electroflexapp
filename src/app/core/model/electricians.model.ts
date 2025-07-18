export interface CreateElectrician {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Electrician {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isAvailable: boolean;
  requests: Request[];
}
