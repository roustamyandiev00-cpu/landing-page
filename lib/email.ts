import { Resend } from 'resend'
import nodemailer from 'nodemailer'

interface EmailData {
  to: string
  clientName: string
  invoiceNumber: string
  dueDate: Date
  total: number
}

type EmailProvider = 'resend' | 'gmail' | 'outlook'

function getProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || 'resend'
  if (!['resend', 'gmail', 'outlook'].includes(provider)) {
    throw new Error(`Invalid email provider: ${provider}`)
  }
  return provider as EmailProvider
}

// Resend Provider
const resend = new Resend(process.env.RESEND_API_KEY)

async function sendWithResend(data: EmailData) {
  const { to, clientName, invoiceNumber, dueDate, total } = data
  
  const { data: result, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'noreply@archonpro.com',
    to: [to],
    subject: `Herinnering: Factuur ${invoiceNumber}`,
    html: getEmailHTML({ to, clientName, invoiceNumber, dueDate, total }),
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }

  return { success: true, messageId: result?.id }
}

// Gmail SMTP Provider
async function sendWithGmail(data: EmailData) {
  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.GMAIL_SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.GMAIL_SMTP_USER,
      pass: process.env.GMAIL_SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.GMAIL_FROM_EMAIL,
    to: data.to,
    subject: `Herinnering: Factuur ${data.invoiceNumber}`,
    html: getEmailHTML(data),
  }

  const result = await transporter.sendMail(mailOptions)
  return { success: true, messageId: result.messageId }
}

// Outlook SMTP Provider
async function sendWithOutlook(data: EmailData) {
  const transporter = nodemailer.createTransport({
    host: process.env.OUTLOOK_SMTP_HOST || 'smtp-mail.outlook.com',
    port: parseInt(process.env.OUTLOOK_SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.OUTLOOK_SMTP_USER,
      pass: process.env.OUTLOOK_SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.OUTLOOK_FROM_EMAIL,
    to: data.to,
    subject: `Herinnering: Factuur ${data.invoiceNumber}`,
    html: getEmailHTML(data),
  }

  const result = await transporter.sendMail(mailOptions)
  return { success: true, messageId: result.messageId }
}

// Email HTML Template
function getEmailHTML(data: EmailData) {
  const { clientName, invoiceNumber, dueDate, total } = data
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
        <h1 style="color: #333; margin-bottom: 20px;">Herinnering Factuur</h1>
        
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Beste ${clientName},
        </p>
        
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Dit is een vriendelijke herinnering dat factuur <strong>${invoiceNumber}</strong> 
          ${dueDate < new Date() ? 'vervallen is' : 'vandaag verloopt'}.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="color: #333; margin: 0 0 10px 0;">Factuurgegevens</h3>
          <p style="margin: 5px 0; color: #666;"><strong>Factuurnummer:</strong> ${invoiceNumber}</p>
          <p style="margin: 5px 0; color: #666;"><strong>Vervaldatum:</strong> ${dueDate.toLocaleDateString('nl-NL')}</p>
          <p style="margin: 5px 0; color: #666;"><strong>Bedrag:</strong> €${total.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</p>
        </div>
        
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Wij verzoeken u vriendelijk om de betaling zo spoedig mogelijk te voldoen.
        </p>
        
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Mocht u vragen hebben, neem dan gerust contact met ons op.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 0;">
            Met vriendelijke groet,<br>
            Team ARCHON.AI
          </p>
        </div>
      </div>
    </div>
  `
}

// Main Email Service
export async function sendReminderEmail(data: EmailData) {
  try {
    const provider = getProvider()
    
    switch (provider) {
      case 'resend':
        return await sendWithResend(data)
      case 'gmail':
        return await sendWithGmail(data)
      case 'outlook':
        return await sendWithOutlook(data)
      default:
        throw new Error(`Unsupported email provider: ${provider}`)
    }
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

// Helper function to test email configuration
export async function testEmailConfiguration(): Promise<{ provider: EmailProvider; success: boolean; error?: string }> {
  try {
    const provider = getProvider()
    
    // Send test email to yourself
    const testData: EmailData = {
      to: provider === 'gmail' ? process.env.GMAIL_FROM_EMAIL! : 
         provider === 'outlook' ? process.env.OUTLOOK_FROM_EMAIL! : 
         process.env.RESEND_FROM_EMAIL!,
      clientName: 'Test Gebruiker',
      invoiceNumber: 'TEST-001',
      dueDate: new Date(),
      total: 100.00
    }
    
    await sendReminderEmail(testData)
    return { provider, success: true }
  } catch (error) {
    return { 
      provider: getProvider(), 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
