# Testing Checklist - Archon App

## ✅ Functionaliteit Test

### Authenticatie
- [ ] **Login met Email** - `/login`
  - Email + wachtwoord werkt
  - Error messages bij foute credentials
  - Redirect naar dashboard na login
  
- [ ] **Login met Google** - `/login`
  - Google popup opent
  - Succesvol inloggen
  - User data wordt opgeslagen in Firestore
  
- [ ] **Login met Apple** - `/login`
  - Apple popup opent
  - Succesvol inloggen
  - User data wordt opgeslagen
  
- [ ] **Registratie** - `/register`
  - Nieuw account aanmaken werkt
  - Validatie van email/wachtwoord
  - Auto-login na registratie
  
- [ ] **Uitloggen**
  - Logout knop in header werkt
  - Redirect naar homepage
  - Session wordt gewist

### Dashboard
- [ ] **Dashboard Home** - `/dashboard`
  - Stats worden getoond
  - Quick actions knoppen werken
  - Recente activiteiten zichtbaar
  - User naam/foto wordt getoond
  
- [ ] **Navigatie**
  - Sidebar links werken
  - Active state wordt getoond
  - Collapse/expand sidebar werkt
  - Mobile menu werkt

### Klanten
- [ ] **Klanten Overzicht** - `/dashboard/klanten`
  - Lijst van klanten wordt geladen
  - Zoeken werkt
  - Stats worden berekend
  
- [ ] **Nieuwe Klant**
  - Dialog opent via "Nieuwe Klant" knop
  - Formulier validatie werkt
  - Opslaan naar Firestore werkt
  - Lijst wordt geupdate na opslaan
  
- [ ] **Klant Verwijderen**
  - Verwijder optie in dropdown
  - Confirmatie dialog
  - Klant wordt verwijderd uit Firestore

### Facturen
- [ ] **Facturen Overzicht** - `/dashboard/facturen`
  - Lijst van facturen wordt geladen
  - Filters werken (alle/openstaand/betaald/achterstallig)
  - Zoeken werkt
  - Stats worden berekend
  
- [ ] **Nieuwe Factuur (AI)** - Quick action knop
  - Dialog opent
  - Klant selecteren uit dropdown
  - Items toevoegen/verwijderen
  - Berekeningen kloppen (subtotaal, BTW, totaal)
  - Opslaan naar Firestore werkt
  
- [ ] **Factuur Acties**
  - Bekijken
  - Download PDF
  - Versturen
  - Markeer als betaald
  - Verwijderen

### Offertes
- [ ] **Offertes Overzicht** - `/dashboard/offertes`
  - Lijst van offertes wordt geladen
  - Stats worden berekend
  - Zoeken werkt
  
- [ ] **Nieuwe Offerte (Handmatig)**
  - Dialog opent
  - Formulier invullen werkt
  - Items toevoegen/verwijderen
  - Opslaan werkt
  
- [ ] **AI Offerte Generator** - Quick action knop
  - Dialog opent met stappen
  - Stap 1: Klant invullen
  - Stap 2: Project beschrijving
  - Stap 3: AI genereert items (Gemini API)
  - Stap 4: Items aanpassen
  - Stap 5: Preview en opslaan
  - PDF preview werkt
  
- [ ] **Offerte Acties**
  - Download PDF
  - Status wijzigen (accepteren/afwijzen)
  - Verwijderen

### AI Assistent
- [ ] **AI Chat** - `/dashboard/ai-assistent`
  - Pagina laadt
  - Welkomstbericht wordt getoond
  - Quick prompts werken
  - Bericht versturen werkt
  - AI antwoord komt terug (Gemini API)
  - Chat history wordt bijgehouden
  - Scroll naar nieuwste bericht

### Andere Pagina's
- [ ] **Projecten** - `/dashboard/projecten`
  - Pagina laadt zonder errors
  
- [ ] **Werkzaamheden** - `/dashboard/werkzaamheden`
  - Pagina laadt zonder errors
  
- [ ] **Email** - `/dashboard/email`
  - Pagina laadt zonder errors
  
- [ ] **Agenda** - `/dashboard/agenda`
  - Pagina laadt zonder errors
  
