const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const siteUrl = (process.env.SITE_URL || 'https://productivemachines.co.uk').replace(/\/$/, '');
const defaultImage = `${siteUrl}/assets/og-productive-machines.png`;
const logo = `${siteUrl}/assets/favicon.png`;

const routeMeta = {
  'index.html': {
    title: 'Productive Machines | CNC Optimisation Software for Chatter-Free Machining',
    description: 'UK CNC optimisation software for chatter-free milling. Reduce cycle times by up to 53%, improve productivity by 110%, and run machine tools at their true envelope.',
    type: 'WebSite',
  },
  'products.html': {
    title: 'SenseNC Products | CNC Feeds, Speeds, Digital Twin & Chatter Elimination',
    description: 'Compare TapStarter, SenseNC Feeds and SenseNC Finesse for CNC feed-rate optimisation, digital-twin simulation, chatter elimination and CAM-native productivity gains.',
    type: 'CollectionPage',
  },
  'sensenc-finesse.html': {
    title: 'SenseNC Finesse | CNC Digital Twin & Real-Time Chatter Elimination',
    description: 'SenseNC Finesse gives manufacturers digital-twin simulation, real-time chatter elimination, in-process monitoring and AMRC-verified optimisation for complex CNC machining.',
    type: 'Product',
  },
  'sensenc-feeds.html': {
    title: 'SenseNC Feeds | CAM-Integrated CNC Feed Rate Optimisation',
    description: 'SenseNC Feeds optimises CNC toolpath feed rates inside Siemens NX and Mastercam, using AMRC-verified physics to reduce cycle time without workflow disruption.',
    type: 'Product',
  },
  'tapstarter.html': {
    title: 'TapStarter | CNC Feeds and Speeds Calculator for Chatter-Free Milling',
    description: 'TapStarter gives CNC shops safe spindle speeds and feed rates in seconds. A browser-based starting point for chatter-free milling and tool life improvement.',
    type: 'Product',
  },
  'case-studies.html': {
    title: 'CNC Optimisation Case Studies | Productive Machines Results',
    description: 'Read CNC optimisation case studies from aerospace and precision manufacturers using SenseNC to cut cycle time, extend tool life and recover machine capacity.',
    type: 'CollectionPage',
  },
  'case-aml.html': {
    title: 'AML Aerospace Case Study | 53% CNC Cycle Time Reduction',
    description: 'See how AML Aerospace used SenseNC Finesse to cut titanium impeller cycle time by 53%, increase tool life by 38% and improve CNC productivity.',
    type: 'Article',
  },
  'partners.html': {
    title: 'Productive Machines Partners | CAM, Channel & Research Partnerships',
    description: 'Explore Productive Machines partner programmes for CAM vendors, channel partners and research centres bringing SenseNC CNC optimisation to manufacturers.',
    type: 'CollectionPage',
  },
  'resources.html': {
    title: 'CNC Optimisation Resources | Tap Testing, ROI, Blogs & FAQ',
    description: 'Explore CNC optimisation resources: tap testing guides, SenseNC ROI calculator, case studies, manufacturing blogs, events and product FAQs.',
    type: 'CollectionPage',
  },
  'roi-calculator.html': {
    title: 'CNC ROI Calculator | Estimate SenseNC Payback on Your Machine Fleet',
    description: 'Estimate the year-one value of SenseNC for your CNC machine fleet. Calculate recovered spindle hours, productivity uplift and ROI multiple without email.',
    type: 'WebPage',
  },
  'tap-testing-hub.html': {
    title: 'Tap Testing Guide | Chatter-Free Milling and Stability Lobes',
    description: 'Learn how tap testing, stability lobes and machine-tool dynamics unlock chatter-free CNC milling, faster cycle times and better tool life.',
    type: 'Article',
  },
  'about.html': {
    title: 'About Productive Machines | AMRC Spin-Out for CNC Optimisation',
    description: 'Productive Machines is a UK AMRC spin-out building CNC optimisation software that eliminates chatter and helps manufacturers run machine tools faster.',
    type: 'AboutPage',
  },
  'contact.html': {
    title: 'Contact Productive Machines | Book a SenseNC CNC Optimisation Demo',
    description: 'Talk to Productive Machines about SenseNC, CNC chatter elimination, feed-rate optimisation, tap testing and AMRC-verified productivity improvements.',
    type: 'ContactPage',
  },
};

const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html') && file !== '404.html').sort();
const routes = htmlFiles.map((file) => {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const existingTitle = match(html, /<title>(.*?)<\/title>/i) || 'Productive Machines';
  const existingDescription = match(html, /<meta name="description" content="(.*?)"/i) || '';
  const meta = routeMeta[file] || {};
  const title = meta.title || existingTitle;
  const description = meta.description || existingDescription;
  const url = `${siteUrl}/${file === 'index.html' ? '' : file}`;
  return {
    file,
    title,
    description,
    image: meta.image || defaultImage,
    type: meta.type || inferType(file),
    url,
  };
});

