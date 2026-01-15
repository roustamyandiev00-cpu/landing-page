# 📱 Mobile App Publicatie Gids - ARCHON.AI

## ✅ **Wat je al hebt:**

- ✅ Capacitor geïnstalleerd (v8.0.1)
- ✅ iOS project geconfigureerd
- ✅ Android project geconfigureerd
- ✅ App ID: `com.archonpro.app`
- ✅ App Name: `ARCHON.AI`

## 🚀 **Stap-voor-Stap Publicatie**

---

## 📱 **ANDROID APP (Google Play Store)**

### **Stap 1: Android Studio Installeren**

1. Download Android Studio: https://developer.android.com/studio
2. Installeer en open Android Studio
3. Installeer Android SDK (via Android Studio)

### **Stap 2: App Bouwen**

```bash
# 1. Sync je project
npm run mobile:sync

# 2. Open Android Studio
npm run mobile:android
```

### **Stap 3: App Icon & Splash Screen**

Vervang deze bestanden in `android/app/src/main/res/`:
- `mipmap-*/ic_launcher.png` - App icon (verschillende maten)
- `drawable-*/splash.png` - Splash screen

**Aanbevolen tool:** https://icon.kitchen (gratis icon generator)

### **Stap 4: App Signing (Release Build)**

1. **Genereer Keystore:**
```bash
cd android/app
keytool -genkey -v -keystore archon-release-key.keystore -alias archon -keyalg RSA -keysize 2048 -validity 10000
```

2. **Bewaar wachtwoord veilig!** (je hebt dit nodig voor updates)

3. **Configureer signing in `android/app/build.gradle`:**
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('archon-release-key.keystore')
            storePassword 'JOUW_WACHTWOORD'
            keyAlias 'archon'
            keyPassword 'JOUW_WACHTWOORD'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### **Stap 5: Build Release APK/AAB**

In Android Studio:
1. **Build** → **Generate Signed Bundle / APK**
2. Kies **Android App Bundle** (AAB) - verplicht voor Play Store
3. Selecteer je keystore
4. Kies **release** build variant
5. Wacht tot build klaar is

Output: `android/app/release/app-release.aab`

### **Stap 6: Google Play Console**

1. **Ga naar:** https://play.google.com/console
2. **Maak Developer Account** (€25 eenmalig)
3. **Create App:**
   - App name: ARCHON.AI
   - Default language: Nederlands
   - App type: App
   - Free or Paid: Free

4. **Upload AAB:**
   - Production → Create new release
   - Upload `app-release.aab`
   - Release notes toevoegen

5. **Store Listing:**
   - App naam: ARCHON.AI - Slimme Bouwsoftware
   - Korte beschrijving: AI-aangedreven software voor bouwprofessionals
   - Volledige beschrijving: (zie hieronder)
   - Screenshots: Minimaal 2 (1280x720 of hoger)
   - Feature graphic: 1024x500
   - App icon: 512x512

6. **Content Rating:**
   - Vul vragenlijst in (waarschijnlijk: Everyone)

7. **Pricing & Distribution:**
   - Free
   - Available in: Netherlands (+ andere landen)

8. **Submit for Review** (duurt 1-7 dagen)

---

## 🍎 **iOS APP (Apple App Store)**

### **Stap 1: Xcode Installeren**

1. Download Xcode van Mac App Store (gratis)
2. Installeer Command Line Tools:
```bash
xcode-select --install
```

### **Stap 2: Apple Developer Account**

1. **Ga naar:** https://developer.apple.com
2. **Enroll in Apple Developer Program** (€99/jaar)
3. Wacht op goedkeuring (1-2 dagen)

### **Stap 3: App ID & Certificates**

1. **Ga naar:** https://developer.apple.com/account
2. **Certificates, IDs & Profiles**
3. **Identifiers** → **+** → **App IDs**
   - Description: ARCHON.AI
   - Bundle ID: `com.archonpro.app`
   - Capabilities: Push Notifications (optioneel)

### **Stap 4: Open in Xcode**