- [ ] **Uitgaven** - `/dashboard/uitgaven`
  - Pagina laadt zonder errors
  
- [ ] **Bankieren** - `/dashboard/bankieren`
  - Pagina laadt zonder errors
  
- [ ] **Inzichten** - `/dashboard/inzichten`
  - Pagina laadt zonder errors
  
- [ ] **Instellingen** - `/dashboard/instellingen`
  - Pagina laadt zonder errors
  
- [ ] **Help** - `/dashboard/help`
  - Pagina laadt zonder errors

## 🔒 Security Tests

- [ ] **Firestore Rules**
  - User kan alleen eigen data zien
  - User kan geen data van andere users aanpassen
  - Unauthenticated users hebben geen toegang
  
- [ ] **API Routes**
  - `/api/ai/generate-offerte` werkt
  - `/api/ai/chat` werkt
  - Error handling werkt
  
- [ ] **Environment Variables**
  - Firebase keys zijn ingesteld
  - Gemini API key is ingesteld (in Vercel)
  - Geen keys in code/git

## 📱 Responsive Tests

- [ ] **Desktop** (1920x1080)
  - Layout ziet er goed uit
  - Sidebar werkt
  - Alle componenten passen
  
- [ ] **Tablet** (768x1024)
  - Layout past zich aan
  - Mobile menu werkt
  - Tabellen zijn scrollbaar
  
- [ ] **Mobile** (375x667)
  - Mobile menu werkt
  - Knoppen zijn groot genoeg
  - Formulieren zijn bruikbaar
  - Tabellen zijn scrollbaar

## 🎨 UI/UX Tests

- [ ] **Kleuren**
  - Quick action knoppen hebben kleuren
  - Theme (light/dark) werkt
  - Contrast is goed leesbaar
  
- [ ] **Animaties**
  - Loading states worden getoond
  - Transitions zijn smooth
  - Geen flikkering
  
- [ ] **Feedback**
  - Success messages na acties
  - Error messages bij fouten
  - Loading indicators tijdens API calls

## 🚀 Performance Tests

- [ ] **Laadtijd**
  - Homepage laadt < 2 seconden
  - Dashboard laadt < 3 seconden
  - Geen onnodige re-renders
  
- [ ] **Database**
  - Queries zijn geoptimaliseerd
  - Indexes zijn aanwezig (Firestore)
  - Geen N+1 queries
  
- [ ] **Images**
  - Next.js Image optimization werkt
  - Lazy loading werkt
  - Juiste formaten (WebP)

## 🐛 Known Issues

### Te Fixen
- [ ] Sommige dialogs missen state management (bankieren, email, uitgaven)
- [ ] PDF generator moet company info uit user profile halen
- [ ] Email functionaliteit is nog niet geïmplementeerd
- [ ] Agenda functionaliteit is nog niet geïmplementeerd

### Nice to Have
- [ ] Bulk acties (meerdere facturen tegelijk)
- [ ] Export naar Excel/CSV
- [ ] Email notificaties
- [ ] Recurring invoices
- [ ] Multi-currency support

## 📝 Test Instructies

### Lokaal Testen
```bash
npm run dev
# Open http://localhost:3000
```

### Production Testen
```
https://archon-landing.vercel.app
```

### Test Accounts
- Email: test@archon.com
- Password: Test123!

## ✅ Deployment Checklist

- [x] Build succesvol (`npm run build`)
- [x] TypeScript errors opgelost
- [x] Environment variables ingesteld in Vercel
- [ ] Firestore rules gepubliceerd
- [ ] Gemini API key toegevoegd aan Vercel
- [ ] Custom domain gekoppeld (archonpro.com)
- [ ] Firebase authorized domains bijgewerkt
- [ ] SSL certificaat actief

## 🎯 Priority Fixes

1. **HIGH**: Firestore rules publiceren
2. **HIGH**: Gemini API key toevoegen aan Vercel
3. **MEDIUM**: Dialog state management fixen
4. **MEDIUM**: Company info in PDF generator
5. **LOW**: Email/Agenda functionaliteit implementeren
