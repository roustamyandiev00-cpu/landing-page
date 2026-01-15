# Archon - Professionele Facturatie & Boekhouding

Een moderne SaaS applicatie voor facturatie, offertes en boekhouding, gebouwd met Next.js, Firebase en AI.

## 🚀 Features

- ✅ **Authenticatie** - Google & Apple Sign-In via Firebase
- ✅ **Facturatie** - Maak en beheer facturen
- ✅ **Offertes** - Genereer professionele offertes
- ✅ **AI Integratie** - Gemini AI voor automatische offerte generatie
- ✅ **Klantenbeheer** - Beheer je klanten en contacten
- ✅ **Boekhouding** - Track inkomsten en uitgaven
- ✅ **Multi-tenant** - Elke gebruiker heeft eigen data
- ✅ **Responsive** - Werkt op desktop, tablet en mobiel

## 📁 Project Structuur

```
archon/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── ai/              # AI endpoints (Gemini)
│   ├── dashboard/           # Dashboard pagina's
│   │   ├── facturen/       # Facturen overzicht
│   │   ├── offertes/       # Offertes overzicht
│   │   ├── klanten/        # Klanten beheer
│   │   ├── bankieren/      # Bankrekeningen
│   │   ├── ai-assistent/   # AI Chat assistent
│   │   └── ...
│   ├── login/              # Login pagina
│   ├── register/           # Registratie pagina
│   └── page.tsx            # Landing page
│
├── components/              # React componenten
│   ├── dashboard/          # Dashboard specifieke componenten
│   │   ├── sidebar.tsx    # Navigatie sidebar
│   │   ├── header.tsx     # Dashboard header
│   │   ├── quick-actions.tsx  # Snelle acties
│   │   └── ...
│   ├── ui/                 # Shadcn UI componenten
│   └── ...                 # Landing page componenten
│
├── lib/                     # Utilities & configuratie
│   ├── firebase.ts         # Firebase configuratie & auth
│   ├── firestore.ts        # Firestore CRUD operaties
│   ├── gemini.ts           # Gemini AI integratie
│   ├── constants.ts        # App constanten
│   ├── utils.ts            # Helper functies
│   └── ...
│
├── hooks/                   # Custom React hooks
│   ├── use-user-data.ts    # User data hooks
│   └── use-toast.ts        # Toast notifications
│
├── types/                   # TypeScript types
│   └── index.ts            # Gedeelde types
│
├── public/                  # Statische bestanden
│   ├── images/             # Afbeeldingen
│   └── ...
│
└── styles/                  # Global styles
    └── globals.css
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google, Apple, Email)
- **AI**: Google Gemini 1.5 Flash
- **Deployment**: Vercel
- **Language**: TypeScript

## 🔧 Setup

### 1. Clone repository

```bash
git clone <repository-url>
cd archon
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Maak een `.env.local` bestand:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Firebase Setup

1. Maak een Firebase project aan op https://console.firebase.google.com
2. Activeer Authentication (Google, Apple, Email/Password)
3. Activeer Firestore Database
4. Kopieer de config naar `.env.local`
5. Deploy Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel

1. Push naar GitHub
2. Importeer project in Vercel
3. Voeg environment variables toe
4. Deploy!

### Firebase Rules

Publiceer de Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

## 📝 Environment Variables

### Required

- `NEXT_PUBLIC_FIREBASE_*` - Firebase configuratie
- `GOOGLE_GEMINI_API_KEY` - Gemini AI key

### Optional

- `NEXT_PUBLIC_APP_URL` - App URL (voor production)

## 🔐 Security

- Firestore security rules zorgen voor data isolatie per gebruiker
- API keys zijn server-side only (behalve Firebase public keys)
- Apple Sign-In private key moet NIET in repository
- Gebruik environment variables voor gevoelige data

## 📚 Key Features Explained

### AI Offerte Generator

Gebruikt Gemini AI om automatisch offertes te genereren op basis van projectbeschrijving:

```typescript
// lib/gemini.ts
export async function generateOfferteWithAI(projectDescription: string)
```

### Multi-tenant Architecture

Elke gebruiker heeft eigen data via Firestore security rules:

```
match /invoices/{docId} {
  allow read, write: if request.auth.uid == resource.data.userId;
}
```

### Real-time Updates

Firebase Firestore zorgt voor real-time synchronisatie tussen devices.

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 License

Dit project is proprietary software.

## 🆘 Support

Voor vragen of problemen, open een issue op GitHub.

---

Made with ❤️ by Archon Team
