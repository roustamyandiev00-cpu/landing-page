/**
 * Safe Firestore operations with proper error handling
 * This file provides type-safe wrappers around Firestore operations
 */

import { 
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
  limit,
  startAfter,
  Timestamp,
  serverTimestamp,
  DocumentSnapshot,
  QueryConstraint
} from "firebase/firestore"
import { db } from "./firestore"
import type {
  UserProfile,
  Client,
  Invoice,
  Quote,
  BankAccount,
  Transaction
} from "@/types"
import { createAppError } from "./error-handler"

// Generic CRUD operations with error handling
export class FirestoreService {
  private static ensureDb() {
    if (!db) {
      throw createAppError(
        'Database niet beschikbaar. Controleer je internetverbinding.',
        'DB_NOT_AVAILABLE'
      )
    }
    return db
  }

  // Generic get document
  static async getDocument<T>(
    collectionName: string, 
    docId: string
  ): Promise<T | null> {
    try {
      const database = this.ensureDb()
      const docRef = doc(database, collectionName, docId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T
      }
      return null
    } catch (error) {
      throw createAppError(
        `Fout bij ophalen van ${collectionName} document`,
        'FIRESTORE_GET_ERROR',
        `getDocument(${collectionName}, ${docId})`
      )
    }
  }

  // Generic get collection with query
  static async getCollection<T>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> {
    try {
      const database = this.ensureDb()
      const q = query(collection(database, collectionName), ...constraints)
      const snapshot = await getDocs(q)
      
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as T))
    } catch (error) {
      throw createAppError(
        `Fout bij ophalen van ${collectionName} collectie`,
        'FIRESTORE_QUERY_ERROR',
        `getCollection(${collectionName})`
      )
    }
  }

  // Generic add document
  static async addDocument<T extends Record<string, unknown>>(
    collectionName: string,
    data: T
  ): Promise<string> {
    try {
      const database = this.ensureDb()
      const docRef = await addDoc(collection(database, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      throw createAppError(
        `Fout bij toevoegen van ${collectionName} document`,
        'FIRESTORE_ADD_ERROR',
        `addDocument(${collectionName})`
      )
    }
  }

  // Generic update document
  static async updateDocument<T extends Record<string, unknown>>(
    collectionName: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const database = this.ensureDb()
      await updateDoc(doc(database, collectionName, docId), {
        ...data,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      throw createAppError(
        `Fout bij bijwerken van ${collectionName} document`,
        'FIRESTORE_UPDATE_ERROR',
        `updateDocument(${collectionName}, ${docId})`
      )
    }
  }

  // Generic delete document
  static async deleteDocument(
    collectionName: string,
    docId: string
  ): Promise<void> {
    try {
      const database = this.ensureDb()
      await deleteDoc(doc(database, collectionName, docId))
    } catch (error) {
      throw createAppError(
        `Fout bij verwijderen van ${collectionName} document`,
        'FIRESTORE_DELETE_ERROR',
        `deleteDocument(${collectionName}, ${docId})`
      )
    }
  }

  // Paginated query
  static async getPaginatedCollection<T>(
    collectionName: string,
    constraints: QueryConstraint[],
    pageSize: number = 20,
    lastDoc?: DocumentSnapshot
  ): Promise<{ data: T[]; hasMore: boolean; lastDoc?: DocumentSnapshot }> {
    try {
      const database = this.ensureDb()
      let queryConstraints = [...constraints, limit(pageSize + 1)]
      
      if (lastDoc) {
        queryConstraints.push(startAfter(lastDoc))
      }
      
      const q = query(collection(database, collectionName), ...queryConstraints)
      const snapshot = await getDocs(q)
      
      const docs = snapshot.docs
      const hasMore = docs.length > pageSize
      const data = docs.slice(0, pageSize).map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as T))
      
      return {
        data,
        hasMore,
        lastDoc: hasMore ? docs[pageSize - 1] : undefined
      }
    } catch (error) {
      throw createAppError(
        `Fout bij ophalen van gepagineerde ${collectionName} collectie`,
        'FIRESTORE_PAGINATION_ERROR',
        `getPaginatedCollection(${collectionName})`
      )
    }
  }
}

// Specific service functions using the generic service
export class ClientService {
  static async getClients(userId: string): Promise<Client[]> {
    return FirestoreService.getCollection<Client>('clients', [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    ])
  }

