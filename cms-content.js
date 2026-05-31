// CMS-ready content (one place to edit copy for every detail page)
// Imported by every sub-page HTML — easy to swap in real CMS later.

window.CMS = {
  // ========== PRODUCT DETAIL PAGES ==========
  products: {
    tapstarter: {
      tag: 'Entry · From £49/mo',
      accent: '#F59E0B',
      title: 'TapStarter — instant spindle speeds, no CAM required.',
      intro: 'The fastest way to optimal feeds and speeds. Upload a tool combo. Get a safe operating range in seconds. Perfect for shops without a CAM seat — or as a sanity check before any job.',
      hero: 'assets/site-media/tap-starter-home.webp',
      meta: [['Tier', 'Entry'], ['Pricing', 'From £49 / month'], ['Format', 'Web app'], ['Requires CAM', 'No']],
      sections: [
        { id: 'overview', title: 'What is TapStarter?',
          body: `<p><strong>TapStarter</strong> is our entry-tier web app for any machine shop that needs reliable spindle speeds and feed rates — fast.</p>
<p>No installation. No CAM swap. No training. Open the app, enter your spindle, tool and material, and TapStarter gives you a verified operating range backed by AMRC physics models.</p>
<p>It's the perfect starting point if you want to feel SenseNC's value before committing to a full CAM integration. Many of our customers begin with TapStarter and graduate to SenseNC Feeds within a quarter.</p>` },
        { id: 'workflow', title: 'How it works',
          image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80',
          body: `<h3>1. Open the web app</h3><p>No download, no install. Works on any modern browser, on any device — including the tablet next to your machine.</p>
<h3>2. Enter your setup</h3><p>Spindle make and model, tool diameter and length, holder, material. Optional tap test for a precise digital twin.</p>
<h3>3. Get optimal feeds & speeds</h3><p>TapStarter returns a safe operating range — RPM, feed, depth of cut and stability margin — that respects your machine's true envelope.</p>` },
        { id: 'benefits', title: 'What you get',
          body: `<ul><li><strong>Faster setup</strong> — eliminate 30+ min of CAM tuning per job</li><li><strong>Longer tool life</strong> — operate inside the stability envelope from the first cut</li><li><strong>Lower scrap rate</strong> — first-time-right reduces costly retries</li><li><strong>No new software seat</strong> — runs in any browser, free trial</li><li><strong>AMRC-validated</strong> — same physics engine as our enterprise tier</li></ul>` },
        { id: 'usecases', title: "Who it's for",
          body: `<p>TapStarter is built for the realities of small and mid-sized shops:</p>
<ul><li>Job shops with high product variability</li><li>Sub-contract manufacturers without a dedicated CAM specialist</li><li>Programmers who want a fast second opinion</li><li>Apprentice training — safe, optimal cuts from day one</li></ul>
<blockquote>"We use TapStarter as a sanity check before every aerospace job. Saves us at least an hour of trial cuts." — UK aerospace job shop</blockquote>` },
        { id: 'pricing', title: 'Pricing',
          body: `<p><strong>From £49 per month, per shop</strong>. Includes:</p>
<ul><li>Unlimited spindle / tool / material combinations</li><li>One web-app seat (extra seats £19/mo)</li><li>Email support — 24-hour response</li><li>Monthly product updates</li></ul>
<p><strong>Free 30-day trial</strong> — no card required. Cancel anytime.</p>` },
      ],
    },

    feeds: {
      tag: 'Advanced · From £249/mo',
      accent: '#2250FC',
      title: 'SenseNC Feeds — toolpath optimisation inside your CAM.',
      intro: 'Plug SenseNC directly into Siemens NX or Mastercam. Optimised feeds and speeds for every move in your program — without changing the way your programmers work.',
      hero: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&q=80',
      meta: [['Tier', 'Advanced'], ['Pricing', 'From £249 / month'], ['Format', 'CAM plugin'], ['Compatible', 'Siemens NX, Mastercam']],
      sections: [
        { id: 'overview', title: 'What is SenseNC Feeds?',
          body: `<p><strong>SenseNC Feeds</strong> is our CAM-integrated feed-rate optimisation tool. It plugs into Siemens NX and Mastercam and sends every move in your program at the optimal feed.</p>
<p>The difference shows up immediately: faster cycles, longer tool life, cleaner surface finishes. And because it runs inside your existing CAM, your programmers stay productive on day one.</p>` },
        { id: 'integration', title: 'Native CAM integration',
          image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80',
          body: `<p>SenseNC Feeds installs as a plugin in your CAM environment — no separate license server, no file export ceremony, no workflow change.</p>
<h3>Siemens NX</h3><p>Adds an "Optimise feeds" panel to the operation view. Click optimise, and SenseNC analyses every toolpath move using your machine's verified physics model.</p>
<h3>Mastercam</h3><p>Lives as a chook accessible from the CAM toolbar. Same one-click optimisation, with output to the operation's feed override values.</p>` },
        { id: 'physics', title: 'AMRC-verified physics',
          body: `<p>Every optimisation runs through our digital-twin model — validated against thousands of recorded cuts at the AMRC at Sheffield.</p>
<ul><li>Spindle response modelling per make/model</li><li>Tool-holder dynamics (HSK, BT, Capto)</li><li>Material removal rate vs. surface finish trade-offs</li><li>Live stability lobes for each tool</li></ul>` },
        { id: 'roi', title: 'Typical ROI',
          body: `<p>Customers running SenseNC Feeds across a 5–10 machine fleet typically see:</p>
<ul><li><strong>40–50% cycle time reduction</strong> on 5-axis work</li><li><strong>38% longer average tool life</strong></li><li><strong>11% reduction in tooling spend</strong></li><li><strong>Payback in under 3 months</strong> on most fleets</li></ul>
<p>Try our <a href="roi-calculator.html">ROI calculator</a> to see what SenseNC Feeds would deliver in your shop.</p>` },
        { id: 'pricing', title: 'Pricing & deployment',
          body: `<p><strong>From £249/month, per machine</strong>. Volume pricing available for 5+ machines.</p>
<p>Includes:</p>
<ul><li>NX or Mastercam plugin (your choice)</li><li>Spindle and tool model library</li><li>Live optimisation dashboard</li><li>Phone and email support</li><li>Quarterly model updates from AMRC research</li></ul>` },
      ],
    },

    finesse: {
      tag: 'Full power · Enterprise',
      accent: '#189A39',
      title: 'SenseNC Finesse — digital twin. Zero chatter.',
      intro: 'The complete SenseNC platform — full toolpath optimisation, real-time chatter elimination, in-process monitoring. Used by Boeing, Siemens and AML Aerospace.',
      hero: 'assets/site-media/eliminate.webp',
      meta: [['Tier', 'Enterprise'], ['Pricing', 'Custom'], ['Format', 'Full platform + service'], ['Dedicated engineer', 'Yes']],
      sections: [
        { id: 'overview', title: 'The complete platform',
          body: `<p><strong>SenseNC Finesse</strong> is our flagship product. It combines everything in SenseNC Feeds with full digital-twin simulation, real-time chatter elimination and in-process monitoring.</p>
<p>For aerospace, energy and high-precision manufacturers, Finesse isn't an upgrade — it's the difference between hitting your delivery commitments and missing them.</p>` },
        { id: 'twin', title: 'Digital twin simulation',
          image: 'assets/digital-twin-infographic.svg',
          body: `<p>Finesse builds a physics-accurate digital twin of every machine, spindle, tool and holder in your fleet. The twin runs alongside the real machine, predicting chatter before it happens.</p>
<ul><li>Live stability lobes per tool</li><li>Spindle frequency response per machine</li><li>Multi-axis force prediction</li><li>Surface finish forecasting</li></ul>` },
        { id: 'chatter', title: 'Real-time chatter elimination',
          body: `<p>Where Feeds optimises before the cut, Finesse intervenes during it. Sensors on the spindle (or feed-rate overrides via Machine Tool Interface) keep every cut inside the stability envelope.</p>
<blockquote>"We eliminated chatter on our titanium aerospace parts and cut cycle time by 53%. That was the deciding moment for our fleet roll-out." — Dr Gareth Morgan, AML Aerospace</blockquote>` },
        { id: 'service', title: 'Dedicated AMRC engineer',
          body: `<p>Every Finesse deployment comes with a named application engineer from our AMRC team. They:</p>
<ul><li>Co-build your fleet's physics models</li><li>Run on-site tap testing and validation</li><li>Train your programmers and machinists</li><li>Provide ongoing optimisation reviews (monthly or quarterly)</li></ul>` },
        { id: 'pricing', title: 'Pricing',
          body: `<p>Finesse is a custom enterprise engagement. Typical deployments range £18,000–£75,000 per year depending on fleet size and service level.</p>
<p>Includes:</p>
<ul><li>Full SenseNC platform — Finesse + Feeds + TapStarter</li><li>Dedicated AMRC application engineer</li><li>On-site tap testing and validation</li><li>Custom integrations (MES, ERP, machine tool API)</li><li>Quarterly review and roadmap session</li></ul>
<p><a href="contact.html">Talk to engineering</a> to scope a deployment.</p>` },
      ],
    },
  },

  // ========== ABOUT SUB-PAGES ==========
  about: {
    story: {
      tag: 'Our story',
      accent: '#2250FC',
      title: 'From AMRC bench to 200+ shop floors.',
      intro: 'A decade of chatter-vibration research. A spin-out in 2019. A platform now running across aerospace, motorsport and precision manufacturing worldwide.',
      hero: 'assets/site-media/mp-visit-manufacturing-innovation.jpg',
      meta: [['Founded', '2019'], ['HQ', 'Rotherham, UK'], ['Origin', 'AMRC Sheffield'], ['Team', '24 engineers']],
      sections: [
        { id: 'origin', title: 'It started at AMRC',
          body: `<p>The Advanced Manufacturing Research Centre (AMRC) at the University of Sheffield has been the UK's home of chatter-vibration research for nearly two decades. Professors Erdem Ozturk and his team published the foundational work on stability lobes that the wider industry now relies on.</p>
<p>By 2018 the research had produced a tool good enough that aerospace and motorsport partners were asking for production access. The university spun the team out as Productive Machines in 2019.</p>` },
        { id: 'milestones', title: 'Milestones',
          body: `<h3>2019 — Spin-out</h3><p>Founded by Dr Cristina Sesma alongside the AMRC research team. First UK Innovation Programme grant secured.</p>
<h3>2021 — First customers</h3><p>SenseNC Feeds ships to Boeing and Siemens partner programmes. AMRC validation completed across 14 machine tools.</p>
<h3>2023 — Award recognition</h3><p>UKISF Manufacturing Innovation award. 50+ live machines across the UK and EU.</p>
<h3>2025 — NX integration</h3><p>Siemens publishes the official NX CAM integration. Over 200 deployments worldwide.</p>` },
        { id: 'now', title: 'Where we are now',
          image: 'assets/site-media/aml-entrance.png',
          body: `<p>Today, Productive Machines runs on more than 200 CNC machines across aerospace, motorsport, energy and medical manufacturing. The team has grown from four founders to 24 engineers, machinists and customer-success specialists. We're still based at the Advanced Manufacturing Park in Rotherham, less than a mile from the AMRC labs where the research started.</p>` },
      ],
    },

    vision: {
      tag: 'Our vision',
      accent: '#189A39',
      title: 'Best part. Faster. First time.',
      intro: 'Every CNC operator should have an expert on their shoulder — telling them exactly how hard to push, every cut, every job.',
      hero: 'assets/site-media/reduce-cycle-times.webp',
      sections: [
        { id: 'promise', title: 'Our promise',
          body: `<p>We make one promise to every customer: <strong>the best part, faster, first time</strong>. Every brand decision — colour, word, component, animation — should reinforce this promise. If it doesn't serve the machine shop, it doesn't belong.</p>
<blockquote>"The chatter is not the operator's fault. The machine has limits — most operators just have no way of knowing exactly where those limits are. We give them eyes." — Dr Cristina Sesma, CEO</blockquote>` },
        { id: 'principles', title: 'How we work',
          body: `<h3>Confident, never hedging</h3><p>"Eliminates chatter" — not "may help reduce". Every claim backed by a verified stat or case study.</p>
<h3>Outcome-first</h3><p>Lead with results. "53% faster cycle times." Features are the reason for the result — not the headline.</p>
<h3>Expert & human</h3><p>Use jargon in context. Always connect technical features to a clear business outcome your reader cares about.</p>` },
        { id: 'future', title: "Where we're going",
          body: `<p>By 2030 we want SenseNC to be the default — not a competitive advantage — for serious CNC machining. That means:</p>
<ul><li>Native integration with every major CAM platform</li><li>A physics model for every commercial spindle, tool and holder on the market</li><li>Real-time chatter elimination on machines worth £30k as well as machines worth £3m</li><li>An open ecosystem so machinists, tooling vendors and CAM houses can all build on the same foundation</li></ul>` },
      ],
    },

    technology: {
      tag: 'Technology',
      accent: '#2250FC',
      title: 'Physics + ML — productised.',
      intro: "A decade of chatter-vibration research, packaged so any programmer can run it. Here's how SenseNC actually works.",
      hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
      sections: [
        { id: 'physics', title: 'The physics',
          body: `<p>Chatter is a self-excited vibration phenomenon — the cutting force varies as the tool engages and disengages the workpiece, which feeds back into spindle motion, which changes the cutting force again.</p>
<p>The maths is well-understood — the challenge is solving it fast enough, for enough machines, to be useful on a shop floor. That's what we've built.</p>` },
        { id: 'twin', title: 'The digital twin',
          image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1600&q=80',
          body: `<p>For every machine in your fleet, we maintain a physics-accurate digital twin: spindle frequency response, holder dynamics, tool stick-out, workpiece fixturing. The twin runs alongside the real machine, predicting stability lobes for every operation.</p>
<ul><li>Spindle frequency response: measured via tap test or modelled from machine class</li><li>Tool dynamics: per-holder, per-stick-out, per-material</li><li>Workpiece compliance: factored into stability lobe calculation</li></ul>` },
        { id: 'ml', title: 'The machine learning layer',
          body: `<p>Where pure physics struggles — surface finish prediction, tool wear, multi-axis interference — we use ML models trained on thousands of recorded cuts at AMRC. Together with the physics core, this is what makes SenseNC accurate beyond textbook chatter prediction.</p>` },
        { id: 'compute', title: 'Compute',
          body: `<p>SenseNC runs millions of stability-lobe calculations per program. We use high-performance computing to do this in parallel — what used to take days of researcher time now ships in minutes inside your CAM.</p>` },
      ],
    },

    team: {
      tag: 'The team',
      accent: '#2250FC',
      title: 'Meet the team building autonomous machining.',
      intro: 'Researchers, software developers, machinists and commercial operators turning AMRC-grade machining intelligence into practical shop-floor results.',
      sections: [
        { id: 'leadership', title: 'Leadership',
          body: `<p><strong>Dr Cristina Sesma — Founder & CEO</strong>. PhD in machine tool dynamics, AMRC Sheffield. Previously led research engagement at AMRC.</p>
<p><strong>Prof Erdem Ozturk — Chief Scientist</strong>. Two decades of chatter-vibration research. Author of the foundational papers SenseNC is built on.</p>
<p><strong>Tomas Petrov — Head of Engineering</strong>. 15 years at Siemens PLM. Now leads the SenseNC product team.</p>
<p><strong>Markus Lindgren — VP Customer Success</strong>. Former CAM specialist at Volvo. Joined to bring Productive Machines to global aerospace.</p>` },
        { id: 'culture', title: 'How we work',
          body: `<h3>Engineers first</h3><p>Tiny PR-to-merge cycles. No design-by-committee. Every engineer is expected to talk to customers and visit shop floors.</p>
<h3>Built at AMRC</h3><p>We're still embedded in the AMRC ecosystem. Research flows in, products flow out, customer problems flow back to research.</p>
<h3>Hybrid by default</h3><p>Most of the team is in Rotherham 2–3 days a week. We support remote work for the rest — though we expect everyone in person for major releases and customer visits.</p>` },
        { id: 'join', title: 'Join us',
          body: `<p>We're hiring across engineering, R&D and customer success. <a href="careers.html">See open roles →</a></p>` },
      ],
    },
  },

  // ========== PARTNER SUB-PAGES ==========
  partners: {
    channel: {
      tag: 'Channel Partners',
      accent: '#2250FC',
      title: 'Resell SenseNC across your region.',
      intro: 'A growing global network of channel partners taking SenseNC to local machine shops with full Productive Machines support — training, co-marketing, technical handoff and revenue share.',
      hero: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80',
      meta: [['Programme', 'Tiered (Silver / Gold / Platinum)'], ['Revenue share', '20–40%'], ['Onboarding', '6-week sprint'], ['Markets', 'EMEA, NA, APAC']],
      sections: [
        { id: 'overview', title: 'Programme overview',
          body: `<p>The Productive Machines Channel Partner programme is built for resellers, distributors, integrators and consultants who serve the global CNC machining market. We offer three tiers — Silver, Gold and Platinum — with progressively richer support and margin as you grow.</p>` },
        { id: 'tiers', title: 'The three tiers',
          body: `<h3>Silver — getting started</h3><p>For first-year partners. 20% revenue share. Co-marketing kit, sales enablement, 1 product certification.</p>
<h3>Gold — established</h3><p>£250k+ booked. 30% revenue share. Lead share, joint webinars, 3 product certifications, named partner manager.</p>
<h3>Platinum — strategic</h3><p>£1M+ booked or strategic territory. 40% revenue share. Full product roadmap influence, joint engineering, co-marketing budget, exclusive territory option.</p>` },
        { id: 'enablement', title: 'Sales & technical enablement',
          body: `<p>Every partner gets a structured 6-week onboarding: product training, sales playbook, demo environment, joint customer call, AMRC lab visit. After onboarding, ongoing enablement runs monthly.</p>
<ul><li>Quarterly product certifications</li><li>Co-marketing fund (Gold+)</li><li>Lead-routing portal</li><li>24/7 partner support line</li></ul>` },
        { id: 'apply', title: 'How to apply',
          body: `<p>Channel applications open quarterly. We look for partners with existing customer relationships in CNC machining and a clear plan to add SenseNC to their portfolio.</p>
<p>Apply via <a href="become-a-partner.html">our partner form</a> — typical decision in 14 days.</p>` },
      ],
    },

    cam: {
      tag: 'CAM Integrations',
      accent: '#2250FC',
      title: 'SenseNC inside the CAM you already use.',
      intro: 'Native plugins for Siemens NX and Mastercam — with Fusion 360, hyperMILL and SolidCAM in development. SenseNC sits where your programmers already work.',
      hero: 'https://images.unsplash.com/photo-1551649446-46ed7e10c0fb?w=1600&q=80',
      meta: [['Live integrations', 'NX, Mastercam'], ['In development', 'Fusion 360, hyperMILL, SolidCAM'], ['Latency', '< 8 sec / program'], ['Format', 'Native plugin']],
      sections: [
        { id: 'nx', title: 'Siemens NX',
          image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80',
          body: `<p>SenseNC ships as a first-class plugin inside Siemens NX CAM, launched in 2025. The integration adds an "Optimise feeds" command to every operation — one click sends the toolpath to SenseNC, gets the optimised feeds back, and updates the operation in place.</p>
<ul><li>Available NX 2406 and later</li><li>No file export — direct API integration</li><li>Operation-level or program-level optimisation</li><li>Full audit trail per cut</li></ul>` },
        { id: 'mastercam', title: 'Mastercam',
          body: `<p>SenseNC Feeds runs as a chook accessible from the Mastercam toolbar. Same one-click optimisation as NX, with output to the operation's feed override values.</p>
<ul><li>Mastercam 2024 and later</li><li>Toolpath, operation or feature-level optimisation</li><li>Multi-machine routing supported</li></ul>` },
        { id: 'roadmap', title: 'Roadmap',
          body: `<p>Coming in 2026:</p>
<ul><li><strong>Fusion 360</strong> — beta Q2 2026, GA Q3</li><li><strong>hyperMILL</strong> — beta Q3 2026</li><li><strong>SolidCAM</strong> — exploring partnership</li><li><strong>Open API</strong> — for in-house CAM teams</li></ul>` },
      ],
    },

    research: {
      tag: 'Research Centres',
      accent: '#189A39',
      title: 'Built with AMRC. Trusted globally.',
      intro: 'SenseNC was born at the Advanced Manufacturing Research Centre at Sheffield, and we maintain active research partnerships with leading manufacturing institutes worldwide.',
      hero: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1600&q=80',
      sections: [
        { id: 'amrc', title: 'AMRC Sheffield',
          body: `<p>The Advanced Manufacturing Research Centre (AMRC) at the University of Sheffield is where the research that became SenseNC started, and remains our closest research partner. Every quarter we publish updates from the AMRC team back into the product.</p>
<ul><li>10+ years of chatter-vibration research</li><li>14 industrial machine tools used for validation</li><li>Joint PhD programme — 4 students currently active</li></ul>` },
        { id: 'partners', title: 'Other research partners',
          body: `<h3>Digital Catapult</h3><p>Co-funded UK Innovation Programme grants for digital twin research.</p>
<h3>UKISF (UK Industrial Strategy Fund)</h3><p>Supporting our Tier-2 expansion across UK manufacturing.</p>
<h3>Università di Roma</h3><p>Joint stability lobe research for ultra-high-speed milling.</p>` },
        { id: 'engage', title: 'Engage with our research',
          body: `<p>We welcome research collaboration on chatter vibrations, machine tool dynamics, surface finish prediction and ML-augmented physics models. <a href="contact.html">Get in touch</a> to discuss.</p>` },
      ],
    },

    trusted: {
      tag: 'Trusted by',
      accent: '#2250FC',
      title: 'Trusted by the manufacturers you trust.',
      intro: "Boeing, Siemens, AML Aerospace, Seco Tools and many more run Productive Machines across their fleets. Here's why.",
      hero: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&q=80',
      sections: [
        { id: 'aerospace', title: 'Aerospace',
          body: `<h3>Boeing</h3><p>Multi-site rollout across UK aerospace operations. Focus on titanium structural components and engine parts.</p>
<h3>AML Aerospace</h3><p>53% cycle time reduction on Ti-6Al-4V impellers. Featured customer of <a href="case-studies.html">our case studies</a>.</p>
<h3>Aerospace Accelerated</h3><p>Joint programme to bring SenseNC to UK aerospace supply chain SMEs.</p>` },
        { id: 'industrial', title: 'Industrial & motorsport',
          body: `<h3>Siemens</h3><p>Partner on the NX CAM integration. Internal deployment across Siemens Energy machining.</p>
<h3>Seco Tools</h3><p>Tooling integration partner. SenseNC models pre-loaded with Seco tooling library.</p>
<h3>Faber Präzision</h3><p>German precision shop using SenseNC across 12 5-axis machines.</p>` },
        { id: 'become', title: 'Become a customer',
          body: `<p>Send us a CAM file, a tool list or just a question. <a href="book-demo.html">Book a demo</a> — typical response within one working day.</p>` },
      ],
    },

    become: {
      tag: 'Become a partner',
      accent: '#189A39',
      title: 'Bring SenseNC to your customers.',
      intro: 'Co-marketing, training, technical support, revenue share. We help you close. Apply below — typical decision in 14 days.',
      sections: [
        { id: 'why', title: 'Why partner with us',
          body: `<ul><li><strong>Differentiated platform</strong> — SenseNC is the only CAM-native chatter-elimination tool with AMRC-validated physics</li><li><strong>Open commercial terms</strong> — 20–40% revenue share, no exclusivity, no lock-in</li><li><strong>Joint engineering</strong> — we ship products that close deals, not just demo</li><li><strong>Premium customer base</strong> — Boeing, Siemens, AML and growing</li></ul>` },
        { id: 'who', title: 'Who we partner with',
          body: `<p>We're actively recruiting in these categories:</p>
<ul><li>CAM resellers and distributors (especially NX, Mastercam, hyperMILL)</li><li>Machine tool dealers</li><li>Manufacturing consulting firms</li><li>Tooling distributors</li><li>Research centres and accelerators</li></ul>` },
        { id: 'process', title: 'The process',
          body: `<ol><li><strong>Apply</strong> — submit the form below</li><li><strong>Discovery call</strong> — 30 min, technical & commercial</li><li><strong>Joint pilot</strong> — one customer engagement to validate fit</li><li><strong>Onboarding</strong> — 6-week structured sprint</li><li><strong>Launch</strong> — co-marketing, lead share, full programme</li></ol>` },
      ],
      cta: { heading: 'Ready to apply?', sub: 'A short form. We come back to all applications within 14 days.' },
    },
  },

  // ========== RESOURCES SUB-PAGES ==========
  resources: {
    tapTesting: {
      tag: 'Tap Testing Hub',
      accent: '#2250FC',
      title: 'The chatter-free milling primer.',
      intro: 'Why tap testing unlocks 50% more performance from any spindle — and how to do it correctly in your shop. A 12-minute read, with diagrams.',
      hero: 'https://images.unsplash.com/photo-1581094488379-6f9e9f72b67d?w=1600&q=80',
      meta: [['Read time', '12 min'], ['Topic', 'Tap testing'], ['Skill level', 'Intermediate'], ['Updated', 'Oct 2025']],
      sections: [
        { id: 'why', title: 'Why tap test?',
          body: `<p>Every CNC spindle has a unique frequency response — a fingerprint that determines how it will react under cutting load. Without measuring that response, every feeds-and-speeds recommendation is essentially a guess based on machine class averages.</p>
<p>Tap testing measures the response directly. With it, SenseNC builds a digital twin that's accurate to within 2% of the real machine — and from there, every cut runs at the true envelope.</p>` },
        { id: 'how', title: 'How to do it',
          image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1600&q=80',
          body: `<h3>Equipment</h3><p>An instrumented hammer (we ship one), an accelerometer, and a laptop running our tap test app. The whole kit fits in a small case.</p>
<h3>The test</h3><p>Mount the tool in the spindle. Stick the accelerometer to the tool tip. Strike the tool with the hammer 5–10 times. The app captures the frequency response. Total time: 90 seconds.</p>
<h3>What you get</h3><p>A frequency response function (FRF) that fully characterises the spindle-tool-holder dynamics for that exact configuration.</p>` },
        { id: 'when', title: 'When to retest',
          body: `<ul><li>New spindle</li><li>New holder type</li><li>Significant change in tool stick-out</li><li>After major spindle maintenance or bearing replacement</li><li>Yearly health check (recommended)</li></ul>` },
        { id: 'next', title: 'Next steps',
          body: `<p>Want us to do a tap test on your machines? <a href="book-demo.html">Book a visit</a> — we travel UK-wide and EU on request.</p>` },
      ],
    },

    news: {
      tag: 'News & Blog',
      accent: '#2250FC',
      title: 'Field notes from the shop floor.',
      intro: 'Recent news, conference takeaways, engineering deep dives and product updates from across the SenseNC ecosystem.',
    },

    caseStudies: {
      tag: 'Case Studies',
      accent: '#189A39',
      title: 'Real shop-floor results.',
      intro: 'How real manufacturers cut cycle time, extended tool life, and unlocked machine capacity using SenseNC. Verified numbers, audited methodology.',
    },

    events: {
      tag: 'Events',
      accent: '#2250FC',
      title: 'Where to find us next.',
      intro: 'EMO Hannover, MACH 2026, MIC 2026 and AMRC open days — come see the platform live, talk to our engineers, and get a tap test on your tool.',
    },

    faq: {
      tag: 'FAQ',
      accent: '#2250FC',
      title: 'Common questions, answered.',
      intro: 'What CAM platforms we support, how SenseNC compares to alternatives, what tap testing involves, and how onboarding works.',
    },

    roi: {
      tag: 'ROI Calculator',
      accent: '#189A39',
      title: 'See what SenseNC pays back.',
      intro: 'Drag the sliders. Pick a tier. Get year-one value and ROI multiple, calculated using the same model we ship to customers. No email required.',
    },

    ebook: {
      tag: 'Free e-book',
      accent: '#2250FC',
      title: 'The Chatter-Free Shop.',
      intro: '28 pages on stability lobes, feeds & speeds, tap testing and the AMRC method. The primer we wish every machine shop had. Just your email — instant download.',
    },
  },
};
