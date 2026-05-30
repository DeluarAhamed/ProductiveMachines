const nodemailer = require('nodemailer')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ok: false, error: 'Method not allowed'})
  }

  try {
    const body = typeof req.body === 'object' && req.body ? req.body : JSON.parse(req.body || '{}')
    if (body.website) return res.status(200).json({ok: true})
    if (!body.email && !body.phone) {
      return res.status(400).json({ok: false, error: 'Please include an email or phone number.'})
    }

    const payload = {
      ...body,
      receivedAt: new Date().toISOString(),
      source: body.source || req.headers.referer || 'vercel',
    }

    await Promise.all([
      sendWebhook(payload),
      sendEmail(payload),
    ])

    return res.status(200).json({ok: true})
  } catch (error) {
    return res.status(500).json({ok: false, error: 'Lead capture failed.'})
  }
}

async function sendWebhook(payload) {
  if (!process.env.LEAD_WEBHOOK_URL) return
  await fetch(process.env.LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(payload),
  })
}

async function sendEmail(payload) {
  const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_NOTIFY_TO} = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_NOTIFY_TO) return

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: {user: SMTP_USER, pass: SMTP_PASS},
  })

  await transporter.sendMail({
    from: SMTP_USER,
    to: LEAD_NOTIFY_TO,
    subject: `New Productive Machines lead: ${payload.email || payload.phone}`,
    text: Object.entries(payload).map(([key, value]) => `${key}: ${value}`).join('\n'),
  })
}
