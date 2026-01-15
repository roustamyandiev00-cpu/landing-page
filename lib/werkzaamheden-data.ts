// Werkzaamheden bibliotheek - standaard items voor bouwprofessionals
// Gebaseerd op Nederlandse marktprijzen 2024/2025

export interface Werkzaamheid {
  id: string
  categorie: string
  naam: string
  omschrijving: string
  eenheid: "stuk" | "m2" | "m" | "uur" | "dag" | "forfait"
  prijsMin: number
  prijsMax: number
  standaardPrijs: number
  btwTarief: 9 | 21
  tags: string[]
}

export interface WerkzaamhedenCategorie {
  id: string
  naam: string
  icon: string
  kleur: string
}

export const categorieën: WerkzaamhedenCategorie[] = [
  { id: "badkamer", naam: "Badkamer", icon: "🚿", kleur: "blue" },
  { id: "keuken", naam: "Keuken", icon: "🍳", kleur: "orange" },
  { id: "schilderwerk", naam: "Schilderwerk", icon: "🎨", kleur: "purple" },
  { id: "vloeren", naam: "Vloeren", icon: "🏠", kleur: "amber" },
  { id: "elektra", naam: "Elektra", icon: "⚡", kleur: "yellow" },
  { id: "loodgieter", naam: "Loodgieterwerk", icon: "🔧", kleur: "cyan" },
  { id: "dakwerk", naam: "Dakwerk", icon: "🏗️", kleur: "slate" },
  { id: "timmerwerk", naam: "Timmerwerk", icon: "🪚", kleur: "emerald" },
  { id: "stucwerk", naam: "Stucwerk", icon: "🧱", kleur: "stone" },
  { id: "isolatie", naam: "Isolatie", icon: "🧊", kleur: "sky" },
  { id: "tuin", naam: "Tuin & Bestrating", icon: "🌳", kleur: "green" },
  { id: "overig", naam: "Overig", icon: "📦", kleur: "gray" },
]

