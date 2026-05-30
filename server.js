const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = (process.env.SITE_URL || 'http://localhost:' + PORT).replace(/\/$/, '');
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl');

const allowedTypes = new Set(['contact', 'demo', 'scheduler', 'newsletter', 'download', 'partner']);
const requiredByType = {
  contact: ['firstName', 'lastName', 'email'],
  demo: ['firstName', 'lastName', 'email', 'company'],
  scheduler: ['firstName', 'lastName', 'email', 'date', 'time'],
  newsletter: ['email'],
  download: ['email'],
  partner: ['firstName', 'lastName', 'email', 'company'],
};

fs.mkdirSync(DATA_DIR, { recursive: true });

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.get('/healthz', (_req, res) => {
  res.json({ ok: true, service: 'productive-machines-website' });
});

app.post('/api/leads', async (req, res) => {
  try {
    const lead = normaliseLead(req.body || {}, req);
    await persistLead(lead);
    await notifyLead(lead);
    res.status(201).json({
      ok: true,
      id: lead.id,
      message: responseMessage(lead.type),
    });
  } catch (error) {
    const status = error.statusCode || 500;
    if (status >= 500) console.error(error);
    res.status(status).json({ ok: false, error: error.message || 'Unable to submit your request.' });
  }
});

app.use(express.static(__dirname, {
  extensions: ['html'],
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
  setHeaders(res, filePath) {
    if (/\.(html|jsx|js|css)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
}));

app.use((req, res, next) => {
  if (req.path.includes('.') || req.path.startsWith('/api/')) return next();
  const candidate = path.join(__dirname, req.path + '.html');
  if (fs.existsSync(candidate)) return res.sendFile(candidate);
  return next();
});

app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Productive Machines website running at ${SITE_URL}`);
});

function normaliseLead(body, req) {
  if (body.website || body.url || body.company_website) {
    const err = new Error('Submission rejected.');
    err.statusCode = 400;
    throw err;
  }

  const type = String(body.type || 'contact').trim().toLowerCase();
  if (!allowedTypes.has(type)) {
    const err = new Error('Unknown submission type.');
    err.statusCode = 400;
    throw err;
  }

  const lead = {
    id: crypto.randomUUID(),
    type,
    createdAt: new Date().toISOString(),
    source: clean(body.source || req.get('referer') || ''),
    firstName: clean(body.firstName || body.first_name || ''),
    lastName: clean(body.lastName || body.last_name || ''),
    email: clean(body.email || body.workEmail || ''),
    company: clean(body.company || ''),
    country: clean(body.country || ''),
    phone: clean(body.phone || ''),
    date: clean(body.date || ''),
    time: clean(body.time || ''),
    message: clean(body.message || body.notes || body.machineDetails || ''),
    consent: Boolean(body.consent || body.privacy || body.optIn),
    userAgent: clean(req.get('user-agent') || ''),
    ip: req.ip,
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    const err = new Error('Please enter a valid work email.');
    err.statusCode = 400;
    throw err;
  }

  const missing = (requiredByType[type] || []).filter((field) => !lead[field]);
  if (missing.length) {
    const err = new Error(`Missing required field: ${missing.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }

  return lead;
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 2000);
}

async function persistLead(lead) {
  await fs.promises.appendFile(LEADS_FILE, JSON.stringify(lead) + '\n', 'utf8');
}

async function notifyLead(lead) {
  await Promise.allSettled([sendWebhook(lead), sendEmail(lead)]);
}

async function sendWebhook(lead) {
  if (!process.env.LEAD_WEBHOOK_URL || typeof fetch !== 'function') return;
  await fetch(process.env.LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(lead),
  });
}

async function sendEmail(lead) {
  if (!process.env.SMTP_HOST || !process.env.LEAD_NOTIFY_TO) return;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    } : undefined,
  });

  const subject = `[Productive Machines] ${lead.type} enquiry from ${lead.email}`;
  const text = Object.entries(lead).map(([key, value]) => `${key}: ${value}`).join('\n');
  await transporter.sendMail({
    to: process.env.LEAD_NOTIFY_TO,
    from: process.env.LEAD_NOTIFY_FROM || process.env.SMTP_USER || 'website@productivemachines.co.uk',
    replyTo: lead.email,
    subject,
    text,
  });
}

function responseMessage(type) {
  if (type === 'newsletter') return 'Subscription received.';
  if (type === 'download') return 'Download request received.';
  if (type === 'scheduler') return 'Your demo time has been requested.';
  return 'Thanks. An engineer will be in touch within one working day.';
}
