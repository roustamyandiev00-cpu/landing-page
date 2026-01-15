// Offerte Templates - Veelvoorkomende projecten voor snelle offertes
// Gebaseerd op Nederlandse marktprijzen 2024/2025

export interface OfferteTemplate {
  id: string
  naam: string
  categorie: string
  omschrijving: string
  standaardBeschrijving: string
  afmetingen?: {
    length: number
    width: number
    height?: number
  }
  items: TemplateItem[]
  geschatteTijd: string
  geschattePrijs: number
  opmerkingen: string
  tags: string[]
}

export interface TemplateItem {
  description: string
  quantity: number
  unit: "stuk" | "m2" | "m" | "uur" | "dag" | "forfait"
  price: number
  btw: 9 | 21
}

export const offerteTemplates: OfferteTemplate[] = [
  // BADKAMER TEMPLATES
  {
    id: "badkamer-klein",
    naam: "Kleine Badkamer Renovatie",
    categorie: "badkamer",
    omschrijving: "Complete renovatie kleine badkamer (4-6m²)",
    standaardBeschrijving: "Complete renovatie van kleine badkamer inclusief sloop, tegels, sanitair en afwerking.",
    afmetingen: { length: 2.5, width: 1.8 },
    items: [
      { description: "Oude badkamer slopen en afvoeren", quantity: 1, unit: "forfait", price: 600, btw: 21 },
      { description: "Wandtegels plaatsen (15m²)", quantity: 15, unit: "m2", price: 55, btw: 9 },
      { description: "Vloertegels plaatsen (4.5m²)", quantity: 4.5, unit: "m2", price: 65, btw: 9 },
      { description: "Inloopdouche installeren", quantity: 1, unit: "stuk", price: 450, btw: 9 },
      { description: "Hangtoilet plaatsen", quantity: 1, unit: "stuk", price: 275, btw: 9 },
      { description: "Wastafelmeubel plaatsen", quantity: 1, unit: "stuk", price: 225, btw: 9 },
      { description: "Verlichting en ventilatie", quantity: 1, unit: "forfait", price: 350, btw: 9 },
      { description: "Loodgieterswerk (leidingen)", quantity: 1, unit: "forfait", price: 450, btw: 9 },
    ],
    geschatteTijd: "4-6 dagen",
    geschattePrijs: 3200,
    opmerkingen: "Prijzen zijn exclusief sanitair en tegels. Offerte geldig voor 30 dagen.",
    tags: ["badkamer", "renovatie", "klein", "populair"]
  },
  {
    id: "badkamer-standaard",
    naam: "Standaard Badkamer Renovatie",
    categorie: "badkamer",
    omschrijving: "Complete renovatie standaard badkamer (6-9m²)",
    standaardBeschrijving: "Complete renovatie van standaard badkamer inclusief sloop, tegels, sanitair, ligbad en afwerking.",
    afmetingen: { length: 3.0, width: 2.5 },
    items: [
      { description: "Oude badkamer slopen en afvoeren", quantity: 1, unit: "forfait", price: 750, btw: 21 },
      { description: "Wandtegels plaatsen (20m²)", quantity: 20, unit: "m2", price: 55, btw: 9 },
      { description: "Vloertegels plaatsen (7.5m²)", quantity: 7.5, unit: "m2", price: 65, btw: 9 },
      { description: "Ligbad installeren", quantity: 1, unit: "stuk", price: 550, btw: 9 },
      { description: "Douche installeren", quantity: 1, unit: "stuk", price: 450, btw: 9 },
      { description: "Hangtoilet plaatsen", quantity: 1, unit: "stuk", price: 275, btw: 9 },
      { description: "Dubbele wastafel plaatsen", quantity: 1, unit: "stuk", price: 350, btw: 9 },
      { description: "Verlichting en ventilatie", quantity: 1, unit: "forfait", price: 450, btw: 9 },
      { description: "Loodgieterswerk (leidingen)", quantity: 1, unit: "forfait", price: 650, btw: 9 },
      { description: "Stucwerk en afwerking", quantity: 1, unit: "forfait", price: 400, btw: 9 },
    ],
    geschatteTijd: "6-8 dagen",
    geschattePrijs: 4875,
    opmerkingen: "Prijzen zijn exclusief sanitair en tegels. Offerte geldig voor 30 dagen.",
    tags: ["badkamer", "renovatie", "standaard", "populair"]
  },
  {
    id: "badkamer-luxe",
    naam: "Luxe Badkamer Renovatie",
    categorie: "badkamer",
    omschrijving: "Complete luxe badkamer met hoogwaardige afwerking (9-15m²)",
    standaardBeschrijving: "Complete luxe badkamer renovatie met hoogwaardige materialen, regendouche, vrijstaand bad en maatwerk.",
    afmetingen: { length: 4.0, width: 3.0 },
    items: [
      { description: "Oude badkamer slopen en afvoeren", quantity: 1, unit: "forfait", price: 950, btw: 21 },
      { description: "Wandtegels plaatsen groot formaat (30m²)", quantity: 30, unit: "m2", price: 75, btw: 9 },
      { description: "Vloertegels plaatsen groot formaat (12m²)", quantity: 12, unit: "m2", price: 85, btw: 9 },
      { description: "Vrijstaand bad installeren", quantity: 1, unit: "stuk", price: 750, btw: 9 },
      { description: "Regendouche met thermostaatkraan", quantity: 1, unit: "stuk", price: 650, btw: 9 },
      { description: "Hangtoilet met bidet functie", quantity: 1, unit: "stuk", price: 450, btw: 9 },
      { description: "Maatwerk wastafelmeubel dubbel", quantity: 1, unit: "stuk", price: 850, btw: 9 },
      { description: "Vloerverwarming elektrisch", quantity: 12, unit: "m2", price: 65, btw: 9 },
      { description: "LED verlichting en ventilatie", quantity: 1, unit: "forfait", price: 750, btw: 9 },
      { description: "Loodgieterswerk premium", quantity: 1, unit: "forfait", price: 950, btw: 9 },
      { description: "Stucwerk en sierpleister", quantity: 1, unit: "forfait", price: 850, btw: 9 },
    ],
    geschatteTijd: "10-14 dagen",
    geschattePrijs: 9075,
    opmerkingen: "Prijzen zijn exclusief sanitair en tegels. Premium materialen en afwerking. Offerte geldig voor 30 dagen.",
    tags: ["badkamer", "renovatie", "luxe", "premium"]
  },

  // KEUKEN TEMPLATES
  {
    id: "keuken-klein",
    naam: "Kleine Keuken Plaatsen",
    categorie: "keuken",
    omschrijving: "Keuken plaatsen 3 meter (excl. keuken zelf)",
    standaardBeschrijving: "Montage van kleine keuken 3 meter inclusief werkblad, spoelbak en inbouwapparatuur.",
    items: [
      { description: "Oude keuken demonteren en afvoeren", quantity: 1, unit: "forfait", price: 350, btw: 21 },
      { description: "Keuken plaatsen (3m)", quantity: 3, unit: "m", price: 200, btw: 9 },
      { description: "Werkblad op maat plaatsen", quantity: 3, unit: "m", price: 120, btw: 9 },
      { description: "Spoelbak en kraan installeren", quantity: 1, unit: "stuk", price: 200, btw: 9 },
      { description: "Inbouwapparatuur plaatsen (3 stuks)", quantity: 3, unit: "stuk", price: 100, btw: 9 },
      { description: "Spatwand tegelen (3m²)", quantity: 3, unit: "m2", price: 65, btw: 9 },
      { description: "Elektra aanpassingen", quantity: 1, unit: "forfait", price: 350, btw: 9 },
      { description: "Loodgieterswerk", quantity: 1, unit: "forfait", price: 300, btw: 9 },
    ],
    geschatteTijd: "2-3 dagen",
    geschattePrijs: 2245,
    opmerkingen: "Prijzen zijn exclusief keuken, apparatuur en tegels. Offerte geldig voor 30 dagen.",
    tags: ["keuken", "montage", "klein", "populair"]
  },
  {
    id: "keuken-standaard",
    naam: "Standaard Keuken Plaatsen",
    categorie: "keuken",
    omschrijving: "Keuken plaatsen 4-5 meter (excl. keuken zelf)",
    standaardBeschrijving: "Montage van standaard keuken 4-5 meter inclusief werkblad, spoelbak, kookplaat en inbouwapparatuur.",
    items: [
      { description: "Oude keuken demonteren en afvoeren", quantity: 1, unit: "forfait", price: 450, btw: 21 },
      { description: "Keuken plaatsen (4.5m)", quantity: 4.5, unit: "m", price: 200, btw: 9 },
      { description: "Werkblad op maat plaatsen", quantity: 4.5, unit: "m", price: 120, btw: 9 },
      { description: "Spoelbak en kraan installeren", quantity: 1, unit: "stuk", price: 200, btw: 9 },
      { description: "Inbouwapparatuur plaatsen (5 stuks)", quantity: 5, unit: "stuk", price: 100, btw: 9 },
      { description: "Spatwand tegelen (5m²)", quantity: 5, unit: "m2", price: 65, btw: 9 },
      { description: "Elektra aanpassingen", quantity: 1, unit: "forfait", price: 450, btw: 9 },
      { description: "Loodgieterswerk", quantity: 1, unit: "forfait", price: 400, btw: 9 },
      { description: "Afwerking en plinten", quantity: 1, unit: "forfait", price: 250, btw: 9 },
    ],
    geschatteTijd: "3-4 dagen",
    geschattePrijs: 3265,
    opmerkingen: "Prijzen zijn exclusief keuken, apparatuur en tegels. Offerte geldig voor 30 dagen.",
    tags: ["keuken", "montage", "standaard", "populair"]
  },

  // SCHILDERWERK TEMPLATES
  {
    id: "schilderen-woonkamer",
    naam: "Woonkamer Schilderen",
    categorie: "schilderwerk",
    omschrijving: "Complete woonkamer schilderen (30-40m²)",
    standaardBeschrijving: "Woonkamer schilderen inclusief plafond, wanden en houtwerk. 2 lagen latex.",
    items: [
      { description: "Voorbereidend werk (afdekken, schuren)", quantity: 1, unit: "forfait", price: 200, btw: 9 },
      { description: "Plafond schilderen (35m²)", quantity: 35, unit: "m2", price: 18, btw: 9 },
      { description: "Wanden schilderen (80m²)", quantity: 80, unit: "m2", price: 16, btw: 9 },
      { description: "Kozijnen schilderen (3 stuks)", quantity: 3, unit: "stuk", price: 75, btw: 9 },
      { description: "Deuren schilderen (2 stuks)", quantity: 2, unit: "stuk", price: 95, btw: 9 },
      { description: "Plinten schilderen (20m)", quantity: 20, unit: "m", price: 8, btw: 9 },
    ],
    geschatteTijd: "3-4 dagen",
    geschattePrijs: 2395,
    opmerkingen: "Prijzen zijn inclusief materiaal (latex verf). Offerte geldig voor 30 dagen.",
    tags: ["schilderen", "woonkamer", "interieur", "populair"]
  },
  {
    id: "schilderen-huis",
    naam: "Volledig Huis Schilderen",
    categorie: "schilderwerk",
    omschrijving: "Compleet huis schilderen binnen (120-150m²)",
    standaardBeschrijving: "Volledig huis schilderen inclusief alle plafonds, wanden en houtwerk. 2 lagen latex.",
    items: [
      { description: "Voorbereidend werk volledig huis", quantity: 1, unit: "forfait", price: 650, btw: 9 },
      { description: "Plafonds schilderen (120m²)", quantity: 120, unit: "m2", price: 18, btw: 9 },
      { description: "Wanden schilderen (280m²)", quantity: 280, unit: "m2", price: 16, btw: 9 },
      { description: "Kozijnen schilderen (12 stuks)", quantity: 12, unit: "stuk", price: 75, btw: 9 },
      { description: "Deuren schilderen (10 stuks)", quantity: 10, unit: "stuk", price: 95, btw: 9 },
      { description: "Plinten schilderen (80m)", quantity: 80, unit: "m", price: 8, btw: 9 },
      { description: "Trapwerk schilderen", quantity: 1, unit: "forfait", price: 450, btw: 9 },
    ],
    geschatteTijd: "10-14 dagen",
    geschattePrijs: 9670,
    opmerkingen: "Prijzen zijn inclusief materiaal (latex verf). Offerte geldig voor 30 dagen.",
    tags: ["schilderen", "huis", "volledig", "groot"]
  },

  // VLOER TEMPLATES
  {
    id: "laminaat-woonkamer",
    naam: "Laminaat Woonkamer",
    categorie: "vloeren",
    omschrijving: "Laminaat leggen woonkamer (25-35m²)",
    standaardBeschrijving: "Laminaat leggen inclusief ondervloer, plinten en afwerking.",
    items: [
      { description: "Oude vloer verwijderen", quantity: 30, unit: "m2", price: 12, btw: 21 },
      { description: "Vloer egaliseren", quantity: 30, unit: "m2", price: 16, btw: 9 },
      { description: "Laminaat leggen inclusief ondervloer", quantity: 30, unit: "m2", price: 24, btw: 9 },
      { description: "Plinten plaatsen", quantity: 24, unit: "m", price: 12, btw: 9 },
      { description: "Dorpels en overgangen", quantity: 3, unit: "stuk", price: 45, btw: 9 },
    ],
    geschatteTijd: "2-3 dagen",
    geschattePrijs: 1383,
    opmerkingen: "Prijzen zijn exclusief laminaat en plinten. Offerte geldig voor 30 dagen.",
    tags: ["laminaat", "vloer", "woonkamer", "populair"]
  },
  {
    id: "pvc-badkamer",
    naam: "PVC Vloer Badkamer",
    categorie: "vloeren",
    omschrijving: "PVC vloer leggen badkamer (4-8m²)",
    standaardBeschrijving: "Waterdichte PVC vloer leggen inclusief voorbereiding en afwerking.",
    items: [
      { description: "Oude vloer verwijderen", quantity: 6, unit: "m2", price: 12, btw: 21 },
      { description: "Vloer egaliseren", quantity: 6, unit: "m2", price: 16, btw: 9 },
      { description: "PVC vloer leggen waterdicht", quantity: 6, unit: "m2", price: 28, btw: 9 },
      { description: "Plinten plaatsen", quantity: 10, unit: "m", price: 12, btw: 9 },
      { description: "Waterdichte afwerking", quantity: 1, unit: "forfait", price: 150, btw: 9 },
    ],
    geschatteTijd: "1-2 dagen",
    geschattePrijs: 510,
    opmerkingen: "Prijzen zijn exclusief PVC vloer en plinten. Offerte geldig voor 30 dagen.",
    tags: ["pvc", "vloer", "badkamer", "waterdicht"]
  },

  // TUIN TEMPLATES
  {
    id: "terras-tegels",
    naam: "Terras Aanleggen",
    categorie: "tuin",
    omschrijving: "Terras aanleggen met tegels (15-25m²)",
    standaardBeschrijving: "Terras aanleggen met terrastegels op zandbed inclusief fundering.",
    items: [
      { description: "Grondwerk en afgraven", quantity: 20, unit: "m2", price: 18, btw: 21 },
      { description: "Fundering aanleggen", quantity: 20, unit: "m2", price: 22, btw: 21 },
      { description: "Terrastegels leggen", quantity: 20, unit: "m2", price: 42, btw: 21 },
      { description: "Voegen en afwerking", quantity: 20, unit: "m2", price: 8, btw: 21 },
      { description: "Afvoer grond en materiaal", quantity: 1, unit: "forfait", price: 250, btw: 21 },
    ],
    geschatteTijd: "3-4 dagen",
    geschattePrijs: 2050,
    opmerkingen: "Prijzen zijn exclusief terrastegels. Offerte geldig voor 30 dagen.",
    tags: ["terras", "tuin", "tegels", "buiten"]
  },
  {
    id: "oprit-klinkers",
    naam: "Oprit Aanleggen",
    categorie: "tuin",
    omschrijving: "Oprit aanleggen met klinkers (30-50m²)",
    standaardBeschrijving: "Oprit aanleggen met klinkers inclusief fundering en afwerking.",
    items: [
      { description: "Grondwerk en afgraven", quantity: 40, unit: "m2", price: 18, btw: 21 },
      { description: "Fundering aanleggen versterkt", quantity: 40, unit: "m2", price: 28, btw: 21 },
      { description: "Klinkers leggen", quantity: 40, unit: "m2", price: 48, btw: 21 },
      { description: "Voegen en afwerking", quantity: 40, unit: "m2", price: 10, btw: 21 },
      { description: "Afvoer grond en materiaal", quantity: 1, unit: "forfait", price: 350, btw: 21 },
    ],
    geschatteTijd: "4-6 dagen",
    geschattePrijs: 4550,
    opmerkingen: "Prijzen zijn exclusief klinkers. Offerte geldig voor 30 dagen.",
    tags: ["oprit", "klinkers", "tuin", "buiten"]
  },

  // ONDERHOUD TEMPLATES
  {
    id: "onderhoud-basis",
    naam: "Basis Onderhoud",
    categorie: "overig",
    omschrijving: "Algemeen onderhoud en kleine reparaties",
    standaardBeschrijving: "Algemeen onderhoud en kleine reparaties aan woning.",
    items: [
      { description: "Voorrijkosten", quantity: 1, unit: "stuk", price: 45, btw: 21 },
      { description: "Arbeid vakman", quantity: 4, unit: "uur", price: 55, btw: 21 },
      { description: "Materiaalkosten", quantity: 1, unit: "forfait", price: 150, btw: 21 },
    ],
    geschatteTijd: "0.5 dag",
    geschattePrijs: 415,
    opmerkingen: "Prijzen zijn indicatief. Exacte kosten na inspectie. Offerte geldig voor 30 dagen.",
    tags: ["onderhoud", "reparatie", "klein", "snel"]
  },
]

// Helper functies
export function getTemplatesByCategorie(categorie: string): OfferteTemplate[] {
  return offerteTemplates.filter(t => t.categorie === categorie)
}

export function getPopularTemplates(limit: number = 5): OfferteTemplate[] {
  return offerteTemplates
    .filter(t => t.tags.includes("populair"))
    .slice(0, limit)
}

export function searchTemplates(query: string): OfferteTemplate[] {
  const lowerQuery = query.toLowerCase()
  return offerteTemplates.filter(t =>
    t.naam.toLowerCase().includes(lowerQuery) ||
    t.omschrijving.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
