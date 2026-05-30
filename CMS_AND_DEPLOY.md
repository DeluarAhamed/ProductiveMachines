# CMS and Deployment Guide

## Sanity CMS

The Sanity Studio lives in `studio/`.

- Project name: Productive Machines
- Project ID: `nv9066sm`
- Dataset: `production`
- Hosted Studio: https://productive-machines-cms.sanity.studio

Content models included:

- Blog / news articles
- Case studies
- Product pages
- Partner pages
- Resource pages
- Events
- FAQs
- Site settings

Setup:

1. Copy `studio/.env.example` to `studio/.env`.
2. Confirm:

```bash
SANITY_STUDIO_PROJECT_ID=nv9066sm
SANITY_STUDIO_DATASET=production
```

3. Install and run:

```bash
npm run studio:install
npm run studio:dev
```

Seed existing website content into Sanity:

```bash
npm run cms:seed
cd studio
npm run dataset:import
```

Build Studio:

```bash
npm run studio:build
```

Deploy Studio to Sanity hosting:

```bash
cd studio
npm run deploy
```

## Vercel Deployment

The main website is Vercel-ready:

- `vercel.json` runs `npm run seo` during deployment.
- Static pages are served from the repository root.
- `/api/leads` is available as a Vercel serverless function.
- `/healthz` rewrites to `/api/healthz`.

Recommended Vercel environment variables:

```bash
SITE_URL=https://productivemachines.co.uk
LEAD_WEBHOOK_URL=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
LEAD_NOTIFY_TO=
```

Deploy after GitHub push:

```bash
npx vercel login
npx vercel --prod
```

## GitHub Push

This workspace does not currently have GitHub CLI installed or a remote configured. After creating a GitHub repository, run:

```bash
git remote add origin https://github.com/YOUR-ORG/YOUR-REPO.git
git push -u origin main
```

If you prefer GitHub CLI:

```bash
gh auth login
gh repo create YOUR-ORG/YOUR-REPO --source=. --private --push
```
