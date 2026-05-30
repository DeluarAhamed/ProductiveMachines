const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html'));
const requiredFiles = ['package.json', 'server.js', 'sitemap.xml', 'robots.txt', 'api.js'];
const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
const issues = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  if (!/<title>.+<\/title>/i.test(html)) issues.push(`${file}: missing title`);
  if (!/<meta name="description" content="[^"]{40,}"/i.test(html)) issues.push(`${file}: weak/missing description`);
  if (!/<link rel="canonical"/i.test(html) && file !== '404.html') issues.push(`${file}: missing canonical`);
  if (!/<meta property="og:title"/i.test(html) && file !== '404.html') issues.push(`${file}: missing Open Graph tags`);
  if (!/<meta name="robots" content="index,follow,max-image-preview:large"/i.test(html) && file !== '404.html') issues.push(`${file}: missing indexable robots directive`);
  if (!/<meta name="twitter:image"/i.test(html) && file !== '404.html') issues.push(`${file}: missing Twitter image`);
  if (!/<script type="application\/ld\+json">[\s\S]*"@graph"[\s\S]*<\/script>/i.test(html) && file !== '404.html') issues.push(`${file}: missing structured data graph`);
  if (/<form/i.test(html) && !/api\.js/.test(html) && file !== '404.html') issues.push(`${file}: api.js not loaded on a form page`);
  if (/React\.development|react-dom\.development/.test(html)) issues.push(`${file}: development React loaded`);
}

if (missing.length) issues.push(`Missing required files: ${missing.join(', ')}`);

if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}

console.log(`Site check passed for ${htmlFiles.length} HTML files.`);
