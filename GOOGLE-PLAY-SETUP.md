# Google Play Console Setup Guide

## Stap 1: Developer Account Aanmaken

### Optie A: Persoonlijk Account (Aanbevolen) ✅
- **Kosten**: €25 eenmalige betaling
- **Tijd**: Direct beschikbaar
- **Vereisten**: Geen D-U-N-S nummer nodig

**Stappen:**
1. Ga naar [Google Play Console](https://play.google.com/console)
2. Klik op "Create account"
3. Kies **"Individual"** (niet Organization)
4. Vul je persoonlijke gegevens in
5. Betaal €25 via creditcard
6. Account is direct actief

### Optie B: Organisatie Account
- **Kosten**: €25 eenmalige betaling
- **Tijd**: 1-2 weken (wachten op D-U-N-S nummer)
- **Vereisten**: D-U-N-S nummer van Dun & Bradstreet

**D-U-N-S nummer aanvragen:**
1. Ga naar https://www.dnb.com/duns-number.html
2. Vul bedrijfsgegevens in
3. Wacht 1-2 weken op nummer
4. Gebruik nummer in Google Play Console

---

## Stap 2: App Signing Key Genereren

Na het aanmaken van je account moet je een signing key maken:

```bash
# Navigeer naar keystore folder
cd keystore

# Genereer signing key (vervang [JOUW_NAAM] met je naam)
keytool -genkey -v -keystore archon-release-key.keystore \
  -alias archon-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Je wordt gevraagd om:
# - Keystore password (bewaar dit goed!)
# - Key password (bewaar dit goed!)
# - Naam, organisatie, locatie
```

**BELANGRIJK**: Bewaar deze gegevens veilig:
- `archon-release-key.keystore` bestand
- Keystore password
- Key alias: `archon-key`
- Key password

---

## Stap 3: Android App Bouwen

### 3.1 Build configureren

Maak bestand `android/key.properties`:

```properties
storePassword=[JOUW_KEYSTORE_PASSWORD]
keyPassword=[JOUW_KEY_PASSWORD]
keyAlias=archon-key
storeFile=../keystore/archon-release-key.keystore
```

### 3.2 Build.gradle aanpassen

Open `android/app/build.gradle` en voeg toe:

```gradle
// Bovenaan, voor android {}
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
    
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3.3 App Bundle Bouwen

```bash
# Build Next.js app
npm run build

# Sync met Capacitor
npx cap sync android

# Open Android Studio
npx cap open android

# In Android Studio:
# 1. Build > Generate Signed Bundle / APK
# 2. Kies "Android App Bundle"
# 3. Selecteer keystore file
# 4. Vul passwords in
# 5. Kies "release" build variant
# 6. Klik "Finish"

# Of via command line:
cd android
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

---

## Stap 4: App Informatie Voorbereiden

### App Details
- **App naam**: ARCHON.AI
- **Korte beschrijving** (80 tekens max):
  ```
  AI-bouwsoftware: Maak offertes in 2 minuten, herken risico's automatisch
  ```

- **Volledige beschrijving** (4000 tekens max):
  ```
  ARCHON.AI - De slimste bouwsoftware voor aannemers en ZZP'ers
  
  🚀 Maak professionele offertes in 2 minuten
  🤖 AI herkent automatisch risico's en prijsfouten
  💰 Optimaliseer je prijzen voor maximale winst
  📊 Beheer projecten, facturen en klanten op één plek
  
  WAAROM ARCHON.AI?
  
  ✓ Tijdsbesparing: Van 2 uur naar 2 minuten per offerte
  ✓ Hogere winstkansen: AI optimaliseert je prijzen
  ✓ Minder fouten: Automatische risico-detectie
  ✓ Professioneel: Mooie PDF's met je eigen branding
  ✓ Mobiel: Werk overal, ook op de bouwplaats
  
  FUNCTIES:
  
  📝 Slimme Offertes
  - AI-gegenereerde offertes in 2 minuten
  - Automatische materiaalberekening
  - Risico-analyse en prijsoptimalisatie
  - Professionele PDF's met je logo
  
  💼 Projectbeheer
  - Overzicht van alle projecten
  - Tijdregistratie en voortgang
  - Materiaallijsten en werkzaamheden
  - Foto's en documenten
  
  💰 Financieel
  - Facturen maken en versturen
  - Uitgaven bijhouden
  - Bonnen scannen met AI
  - Financiële inzichten en rapportages
  
  👥 Klantenbeheer
  - Alle klantgegevens op één plek
  - Communicatiegeschiedenis
  - Projecthistorie per klant
  
  📅 Planning
  - Agenda met afspraken
  - Herinneringen en notificaties
  - Synchronisatie met je kalender
  
  VOOR WIE?
  
  ✓ ZZP'ers in de bouw
  ✓ Kleine aannemersbedrijven
  ✓ Verbouwers en renovatiebedrijven
  ✓ Installateurs en specialisten
  ✓ Bouwbedrijven tot 50 medewerkers
  
  PRIJZEN:
  
  • Starter: Gratis 14 dagen proberen
  • Professional: €49/maand - Voor ZZP'ers
  • Pro: €99/maand - Voor kleine bedrijven
  • Enterprise: Op maat - Voor grotere bedrijven
  
  VEILIGHEID & PRIVACY:
  
  ✓ Nederlandse servers (GDPR compliant)
  ✓ Automatische backups
  ✓ SSL encryptie
  ✓ Jouw data blijft van jou
  
  Download nu en maak je eerste offerte in 2 minuten!
  
  Support: support@archonpro.com
  Website: www.archonpro.com
  ```

### Screenshots Nodig (minimaal 2, max 8)
- 1242x2688 pixels (iPhone 13 Pro Max)
- 1080x1920 pixels (Android)

**Aanbevolen screenshots:**
1. Dashboard overzicht
2. Offerte maken met AI
3. Projectenlijst
4. Factuur maken
5. Klantenbeheer
6. Financiële inzichten
7. Mobiele interface
8. AI assistent

### Feature Graphic
- 1024x500 pixels
- Gebruikt in Play Store header

### App Icon
- 512x512 pixels
- Transparante achtergrond (PNG)

### Privacy Policy URL
- Verplicht voor alle apps
- Moet publiek toegankelijk zijn
- Voeg toe: `https://www.archonpro.com/privacy`

---

## Stap 5: App Uploaden naar Play Console

### 5.1 Nieuwe App Aanmaken

1. Log in op [Google Play Console](https://play.google.com/console)
2. Klik "Create app"
3. Vul in:
   - **App naam**: ARCHON.AI
   - **Default language**: Dutch (Nederlands)
   - **App or game**: App
   - **Free or paid**: Free
4. Accepteer policies
5. Klik "Create app"

### 5.2 Store Listing Invullen

Ga naar "Store presence" > "Main store listing":

1. **App details**:
   - App naam: ARCHON.AI
   - Korte beschrijving: (zie boven)
   - Volledige beschrijving: (zie boven)

2. **Graphics**:
   - Upload app icon (512x512)
   - Upload feature graphic (1024x500)
   - Upload minimaal 2 screenshots

3. **Categorization**:
   - App category: Business
   - Tags: construction, invoicing, quotes, AI

4. **Contact details**:
   - Email: support@archonpro.com
   - Website: https://www.archonpro.com
   - Phone: (optioneel)

5. **Privacy Policy**:
   - URL: https://www.archonpro.com/privacy

### 5.3 App Content Invullen

1. **Privacy policy**: https://www.archonpro.com/privacy

2. **App access**: 
   - Kies "All functionality is available without restrictions"
   - Of: "Some functionality is restricted" (als login vereist is)

3. **Ads**:
   - Kies "No, my app does not contain ads"

4. **Content ratings**:
   - Klik "Start questionnaire"
   - Selecteer "Utility, Productivity, Communication, or Other"
   - Beantwoord vragen (meestal allemaal "No")
   - Submit voor rating

5. **Target audience**:
   - Age: 18+
   - Klik "Next"

6. **News apps**: No

7. **COVID-19 contact tracing**: No

8. **Data safety**:
   - Klik "Start"
   - Vul in welke data je verzamelt:
     - Name, Email, User ID
     - Financial info (voor facturen)
   - Leg uit hoe data gebruikt wordt
   - Submit

### 5.4 App Bundle Uploaden

1. Ga naar "Release" > "Production"
2. Klik "Create new release"
3. Upload `app-release.aab` bestand
4. Vul "Release name" in: "1.0.0"
5. Vul "Release notes" in:
   ```
   🎉 Eerste release van ARCHON.AI!
   
   ✨ Nieuwe functies:
   - AI-gegenereerde offertes in 2 minuten
   - Automatische risico-detectie
   - Projectbeheer en planning
   - Facturen en uitgaven
   - Klantenbeheer
   - Financiële inzichten
   - Mobiele interface
   
   Download nu en maak je eerste offerte!
   ```
6. Klik "Save"
7. Klik "Review release"

### 5.5 Review en Publiceren

1. Controleer alle informatie
2. Los eventuele waarschuwingen op
3. Klik "Start rollout to Production"
4. Bevestig

**Review proces:**
- Google controleert je app (1-7 dagen)
- Je ontvangt email bij goedkeuring
- App wordt automatisch gepubliceerd

---

## Stap 6: Na Publicatie

### App URL
Je app is beschikbaar op:
```
https://play.google.com/store/apps/details?id=com.archonpro.app
```

### Updates Uitbrengen

1. Verhoog version in `android/app/build.gradle`:
   ```gradle
   versionCode 2
   versionName "1.0.1"
   ```

2. Build nieuwe AAB:
   ```bash
   npm run build
   npx cap sync android
   cd android && ./gradlew bundleRelease
   ```

3. Upload in Play Console:
   - Ga naar "Release" > "Production"
   - Klik "Create new release"
   - Upload nieuwe AAB
   - Vul release notes in
   - Submit voor review

### Monitoring

- **Crashes**: Play Console > Quality > Crashes
- **ANRs**: Play Console > Quality > ANRs
- **Reviews**: Play Console > Ratings and reviews
- **Statistics**: Play Console > Statistics

---

## Veelvoorkomende Problemen

### "App not signed correctly"
- Controleer of je de juiste keystore gebruikt
- Controleer passwords in `key.properties`

### "Version code must be higher"
- Verhoog `versionCode` in `build.gradle`

### "Missing privacy policy"
- Voeg privacy policy URL toe in Store listing

### "Missing content rating"
- Vul content rating questionnaire in

### "App bundle too large"
- Gebruik App Bundle (AAB) in plaats van APK
- Enable ProGuard voor code minification

---

## Checklist voor Publicatie

- [ ] Google Play Developer account aangemaakt (€25)
- [ ] Signing key gegenereerd en veilig opgeslagen
- [ ] App bundle gebouwd (AAB)
- [ ] App icon (512x512) gemaakt
- [ ] Feature graphic (1024x500) gemaakt
- [ ] Minimaal 2 screenshots gemaakt
- [ ] Privacy policy pagina online
- [ ] Store listing teksten geschreven
- [ ] Content rating ingevuld
- [ ] Data safety ingevuld
- [ ] App bundle geüpload
- [ ] Release notes geschreven
- [ ] App ingediend voor review

---

## Nuttige Links

- [Google Play Console](https://play.google.com/console)
- [Android Developer Docs](https://developer.android.com/distribute/console)
- [App Signing Guide](https://developer.android.com/studio/publish/app-signing)
- [Launch Checklist](https://developer.android.com/distribute/best-practices/launch/launch-checklist)

---

## Support

Vragen? Mail naar: support@archonpro.com
