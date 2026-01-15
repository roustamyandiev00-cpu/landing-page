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
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]
