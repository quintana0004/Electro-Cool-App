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
  id?: Int;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  state?: string;
  city: string;
  phone: string;
  email?: string;
  createdDate?: DateTime;
  lastModified?: DateTime;
  companyId: string;
}

export interface IErrorResponse {
  errorCode: number;
  errorMessage: string;
}
