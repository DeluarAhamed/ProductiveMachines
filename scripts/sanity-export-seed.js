const fs = require('fs')
const path = require('path')
const vm = require('vm')

const root = path.join(__dirname, '..')
const outDir = path.join(root, 'data')
const outFile = path.join(outDir, 'sanity-seed.ndjson')

const context = {window: {}}
vm.createContext(context)
vm.runInContext(fs.readFileSync(path.join(root, 'cms-blog.js'), 'utf8'), context)
vm.runInContext(fs.readFileSync(path.join(root, 'cms-content.js'), 'utf8'), context)
vm.runInContext(fs.readFileSync(path.join(root, 'team-data.js'), 'utf8'), context)

const docs = []
const now = new Date().toISOString()

for (const [slug, post] of Object.entries(context.window.BLOG_POSTS || {})) {
  docs.push({
    _id: publicId('blogPost', slug),
    _type: 'blogPost',
    title: post.title,
    slug: {_type: 'slug', current: slug},
    category: post.tag || 'Blog',
    publishedAt: dateToIso(post.date),
    readTime: post.readTime,
    author: post.author,
    intro: post.intro,
    legacyHeroUrl: post.hero,
    body: htmlToBlocks(post.body),
    legacyHtml: post.body,
    seo: {
      _type: 'seo',
      title: post.title,
      description: post.intro,
      keywords: ['CNC optimisation', 'chatter elimination', 'Productive Machines'],
    },
    _createdAt: now,
    _updatedAt: now,
  })
}

for (const [slug, study] of Object.entries(context.window.CASE_STUDIES || {})) {
  docs.push({
    _id: publicId('caseStudy', slug),
    _type: 'caseStudy',
    company: study.company,
    slug: {_type: 'slug', current: slug},
    sector: study.sector,
    headline: study.headline,
    intro: study.intro,
    legacyLogoUrl: study.logo,
    legacyHeroUrl: study.hero,
    metrics: (study.stats || []).map((stat) => ({_key: key(), _type: 'metric', value: stat.num, label: stat.label})),
    quote: study.quote,
    quoteAuthor: study.quoteAuthor,
    quoteTitle: study.quoteTitle,
    sections: sectionsToSanity(study.sections),
    seo: {
      _type: 'seo',
      title: `${study.company} Case Study | Productive Machines`,
      description: study.intro,
      keywords: ['CNC case study', 'cycle time reduction', study.company].filter(Boolean),
    },
    _createdAt: now,
    _updatedAt: now,
  })
}

for (const [slug, product] of Object.entries(context.window.CMS?.products || {})) {
  docs.push({
    _id: publicId('productPage', slug),
    _type: 'productPage',
    name: product.title,
    slug: {_type: 'slug', current: slug},
    tier: product.tag,
    tag: product.tag,
    intro: product.intro,
    accent: product.accent,
    legacyHeroUrl: product.hero,
    sections: sectionsToSanity(product.sections),
    primaryCta: {_type: 'cta', label: 'Book demo', href: 'book-demo.html'},
    seo: {
      _type: 'seo',
      title: product.title,
      description: product.intro,
      keywords: ['SenseNC', 'CNC feeds and speeds', 'chatter-free milling'],
    },
    _createdAt: now,
    _updatedAt: now,
  })
}

for (const group of Object.values(context.window.CMS?.about || {})) {
  docs.push(pageDoc('resourcePage', group, 'about'))
}

for (const group of Object.values(context.window.CMS?.partners || {})) {
  docs.push(pageDoc('partnerPage', group, 'partners'))
}

for (const [index, member] of (context.window.TEAM_MEMBERS || []).entries()) {
  docs.push({
    _id: publicId('teamMember', member.slug || member.name),
    _type: 'teamMember',
    name: member.name,
    slug: {_type: 'slug', current: member.slug || slugify(member.name)},
    role: member.role,
    group: member.group,
    order: index + 1,
    legacyPhotoUrl: member.photo,
    linkedin: member.linkedin || undefined,
    bio: member.bio,
    isFeatured: true,
    _createdAt: now,
    _updatedAt: now,
  })
}

docs.push({
  _id: publicId('siteSettings', 'productiveMachines'),
  _type: 'siteSettings',
  title: 'Productive Machines',
  siteUrl: 'https://productivemachines.co.uk',
  defaultSeo: {
    _type: 'seo',
    title: 'Productive Machines | CNC Optimisation Software',
    description: 'CNC optimisation software for chatter-free machining, faster cycle times and AMRC-verified productivity gains.',
    keywords: ['CNC optimisation software', 'chatter-free milling', 'SenseNC'],
  },
  _createdAt: now,
  _updatedAt: now,
})

fs.mkdirSync(outDir, {recursive: true})
fs.writeFileSync(outFile, docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n')
console.log(`Wrote ${docs.length} Sanity seed documents to ${path.relative(root, outFile)}`)

function pageDoc(type, page, prefix) {
  const slug = slugify(page.title)
  return {
    _id: publicId(type, prefix, slug),
    _type: type,
    title: page.title,
    slug: {_type: 'slug', current: slug},
    tag: page.tag,
    intro: page.intro,
    accent: page.accent,
    legacyHeroUrl: page.hero,
    sections: sectionsToSanity(page.sections),
    primaryCta: {_type: 'cta', label: 'Talk to us', href: 'contact.html'},
    seo: {
      _type: 'seo',
      title: page.title,
      description: page.intro,
      keywords: ['Productive Machines', 'SenseNC', page.tag].filter(Boolean),
    },
    _createdAt: now,
    _updatedAt: now,
  }
}

function sectionsToSanity(sections = []) {
  return sections.map((section) => ({
    _key: key(),
    _type: 'section',
    sectionId: {_type: 'slug', current: section.id || slugify(section.title)},
    title: section.title,
    legacyImageUrl: section.image,
    body: htmlToBlocks(section.body),
    legacyHtml: section.body,
  }))
}

function htmlToBlocks(html = '') {
  const chunks = String(html)
    .replace(/<\/(p|h2|h3|li|blockquote)>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split(/\n+/)
    .map((line) => decode(line).trim())
    .filter(Boolean)

  return chunks.map((text) => ({
    _key: key(),
    _type: 'block',
    style: text.startsWith('• ') ? 'normal' : 'normal',
    markDefs: [],
    children: [{_key: key(), _type: 'span', text, marks: []}],
  }))
}

function dateToIso(value) {
  const date = new Date(value || Date.now())
  return Number.isNaN(date.getTime()) ? now : date.toISOString()
}

function decode(value) {
  return String(value)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72)
}

function publicId(...parts) {
  return parts
    .filter(Boolean)
    .map((part) => slugify(part))
    .join('-')
}

function key() {
  return Math.random().toString(36).slice(2, 12)
}
