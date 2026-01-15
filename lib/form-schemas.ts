/**
 * Form validation schemas using Zod
 */

import { z } from "zod"

// Common validation patterns
const dutchPhoneRegex = /^(\+31|0)[1-9][0-9]{8}$/
const dutchPostalCodeRegex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i
const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/
const kvkRegex = /^[0-9]{8}$/
const btwRegex = /^NL[0-9]{9}B[0-9]{2}$/

// User Profile Schema
export const UserProfileSchema = z.object({
  displayName: z.string().min(2, "Naam moet minimaal 2 karakters zijn").max(100),
  email: z.string().email("Ongeldig e-mailadres"),
  companyName: z.string().min(2, "Bedrijfsnaam moet minimaal 2 karakters zijn").max(100).optional().or(z.literal("")),
  companyAddress: z.string().max(200).optional().or(z.literal("")),
  companyCity: z.string().max(100).optional().or(z.literal("")),
  companyPostalCode: z.string().regex(dutchPostalCodeRegex, "Ongeldige postcode (bijv. 1234 AB)").optional().or(z.literal("")),
  companyCountry: z.string().max(100).optional().or(z.literal("")),
  companyPhone: z.string().regex(dutchPhoneRegex, "Ongeldig telefoonnummer (bijv. 06-12345678)").optional().or(z.literal("")),
  companyEmail: z.string().email("Ongeldig e-mailadres").optional().or(z.literal("")),
  companyWebsite: z.string().url("Ongeldige website URL").optional().or(z.literal("")),
  companyKvK: z.string().regex(kvkRegex, "KvK nummer moet 8 cijfers zijn").optional().or(z.literal("")),
  companyBTW: z.string().regex(btwRegex, "BTW nummer moet format NL123456789B01 hebben").optional().or(z.literal("")),
  companyIBAN: z.string().regex(ibanRegex, "Ongeldig IBAN nummer").optional().or(z.literal("")),
})

// Client Schema
export const ClientSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 karakters zijn").max(100),
  email: z.string().email("Ongeldig e-mailadres"),
  phone: z.string().regex(dutchPhoneRegex, "Ongeldig telefoonnummer").optional().or(z.literal("")),
  company: z.string().max(100).optional().or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  postalCode: z.string().regex(dutchPostalCodeRegex, "Ongeldige postcode").optional().or(z.literal("")),
  country: z.string().max(100).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
})

// Invoice Item Schema
export const InvoiceItemSchema = z.object({
  description: z.string().min(1, "Omschrijving is verplicht").max(500),
  quantity: z.number().min(0.01, "Aantal moet groter dan 0 zijn").max(999999),
  unitPrice: z.number().min(0, "Prijs kan niet negatief zijn").max(999999),
  total: z.number().min(0).max(999999),
})

// Invoice Schema
export const InvoiceSchema = z.object({
  clientId: z.string().min(1, "Selecteer een klant"),
  clientName: z.string().min(1, "Klantnaam is verplicht"),
  clientEmail: z.string().email("Ongeldig e-mailadres"),
  items: z.array(InvoiceItemSchema).min(1, "Minimaal 1 item vereist").max(50, "Maximaal 50 items toegestaan"),
  subtotal: z.number().min(0),
  taxRate: z.number().min(0).max(100),
  taxAmount: z.number().min(0),
  total: z.number().min(0.01, "Totaal moet groter dan 0 zijn"),
  dueDate: z.date().min(new Date(), "Vervaldatum moet in de toekomst liggen"),
  notes: z.string().max(1000).optional().or(z.literal("")),
})

// Quote Schema
export const QuoteSchema = z.object({
  clientId: z.string().min(1, "Selecteer een klant"),
  clientName: z.string().min(1, "Klantnaam is verplicht"),
  clientEmail: z.string().email("Ongeldig e-mailadres"),
  items: z.array(InvoiceItemSchema).min(1, "Minimaal 1 item vereist").max(50, "Maximaal 50 items toegestaan"),
  subtotal: z.number().min(0),
  taxRate: z.number().min(0).max(100),
  taxAmount: z.number().min(0),
  total: z.number().min(0.01, "Totaal moet groter dan 0 zijn"),
  validUntil: z.date().min(new Date(), "Geldigheid moet in de toekomst liggen"),
  notes: z.string().max(1000).optional().or(z.literal("")),
})

