# Wavespeed AI Marketing Content Generator

## 🎯 Wat is gebouwd?

Ik heb een complete **marketing content generator** gebouwd met de Wavespeed API specifiek voor App Store promotie van ARCHON.AI:

### 📱 Content Types
- **Promotie Video's**: 15-60 seconden App Store video's
- **App Store Screenshots**: professionele screenshots in alle formaten
- **Marketing Teksten**: compelling copy voor App Store beschrijvingen
- **Social Media Posts**: Instagram/Facebook/LinkedIn content

### 🎨 Features
- **4 Stijlen**: Professioneel, Modern, Minimalistisch, Opvallend
- **Meerdere Formaten**: 16:9, 9:16, 1:1, 4:5 (App Store)
- **A/B Testing**: Genereer 3 varianties tegelijk
- **Direct Download**: Export voor App Store gebruik

## 📁 Bestanden

### API
- `app/api/wavespeed/generate/route.ts` - Hoofd API endpoint
- `app/api/wavespeed/generate/route.ts` - Variaties generator

### UI Component
- `components/dashboard/wavespeed-generator.tsx` - Complete generator interface
- `app/dashboard/marketing/page.tsx` - Marketing pagina

### Environment
- `.env.example` - Wavespeed API key configuratie

## 🚀 Gebruik

### 1. API Key Setup
```bash
# Voeg toe aan .env.local
WAVESPEED_API_KEY=a4153f432a687a1a7d2db007b408ef535c480aadd658499e42e375fd630ef292
```

### 2. Toegang tot Generator
Ga naar `/dashboard/marketing` in de app

### 3. Content Genereren
1. Kies content type (video/image/text/social)
2. Selecteer stijl en formaat
3. Beschrijf wat je wilt genereren
4. Klik "Genereer Content"

## 🎯 App Store Specifieke Prompts

### Video Prompts
```
"Create a professional App Store promotional video for ARCHON.AI - AI-powered construction software. 
Show: professional builder using tablet on construction site, modern interface, 
invoice management, AI quotes, project tracking. Style: professional, 
Duration: 15s, Aspect Ratio: 16:9"
```

### Screenshot Prompts
```
"Create a professional App Store screenshot for ARCHON.AI - AI-powered construction software. 
Show: clean dashboard interface, professional mobile app screen, 
construction industry context. Style: modern, Aspect Ratio: 9:16"
```

### Marketing Text Prompts
```
"Write compelling App Store marketing copy for ARCHON.AI - AI-powered construction software. 
Include: catchy headline, app description, key features, call to action. 
Target: construction professionals, builders, contractors."
```

## 🔧 Technische Details

### Wavespeed API Integration
```typescript
const response = await fetch('https://api.wavespeed.ai/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.WAVESPEED_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: enhancedPrompt,
    model: 'wavespeed-video-v1',
    parameters: {
      style: 'professional',
      duration: 15,
      aspect_ratio: '16:9',
      quality: 'high'
    }
  })
})
```

### Content Variaties
- **Single Generation**: Eén stuk content
- **Multiple Variations**: 3 verschillende stijlen voor A/B testing
- **Style Options**: Professional, Modern, Minimalistisch, Opvallend

## 📱 App Store Format Support

### Video Formaten
- **16:9** - Landscape video's
- **9:16** - Portrait/Story video's
- **1:1** - Square video's
- **4:5** - App Store video formaat

### Screenshot Formaten
- **16:9** - Desktop screenshots
- **9:16** - Mobile screenshots
- **1:1** - Icon previews
- **4:5** - App Store screenshots

## 🎨 Resultaten

### Video Content
- Professionele App Store promotie video's
- Bouwplaats achtergronden met moderne tools
- AI-assistent features in actie
- 15-60 seconden duur

### Screenshot Content
- Schone interface screenshots
- Professionele dashboard weergaves
- Mobile app schermen
- Construction industry context

### Text Content
- Pakkende titels en beschrijvingen
- Key features en voordelen
- Call-to-action voor downloads
- Social media hashtags

## 🚀 Volgende Stappen

1. **Test de generator** met verschillende prompts
2. **Genereer content** voor App Store pagina
3. **Maak A/B test** varianties
4. **Upload naar App Store Connect**

## 🎉 Voordeel

Met deze generator kun je **professionele marketing content** maken zonder design skills nodig. Perfect voor App Store approved materiaal!