```bash
# Sync project
npm run mobile:sync

# Open Xcode
npm run mobile:ios
```

### **Stap 5: Configureer in Xcode**

1. **Select project** (ARCHON.AI)
2. **General tab:**
   - Display Name: ARCHON.AI
   - Bundle Identifier: com.archonpro.app
   - Version: 1.0.0
   - Build: 1

3. **Signing & Capabilities:**
   - Team: Selecteer je Apple Developer team
   - Automatically manage signing: ✅

### **Stap 6: App Icon & Launch Screen**

1. **App Icon:**
   - `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
   - Gebruik https://appicon.co voor alle maten

2. **Launch Screen:**
   - `ios/App/App/Base.lproj/LaunchScreen.storyboard`

### **Stap 7: Build & Archive**

1. **Select Device:** Any iOS Device (arm64)
2. **Product** → **Archive**
3. Wacht tot build klaar is (5-10 min)
4. **Window** → **Organizer**
5. **Distribute App** → **App Store Connect**
6. **Upload**

### **Stap 8: App Store Connect**

1. **Ga naar:** https://appstoreconnect.apple.com
2. **My Apps** → **+** → **New App**
   - Platform: iOS
   - Name: ARCHON.AI
   - Primary Language: Dutch
   - Bundle ID: com.archonpro.app
   - SKU: archonai001

3. **App Information:**
   - Subtitle: Slimme Bouwsoftware
   - Category: Business / Productivity
   - Content Rights: Bevat geen rechten van derden

4. **Pricing:**
   - Price: Free
   - Availability: Netherlands (+ andere landen)

5. **Prepare for Submission:**
   - Screenshots (verplicht):
     - 6.5" iPhone: 1242x2688 (minimaal 3)
     - 5.5" iPhone: 1242x2208 (minimaal 3)
   - App Preview (optioneel): Video demo
   - Description: (zie hieronder)
   - Keywords: bouwsoftware,AI,offertes,bouw
   - Support URL: https://archonpro.com
   - Marketing URL: https://archonpro.com

6. **Build:**
   - Selecteer de build die je hebt geüpload
   - Export Compliance: No encryption

7. **Submit for Review** (duurt 1-3 dagen)

---

## 📝 **App Store Beschrijvingen**

### **Google Play (Nederlands):**

```
ARCHON.AI - De Slimste Bouwsoftware van Nederland

Maak professionele offertes in 2 minuten met onze AI-aangedreven software. 
Speciaal ontwikkeld voor bouwprofessionals die tijd willen besparen en meer 
opdrachten willen winnen.

✨ BELANGRIJKSTE FUNCTIES:
• AI-gegenereerde offertes in 2 minuten
• Automatische materiaalberekeningen
• Professionele templates
• Klantenbeheer
• Projectplanning
• Facturatie
• Real-time synchronisatie tussen devices

💪 VOORDELEN:
• Bespaar 5+ uur per week op administratie
• Win meer opdrachten met professionele offertes
• Geen rekenfoutjes meer
• Altijd en overal toegang tot je data
• Nederlandse support

🎯 PERFECT VOOR:
• Aannemers
• Schilders
• Loodgieters
• Elektriciens
• Timmerlieden
• Alle bouwprofessionals

📱 PROBEER GRATIS:
14 dagen gratis proberen, geen creditcard nodig!

🔒 VEILIG & BETROUWBAAR:
• Nederlandse servers
• GDPR compliant
• Automatische backups
• 24/7 support

Download nu en ervaar hoe AI je bouwbedrijf kan transformeren!
```

### **App Store (Nederlands):**

```
Maak professionele bouwoffertes in 2 minuten met AI.

ARCHON.AI is de slimste bouwsoftware van Nederland, speciaal ontwikkeld 
voor bouwprofessionals die tijd willen besparen en meer opdrachten willen winnen.

BELANGRIJKSTE FUNCTIES:
• AI-gegenereerde offertes
• Automatische berekeningen
• Klantenbeheer
• Projectplanning
• Facturatie
• Cloud synchronisatie