  static async getClient(id: string): Promise<Client | null> {
    return FirestoreService.getDocument<Client>('clients', id)
  }

  static async addClient(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return FirestoreService.addDocument('clients', data)
  }

  static async updateClient(id: string, data: Partial<Client>): Promise<void> {
    return FirestoreService.updateDocument('clients', id, data)
  }

  static async deleteClient(id: string): Promise<void> {
    return FirestoreService.deleteDocument('clients', id)
  }

  static async getClientsPaginated(
    userId: string, 
    pageSize: number = 20, 
    lastDoc?: DocumentSnapshot
  ) {
    return FirestoreService.getPaginatedCollection<Client>(
      'clients',
      [where('userId', '==', userId), orderBy('createdAt', 'desc')],
      pageSize,
      lastDoc
    )
  }
}

export class InvoiceService {
  static async getInvoices(userId: string): Promise<Invoice[]> {
    return FirestoreService.getCollection<Invoice>('invoices', [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    ])
  }

  static async getInvoice(id: string): Promise<Invoice | null> {
    return FirestoreService.getDocument<Invoice>('invoices', id)
  }

  static async addInvoice(data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return FirestoreService.addDocument('invoices', data)
  }

  static async updateInvoice(id: string, data: Partial<Invoice>): Promise<void> {
    return FirestoreService.updateDocument('invoices', id, data)
  }

  static async deleteInvoice(id: string): Promise<void> {
    return FirestoreService.deleteDocument('invoices', id)
  }

  static async getInvoicesPaginated(
    userId: string, 
    pageSize: number = 20, 
    lastDoc?: DocumentSnapshot
  ) {
    return FirestoreService.getPaginatedCollection<Invoice>(
      'invoices',
      [where('userId', '==', userId), orderBy('createdAt', 'desc')],
      pageSize,
      lastDoc
    )
  }

  static async getInvoicesByStatus(userId: string, status: Invoice['status']): Promise<Invoice[]> {
    return FirestoreService.getCollection<Invoice>('invoices', [
      where('userId', '==', userId),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    ])
  }
}

export class QuoteService {
  static async getQuotes(userId: string): Promise<Quote[]> {
    return FirestoreService.getCollection<Quote>('quotes', [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    ])
  }

  static async getQuote(id: string): Promise<Quote | null> {
    return FirestoreService.getDocument<Quote>('quotes', id)
  }

  static async addQuote(data: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return FirestoreService.addDocument('quotes', data)
  }

  static async updateQuote(id: string, data: Partial<Quote>): Promise<void> {
    return FirestoreService.updateDocument('quotes', id, data)
  }

  static async deleteQuote(id: string): Promise<void> {
    return FirestoreService.deleteDocument('quotes', id)
  }

  static async getQuotesPaginated(
    userId: string, 
    pageSize: number = 20, 
    lastDoc?: DocumentSnapshot
  ) {
    return FirestoreService.getPaginatedCollection<Quote>(
      'quotes',
      [where('userId', '==', userId), orderBy('createdAt', 'desc')],
      pageSize,
      lastDoc
    )
  }
}

// Number generation utilities
export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  
  try {
    // Get count of invoices this month
    const invoices = await FirestoreService.getCollection<Invoice>('invoices', [
      where('createdAt', '>=', Timestamp.fromDate(new Date(year, new Date().getMonth(), 1))),
      where('createdAt', '<', Timestamp.fromDate(new Date(year, new Date().getMonth() + 1, 1)))
    ])
    
    const nextNumber = String(invoices.length + 1).padStart(3, '0')
    return `FAC-${year}${month}-${nextNumber}`
  } catch (error) {
    // Fallback to timestamp-based number
    const timestamp = Date.now().toString().slice(-6)
    return `FAC-${year}${month}-${timestamp}`
  }
}

export async function generateQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  
  try {
    // Get count of quotes this month
    const quotes = await FirestoreService.getCollection<Quote>('quotes', [
      where('createdAt', '>=', Timestamp.fromDate(new Date(year, new Date().getMonth(), 1))),
      where('createdAt', '<', Timestamp.fromDate(new Date(year, new Date().getMonth() + 1, 1)))
    ])
    
    const nextNumber = String(quotes.length + 1).padStart(3, '0')
    return `OFF-${year}${month}-${nextNumber}`
  } catch (error) {
    // Fallback to timestamp-based number
    const timestamp = Date.now().toString().slice(-6)
    return `OFF-${year}${month}-${timestamp}`
  }
}