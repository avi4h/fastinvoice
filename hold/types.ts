export interface Company {
  companyName: string;
  address: string;
  state: string;
  stateCode: string;
  email: string;
  contactNumber: string;
  gstin: string;
  panNumber: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  isActive: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gstin: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
}

export interface InvoiceItem {
  productId: string;
  quantity: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  total: number;
  status: 'draft' | 'sent' | 'paid';
}
