
export interface ICompany {
  id?:            string     
  name:           string     
  businessType:   string     
  addressLine1:   string     
  addressLine2?:  string    
  country:        string     
  state?:         string    
  city:           string     
  zipcode:        string     
  email?:         string    
  phone?:         string    
  createdAt?:     Date   
  updatedAt?:     Date   
  cars?:          ICar[]
  customers?:     ICustomer[]
  invoices?:      IInvoice[]
  jobOrders?:     IJobOrder[]
  users?:         IUser[]
}

export interface IUser {
  id?:            string        
  firstName:      string        
  lastName:       string        
  gender:         string        
  age:            Int
  phone:          string        
  email:          string        
  username:       string        
  password:       string        
  salt:           string        
  role:           string        
  companyId?:     string        
  customerId?:    string       
  createdAt?:     DateTime      
  updatedAt?:     DateTime      
  company?:       ICompany      
  customer?:      ICustomer     
  appointments?:  IAppointment[]
  notes?:         INote[]
  reminders?:     IReminder[]
}

export interface ICustomer {
  id?:            string
  fullName:       string  
  firstName:      string  
  lastName:       string  
  addressLine1:   string  
  addressLine2?:  string 
  state?:         string  
  city:           string  
  phone:          string  
  email?:         string  
  companyId:      string
  createdAt?:     Date
  updatedAt?:     Date
  company?:       Company
  cars?:          ICar[]
  invoices?:      IInvoice[]
  jobOrders?:     IJobOrder[]
  users?:         IUser[]
}

export interface ICar {
  id?:                   string     
  brand:                 string     
  license:               string     
  model:                 string     
  year:                  string     
  mileage:               string     
  color:                 string     
  vinNumber:             string     
  carHasItems:           Boolean
  carItemsDescription?:  string
  customerId?:           string    
  companyId?:            string    
  createdAt?:            Date   
  updatedAt?:            Date   
  company?:              Company   
  customer?:             ICustomer  
  jobOrders?:            IJobOrder[]
}

export interface IInvoice {
  id?:            string         
  totalPrice:     string         
  status:         string         
  dueDate:        Date       
  companyId?:     string        
  customerId?:    string        
  createdAt?:     Date       
  updatedAt?:     Date       
  company?:       ICompany       
  customer?:      ICustomer      
  invoiceItems?:  IInvoice_Item[]
}

export interface IInvoice_Item {
  id?:          string   
  description:  string
  quantity:     string   
  unitPrice:    string   
  totalPrice:   string   
  warranty:     string   
  invoiceId?:   string  
  createdAt?:   Date 
  updatedAt?:   Date 
  invoice?:     IInvoice 
}

export interface IJobOder {
  id?:             string    
  service:         string    
  serviceDetails:  string
  status:          string    
  isHeavy:         Boolean
  isLight:         Boolean
  entryDate:       Date  
  companyId?:      string   
  customerId?:     string   
  carId?:          string   
  createdAt?:      Date  
  updatedAt?:      Date  
  car?:            ICar      
  company?:        ICompany  
  customer?:       ICustomer 
}

export interface INote {
  id?:         string   
  text:        string
  userId?:     string
  createdAt?:  Date 
  updatedAt?:  Date 
  user?:       IUser    
}

export interface IReminder {
  id:           string   
  description:  string
  datetime:     Date 
  userId?:      string  
  createdAt?:   Date 
  updatedAt?:   Date 
  user?:        IUser    
}

export interface IAppointment {
  id:          string   
  reason:      string
  datetime:    Date 
  userId?:     string  
  createdAt?:  Date 
  updatedAt?:  Date 
  user?:       IUser    
}