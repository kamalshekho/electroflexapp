interface RequestBase {
  category: string;
  street: string;
  houseNumber: string;
  postalCode: number;
  city: string;
  desiredDate?: string;
  desiredTime?: string;
  customerFirstName: string;
  customerLastName: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  internalNote?: string;
}

export interface CreateRequest extends RequestBase {}

export interface Request extends RequestBase {
  id: number;
  createdDate: string;
  createdAt: string;
  status: RequestStatus;
  electricianName?: string;
}

export enum RequestStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}
