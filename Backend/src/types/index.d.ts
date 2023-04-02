export interface ICompany {
  id?: string;
  name: string;
  businessType: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  state?: string;
  city: string;
  zipcode: string;
  email?: string;
  phone?: string;
  createdDate?: Date;
  lastModified?: Date;
}

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  newPassword?: string;
  salt?: string;
  accessToken?: string;
  refreshToken?: string;
  isApproved?: boolean;
  role?: string;
  createdDate?: Date;
  lastModified?: Date;
  companyId?: string;
}

export interface ICustomer {
  id?: number;
  firstName: string;
  lastName: string;
  addressLine1?: string;
  addressLine2?: string;
  state?: string;
  city?: string;
  phone: string;
  email?: string;
  createdDate?: Date;
  lastModified?: Date;
  companyId: string;
}

export interface ICar {
  id?: number;
  brand: string;
  licensePlate: string;
  model: string;
  year: string;
  mileage: string;
  color: string;
  vinNumber: string;
  carHasItems: boolean;
  carItemsDescription?: string;
  createdDate?: Date;
  lastModified?: Date;
  companyId: string;
  customerId: number;
}

export interface IInvoice {
  id?: number;
  status: string;
  amountTotal: string;
  amountPaid: string;
  amountDue: string;
  createdDate?: Date;
  lastModified?: Date;
  companyId: string;
  customerId: number;
  carId: number;
  invoiceItems: IInvoiceItem[];
  depositIds?: number[];
}

export interface IInvoiceItem {
  id?: number;
  description: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  warranty: string;
  createdDate?: Date;
  lastModified?: Date;
}

export interface IDeposit {
  id?: number;
  status: string;
  amountTotal: string;
  description: string;
  isAvailable?: boolean;
  createdDate?: Date;
  lastModified?: Date;
  customerId: number;
  carId: number;
  invoiceId?: number;
  companyId: string;
}

export interface IAppointment {
  id?: number;
  service: string;
  description: string;
  arrivalDateTime: string;
  model: string;
  brand: string;
  year: string;
  color: string;
  licensePlate: string;
  customerName: string;
  phone: string;
  email: string;
  createdDate?: Date;
  lastModified?: Date;
  companyId: string;
  customerId?: number;
  carId?: number;
}

export interface ITask {
  text: string;
  dueDate: string;
  createdDate?: Date;
  lastModified?: Date;
  companyId: string;
}

export interface IJobOrder {
  id?: number;
  requestedService: string;
  serviceDetails: string;
  status: string;
  jobLoadType: string;
  policySignature: boolean;
  createdDate?: Date;
  lastModified?: Date;
  carId: number;
  companyId: string;
  customerId: number;
}

export interface IErrorResponse {
  errorCode: number;
  errorMessage: string;
}

declare global {
  namespace Express {
    interface Request {
      userId: string;
      companyId: string;
    }
  }
}
