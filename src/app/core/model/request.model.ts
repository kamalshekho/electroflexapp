export interface CreateRequest {
  desiredDate?: string;
  desiredTime?: string;
  serviceType: string;
  description: string;
  version: number;
  customerId: number;
}

export interface Request {
  id: number;
  createdDate: string;
  createdTime: string;
  electricianNumber?: number;
  street: string;
  houseNumber: string;
  postCode: number;
  city: string;
  desiredDate?: string;
  desiredTime?: string;
  customerFirstName: string;
  customerLastName: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  status: string;
}

export enum RequestStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  CLOSED = 'Closed'
}
