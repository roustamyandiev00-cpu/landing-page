# Mobiele App & PWA Setup (App Store / Play Store)

De voorbereidingen zijn getroffen om van jouw applicatie een mobiele app te maken die in de App Store en Google Play Store geplaatst kan worden. We gebruiken hiervoor **Capacitor**, de industriestandaard voor het omzetten van moderne webapps naar native apps.

## 1. Status
- **PWA Ready**: De `manifest.json` is bijgewerkt met de juiste iconen (192x192, 512x512) en configuratie.
- **Capacitor Geïnstalleerd**: De benodigde tools (@capacitor/core, cli, ios, android) zijn toegevoegd aan het project.
- **Configuratie**: `capacitor.config.ts` is aangemaakt.

## 2. Hoe nu verder? (Stappenplan naar de Store)

Omdat je applicatie hoogstwaarschijnlijk gebruik maakt van server-side functies (zoals inloggen en het dashboard), is de beste manier om de app te 'wrappen' door te verwijzen naar je live website.

### Stap 1: Configureer de Live URL
Open `capacitor.config.ts` en haal de comments weg bij de `server` sectie:

```typescript
const config: CapacitorConfig = {
  // ...
  server: {
    url: 'https://archonpro.com', // Zorg dat dit jouw live URL is
    androidScheme: 'https',
    cleartext: true
  }
};
```

### Stap 2: Voeg platformen toe
Voer de volgende commando's uit in je terminal om de Android en iOS projecten aan te maken:

```bash
# Voor Android (Google Play)
npx cap add android

# Voor iOS (Apple App Store) - Vereist een Mac
npx cap add ios
```

### Stap 3: Bouw de App
Synchroniseer je web-assets naar de native projecten:

```bash
npm run build
npx cap sync
```

### Stap 4: Open en Publiceer

**Android:**
```bash
npx cap open android
```
Dit opent Android Studio. Vanuit hier kun je de app testen in een emulator en een 'Signed Bundle' genereren om te uploaden naar de Google Play Console.

**iOS:**
```bash
npx cap open ios
```
Dit opent Xcode. Hier kun je de app testen op een simulator of iPhone, en archiveren voor de Apple App Store Connect.

## SEO Updates
Naast de app-voorbereiding is ook je SEO geoptimaliseerd:
- **Sitemap**: `/dashboard` verwijderd (veroorzaakt fouten omdat het privé is), en de Blog toegevoegd.
- **Metadata**: Basis URL geconfigureerd voor betere indexering door Google.
- **Iconen**: Nieuwe iconen gegenereerd voor betere zichtbaarheid op mobiel en in zoekresultaten.
