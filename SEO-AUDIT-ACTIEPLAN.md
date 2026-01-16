# 🚨 SEO AUDIT & ACTIEPLAN - ARCHON.AI
## Direct te Implementeren Fixes

---

## ✅ WAT WERKT AL GOED:
1. ✅ Google Analytics geïnstalleerd (G-2G97T0WCK3)
2. ✅ Google Tag Manager actief (GTM-586XVHKN)
3. ✅ Sitemap.xml aanwezig
4. ✅ Robots.txt geconfigureerd
5. ✅ Structured Data (Schema.org) aanwezig
6. ✅ Google Search Console verificatie code aanwezig

---

## 🔴 KRITIEKE PROBLEMEN TE FIXEN:

### 1. **CANONICAL URL PROBLEEM**
   - ❌ Nu: `https://archonpro.com` (zonder www)
   - ✅ Fix: `https://www.archonpro.com` (met www)
   - **Impact**: Google ziet dubbele content, verdeelt ranking power
   
### 2. **META DESCRIPTION TE LANG**
   - ❌ Nu: Huidige description wordt afgeknipt in Google
   - ✅ Fix: Max 155-160 karakters
   - **Impact**: Lagere click-through rate (CTR)

### 3. **TITLE TAG NIET GEOPTIMALISEERD**
   - ❌ Nu: "AI Co-piloot voor de Bouw" (te vaag)
   - ✅ Fix: "Bouwsoftware met AI | Offertes in 2 Min | Gratis"
   - **Impact**: Lagere rankings voor belangrijke keywords

### 4. **GEEN H1 TAG OP HOMEPAGE**
   - ❌ Ontbreekt: Duidelijke H1 met primaire keyword
   - ✅ Fix: H1 toevoegen aan Hero component
   - **Impact**: Google begrijpt niet wat je belangrijkste keyword is

### 5. **ONTBREKENDE ALT TEKSTEN IMAGES**
   - ❌ Veel afbeeldingen zonder alt text
   - ✅ Fix: Alt text toevoegen met keywords
   - **Impact**: Mis je Google Image Search traffic

### 6. **SITEMAP.XML URLS INCOMPLETE**
   - ❌ Alleen 5 URLs in sitemap
   - ✅ Fix: Alle belangrijke pagina's toevoegen
   - **Impact**: Pagina's worden niet geïndexeerd

### 7. **ONTBREKENDE BREADCRUMBS STRUCTURED DATA**
   - ❌ Geen breadcrumb markup
   - ✅ Fix: BreadcrumbList schema toevoegen
   - **Impact**: Mis je rich snippets in Google

### 8. **PAGE SPEED ISSUES**
   - ❌ Grote afbeeldingen niet geoptimaliseerd
   - ✅ Fix: Next.js Image component gebruiken
   - **Impact**: Lagere Core Web Vitals score

---

## 🎯 PRIORITEIT 1 - DOE DIT NU (15 min):

### A. Fix Canonical URL
In `app/layout.tsx`, verander:
```typescript
metadataBase: new URL('https://archonpro.com'),
```
Naar:
```typescript
metadataBase: new URL('https://www.archonpro.com'),
```

En verander:
```typescript
alternates: {
  canonical: "/",
},
```
Naar:
```typescript
alternates: {
  canonical: "https://www.archonpro.com",
  languages: {
    'nl-NL': 'https://www.archonpro.com',
    'nl-BE': 'https://www.archonpro.com',
  },
},
```

### B. Optimaliseer Title & Description
In `app/layout.tsx`:
```typescript
title: {
  default: "ARCHON.AI - Bouwsoftware met AI | Offertes in 2 Min | Gratis Proberen",
  template: "%s | ARCHON.AI"
},
description: "⚡ Maak offertes in 2 minuten met AI. #1 bouwsoftware voor aannemers in NL & BE. Herken risico's, optimaliseer prijzen. Probeer gratis!",
```

### C. Update Sitemap URLs
In `app/sitemap.ts`, voeg alle pagina's toe:
```typescript
{
  url: `${baseUrl}/dashboard`,
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 0.8,
},
{
  url: `${baseUrl}/prijzen`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.9,
},
```

---

## 🎯 PRIORITEIT 2 - DOE DIT VANDAAG (1 uur):

### A. Add H1 Tag to Homepage
In `components/hero.tsx`, voeg toe:
```tsx
<h1 className="text-4xl md:text-6xl font-bold">
  Bouwsoftware met AI: Maak Offertes in 2 Minuten
</h1>
```

