# Apple App Store Setup Guide

## Stap 1: Apple Developer Account

### Account Aanmaken
- **Kosten**: $99 per jaar
- **Tijd**: 1-2 dagen voor goedkeuring
- **Vereisten**: Apple ID, creditcard, verificatie

**Stappen:**
1. Ga naar [Apple Developer](https://developer.apple.com/programs/enroll/)
2. Klik "Start Your Enrollment"
3. Log in met je Apple ID
4. Kies account type:
   - **Individual**: Voor persoonlijk gebruik
   - **Organization**: Voor bedrijven (vereist D-U-N-S nummer)
5. Vul gegevens in
6. Betaal $99 via creditcard
7. Wacht op goedkeuring (1-2 dagen)

---

## Stap 2: App ID en Certificates

### 2.1 App ID Aanmaken

1. Ga naar [Apple Developer Portal](https://developer.apple.com/account)
2. Klik "Certificates, IDs & Profiles"
3. Klik "Identifiers" > "+"
4. Selecteer "App IDs" > "Continue"
5. Vul in:
   - **Description**: ARCHON.AI
   - **Bundle ID**: `com.archonpro.app` (Explicit)
   - **Capabilities**: 
     - Sign in with Apple ✓
     - Push Notifications ✓
6. Klik "Continue" > "Register"

### 2.2 Distribution Certificate

1. Open "Keychain Access" op je Mac
2. Menu: Keychain Access > Certificate Assistant > Request a Certificate from a Certificate Authority
3. Vul in:
   - Email address: je email
   - Common Name: ARCHON.AI
   - Request is: "Saved to disk"
4. Save als `CertificateSigningRequest.certSigningRequest`

5. Ga terug naar Developer Portal
6. Klik "Certificates" > "+"
7. Selecteer "Apple Distribution" > "Continue"
8. Upload CSR bestand
9. Download certificate
10. Dubbelklik om te installeren in Keychain

### 2.3 Provisioning Profile

1. Developer Portal > "Profiles" > "+"
2. Selecteer "App Store" > "Continue"
3. Selecteer App ID: `com.archonpro.app`
4. Selecteer je Distribution Certificate
5. Name: "ARCHON.AI App Store"
6. Download en dubbelklik om te installeren

---

## Stap 3: Xcode Configuratie

### 3.1 Open Project

```bash
# Open iOS project in Xcode
npx cap open ios
```

### 3.2 Signing & Capabilities

1. Selecteer "App" in project navigator
2. Ga naar "Signing & Capabilities" tab
3. Vul in:
   - **Team**: Selecteer je developer team
   - **Bundle Identifier**: `com.archonpro.app`
   - **Signing Certificate**: Apple Distribution
   - **Provisioning Profile**: ARCHON.AI App Store

4. Voeg capabilities toe:
   - Sign in with Apple
   - Push Notifications

### 3.3 Build Settings

1. Selecteer "App" target
2. Ga naar "Build Settings"
3. Zoek "Code Signing Identity"
4. Set "Release" naar "Apple Distribution"

### 3.4 Info.plist

Open `ios/App/App/Info.plist` en voeg toe:

```xml
<key>CFBundleDisplayName</key>
<string>ARCHON.AI</string>

<key>CFBundleShortVersionString</key>
<string>1.0.0</string>

<key>CFBundleVersion</key>
<string>1</string>

<key>NSCameraUsageDescription</key>
<string>ARCHON.AI heeft toegang tot je camera nodig om bonnen en documenten te scannen.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>ARCHON.AI heeft toegang tot je foto's nodig om afbeeldingen toe te voegen aan projecten.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>ARCHON.AI gebruikt je locatie om projecten te koppelen aan adressen.</string>
```

---

## Stap 4: App Store Connect

### 4.1 Nieuwe App Aanmaken

1. Ga naar [App Store Connect](https://appstoreconnect.apple.com)
2. Klik "My Apps" > "+"
3. Selecteer "New App"
4. Vul in:
   - **Platform**: iOS
   - **Name**: ARCHON.AI
   - **Primary Language**: Dutch
   - **Bundle ID**: com.archonpro.app
   - **SKU**: archonai-ios-001
   - **User Access**: Full Access
5. Klik "Create"

### 4.2 App Information

Ga naar "App Information":

1. **Name**: ARCHON.AI
2. **Subtitle** (30 tekens):
   ```
   AI Bouwsoftware voor Offertes
   ```

3. **Category**:
   - Primary: Business
   - Secondary: Productivity

4. **Content Rights**: Kies "No, it does not contain..."

5. **Age Rating**: Klik "Edit" en beantwoord vragen (meestal allemaal "No")

6. **Privacy Policy URL**: 
   ```
   https://www.archonpro.com/privacy
   ```

### 4.3 Pricing and Availability

1. **Price**: Free
2. **Availability**: All countries
3. Klik "Save"

---

## Stap 5: App Metadata

### 5.1 Version Information

Ga naar "1.0 Prepare for Submission":

1. **Screenshots** (verplicht):
   
   **iPhone 6.7" Display** (1290x2796):
   - Minimaal 3, maximaal 10 screenshots
   - Dashboard, Offertes, Projecten, Facturen, etc.

   **iPhone 6.5" Display** (1242x2688):
   - Zelfde screenshots als 6.7"

   **iPad Pro 12.9" Display** (2048x2732) - optioneel:
   - Tablet versie screenshots

2. **Promotional Text** (170 tekens) - optioneel:
   ```
   🎉 Nieuw: AI-gegenereerde offertes in 2 minuten! Probeer nu gratis voor 14 dagen.
   ```

3. **Description** (4000 tekens):
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
   • AI-gegenereerde offertes in 2 minuten
   • Automatische materiaalberekening
   • Risico-analyse en prijsoptimalisatie
   • Professionele PDF's met je logo
   
   💼 Projectbeheer
   • Overzicht van alle projecten
   • Tijdregistratie en voortgang
   • Materiaallijsten en werkzaamheden
   • Foto's en documenten
   
   💰 Financieel
   • Facturen maken en versturen
   • Uitgaven bijhouden
   • Bonnen scannen met AI
   • Financiële inzichten en rapportages
   
   👥 Klantenbeheer
   • Alle klantgegevens op één plek
   • Communicatiegeschiedenis
   • Projecthistorie per klant
   
   📅 Planning
   • Agenda met afspraken
   • Herinneringen en notificaties
   • Synchronisatie met je kalender
   
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

4. **Keywords** (100 tekens):
   ```
   bouw,offerte,aannemer,zzp,factuur,calculatie,AI,bouwsoftware,renovatie
   ```

5. **Support URL**:
   ```
   https://www.archonpro.com/support
   ```

6. **Marketing URL** - optioneel:
   ```
   https://www.archonpro.com
   ```

7. **What's New in This Version**:
   ```
   🎉 Eerste release van ARCHON.AI!
   
   ✨ Nieuwe functies:
   • AI-gegenereerde offertes in 2 minuten
   • Automatische risico-detectie
   • Projectbeheer en planning
   • Facturen en uitgaven
   • Klantenbeheer
   • Financiële inzichten
   • Mobiele interface
   
   Download nu en maak je eerste offerte!
   ```

### 5.2 App Privacy

Klik "Edit" bij "App Privacy":

1. **Data Collection**:
   - Contact Info: Name, Email
   - User Content: Photos, Documents
   - Identifiers: User ID
   - Financial Info: Purchase History

2. **Data Usage**:
   - App Functionality
   - Analytics
   - Product Personalization

3. **Data Linked to User**: Yes
4. **Tracking**: No

Klik "Save"

### 5.3 App Review Information

1. **Sign-in required**: Yes
2. **Demo Account**:
   - Username: `demo@archonpro.com`
   - Password: `Demo123!`
   - Notes: "Demo account met voorbeelddata"

3. **Contact Information**:
   - First Name: [Jouw naam]
   - Last Name: [Jouw achternaam]
   - Phone: [Jouw telefoonnummer]
   - Email: support@archonpro.com

4. **Notes** - optioneel:
   ```
   ARCHON.AI is een SaaS platform voor bouwprofessionals.
   Gebruikers kunnen zich registreren via Google of Apple Sign-In.
   De app gebruikt Gemini AI voor het genereren van offertes.
   ```

---

## Stap 6: Build en Upload

### 6.1 Archive Maken

1. In Xcode, selecteer "Any iOS Device (arm64)" als destination
2. Menu: Product > Archive
3. Wacht tot archive compleet is
4. Xcode Organizer opent automatisch

### 6.2 Upload naar App Store

1. In Organizer, selecteer je archive
2. Klik "Distribute App"
3. Selecteer "App Store Connect" > "Next"
4. Selecteer "Upload" > "Next"
5. Selecteer distribution options:
   - ✓ Include bitcode for iOS content
   - ✓ Upload your app's symbols
   - ✓ Manage Version and Build Number
6. Klik "Next"
7. Selecteer "Automatically manage signing" > "Next"
8. Review en klik "Upload"

### 6.3 Wacht op Processing

1. Ga naar App Store Connect
2. Ga naar je app > "Activity"
3. Wacht tot build status "Ready to Submit" is (5-30 minuten)

### 6.4 Selecteer Build

1. Ga naar "1.0 Prepare for Submission"
2. Scroll naar "Build"
3. Klik "+" en selecteer je build
4. Klik "Done"

---

## Stap 7: Submit voor Review

### 7.1 Final Check

Controleer of alles ingevuld is:
- [ ] Screenshots (minimaal 3)
- [ ] Description
- [ ] Keywords
- [ ] Support URL
- [ ] Privacy Policy URL
- [ ] App Privacy ingevuld
- [ ] Build geselecteerd
- [ ] App Review Information ingevuld

### 7.2 Submit

1. Klik "Add for Review" (rechtsboven)
2. Beantwoord vragen:
   - **Export Compliance**: No (tenzij je encryptie gebruikt)
   - **Content Rights**: Kies "No"
   - **Advertising Identifier**: No
3. Klik "Submit for Review"

### 7.3 Review Process

- **In Review**: 1-7 dagen
- **Processing**: Automatisch na goedkeuring
- **Ready for Sale**: App is live!

Je ontvangt emails bij statuswijzigingen.

---

## Stap 8: Na Publicatie

### App URL
Je app is beschikbaar op:
```
https://apps.apple.com/app/archon-ai/id[APP_ID]
```

### Updates Uitbrengen

1. Verhoog version in Xcode:
   - **Version**: 1.0.1
   - **Build**: 2

2. Build en upload nieuwe versie:
   ```bash
   npm run build
   npx cap sync ios
   npx cap open ios
   # Product > Archive > Upload
   ```

3. In App Store Connect:
   - Klik "+" bij "iOS App"
   - Vul "What's New" in
   - Selecteer nieuwe build
   - Submit for Review

### TestFlight (Beta Testing)

1. Ga naar "TestFlight" tab
2. Klik "+" bij "Internal Testing"
3. Voeg testers toe via email
4. Testers ontvangen uitnodiging
5. Download TestFlight app
6. Test je app voor publicatie

---

## Veelvoorkomende Problemen

### "No signing certificate found"
- Maak Distribution Certificate aan in Developer Portal
- Download en installeer in Keychain

### "Provisioning profile doesn't match"
- Controleer Bundle ID in Xcode
- Download nieuwe provisioning profile

### "Missing compliance"
- Beantwoord Export Compliance vraag bij submit

### "Missing required icon"
- Voeg app icon toe in Assets.xcassets
- Gebruik 1024x1024 PNG zonder alpha channel

### "Invalid binary"
- Controleer of je "Any iOS Device" hebt geselecteerd
- Niet "Simulator" gebruiken voor archive

---

## Checklist voor Publicatie

- [ ] Apple Developer account ($99/jaar)
- [ ] App ID aangemaakt
- [ ] Distribution Certificate aangemaakt
- [ ] Provisioning Profile aangemaakt
- [ ] Xcode signing geconfigureerd
- [ ] App icon (1024x1024) toegevoegd
- [ ] Screenshots gemaakt (minimaal 3)
- [ ] Privacy policy pagina online
- [ ] App metadata ingevuld
- [ ] App privacy ingevuld
- [ ] Demo account aangemaakt
- [ ] Build geüpload naar App Store Connect
- [ ] Build geselecteerd in versie
- [ ] App ingediend voor review

---

## Screenshot Sizes

### iPhone
- **6.7" Display**: 1290x2796 (iPhone 14 Pro Max, 15 Pro Max)
- **6.5" Display**: 1242x2688 (iPhone 11 Pro Max, XS Max)
- **5.5" Display**: 1242x2208 (iPhone 8 Plus) - optioneel

### iPad
- **12.9" Display**: 2048x2732 (iPad Pro 12.9")
- **11" Display**: 1668x2388 (iPad Pro 11") - optioneel

**Tip**: Maak screenshots op grootste formaat, Apple schaalt automatisch.

---

## Nuttige Links

- [App Store Connect](https://appstoreconnect.apple.com)
- [Apple Developer Portal](https://developer.apple.com/account)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [TestFlight](https://developer.apple.com/testflight/)

---

## Support

Vragen? Mail naar: support@archonpro.com
