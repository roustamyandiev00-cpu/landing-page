// App Configuration
export const APP_NAME = "Archon"
export const APP_DESCRIPTION = "Professionele facturatie en boekhouding voor ondernemers"
export const APP_URL = "https://archonpro.com"

// Company defaults
export const DEFAULT_COMPANY = {
  name: "Uw Bedrijfsnaam",
  email: "info@uwbedrijf.nl",
  phone: "+31 6 12345678",
  address: "Straatnaam 123",
  city: "Amsterdam",
  postalCode: "1234 AB",
  country: "Nederland",
}

// Invoice/Quote settings
export const INVOICE_PREFIX = "FAC"
export const QUOTE_PREFIX = "OFF"
export const DEFAULT_PAYMENT_TERMS = 14 // days
export const DEFAULT_QUOTE_VALIDITY = 30 // days

// Tax rates
export const BTW_RATES = [
  { value: 0, label: "0% BTW" },
  { value: 9, label: "9% BTW" },
  { value: 21, label: "21% BTW" },
]

export const DEFAULT_BTW_RATE = 21

// Currency
export const DEFAULT_CURRENCY = "EUR"
export const CURRENCY_SYMBOL = "€"

// Status configurations
export const INVOICE_STATUSES = {
  draft: { label: "Concept", color: "gray" },
  sent: { label: "Verzonden", color: "blue" },
  paid: { label: "Betaald", color: "green" },
  overdue: { label: "Achterstallig", color: "red" },
} as const

export const QUOTE_STATUSES = {
  draft: { label: "Concept", color: "gray" },
  sent: { label: "Verzonden", color: "blue" },
  accepted: { label: "Geaccepteerd", color: "green" },
  rejected: { label: "Afgewezen", color: "red" },
  expired: { label: "Verlopen", color: "orange" },
} as const

// Units
export const UNITS = [
  { value: "stuk", label: "stuk" },
  { value: "uur", label: "uur" },
  { value: "dag", label: "dag" },
  { value: "m", label: "meter" },
  { value: "m2", label: "m²" },
  { value: "m3", label: "m³" },
  { value: "kg", label: "kg" },
  { value: "forfait", label: "forfait" },
]

// Categories
export const EXPENSE_CATEGORIES = [
  "Kantoorkosten",
  "Materialen",
  "Transport",
  "Marketing",
  "Software",
  "Verzekeringen",
  "Belastingen",
  "Overig",
]

export const INCOME_CATEGORIES = [
  "Facturen",
  "Offertes",
  "Abonnementen",
  "Overig",
]

// Date formats
export const DATE_FORMAT = "dd-MM-yyyy"
export const DATETIME_FORMAT = "dd-MM-yyyy HH:mm"

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB for images
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]

// API Rate Limits
export const RATE_LIMITS = {
  AI_CHAT: { requests: 10, windowMs: 60000 }, // 10 per minute
  AI_GENERATE: { requests: 5, windowMs: 60000 }, // 5 per minute
  AI_IMAGE: { requests: 3, windowMs: 60000 }, // 3 per minute
  DEFAULT: { requests: 100, windowMs: 60000 }, // 100 per minute
} as const

// AI Configuration
export const AI_CONFIG = {
  MAX_PROMPT_LENGTH: 5000,
  MAX_CONTEXT_LENGTH: 10000,
  MAX_SUGGESTIONS: 20,
  TIMEOUT_MS: 30000, // 30 seconds
  MAX_RETRIES: 3,
} as const

// Validation Limits
export const VALIDATION_LIMITS = {
  CLIENT_NAME: { min: 2, max: 100 },
  COMPANY_NAME: { min: 2, max: 100 },
  EMAIL: { max: 254 },
  PHONE: { max: 20 },
  ADDRESS: { max: 200 },
  CITY: { max: 100 },
  NOTES: { max: 1000 },
  DESCRIPTION: { min: 1, max: 500 },
  QUANTITY: { min: 0.01, max: 999999 },
  PRICE: { min: 0, max: 999999 },
  TOTAL: { min: 0.01, max: 999999 },
  ITEMS_PER_INVOICE: { min: 1, max: 50 },
  PROJECT_DESCRIPTION: { min: 10, max: 5000 },
} as const

// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: 5000, // 5 seconds
  LOADING_DELAY: 300, // Show loading after 300ms
  DEBOUNCE_DELAY: 300, // Debounce search input
  ANIMATION_DURATION: 200, // Default animation duration
} as const

// Business Rules
export const BUSINESS_RULES = {
  MIN_INVOICE_AMOUNT: 0.01,
  MAX_INVOICE_AMOUNT: 999999,
  MIN_QUOTE_VALIDITY_DAYS: 1,
  MAX_QUOTE_VALIDITY_DAYS: 365,
  MIN_PAYMENT_TERMS_DAYS: 0,
  MAX_PAYMENT_TERMS_DAYS: 365,
  DEFAULT_WORK_HOURS_PER_DAY: 8,
  DEFAULT_WORK_DAYS_PER_WEEK: 5,
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Netwerkfout. Controleer je internetverbinding.",
  UNAUTHORIZED: "Je bent niet geautoriseerd voor deze actie.",
  FORBIDDEN: "Je hebt geen toegang tot deze resource.",
  NOT_FOUND: "De gevraagde resource is niet gevonden.",
  VALIDATION_ERROR: "De ingevoerde gegevens zijn niet geldig.",
  SERVER_ERROR: "Er is een serverfout opgetreden. Probeer het later opnieuw.",
  TIMEOUT_ERROR: "De aanvraag duurde te lang. Probeer het opnieuw.",
  RATE_LIMIT_ERROR: "Te veel aanvragen. Probeer het over een minuut opnieuw.",
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  CLIENT_CREATED: "Klant succesvol toegevoegd",
  CLIENT_UPDATED: "Klant succesvol bijgewerkt",
  CLIENT_DELETED: "Klant succesvol verwijderd",
  INVOICE_CREATED: "Factuur succesvol aangemaakt",
  INVOICE_UPDATED: "Factuur succesvol bijgewerkt",
  INVOICE_DELETED: "Factuur succesvol verwijderd",
  INVOICE_SENT: "Factuur succesvol verzonden",
  INVOICE_PAID: "Factuur gemarkeerd als betaald",
  QUOTE_CREATED: "Offerte succesvol aangemaakt",
  QUOTE_UPDATED: "Offerte succesvol bijgewerkt",
  QUOTE_DELETED: "Offerte succesvol verwijderd",
  QUOTE_SENT: "Offerte succesvol verzonden",
  PROFILE_UPDATED: "Profiel succesvol bijgewerkt",
  PASSWORD_RESET: "Wachtwoord reset link verzonden",
  EMAIL_VERIFIED: "E-mailadres succesvol geverifieerd",
} as const

// Feature Flags
export const FEATURES = {
  AI_CHAT: true,
  AI_IMAGE_ANALYSIS: true,
  VOICE_INPUT: true,
  EXPORT_EXCEL: true,
  EXPORT_CSV: true,
  EMAIL_NOTIFICATIONS: false, // Not implemented yet
  RECURRING_INVOICES: false, // Not implemented yet
  MULTI_CURRENCY: false, // Not implemented yet
  TEAM_COLLABORATION: false, // Not implemented yet
} as const
