import { toast } from "sonner"

/**
 * Centralized error handling utility
 */

export interface AppError extends Error {
  code?: string
  context?: string
}

export function createAppError(message: string, code?: string, context?: string): AppError {
  const error = new Error(message) as AppError
  error.code = code
  error.context = context
  return error
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Er is een onbekende fout opgetreden'
}

export function handleError(error: unknown, context: string): void {
  const message = getErrorMessage(error)
  console.error(`[${context}]`, error)
  toast.error(`Fout in ${context}: ${message}`)
}

export function handleFirestoreError(error: unknown, operation: string): void {
  const message = getErrorMessage(error)
  
  // Handle specific Firestore errors
  if (error instanceof Error) {
    if (error.message.includes('permission-denied')) {
      toast.error('Je hebt geen toegang tot deze gegevens')
      return
    }
    if (error.message.includes('not-found')) {
      toast.error('De gevraagde gegevens zijn niet gevonden')
      return
    }
    if (error.message.includes('resource-exhausted')) {
      toast.error('Service tijdelijk niet beschikbaar. Probeer het later opnieuw.')
      return
    }
  }
  
  console.error(`[Firestore ${operation}]`, error)
  toast.error(`Fout bij ${operation}: ${message}`)
}

export function handleApiError(error: unknown, endpoint: string): void {
  const message = getErrorMessage(error)
  console.error(`[API ${endpoint}]`, error)
  toast.error(`API fout bij ${endpoint}: ${message}`)
}