VOORDELEN:
• Bespaar 5+ uur per week
• Professionele uitstraling
• Geen rekenfoutjes
• Altijd en overal toegang

PROBEER GRATIS:
14 dagen gratis, geen creditcard nodig!

Perfect voor aannemers, schilders, loodgieters, elektriciens en alle 
bouwprofessionals.

Download nu en transformeer je bouwbedrijf!
```

---

## 📸 **Screenshots Maken**

### **Tools:**
- **iOS:** Xcode Simulator → Cmd+S voor screenshot
- **Android:** Android Emulator → Screenshot button
- **Design:** Figma of Canva voor mooie frames

### **Wat te tonen:**
1. **Login/Home screen** - Eerste indruk
2. **Dashboard** - Overzicht functionaliteit
3. **Offerte maken** - Belangrijkste feature
4. **Klantenbeheer** - Organisatie
5. **Projecten** - Planning

### **Tips:**
- Gebruik dummy data (geen echte klantgegevens!)
- Voeg tekst toe: "Maak offertes in 2 minuten"
- Gebruik je brand kleuren
- Houd het simpel en duidelijk

---

## 🚀 **Na Publicatie**

### **Marketing:**
1. **Website update:**
   - Voeg App Store badges toe
   - Link naar apps in footer

2. **Social Media:**
   - Aankondiging op LinkedIn
   - Instagram posts met screenshots
   - Facebook advertenties

3. **Email:**
   - Stuur naar bestaande klanten
   - Nieuwsbrief met download links

4. **SEO:**
   - Blog post: "ARCHON.AI nu beschikbaar op iOS en Android"
   - Update Google My Business

### **App Store Optimization (ASO):**
1. **Keywords optimaliseren**
2. **Screenshots A/B testen**
3. **Reviews vragen aan gebruikers**
4. **Regelmatig updates uitbrengen**

---

## 🔄 **Updates Uitbrengen**

### **Android:**
```bash
# 1. Update version in android/app/build.gradle
versionCode 2
versionName "1.0.1"

# 2. Build nieuwe AAB
# 3. Upload naar Play Console
# 4. Submit for review
```

### **iOS:**
```bash
# 1. Update version in Xcode
Version: 1.0.1
Build: 2

# 2. Archive & Upload
# 3. Submit in App Store Connect
```

---

## 💡 **Pro Tips**

1. **Test grondig** voor je submit
2. **Gebruik TestFlight** (iOS) voor beta testing
3. **Gebruik Internal Testing** (Android) voor beta testing
4. **Vraag reviews** van tevreden gebruikers
5. **Monitor crashes** met Firebase Crashlytics
6. **Update regelmatig** (elke 2-4 weken)

---

## 🆘 **Hulp Nodig?**

### **Veelvoorkomende Problemen:**

**"Build failed"**
- Check of alle dependencies geïnstalleerd zijn
- Clean build: `npx cap sync`

**"Signing error"**
- Check of je Developer Account actief is
- Vernieuw certificates in Xcode

**"App rejected"**
- Lees rejection reason zorgvuldig
- Fix issues en submit opnieuw

### **Resources:**
- Capacitor Docs: https://capacitorjs.com/docs
- Android Docs: https://developer.android.com
- iOS Docs: https://developer.apple.com
- Stack Overflow: Voor specifieke errors

---

## ✅ **Checklist voor Launch**

### **Voor Submit:**
- [ ] App icon (alle maten)
- [ ] Splash screen
- [ ] Screenshots (minimaal 3)
- [ ] App beschrijving
- [ ] Privacy policy URL
- [ ] Support email
- [ ] Grondig getest op echte devices
- [ ] Geen crashes of bugs
- [ ] Alle features werken

### **Na Goedkeuring:**
- [ ] App Store badges op website
- [ ] Social media aankondiging
- [ ] Email naar klanten
- [ ] Blog post
- [ ] Press release (optioneel)

**Succes met je app launch! 🚀**