// Bank Account Schema
export const BankAccountSchema = z.object({
  bankName: z.string().min(2, "Banknaam moet minimaal 2 karakters zijn").max(100),
  accountName: z.string().min(2, "Rekeningnaam moet minimaal 2 karakters zijn").max(100),
  iban: z.string().regex(ibanRegex, "Ongeldig IBAN nummer"),
  accountType: z.enum(["checking", "savings", "business"], {
    errorMap: () => ({ message: "Selecteer een rekeningtype" })
  }),
  balance: z.number().min(-999999, "Saldo te laag").max(999999, "Saldo te hoog"),
  currency: z.string().length(3, "Valuta moet 3 karakters zijn").default("EUR"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Ongeldige kleurcode").default("#3B82F6"),
})

// Transaction Schema
export const TransactionSchema = z.object({
  bankAccountId: z.string().min(1, "Selecteer een bankrekening"),
  description: z.string().min(1, "Omschrijving is verplicht").max(200),
  amount: z.number().min(0.01, "Bedrag moet groter dan 0 zijn").max(999999),
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Selecteer inkomsten of uitgaven" })
  }),
  category: z.string().min(1, "Selecteer een categorie").max(100),
  date: z.date().max(new Date(), "Datum kan niet in de toekomst liggen"),
})

// Login Schema
export const LoginSchema = z.object({
  email: z.string().email("Ongeldig e-mailadres"),
  password: z.string().min(6, "Wachtwoord moet minimaal 6 karakters zijn"),
})

// Register Schema
export const RegisterSchema = z.object({
  email: z.string().email("Ongeldig e-mailadres"),
  password: z.string()
    .min(8, "Wachtwoord moet minimaal 8 karakters zijn")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Wachtwoord moet minimaal 1 kleine letter, 1 hoofdletter en 1 cijfer bevatten"),
  confirmPassword: z.string(),
  displayName: z.string().min(2, "Naam moet minimaal 2 karakters zijn").max(100),
  acceptTerms: z.boolean().refine(val => val === true, "Je moet de voorwaarden accepteren"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Wachtwoorden komen niet overeen",
  path: ["confirmPassword"],
})

// Password Reset Schema
export const PasswordResetSchema = z.object({
  email: z.string().email("Ongeldig e-mailadres"),
})

// Search Schema
export const SearchSchema = z.object({
  query: z.string().min(1, "Zoekterm is verplicht").max(100),
  type: z.enum(["all", "clients", "invoices", "quotes"]).optional(),
})

// AI Offerte Schema
export const AIOfferteSchema = z.object({
  projectDescription: z.string().min(10, "Projectbeschrijving moet minimaal 10 karakters zijn").max(5000),
  clientName: z.string().min(2, "Klantnaam moet minimaal 2 karakters zijn").max(100),
  projectType: z.string().max(100).optional().or(z.literal("")),
  dimensions: z.object({
    length: z.number().min(0).max(1000).optional(),
    width: z.number().min(0).max(1000).optional(),
    height: z.number().min(0).max(100).optional(),
    area: z.number().min(0).max(10000).optional(),
  }).optional(),
  notes: z.string().max(1000).optional().or(z.literal("")),
  validityDays: z.number().min(1, "Geldigheid moet minimaal 1 dag zijn").max(365, "Geldigheid kan maximaal 365 dagen zijn").default(30),
})

// Export types for use in components
export type UserProfileFormData = z.infer<typeof UserProfileSchema>
export type ClientFormData = z.infer<typeof ClientSchema>
export type InvoiceFormData = z.infer<typeof InvoiceSchema>
export type QuoteFormData = z.infer<typeof QuoteSchema>
export type BankAccountFormData = z.infer<typeof BankAccountSchema>
export type TransactionFormData = z.infer<typeof TransactionSchema>
export type LoginFormData = z.infer<typeof LoginSchema>
export type RegisterFormData = z.infer<typeof RegisterSchema>
export type PasswordResetFormData = z.infer<typeof PasswordResetSchema>
export type SearchFormData = z.infer<typeof SearchSchema>
export type AIOfferteFormData = z.infer<typeof AIOfferteSchema>

// Validation helper function
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach(err => {
        const path = err.path.join('.')
        errors[path] = err.message
      })
      return { success: false, errors }
    }
    return { success: false, errors: { general: 'Validatie fout' } }
  }
}