import { NextRequest, NextResponse } from 'next/server'
import { getInvoices, getClients } from '@/lib/firestore'
import { sendReminderEmail, testEmailConfiguration } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()
    
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
    
    // Simulate sending reminders (in production, integrate with email service)
    const reminderResults = await Promise.allSettled(
      targetInvoices.map(async (invoice) => {
        const client = clientMap.get(invoice.clientId)
        if (!client) {
          throw new Error(`Client not found for invoice ${invoice.invoiceNumber}`)
        }
        
        // Send actual email
        await sendReminderEmail({
          to: client.email,
          clientName: client.name,
          invoiceNumber: invoice.invoiceNumber,
          dueDate: invoice.dueDate.toDate(),
          total: invoice.total
        })
        
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
    
    // Log AI action (in production, save to database)
    console.log('AI Action: Reminders sent', {
      userId,
      timestamp: new Date(),
      reminded: successful,
      failed,
      invoices: targetInvoices.map(i => i.invoiceNumber)
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

// Test endpoint for email configuration
export async function GET(request: NextRequest) {
  try {
    const result = await testEmailConfiguration()
    
    if (result.success) {
      return NextResponse.json({
        message: `Email test successful using ${result.provider}`,
        provider: result.provider
      })
    } else {
      return NextResponse.json({
        error: `Email test failed: ${result.error}`,
        provider: result.provider
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Email test error:', error)
    return NextResponse.json(
      { error: 'Email test failed' },
      { status: 500 }
    )
  }
}
