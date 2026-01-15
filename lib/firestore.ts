import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query, 
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from "firebase/firestore"
import { getApps } from "firebase/app"

// Initialize Firestore
const app = getApps()[0]
export const db = app ? getFirestore(app) : null

// Types
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
}

// User Profile Functions
export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  if (!db) return null
  const userRef = doc(db, "users", uid)
  const profile = {
    uid,
    email: data.email || "",
    displayName: data.displayName || "",
    photoURL: data.photoURL,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...data
  }
  await setDoc(userRef, profile, { merge: true })
  return profile
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) return null
  const userRef = doc(db, "users", uid)
  const snapshot = await getDoc(userRef)
  if (snapshot.exists()) {
    return snapshot.data() as UserProfile
  }
  return null
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  if (!db) return
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  })
}

// Client Functions
export async function getClients(userId: string): Promise<Client[]> {
  if (!db) return []
  const q = query(
    collection(db, "clients"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client))
}

export async function addClient(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) return null
  const docRef = await addDoc(collection(db, "clients"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export async function updateClient(id: string, data: Partial<Client>) {
  if (!db) return
  await updateDoc(doc(db, "clients", id), {
    ...data,
    updatedAt: serverTimestamp()
  })
}

export async function deleteClient(id: string) {
  if (!db) return
  await deleteDoc(doc(db, "clients", id))
}

// Invoice Functions
export async function getInvoices(userId: string): Promise<Invoice[]> {
  if (!db) return []
  const q = query(
    collection(db, "invoices"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice))
}

export async function addInvoice(data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) return null
  const docRef = await addDoc(collection(db, "invoices"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export async function updateInvoice(id: string, data: Partial<Invoice>) {
  if (!db) return
  await updateDoc(doc(db, "invoices", id), {
    ...data,
    updatedAt: serverTimestamp()
  })
}

export async function deleteInvoice(id: string) {
  if (!db) return
  await deleteDoc(doc(db, "invoices", id))
}

// Quote Functions
export async function getQuotes(userId: string): Promise<Quote[]> {
  if (!db) return []
  const q = query(
    collection(db, "quotes"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quote))
}

export async function addQuote(data: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) return null
  const docRef = await addDoc(collection(db, "quotes"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export async function updateQuote(id: string, data: Partial<Quote>) {
  if (!db) return
  await updateDoc(doc(db, "quotes", id), {
    ...data,
    updatedAt: serverTimestamp()
  })
}

export async function deleteQuote(id: string) {
  if (!db) return
  await deleteDoc(doc(db, "quotes", id))
}

// Bank Account Functions
export async function getBankAccounts(userId: string): Promise<BankAccount[]> {
  if (!db) return []
  const q = query(
    collection(db, "bankAccounts"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BankAccount))
}

export async function addBankAccount(data: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) return null
  const docRef = await addDoc(collection(db, "bankAccounts"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

// Transaction Functions
export async function getTransactions(userId: string): Promise<Transaction[]> {
  if (!db) return []
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId),
    orderBy("date", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction))
}

export async function addTransaction(data: Omit<Transaction, 'id' | 'createdAt'>) {
  if (!db) return null
  const docRef = await addDoc(collection(db, "transactions"), {
    ...data,
    createdAt: serverTimestamp()
  })
  return docRef.id
}

// Generate unique numbers
export async function generateInvoiceNumber(userId: string): Promise<string> {
  const invoices = await getInvoices(userId)
  const year = new Date().getFullYear()
  const count = invoices.length + 1
  return `FAC-${year}-${count.toString().padStart(4, '0')}`
}

export async function generateQuoteNumber(userId: string): Promise<string> {
  const quotes = await getQuotes(userId)
  const year = new Date().getFullYear()
  const count = quotes.length + 1
  return `OFF-${year}-${count.toString().padStart(4, '0')}`
}

// Dashboard Stats
export async function getDashboardStats(userId: string) {
  const [invoices, quotes, clients] = await Promise.all([
    getInvoices(userId),
    getQuotes(userId),
    getClients(userId)
  ])

  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.total, 0)

  const openInvoices = invoices
    .filter(i => i.status === 'sent' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.total, 0)

  const overdueInvoices = invoices
    .filter(i => i.status === 'overdue')
    .reduce((sum, i) => sum + i.total, 0)

  return {
    totalRevenue,
    openInvoices,
    overdueInvoices,
    totalClients: clients.length,
    totalInvoices: invoices.length,
    totalQuotes: quotes.length,
    paidInvoices: invoices.filter(i => i.status === 'paid').length,
    pendingQuotes: quotes.filter(q => q.status === 'sent').length
  }
}
