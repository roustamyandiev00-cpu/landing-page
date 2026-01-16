# Email Service Setup - Multi Provider

## 1. Kies je Email Provider

Je kunt kiezen uit 3 email providers:

### Option A: Resend (Aanbevolen)
- Professionele email service
- Geen SMTP setup nodig
- Domein verificatie vereist
- Kosten: ~$0.10 per email

### Option B: Gmail SMTP
- Gratis met Gmail account
- App password nodig (2FA vereist)
- Beperkt tot 500 emails/dag

### Option C: Outlook SMTP
- Gratis met Outlook account
- SMTP instellingen nodig
- Beperkt tot 300 emails/dag

## 2. Environment Variables

Voeg toe aan `.env.local`:

```bash
# Email Service Configuration
EMAIL_PROVIDER=resend # Options: resend, gmail, outlook

# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@archonpro.com

# Gmail SMTP Configuration
GMAIL_SMTP_HOST=smtp.gmail.com
GMAIL_SMTP_PORT=587
GMAIL_SMTP_USER=your-email@gmail.com
GMAIL_SMTP_PASS=your-app-password
GMAIL_FROM_EMAIL=your-email@gmail.com

# Outlook SMTP Configuration
OUTLOOK_SMTP_HOST=smtp-mail.outlook.com
OUTLOOK_SMTP_PORT=587
OUTLOOK_SMTP_USER=your-email@outlook.com
OUTLOOK_SMTP_PASS=your-password
OUTLOOK_FROM_EMAIL=your-email@outlook.com
```

## 3. Provider Setup

### Resend Setup
1. Ga naar [Resend.com](https://resend.com)
2. Maak account aan
3. Verifieer domein `archonpro.com`
4. Krijg API key
5. Set `EMAIL_PROVIDER=resend`

### Gmail Setup
1. Enable 2FA op je Gmail account
2. Ga naar [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Genereer app password voor "ARCHON.AI"
4. Set `EMAIL_PROVIDER=gmail`
5. Vul SMTP credentials in

### Outlook Setup
1. Ga naar [Outlook Security](https://account.microsoft.com/security)
2. Enable 2FA
3. Genereer app password
4. Set `EMAIL_PROVIDER=outlook`
5. Vul SMTP credentials in

## 4. Testen

Test je email configuratie:

```bash
# Test endpoint
curl http://localhost:3000/api/reminders/send
```

Of bezoek in browser: `http://localhost:3000/api/reminders/send`

## 5. Features

### Multi Provider Support
- Automatische provider detectie via `EMAIL_PROVIDER`
- Fallback naar Resend indien beschikbaar
- Consistente API voor alle providers

### Email Templates
- Professionele HTML template
- Nederlandse taal
- Factuurgegevens automatisch ingevuld

### Error Handling
- Provider-specifieke error messages
- Test endpoint voor configuratie
- Logging voor debugging

## 6. Productie

### Resend
- Domein moet geverifieerd zijn
- Monitor email logs in Resend dashboard

### Gmail/Outlook
- Rate limits respecteren
- Monitor SMTP logs
- Backup provider overwegen

## 7. Switchen tussen Providers

Verander alleen `EMAIL_PROVIDER` in `.env.local` en herstart de server.

```bash
# Van Resend naar Gmail
EMAIL_PROVIDER=gmail
```

De rest van de code blijft hetzelfde!