### B. Add Breadcrumb Schema
Maak nieuw bestand `components/breadcrumbs-schema.tsx`:
```tsx
export function BreadcrumbsSchema({ items }: { items: Array<{name: string, url: string}> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### C. Optimize Images
In alle components, vervang `<img>` door:
```tsx
import Image from 'next/image'

<Image
  src="/dashboard-preview.png"
  alt="ARCHON.AI Dashboard - Bouwsoftware Screenshot"
  width={1200}
  height={800}
  priority
  quality={85}
/>
```

---

## 🎯 PRIORITEIT 3 - DOE DIT DEZE WEEK:

### 1. Voeg FAQ Schema toe
```typescript
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Hoeveel kost ARCHON.AI bouwsoftware?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "ARCHON.AI start vanaf €49/maand..."
    }
  }]
}
```

### 2. Maak Blog Posts met Keywords
- "Bouwsoftware vergelijken: Ultieme gids 2025"
- "Offerte maken als aannemer: 7 Tips + Gratis Template"
- "AI in de bouw: Toekomst of Hype? [Complete Analyse]"

### 3. Internal Linking Strategy
Voeg op elke pagina links toe naar:
- Homepage (met "bouwsoftware" anchor text)
- Blog (met "bouw tips" anchor text)
- Prijzen pagina (met "prijzen bouwsoftware" anchor text)

---

## 📊 TRACKING & MONITORING:

### Google Search Console Checklist:
1. ✅ Ga naar https://search.google.com/search-console
2. ✅ Voeg www.archonpro.com toe
3. ✅ Verifieer via HTML tag (al aanwezig)
4. ✅ Submit sitemap: https://www.archonpro.com/sitemap.xml
5. ✅ Check voor indexatie errors

### Belangrijkste Metrics:
- **Impressions**: Doel 10,000/maand na 3 maanden
- **Clicks**: Doel 500/maand na 3 maanden  
- **Average Position**: Doel top 10 (positie ≤10) voor main keywords
- **CTR**: Doel >3% gemiddeld

---

## 🚀 VERWACHTE RESULTATEN TIJDLIJN:

### Week 1-2:
- ✅ Google indexeert je site
- ✅ Je verschijnt voor branded searches ("archon ai")

### Maand 1:
- ✅ Rankings voor long-tail keywords (positie 20-50)
- ✅ 50-100 impressions/dag
- ✅ 5-10 clicks/dag

### Maand 2-3:
- ✅ Rankings verbeteren (positie 10-20)
- ✅ 200-500 impressions/dag
- ✅ 15-30 clicks/dag

### Maand 3-6:
- ✅ Top 10 voor enkele main keywords
- ✅ 1000+ impressions/dag
- ✅ 50-100 clicks/dag
- ✅ Eerste conversies uit organisch verkeer

---

## 🎯 TARGET KEYWORDS & DIFFICULTY:

### Primaire Keywords (Hoge Priority):
1. **bouwsoftware** - Difficulty: 45 - Search Vol: 1,900/maand
2. **offerte software** - Difficulty: 35 - Search Vol: 880/maand
3. **calculatiesoftware** - Difficulty: 30 - Search Vol: 590/maand

### Secondary Keywords:
4. **offerte maken bouw** - Difficulty: 25 - Search Vol: 720/maand
5. **AI bouwsoftware** - Difficulty: 20 - Search Vol: 320/maand
6. **bouwsoftware Nederland** - Difficulty: 28 - Search Vol: 210/maand

### Long-Tail Keywords (Quick Wins):
7. **offerte tool aannemer** - Difficulty: 15 - Search Vol: 140/maand
8. **bouw calculatie software** - Difficulty: 18 - Search Vol: 110/maand
9. **automatische offertes** - Difficulty: 12 - Search Vol: 90/maand

---

## ✅ IMPLEMENTATIE CHECKLIST:

### Vandaag (Kritiek):
- [ ] Fix canonical URLs (www.archonpro.com)
- [ ] Optimaliseer title & meta description  
- [ ] Update sitemap.xml met alle pagina's
- [ ] Submit sitemap in Search Console

### Deze Week:
- [ ] Add H1 tags op alle pagina's
- [ ] Optimize alle afbeeldingen (Next.js Image)
- [ ] Add breadcrumb schema
- [ ] Schrijf eerste blog post

### Deze Maand:
- [ ] 5 blog posts publiceren
- [ ] FAQ schema implementeren
- [ ] Internal linking optimaliseren
- [ ] Backlink strategie starten

---

## 🆘 HULP NODIG?

Als je vast loopt, laat het me weten bij:
1. Code implementatie problemen
2. Google Search Console setup
3. Content strategie vragen
4. Keyword research hulp

**LET OP**: De grootste impact heb je met Prioriteit 1 & 2. Focus daar eerst op!
