# App Store Badges

## Download Officiële Badges:

### **Apple App Store:**
Download van: https://developer.apple.com/app-store/marketing/guidelines/#downloadable-materials

**Nederlandse badge:**
- Bestandsnaam: `app-store-badge-nl.svg`
- Plaats in: `public/badges/`

### **Google Play Store:**
Download van: https://play.google.com/intl/en_us/badges/

**Nederlandse badge:**
- Bestandsnaam: `google-play-badge-nl.png`
- Plaats in: `public/badges/`

## Richtlijnen:

### **Apple:**
- Gebruik altijd officiële badges
- Niet aanpassen (kleur, vorm, tekst)
- Minimale grootte: 40px hoog
- Ruimte rondom badge: minimaal 10px

### **Google:**
- Gebruik altijd officiële badges
- Niet aanpassen
- Minimale grootte: 40px hoog
- Ruimte rondom badge: minimaal 10px

## Gebruik in Code:

```tsx
import { AppStoreBadges } from '@/components/app-store-badges'

// Beide badges
<AppStoreBadges />

// Alleen App Store
<AppStoreBadge />

// Alleen Google Play
<GooglePlayBadge />
```