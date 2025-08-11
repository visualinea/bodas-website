import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  eventDate: string
  location: string
  route?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Basic validation
    if (!data.name || !data.email || !data.eventDate || !data.location) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      )
    }

    // Log the submission (in production, you'd save to database or send email)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      ...data
    })

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM (e.g., Pipedrive)
    
    // Example email service integration (commented out - replace with your service)
    /*
    if (process.env.CONTACT_EMAIL && process.env.SMTP_CONFIG) {
      await sendEmail({
        to: process.env.CONTACT_EMAIL,
        subject: `Nueva consulta de boda - ${data.name}`,
        template: 'contact-form',
        data: data
      })
    }
    */

    // Example CRM webhook (commented out - replace with your CRM)
    /*
    if (process.env.CRM_WEBHOOK_URL) {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'website',
          type: 'wedding_inquiry',
          ...data
        })
      })
    }
    */

    return NextResponse.json({ 
      success: true,
      message: 'Consulta recibida correctamente. Te contactaremos pronto.' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}