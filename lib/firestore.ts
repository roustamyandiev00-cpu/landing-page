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
import type {
  UserProfile,
  Client,
  Invoice,
  InvoiceItem,
  Quote,
  BankAccount,
  Transaction
} from "@/types"

export type { Client } from "@/types"

// Initialize Firestore
const app = getApps()[0]
if (!app) {
  throw new Error('Firebase app not initialized. Make sure to import firebase.ts first.')
}

export const db = getFirestore(app)

// Additional types specific to Firestore operations
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
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
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

  // Calculate time-sensitive stats
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  
  const overdueCount = invoices.filter(i => {
    if (i.status !== 'sent' && i.status !== 'overdue') return false
    return i.dueDate.toDate() < today
  }).length
  
  const dueTodayCount = invoices.filter(i => {
    if (i.status !== 'sent' && i.status !== 'overdue') return false
    const dueDate = i.dueDate.toDate()
    return dueDate >= today && dueDate < tomorrow
  }).length
  
  // Calculate BTW due date (quarterly)
  const currentMonth = now.getMonth()
  const quarter = Math.floor(currentMonth / 3)
  const nextQuarterStart = new Date(now.getFullYear(), quarter * 3 + 3, 1)
  const btwDueDays = Math.ceil((nextQuarterStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return {
    totalRevenue,
    openInvoices,
    overdueInvoices,
    totalClients: clients.length,
    totalInvoices: invoices.length,
    totalQuotes: quotes.length,
    paidInvoices: invoices.filter(i => i.status === 'paid').length,
    pendingQuotes: quotes.filter(q => q.status === 'sent').length,
    overdueCount,
    dueTodayCount,
    dueInDays: btwDueDays
  }
}
// Werkzaamheden Functions
export async function getUserWerkzaamheden(userId: string): Promise<UserWerkzaamheid[]> {
  if (!db) return []
  const q = query(
    collection(db, "werkzaamheden"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserWerkzaamheid))
}

export async function addUserWerkzaamheid(data: Omit<UserWerkzaamheid, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) return null
  const docRef = await addDoc(collection(db, "werkzaamheden"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export async function updateUserWerkzaamheid(id: string, data: Partial<UserWerkzaamheid>) {
  if (!db) return
  await updateDoc(doc(db, "werkzaamheden", id), {
    ...data,
    updatedAt: serverTimestamp()
  })
}

export async function deleteUserWerkzaamheid(id: string) {
  if (!db) return
  await deleteDoc(doc(db, "werkzaamheden", id))
}

export async function customizeWerkzaamheid(
  userId: string, 
  originalWerkzaamheid: any, 
  customizations: Partial<Pick<UserWerkzaamheid, 'standaardPrijs' | 'prijsMin' | 'prijsMax' | 'btwTarief' | 'eenheid'>>
) {
  if (!db) return null
  
  const customWerkzaamheid: Omit<UserWerkzaamheid, 'id' | 'createdAt' | 'updatedAt'> = {
    userId,
    originalId: originalWerkzaamheid.id,
    categorie: originalWerkzaamheid.categorie,
    naam: originalWerkzaamheid.naam,
    omschrijving: originalWerkzaamheid.omschrijving,
    eenheid: customizations.eenheid || originalWerkzaamheid.eenheid,
    prijsMin: customizations.prijsMin || originalWerkzaamheid.prijsMin,
    prijsMax: customizations.prijsMax || originalWerkzaamheid.prijsMax,
    standaardPrijs: customizations.standaardPrijs || originalWerkzaamheid.standaardPrijs,
    btwTarief: customizations.btwTarief || originalWerkzaamheid.btwTarief,
    tags: originalWerkzaamheid.tags,
    isCustom: true
  }
  
  return await addUserWerkzaamheid(customWerkzaamheid)
}