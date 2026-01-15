// User & Auth types
export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  companyName?: string
  companyAddress?: string
  companyCity?: string
  companyPostalCode?: string
  companyCountry?: string
  companyPhone?: string
  companyEmail?: string
  companyWebsite?: string
  companyKvK?: string
  companyBTW?: string
  companyIBAN?: string
  createdAt: any
  updatedAt: any
}

// Client types
export interface Client {
  id?: string
  userId: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: string
  city?: string
  postalCode?: string
  country?: string
  notes?: string
  createdAt: any
  updatedAt: any
}

// Invoice types
export interface Invoice {
  id?: string
  userId: string
  invoiceNumber: string
  clientId: string
  clientName: string
  clientEmail: string
  items: InvoiceItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: any
  paidDate?: any
  notes?: string
  createdAt: any
  updatedAt: any
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

// Quote types
export interface Quote {
  id?: string
  userId: string
  quoteNumber: string
  clientId: string
  clientName: string
  clientEmail: string
  items: InvoiceItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
  validUntil: any
  notes?: string
  createdAt: any
  updatedAt: any
}

// Bank Account types
export interface BankAccount {
  id?: string
  userId: string
  bankName: string
  accountName: string
  iban: string
  accountType: 'checking' | 'savings' | 'business'
  balance: number
  currency: string
  color: string
  createdAt: any
  updatedAt: any
}

// Transaction types
export interface Transaction {
  id?: string
  userId: string
  bankAccountId: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: any
  createdAt: any
}

// Dashboard Stats
export interface DashboardStats {
  totalRevenue: number
  openInvoices: number
  overdueInvoices: number
  totalClients: number
  totalInvoices: number
  totalQuotes: number
  paidInvoices: number
  pendingQuotes: number
}
