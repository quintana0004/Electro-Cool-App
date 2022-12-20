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

export interface ICustomer {
  id?: number;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  state?: string;
  city: string;
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
  createdDate?: DateTime;
  lastModified?: DateTime;
  companyId: string;
  customerId: number;
}

export interface IInvoice {
  id?: number;
  status: string;
  totalPrice: string;
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
  amount: string;
  description: string;
  isAvailable: boolean;
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
  licensePlate: string;
  customerName: string;
  phone: string;
  email: string;
  createdDate?: Date;
  lastModified?: Date;
  companyId: string;
}

export interface ITask {
  text: string;
  dueDate: string;
  createdDate?: Date;
  lastModified?: Date;
  companyId: string;
}

export interface IJobOrder {
  id: Int;
  requestedService: string;
  serviceDetails: string;
  status: string;
  jobLoadType: string;
  policySignature: string;
  createdDate?: DateTime;
  lastModified?: DateTime;
  carId: Int;
  companyId: string;
  customerId: Int;
}

export interface IErrorResponse {
  errorCode: number;
  errorMessage: string;
}