for (const route of routes) {
  const filePath = path.join(root, route.file);
  let html = fs.readFileSync(filePath, 'utf8');
  const oldTitle = match(html, /<title>(.*?)<\/title>/i);
  if (oldTitle) html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  const canonical = `<link rel="canonical" href="${route.url}" />`;
  const robots = `<meta name="robots" content="index,follow,max-image-preview:large" />`;
  const social = [
    `<meta property="og:type" content="${route.type === 'Article' ? 'article' : 'website'}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:site_name" content="Productive Machines" />`,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `<meta property="og:url" content="${route.url}" />`,
    `<meta property="og:image" content="${route.image}" />`,
    `<meta property="og:image:alt" content="Productive Machines CNC optimisation software" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
    `<meta name="twitter:image" content="${route.image}" />`,
  ].join('\n  ');
  const jsonLd = `<script type="application/ld+json">${JSON.stringify(buildSchema(route))}</script>`;

  html = html.replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="${escapeAttr(route.description)}"`);
  html = html.replace(/\n\s*<meta name="robots"[^>]*>/g, '');
  html = html.replace(/\n\s*<link rel="canonical"[^>]*>/g, '');
  html = html.replace(/\n\s*<meta property="og:[^>]*>/g, '');
  html = html.replace(/\n\s*<meta name="twitter:[^>]*>/g, '');
  html = html.replace(/\n\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  html = html.replace(/(<meta name="description"[^>]*>\s*)/i, `$1\n  ${robots}\n  ${canonical}\n  ${social}\n  ${jsonLd}\n  `);
  fs.writeFileSync(filePath, html, 'utf8');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => {
  const priority = route.file === 'index.html' ? '1.0' : route.file.includes('product') || route.file.includes('sensenc') ? '0.9' : '0.7';
  return `  <url><loc>${route.url}</loc><changefreq>${route.file === 'index.html' ? 'weekly' : 'monthly'}</changefreq><priority>${priority}</priority></url>`;
}).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

const robotsTxt = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /_check/\nDisallow: /scrap/\nSitemap: ${siteUrl}/sitemap.xml\n`;
fs.writeFileSync(path.join(root, 'robots.txt'), robotsTxt, 'utf8');

console.log(`SEO metadata refreshed for ${routes.length} pages.`);

function buildSchema(route) {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Productive Machines',
      url: siteUrl,
      logo,
      foundingDate: '2019',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rotherham',
        addressRegion: 'South Yorkshire',
        addressCountry: 'GB',
      },
      sameAs: [
        'https://www.linkedin.com/company/productivemachines/',
        'https://www.youtube.com/@productivemachines',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Productive Machines',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${route.url}#breadcrumb`,
      itemListElement: breadcrumb(route).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];

  if (route.type === 'Product') {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${route.url}#software`,
      name: route.title.split('|')[0].trim(),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Windows',
      description: route.description,
      url: route.url,
      publisher: { '@id': `${siteUrl}/#organization` },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'GBP',
        url: route.url,
      },
    });
  } else if (route.type === 'Article') {
    graph.push({
      '@type': 'Article',
      '@id': `${route.url}#article`,
      headline: route.title,
      description: route.description,
      image: route.image,
      mainEntityOfPage: route.url,
      publisher: { '@id': `${siteUrl}/#organization` },
    });
  } else {
    graph.push({
      '@type': route.type,
      '@id': `${route.url}#webpage`,
      name: route.title,
      description: route.description,
      url: route.url,
      isPartOf: { '@id': `${siteUrl}/#website` },
      publisher: { '@id': `${siteUrl}/#organization` },
      breadcrumb: { '@id': `${route.url}#breadcrumb` },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function breadcrumb(route) {
  const label = route.file === 'index.html'
    ? 'Home'
    : route.title.replace(/\s*\|.*$/, '').replace(/\s*—.*$/, '').trim();
  return route.file === 'index.html'
    ? [{ name: 'Home', url: siteUrl }]
    : [{ name: 'Home', url: siteUrl }, { name: label, url: route.url }];
}

function inferType(file) {
  if (file.startsWith('case-') || file.startsWith('blog-')) return 'Article';
  if (file.includes('product') || file.includes('sensenc') || file.includes('tapstarter')) return 'Product';
  return 'WebPage';
}

function match(text, pattern) {
  const result = text.match(pattern);
  return result ? result[1] : '';
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function escapeHtml(value) {
  return escapeAttr(value).replace(/>/g, '&gt;');
}
