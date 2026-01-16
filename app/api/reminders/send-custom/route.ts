import { NextRequest, NextResponse } from 'next/server'
import { getInvoices, getClients } from '@/lib/firestore'
import { sendReminderEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { userId, emailConfig } = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get overdue and due-today invoices
    const invoices = await getInvoices(userId)
    const clients = await getClients(userId)
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    
    const targetInvoices = invoices.filter(invoice => {
      if (invoice.status !== 'sent' && invoice.status !== 'overdue') return false
      const dueDate = invoice.dueDate.toDate()
      return dueDate < tomorrow // Include overdue and due today
    })

    if (targetInvoices.length === 0) {
      return NextResponse.json({ 
        message: 'No invoices to remind',
        reminded: 0
      })
    }

    // Create client map for email lookup
    const clientMap = new Map(clients.map(c => [c.id, c]))
    
    // Send reminders with custom email config
    const reminderResults = await Promise.allSettled(
      targetInvoices.map(async (invoice) => {
        const client = clientMap.get(invoice.clientId)
        if (!client) {
          throw new Error(`Client not found for invoice ${invoice.invoiceNumber}`)
        }
        
        // Send email with custom config
        await sendReminderEmailWithConfig({
          to: client.email,
          clientName: client.name,
          invoiceNumber: invoice.invoiceNumber,
          dueDate: invoice.dueDate.toDate(),
          total: invoice.total
        }, emailConfig)
        
        return {
          invoiceNumber: invoice.invoiceNumber,
          clientName: client.name,
          clientEmail: client.email,
          total: invoice.total,
          dueDate: invoice.dueDate.toDate(),
          status: 'sent'
        }
      })
    )

    const successful = reminderResults.filter(r => r.status === 'fulfilled').length
    const failed = reminderResults.filter(r => r.status === 'rejected').length
    
    // Log AI action
    console.log('AI Action: Reminders sent', {
      userId,
      timestamp: new Date(),
      reminded: successful,
      failed,
      invoices: targetInvoices.map(i => i.invoiceNumber),
      provider: emailConfig?.provider
    })

    return NextResponse.json({
      message: `Reminders sent to ${successful} client${successful !== 1 ? 's' : ''}`,
      reminded: successful,
      failed,
      details: reminderResults
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value)
    })

  } catch (error) {
    console.error('Error sending reminders:', error)
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    )
  }
}

// Test endpoint with custom config
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const configParam = searchParams.get('config')
    
    if (!configParam) {
      return NextResponse.json({ error: 'No email config provided' }, { status: 400 })
    }
    
    const emailConfig = JSON.parse(decodeURIComponent(configParam))
    
    // Test with custom config
    await sendReminderEmailWithConfig({
      to: emailConfig.provider === 'gmail' ? emailConfig.gmailFromEmail : 
         emailConfig.provider === 'outlook' ? emailConfig.outlookFromEmail : 
         emailConfig.resendFromEmail,
      clientName: 'Test Gebruiker',
      invoiceNumber: 'TEST-001',
      dueDate: new Date(),
      total: 100.00
    }, emailConfig)
    
    return NextResponse.json({
      message: `Email test successful using ${emailConfig.provider}`,
      provider: emailConfig.provider
    })
  } catch (error) {
    console.error('Email test error:', error)
    return NextResponse.json(
      { error: 'Email test failed' },
      { status: 500 }
    )
  }
}

// Helper function to send email with custom config
async function sendReminderEmailWithConfig(data: any, config: any) {
  // This would use the custom config instead of environment variables
  // For now, we'll use the existing sendReminderEmail function
  // In production, you'd modify the email service to accept config parameter
  
  // Temporarily set environment variables (not ideal for production)
  const originalProvider = process.env.EMAIL_PROVIDER
  
  try {
    // Set provider based on config
    process.env.EMAIL_PROVIDER = config.provider
    
    if (config.provider === 'resend') {
      process.env.RESEND_API_KEY = config.resendApiKey
      process.env.RESEND_FROM_EMAIL = config.resendFromEmail
    } else if (config.provider === 'gmail') {
      process.env.GMAIL_SMTP_USER = config.gmailSmtpUser
      process.env.GMAIL_SMTP_PASS = config.gmailSmtpPass
      process.env.GMAIL_FROM_EMAIL = config.gmailFromEmail
    } else if (config.provider === 'outlook') {
      process.env.OUTLOOK_SMTP_USER = config.outlookSmtpUser
      process.env.OUTLOOK_SMTP_PASS = config.outlookSmtpPass
      process.env.OUTLOOK_FROM_EMAIL = config.outlookFromEmail
    }
    
    const { sendReminderEmail } = await import('@/lib/email')
    return await sendReminderEmail(data)
  } finally {
    // Restore original provider
    if (originalProvider) {
      process.env.EMAIL_PROVIDER = originalProvider
    } else {
      delete process.env.EMAIL_PROVIDER
    }
  }
}