export const werkzaamheden: Werkzaamheid[] = [
  // BADKAMER
  {
    id: "bad-tegels-wand",
    categorie: "badkamer",
    naam: "Wandtegels plaatsen",
    omschrijving: "Wandtegels zetten inclusief voegen",
    eenheid: "m2",
    prijsMin: 45,
    prijsMax: 75,
    standaardPrijs: 55,
    btwTarief: 9,
    tags: ["tegels", "wand", "badkamer"]
  },
  {
    id: "bad-tegels-vloer",
    categorie: "badkamer",
    naam: "Vloertegels plaatsen",
    omschrijving: "Vloertegels leggen inclusief voegen",
    eenheid: "m2",
    prijsMin: 50,
    prijsMax: 85,
    standaardPrijs: 65,
    btwTarief: 9,
    tags: ["tegels", "vloer", "badkamer"]
  },
  {
    id: "bad-douche-installatie",
    categorie: "badkamer",
    naam: "Douche installeren",
    omschrijving: "Complete douche installatie inclusief kraan en afvoer",
    eenheid: "stuk",
    prijsMin: 350,
    prijsMax: 650,
    standaardPrijs: 450,
    btwTarief: 9,
    tags: ["douche", "sanitair", "installatie"]
  },
  {
    id: "bad-toilet-installatie",
    categorie: "badkamer",
    naam: "Toilet plaatsen",
    omschrijving: "Toilet installeren inclusief aansluiting",
    eenheid: "stuk",
    prijsMin: 200,
    prijsMax: 400,
    standaardPrijs: 275,
    btwTarief: 9,
    tags: ["toilet", "wc", "sanitair"]
  },
  {
    id: "bad-wastafel-installatie",
    categorie: "badkamer",
    naam: "Wastafel plaatsen",
    omschrijving: "Wastafel installeren met kraan en sifon",
    eenheid: "stuk",
    prijsMin: 150,
    prijsMax: 350,
    standaardPrijs: 225,
    btwTarief: 9,
    tags: ["wastafel", "sanitair", "kraan"]
  },
  {
    id: "bad-badkuip-installatie",
    categorie: "badkamer",
    naam: "Ligbad plaatsen",
    omschrijving: "Ligbad installeren inclusief afvoer en kraan",
    eenheid: "stuk",
    prijsMin: 400,
    prijsMax: 800,
    standaardPrijs: 550,
    btwTarief: 9,
    tags: ["bad", "ligbad", "sanitair"]
  },
  {
    id: "bad-sloop",
    categorie: "badkamer",
    naam: "Badkamer slopen",
    omschrijving: "Complete sloop oude badkamer inclusief afvoer",
    eenheid: "forfait",
    prijsMin: 500,
    prijsMax: 1200,
    standaardPrijs: 750,
    btwTarief: 21,
    tags: ["sloop", "afvoer", "demontage"]
  },
  
  // KEUKEN
  {
    id: "keuken-plaatsen",
    categorie: "keuken",
    naam: "Keuken plaatsen",
    omschrijving: "Complete keuken montage (excl. keuken zelf)",
    eenheid: "m",
    prijsMin: 150,
    prijsMax: 300,
    standaardPrijs: 200,
    btwTarief: 9,
    tags: ["keuken", "montage", "installatie"]
  },
  {
    id: "keuken-werkblad",
    categorie: "keuken",
    naam: "Werkblad plaatsen",
    omschrijving: "Werkblad op maat maken en plaatsen",
    eenheid: "m",
    prijsMin: 80,
    prijsMax: 200,
    standaardPrijs: 120,
    btwTarief: 9,
    tags: ["werkblad", "aanrecht", "keuken"]
  },
  {
    id: "keuken-spoelbak",
    categorie: "keuken",
    naam: "Spoelbak installeren",
    omschrijving: "Spoelbak en kraan aansluiten",
    eenheid: "stuk",
    prijsMin: 150,
    prijsMax: 300,
    standaardPrijs: 200,
    btwTarief: 9,
    tags: ["spoelbak", "kraan", "keuken"]
  },
  {
    id: "keuken-apparatuur",
    categorie: "keuken",
    naam: "Inbouwapparatuur plaatsen",
    omschrijving: "Inbouwapparaat installeren (per stuk)",
    eenheid: "stuk",
    prijsMin: 75,
    prijsMax: 175,
    standaardPrijs: 100,
    btwTarief: 9,
    tags: ["apparatuur", "inbouw", "keuken"]
  },
  {
    id: "keuken-tegels",
    categorie: "keuken",
    naam: "Spatwand tegelen",
    omschrijving: "Tegels plaatsen achter keuken",
    eenheid: "m2",
    prijsMin: 50,
    prijsMax: 90,
    standaardPrijs: 65,
    btwTarief: 9,
    tags: ["tegels", "spatwand", "keuken"]
  },

  // SCHILDERWERK
  {
    id: "schilder-muur",
    categorie: "schilderwerk",
    naam: "Muren schilderen",
    omschrijving: "Muren schilderen 2 lagen (latex)",
    eenheid: "m2",
    prijsMin: 12,
    prijsMax: 25,
    standaardPrijs: 16,
    btwTarief: 9,
    tags: ["schilderen", "muur", "latex"]
  },
  {
    id: "schilder-plafond",
    categorie: "schilderwerk",
    naam: "Plafond schilderen",
    omschrijving: "Plafond schilderen 2 lagen",
    eenheid: "m2",
    prijsMin: 14,
    prijsMax: 28,
    standaardPrijs: 18,
    btwTarief: 9,
    tags: ["schilderen", "plafond"]
  },
  {
    id: "schilder-kozijn",
    categorie: "schilderwerk",
    naam: "Kozijnen schilderen",
    omschrijving: "Kozijn schilderen binnen (per stuk)",
    eenheid: "stuk",
    prijsMin: 45,
    prijsMax: 120,
    standaardPrijs: 75,
    btwTarief: 9,
    tags: ["schilderen", "kozijn", "houtwerk"]
  },
  {
    id: "schilder-deur",
    categorie: "schilderwerk",
    naam: "Deur schilderen",
    omschrijving: "Binnendeur schilderen beide zijden",
    eenheid: "stuk",
    prijsMin: 60,
    prijsMax: 150,
    standaardPrijs: 95,
    btwTarief: 9,
    tags: ["schilderen", "deur", "houtwerk"]
  },
  {
    id: "schilder-buiten",
    categorie: "schilderwerk",
    naam: "Buitenschilderwerk",
    omschrijving: "Buitenkozijnen schilderen",
    eenheid: "m2",
    prijsMin: 35,
    prijsMax: 65,
    standaardPrijs: 48,
    btwTarief: 9,
    tags: ["schilderen", "buiten", "kozijn"]
  },
  {
    id: "behangen",
    categorie: "schilderwerk",
    naam: "Behangen",
    omschrijving: "Behang aanbrengen (excl. behang)",
    eenheid: "m2",
    prijsMin: 18,
    prijsMax: 35,
    standaardPrijs: 24,
    btwTarief: 9,
    tags: ["behang", "wand"]
  },

  // VLOEREN
  {
    id: "vloer-laminaat",
    categorie: "vloeren",
    naam: "Laminaat leggen",
    omschrijving: "Laminaat leggen inclusief ondervloer",
    eenheid: "m2",
    prijsMin: 18,
    prijsMax: 35,
    standaardPrijs: 24,
    btwTarief: 9,
    tags: ["laminaat", "vloer"]
  },
  {
    id: "vloer-pvc",
    categorie: "vloeren",
    naam: "PVC vloer leggen",
    omschrijving: "PVC click of plak vloer leggen",
    eenheid: "m2",
    prijsMin: 20,
    prijsMax: 40,
    standaardPrijs: 28,
    btwTarief: 9,
    tags: ["pvc", "vinyl", "vloer"]
  },
  {
    id: "vloer-parket",
    categorie: "vloeren",
    naam: "Parket leggen",
    omschrijving: "Houten parket leggen",
    eenheid: "m2",
    prijsMin: 35,
    prijsMax: 70,
    standaardPrijs: 48,
    btwTarief: 9,
    tags: ["parket", "hout", "vloer"]
  },
  {
    id: "vloer-tegels",
    categorie: "vloeren",
    naam: "Vloertegels leggen",
    omschrijving: "Vloertegels leggen inclusief voegen",
    eenheid: "m2",
    prijsMin: 45,
    prijsMax: 85,
    standaardPrijs: 60,
    btwTarief: 9,
    tags: ["tegels", "vloer"]
  },
  {
    id: "vloer-egaliseren",
    categorie: "vloeren",
    naam: "Vloer egaliseren",
    omschrijving: "Vloer egaliseren/uitvlakken",
    eenheid: "m2",
    prijsMin: 12,
    prijsMax: 25,
    standaardPrijs: 16,
    btwTarief: 9,
    tags: ["egaliseren", "vloer", "voorbereiden"]
  },
  {
    id: "vloer-verwijderen",
    categorie: "vloeren",
    naam: "Oude vloer verwijderen",
    omschrijving: "Bestaande vloerbedekking verwijderen",
    eenheid: "m2",
    prijsMin: 8,
    prijsMax: 20,
    standaardPrijs: 12,
    btwTarief: 21,
    tags: ["verwijderen", "sloop", "vloer"]
  },

  // ELEKTRA
  {
    id: "elektra-stopcontact",
    categorie: "elektra",
    naam: "Stopcontact plaatsen",
    omschrijving: "Nieuw stopcontact bijplaatsen",
    eenheid: "stuk",
    prijsMin: 75,
    prijsMax: 150,
    standaardPrijs: 95,
    btwTarief: 9,
    tags: ["stopcontact", "elektra"]
  },
  {
    id: "elektra-schakelaar",
    categorie: "elektra",
    naam: "Schakelaar plaatsen",
    omschrijving: "Lichtschakelaar bijplaatsen",
    eenheid: "stuk",
    prijsMin: 65,
    prijsMax: 130,
    standaardPrijs: 85,
    btwTarief: 9,
    tags: ["schakelaar", "elektra", "licht"]
  },
  {
    id: "elektra-lamp",
    categorie: "elektra",
    naam: "Lamp ophangen",
    omschrijving: "Lamp/armatuur monteren en aansluiten",
    eenheid: "stuk",
    prijsMin: 35,
    prijsMax: 85,
    standaardPrijs: 50,
    btwTarief: 9,
    tags: ["lamp", "verlichting", "elektra"]
  },
  {
    id: "elektra-groepenkast",
    categorie: "elektra",
    naam: "Groepenkast vervangen",
    omschrijving: "Nieuwe groepenkast plaatsen",
    eenheid: "stuk",
    prijsMin: 600,
    prijsMax: 1500,
    standaardPrijs: 950,
    btwTarief: 9,
    tags: ["groepenkast", "meterkast", "elektra"]
  },
  {
    id: "elektra-bekabeling",
    categorie: "elektra",
    naam: "Bekabeling aanleggen",
    omschrijving: "Nieuwe bekabeling trekken",
    eenheid: "m",
    prijsMin: 8,
    prijsMax: 20,
    standaardPrijs: 12,
    btwTarief: 9,
    tags: ["kabel", "bekabeling", "elektra"]
  },

  // LOODGIETER
  {
    id: "lood-kraan",
    categorie: "loodgieter",
    naam: "Kraan vervangen",
    omschrijving: "Mengkraan vervangen",
    eenheid: "stuk",
    prijsMin: 75,
    prijsMax: 175,
    standaardPrijs: 110,
    btwTarief: 9,
    tags: ["kraan", "sanitair"]
  },
  {
    id: "lood-radiator",
    categorie: "loodgieter",
    naam: "Radiator plaatsen",
    omschrijving: "Radiator monteren en aansluiten",
    eenheid: "stuk",
    prijsMin: 150,
    prijsMax: 350,
    standaardPrijs: 225,
    btwTarief: 9,
    tags: ["radiator", "verwarming", "cv"]
  },
  {
    id: "lood-leiding",
    categorie: "loodgieter",
    naam: "Waterleiding aanleggen",
    omschrijving: "Nieuwe waterleiding trekken",
    eenheid: "m",
    prijsMin: 35,
    prijsMax: 75,
    standaardPrijs: 50,
    btwTarief: 9,
    tags: ["leiding", "water", "loodgieter"]
  },
  {
    id: "lood-afvoer",
    categorie: "loodgieter",
    naam: "Afvoer aanleggen",
    omschrijving: "Nieuwe afvoerleiding aanleggen",
    eenheid: "m",
    prijsMin: 40,
    prijsMax: 90,
    standaardPrijs: 60,
    btwTarief: 9,
    tags: ["afvoer", "riool", "loodgieter"]
  },
  {
    id: "lood-cv-ketel",
    categorie: "loodgieter",
    naam: "CV-ketel installeren",
    omschrijving: "CV-ketel plaatsen en aansluiten",
    eenheid: "stuk",
    prijsMin: 500,
    prijsMax: 1200,
    standaardPrijs: 750,
    btwTarief: 9,
    tags: ["cv", "ketel", "verwarming"]
  },

  // DAKWERK
  {
    id: "dak-pannen",
    categorie: "dakwerk",
    naam: "Dakpannen vervangen",
    omschrijving: "Dakpannen vervangen",
    eenheid: "m2",
    prijsMin: 45,
    prijsMax: 90,
    standaardPrijs: 65,
    btwTarief: 9,
    tags: ["dakpannen", "dak"]
  },
  {
    id: "dak-isolatie",
    categorie: "dakwerk",
    naam: "Dakisolatie",
    omschrijving: "Dak isoleren van binnenuit",
    eenheid: "m2",
    prijsMin: 35,
    prijsMax: 70,
    standaardPrijs: 48,
    btwTarief: 9,
    tags: ["isolatie", "dak"]
  },
  {
    id: "dak-goot",
    categorie: "dakwerk",
    naam: "Dakgoot vervangen",
    omschrijving: "Dakgoot vervangen inclusief beugels",
    eenheid: "m",
    prijsMin: 45,
    prijsMax: 95,
    standaardPrijs: 65,
    btwTarief: 9,
    tags: ["goot", "dakgoot", "dak"]
  },
  {
    id: "dak-bitumen",
    categorie: "dakwerk",
    naam: "Bitumen dakbedekking",
    omschrijving: "Bitumen dakbedekking aanbrengen",
    eenheid: "m2",
    prijsMin: 40,
    prijsMax: 80,
    standaardPrijs: 55,
    btwTarief: 9,
    tags: ["bitumen", "plat dak", "dakbedekking"]
  },

  // TIMMERWERK
  {
    id: "timmer-deur",
    categorie: "timmerwerk",
    naam: "Binnendeur plaatsen",
    omschrijving: "Binnendeur afhangen inclusief beslag",
    eenheid: "stuk",
    prijsMin: 120,
    prijsMax: 250,
    standaardPrijs: 175,
    btwTarief: 9,
    tags: ["deur", "binnendeur", "timmerwerk"]
  },
  {
    id: "timmer-kozijn",
    categorie: "timmerwerk",
    naam: "Kozijn plaatsen",
    omschrijving: "Nieuw kozijn plaatsen",
    eenheid: "stuk",
    prijsMin: 250,
    prijsMax: 600,
    standaardPrijs: 400,
    btwTarief: 9,
    tags: ["kozijn", "raam", "timmerwerk"]
  },
  {
    id: "timmer-plint",
    categorie: "timmerwerk",
    naam: "Plinten plaatsen",
    omschrijving: "Plinten monteren",
    eenheid: "m",
    prijsMin: 8,
    prijsMax: 18,
    standaardPrijs: 12,
    btwTarief: 9,
    tags: ["plint", "afwerking", "timmerwerk"]
  },
  {
    id: "timmer-trap",
    categorie: "timmerwerk",
    naam: "Trap renoveren",
    omschrijving: "Bestaande trap opknappen/bekleden",
    eenheid: "forfait",
    prijsMin: 800,
    prijsMax: 2500,
    standaardPrijs: 1500,
    btwTarief: 9,
    tags: ["trap", "renovatie", "timmerwerk"]
  },

  // STUCWERK
  {
    id: "stuc-wand",
    categorie: "stucwerk",
    naam: "Wanden stucen",
    omschrijving: "Wanden glad stucen",
    eenheid: "m2",
    prijsMin: 18,
    prijsMax: 35,
    standaardPrijs: 24,
    btwTarief: 9,
    tags: ["stucen", "wand", "glad"]
  },
  {
    id: "stuc-plafond",
    categorie: "stucwerk",
    naam: "Plafond stucen",
    omschrijving: "Plafond glad stucen",
    eenheid: "m2",
    prijsMin: 22,
    prijsMax: 40,
    standaardPrijs: 28,
    btwTarief: 9,
    tags: ["stucen", "plafond", "glad"]
  },
  {
    id: "stuc-sierpleister",
    categorie: "stucwerk",
    naam: "Sierpleister",
    omschrijving: "Sierpleister/spachtelputz aanbrengen",
    eenheid: "m2",
    prijsMin: 25,
    prijsMax: 50,
    standaardPrijs: 35,
    btwTarief: 9,
    tags: ["sierpleister", "decoratief", "stucwerk"]
  },

  // ISOLATIE
  {
    id: "iso-spouw",
    categorie: "isolatie",
    naam: "Spouwmuurisolatie",
    omschrijving: "Spouwmuur isoleren",
    eenheid: "m2",
    prijsMin: 20,
    prijsMax: 40,
    standaardPrijs: 28,
    btwTarief: 9,
    tags: ["spouwmuur", "isolatie", "muur"]
  },
  {
    id: "iso-vloer",
    categorie: "isolatie",
    naam: "Vloerisolatie",
    omschrijving: "Vloer isoleren (kruipruimte)",
    eenheid: "m2",
    prijsMin: 25,
    prijsMax: 50,
    standaardPrijs: 35,
    btwTarief: 9,
    tags: ["vloer", "isolatie", "kruipruimte"]
  },
  {
    id: "iso-hr-glas",
    categorie: "isolatie",
    naam: "HR++ glas plaatsen",
    omschrijving: "HR++ glas in bestaand kozijn",
    eenheid: "m2",
    prijsMin: 120,
    prijsMax: 220,
    standaardPrijs: 160,
    btwTarief: 9,
    tags: ["glas", "hr++", "raam", "isolatie"]
  },

  // TUIN & BESTRATING
  {
    id: "tuin-tegels",
    categorie: "tuin",
    naam: "Terrastegels leggen",
    omschrijving: "Terrastegels leggen op zandbed",
    eenheid: "m2",
    prijsMin: 30,
    prijsMax: 60,
    standaardPrijs: 42,
    btwTarief: 21,
    tags: ["tegels", "terras", "tuin"]
  },
  {
    id: "tuin-klinkers",
    categorie: "tuin",
    naam: "Klinkers leggen",
    omschrijving: "Klinkers/sierbestrating leggen",
    eenheid: "m2",
    prijsMin: 35,
    prijsMax: 70,
    standaardPrijs: 48,
    btwTarief: 21,
    tags: ["klinkers", "bestrating", "oprit"]
  },
  {
    id: "tuin-schutting",
    categorie: "tuin",
    naam: "Schutting plaatsen",
    omschrijving: "Schutting plaatsen inclusief palen",
    eenheid: "m",
    prijsMin: 60,
    prijsMax: 140,
    standaardPrijs: 95,
    btwTarief: 21,
    tags: ["schutting", "hek", "tuin"]
  },

  // OVERIG
  {
    id: "overig-uurloon",
    categorie: "overig",
    naam: "Uurloon vakman",
    omschrijving: "Algemeen uurloon",
    eenheid: "uur",
    prijsMin: 45,
    prijsMax: 75,
    standaardPrijs: 55,
    btwTarief: 21,
    tags: ["uurloon", "arbeid"]
  },
  {
    id: "overig-voorrijkosten",
    categorie: "overig",
    naam: "Voorrijkosten",
    omschrijving: "Voorrijkosten per bezoek",
    eenheid: "stuk",
    prijsMin: 25,
    prijsMax: 75,
    standaardPrijs: 45,
    btwTarief: 21,
    tags: ["voorrijkosten", "transport"]
  },
  {
    id: "overig-afvoer",
    categorie: "overig",
    naam: "Afvoer bouwafval",
    omschrijving: "Afvoeren bouwafval container",
    eenheid: "forfait",
    prijsMin: 200,
    prijsMax: 500,
    standaardPrijs: 300,
    btwTarief: 21,
    tags: ["afvoer", "container", "afval"]
  },
]

// Helper functies
export function getWerkzaamhedenByCategorie(categorieId: string): Werkzaamheid[] {
  return werkzaamheden.filter(w => w.categorie === categorieId)
}

export function zoekWerkzaamheden(query: string): Werkzaamheid[] {
  const lowerQuery = query.toLowerCase()
  return werkzaamheden.filter(w => 
    w.naam.toLowerCase().includes(lowerQuery) ||
    w.omschrijving.toLowerCase().includes(lowerQuery) ||
    w.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getEenheidLabel(eenheid: Werkzaamheid["eenheid"]): string {
  const labels: Record<Werkzaamheid["eenheid"], string> = {
    stuk: "per stuk",
    m2: "per m²",
    m: "per m",
    uur: "per uur",
    dag: "per dag",
    forfait: "forfait"
  }
  return labels[eenheid]
}
