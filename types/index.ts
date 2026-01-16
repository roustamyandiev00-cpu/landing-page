import { Timestamp } from "firebase/firestore"

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
  createdAt: Timestamp
  updatedAt: Timestamp
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
  createdAt: Timestamp
  updatedAt: Timestamp
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
  dueDate: Timestamp
  paidDate?: Timestamp
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
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
  validUntil: Timestamp
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
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
  createdAt: Timestamp
  updatedAt: Timestamp
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
  date: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
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
  overdueCount: number
  dueTodayCount: number
  dueInDays: number
}
// Werkzaamheden types
export interface UserWerkzaamheid {
  id?: string
  userId: string
  originalId?: string // Reference to original werkzaamheid if customized
  categorie: string
  naam: string
  omschrijving: string
  eenheid: "stuk" | "m2" | "m" | "uur" | "dag" | "forfait"
  prijsMin: number
  prijsMax: number
  standaardPrijs: number
  btwTarief: 9 | 21
  tags: string[]
  isCustom: boolean
  createdAt: any
  updatedAt: any
}