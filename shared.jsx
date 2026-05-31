// Productive Machines — shared primitives v2
// SVG brand logo, sticky-up nav, hamburger menu, modals, fixed footer

const { useEffect, useRef, useState, createContext, useContext } = React;

// =============================================================
// REAL ASSETS
// =============================================================
const ASSETS = {
  hero: {
    cycle: 'assets/site-media/reduce-cycle-times.webp',
    eliminate: 'assets/site-media/eliminate.webp',
    tool: 'assets/site-media/extend-tool-life.webp',
  },
  tapStarter: 'assets/site-media/tap-starter-home.webp',
  newsletter: 'assets/site-media/cam-engineer-newsletter.png',
  aml: 'assets/aml-logo.svg',
  cnc: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1600&q=80',
  cnc2: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1600&q=80',
  cnc3: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1600&q=80',
  factory: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
  engineer: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=80',
  partners: [
    { name: 'Boeing', src: 'assets/partner-logos/boeing.png', whiteBg: true },
    { name: 'AE HorizonX', src: 'assets/partner-logos/ae-horizonx.png', whiteBg: false },
    { name: 'MSP', src: 'assets/partner-logos/msp.png', whiteBg: true },
    { name: 'MachineWorks', src: 'assets/partner-logos/machineworks.png', whiteBg: true, scale: 1.85 },
    { name: 'Aerospace Accelerated', src: 'assets/partner-logos/aerospace-accelerated.png', whiteBg: true },
    { name: 'Siemens', src: 'assets/partner-logos/siemens.png', whiteBg: true },
    { name: 'AMRC', src: 'assets/partner-logos/amrc.png', whiteBg: true },
    { name: 'Sandvik', src: 'assets/partner-logos/sandvik.png', whiteBg: true },
    { name: 'UKISF', src: 'assets/partner-logos/ukisf.png', whiteBg: true },
    { name: 'Seco Tools', src: 'assets/partner-logos/seco-tools.png', whiteBg: true },
    { name: 'Digital Catapult', src: 'assets/partner-logos/digital-catapult.png', whiteBg: false },
  ],
  blog: [
    { tag: 'News', date: 'Jul 2025', img: 'assets/site-media/mp-visit-manufacturing-innovation.jpg', title: 'Sarah Champion MP Visits to Witness Cutting-Edge Manufacturing Innovation', text: 'Sarah Champion, MP for Rotherham, visited Productive Machines to learn about the company\'s transformative impact on UK manufacturing and experience SenseNC™ firsthand.', href: 'news.html#sarah-champion-visit', slug: 'sarah-champion-visit' },
    { tag: 'Blog', date: 'Oct 2025', img: 'assets/site-media/mic-2025.png', title: 'Innovations in Aerospace Manufacturing and Key Takeaways', text: 'The 24th Machining Innovations Conference (MIC 2025) highlighted aerospace manufacturing advancements in sustainability, digitalization, and AI.', href: 'news.html#mic-2025', slug: 'mic-2025' },
    { tag: 'Case study', date: 'Aug 2025', img: 'assets/site-media/aml-entrance.png', title: 'AML\'s Success with Productive Machines', text: 'By maximising the efficiency of machine tools, Productive Machines empowers machinists to achieve superior quality parts faster and with greater precision.', href: 'case-studies.html#aml', slug: 'aml-case-study' },
  ],
};

// =============================================================
// HOOKS
// =============================================================
function useReveal(opts = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    // Immediate check — if element is already on/near the screen, reveal right away
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.95 && r.bottom > 0) {
      requestAnimationFrame(() => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: opts.threshold ?? 0.14, rootMargin: opts.rootMargin ?? '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}
function useCountUp(target, trigger, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now(); let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return val;
}

// =============================================================
// BRAND LOGO (from SVG file)
// =============================================================
function BrandLogo({ height = 40, white = false }) {
  return (
    <a href="index.html" aria-label="Productive Machines" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
      <img className="logo-img"
        src={white ? 'assets/logo-white.svg' : 'assets/logo.svg'}
        alt="Productive Machines"
        style={{ height, width: 'auto' }} />
    </a>
  );
}

// =============================================================
// WORD-REVEAL HEADLINE
// =============================================================
function WordReveal({ text, as = 'h1', style, className = '' }) {
  const ref = useReveal();
  const Tag = as;
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={`word-reveal ${className}`} style={style}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w"><span>{w}</span></span>
          {i < words.length - 1 && <span className="sp"> </span>}
        </React.Fragment>
      ))}
    </Tag>
  );
}

// =============================================================
// ICONS
// =============================================================
const Icon = {
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7" /></svg>,
  arrowR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6" /></svg>,
  arrowL: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6" /></svg>,
  arrowUR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17L17 7M9 7h8v8" /></svg>,
  star: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21l1.7-7L2 9.2l7.1-.6L12 2z" /></svg>,
  chev: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6" /></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12l5 5L20 6" /></svg>,
  play: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5v14l11-7z" /></svg>,
  pause: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>,
  download: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12M6 11l6 6 6-6M4 21h16" /></svg>,
  user: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="7" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>,
  grid: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
  li: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 19H5V8h3v11zM6.5 6.7c-1 0-1.7-.7-1.7-1.6S5.6 3.5 6.5 3.5s1.7.7 1.7 1.6-.7 1.6-1.7 1.6zM19 19h-3v-5.6c0-1.4-.6-1.9-1.4-1.9-.9 0-1.6.7-1.6 1.9V19h-3V8h2.8v1.5c.3-.6 1.2-1.5 2.7-1.5 1.7 0 3.5 1 3.5 4V19z" /></svg>,
  yt: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23 12s0-3.7-.5-5.4c-.3-.9-1-1.7-2-1.9C18.8 4.2 12 4.2 12 4.2s-6.8 0-8.5.5c-.9.2-1.7 1-2 1.9C1 8.3 1 12 1 12s0 3.7.5 5.4c.3.9 1 1.7 2 1.9 1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5c.9-.2 1.7-1 2-1.9.5-1.7.5-5.4.5-5.4zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" /></svg>,
  close: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>,
  mail: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7h18v12H3zM3 7l9 7 9-7" /></svg>,
};

// =============================================================
// MENU CONFIG
// =============================================================
const MENU = [
  {
    label: 'Products', href: 'products.html',
    columns: [
      { h: 'SenseNC Suite', items: [
        { name: 'SenseNC Finesse', desc: 'Digital twin. Zero chatter.', href: 'sensenc-finesse.html' },
        { name: 'SenseNC Feeds', desc: 'CAM-integrated feed optimisation.', href: 'sensenc-feeds.html' },
        { name: 'TapStarter', desc: 'Instant spindle speeds, no CAM.', href: 'tapstarter.html' },
      ] },
      { h: 'See it work', items: [
        { name: 'Compare tiers', desc: 'Pick the right tool for your shop.', href: 'products.html#compare' },
        { name: 'Book a demo', desc: 'A 30-min tailored session.', href: 'contact.html' },
        { name: 'ROI calculator', desc: 'Estimate your year-one value.', href: 'roi-calculator.html' },
      ] },
    ],
    feature: { title: 'Now in Siemens NX', text: 'SenseNC integrates directly into NX CAM — optimise inside your existing workflow.', cta: 'Read the announcement', href: 'news.html' },
  },
  {
    label: 'Partners', href: 'partners.html',
    columns: [
      { h: 'Partner programs', items: [
        { name: 'Channel Partners', desc: 'Resell SenseNC in your region.', href: 'channel-partners.html' },
        { name: 'CAM Integrations', desc: 'NX, Mastercam, more coming.', href: 'cam-integrations.html' },
        { name: 'Research Centres', desc: 'AMRC and academic partners.', href: 'research-centres.html' },
      ] },
      { h: 'Discover', items: [
        { name: 'Trusted by', desc: 'See who runs Productive Machines.', href: 'trusted-by.html' },
        { name: 'Become a partner', desc: 'Apply to join the program.', href: 'become-a-partner.html' },
        { name: 'Co-marketing', desc: 'Joint go-to-market support.', href: 'become-a-partner.html#co-marketing' },
      ] },
    ],
    feature: { title: 'Become a partner', text: 'Bring SenseNC to your customers — co-marketing, training, technical support and revenue share.', cta: 'Apply now', href: 'become-a-partner.html' },
  },
  {
    label: 'Resources', href: 'resources.html',
    columns: [
      { h: 'Learn', items: [
        { name: 'Tap Testing Hub', desc: 'The chatter-free milling primer.', href: 'tap-testing-hub.html' },
        { name: 'News & Blogs', desc: 'Field notes & engineering posts.', href: 'news.html' },
        { name: 'Case Studies', desc: 'Real shop-floor results.', href: 'case-studies.html' },
      ] },
      { h: 'Tools', items: [
        { name: 'ROI Calculator', desc: 'See payback on your fleet.', href: 'roi-calculator.html' },
        { name: 'Events', desc: 'Where to find us next.', href: 'events.html' },
        { name: 'FAQ', desc: 'Common questions answered.', href: 'faq.html' },
      ] },
    ],
    feature: { title: 'Free e-book', text: '"The chatter-free shop" — 28 pages on stability lobes, feeds & speeds, and the AMRC method.', cta: 'Download free', href: 'ebook.html' },
  },
  {
    label: 'About', href: 'about.html',
    columns: [
      { h: 'About us', items: [
        { name: 'Our Story', desc: 'AMRC spin-out · Rotherham UK.', href: 'our-story.html' },
        { name: 'Vision', desc: 'Best part. Faster. First time.', href: 'vision.html' },
        { name: 'Technology', desc: 'Physics + ML behind SenseNC.', href: 'technology.html' },
      ] },
      { h: 'Get in touch', items: [
        { name: 'Team', desc: 'Meet the engineers.', href: 'team.html' },
        { name: 'Careers', desc: "We're hiring.", href: 'careers.html' },
        { name: 'Contact us', desc: 'Talk to a SenseNC engineer.', href: 'contact.html' },
      ] },
    ],
    feature: { title: 'Visit our HQ', text: 'Advanced Manufacturing Park, Technology Centre, Rotherham S60 5WG — UK.', cta: 'Book a visit', href: 'contact.html' },
  },
];

// =============================================================
// MODAL primitives
// =============================================================
function Modal({ open, onClose, children, maxWidth = 480 }) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('body-locked');
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('body-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon.close style={{ width: 16, height: 16 }} />
        </button>
        {children}
      </div>
    </div>
  );
}

function LoginModal({ open, onClose }) {
  const [step, setStep] = useState(0); // 0=email, 1=password, 2=success
  const [email, setEmail] = useState('');
  return (
    <Modal open={open} onClose={() => { onClose(); setTimeout(() => setStep(0), 300); }}>
      <div style={{ marginBottom: 20 }}>
        <BrandLogo height={36} />
      </div>
      {step === 0 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <h2 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 26, margin: 0, letterSpacing: '-0.02em' }}>Sign in to your account</h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>Enter your work email — we'll send you a sign-in link.</p>
          <div className="field-light" style={{ marginTop: 6 }}>
            <label>Work email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@yourshop.com" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px 20px' }}>Continue <Icon.arrow className="arr" /></button>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
            New to Productive Machines? <a href="book-demo.html" style={{ color: 'var(--blue)', borderBottom: '1px solid var(--blue)' }}>Book a demo</a>
          </p>
        </form>
      )}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <button type="button" onClick={() => setStep(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: 13, alignSelf: 'flex-start' }}>
            <Icon.arrowL style={{ width: 14, height: 14 }} /> Back
          </button>
          <h2 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 24, margin: 0, letterSpacing: '-0.02em' }}>Check your email</h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>We sent a one-time code to <strong>{email || 'your email'}</strong>. Paste it below.</p>
          <div className="field-light"><label>One-time code</label><input type="text" required maxLength={6} placeholder="000000" /></div>
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px 20px' }}>Sign in <Icon.arrow className="arr" /></button>
        </form>
      )}
      {step === 2 && (
        <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(24,154,57,.12)', color: 'var(--green)', display: 'grid', placeItems: 'center' }}>
            <Icon.check style={{ width: 32, height: 32 }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 24, margin: 0 }}>Signed in</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>Redirecting you to the app…</p>
        </div>
      )}
    </Modal>
  );
}

function AccessAppsModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const apps = [
    { name: 'TapStarter', desc: 'Web app. Optimal spindle speeds in seconds.', href: 'tapstarter.html', tone: '#F59E0B' },
    { name: 'SenseNC Feeds', desc: 'NX & Mastercam plugin. Feed-rate optimisation.', href: 'sensenc-feeds.html', tone: '#2250FC' },
    { name: 'SenseNC Finesse', desc: 'Enterprise. Full toolpath + chatter elimination.', href: 'sensenc-finesse.html', tone: '#189A39' },
  ];
  return (
    <Modal open={open} onClose={() => { onClose(); setTimeout(() => setStep(0), 300); }} maxWidth={560}>
      <div style={{ marginBottom: 20 }}>
        <BrandLogo height={36} />
      </div>
      {step === 0 && (
        <>
          <h2 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 26, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Access your apps</h2>
          <p style={{ margin: '0 0 20px', color: 'var(--muted)', fontSize: 14 }}>
            Pick which Productive Machines app you want to open.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {apps.map(a => (
              <a key={a.name} href={a.href} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 16,
                border: '1px solid #EEEEEE', borderRadius: 12, transition: 'all .2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = a.tone; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EEEEEE'; e.currentTarget.style.transform = 'none'; }}>
                <span style={{ width: 40, height: 40, borderRadius: 10, background: `${a.tone}18`, color: a.tone, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon.grid style={{ width: 18, height: 18 }} />
                </span>
                <span style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: 16, color: '#000' }}>{a.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{a.desc}</div>
                </span>
                <Icon.arrowR style={{ width: 18, height: 18, color: '#000', opacity: 0.4 }} />
              </a>
            ))}
          </div>
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid #EEEEEE', textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
            Don't have access yet? <a href="book-demo.html" style={{ color: 'var(--blue)', borderBottom: '1px solid var(--blue)' }}>Book a demo</a>
          </div>
        </>
      )}
    </Modal>
  );
}

function EbookModal({ open, onClose }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await window.PM.submitLead(e.currentTarget);
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal open={open} onClose={() => { onClose(); setTimeout(() => setDone(false), 300); }} maxWidth={520}>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <BrandLogo height={32} />
      </div>
      {!done ? (
        <form data-lead-type="download" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
          <div style={{
            display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'center',
            padding: 16, background: '#f8f8f8', borderRadius: 12,
          }}>
            <div style={{
              width: 56, height: 72, borderRadius: 6, background: 'linear-gradient(135deg, #2250FC, #144A9A)',
              display: 'grid', placeItems: 'center', color: '#fff', position: 'relative',
            }}>
              <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 8, letterSpacing: '0.1em', textAlign: 'center', padding: '0 4px' }}>THE CHATTER-FREE SHOP</div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>Free · PDF · 28 pages</div>
              <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 17, color: '#000', letterSpacing: '-0.015em' }}>The Chatter-Free Shop</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>Stability lobes, feeds & speeds, the AMRC method.</div>
            </div>
          </div>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>Just your email — we'll send it instantly. No spam. Unsubscribe anytime.</p>
          <div className="field-light"><label>Work email</label><input name="email" type="email" required placeholder="jane@yourshop.com" /></div>
          {error && <p role="alert" style={{ color: '#B42318', fontSize: 13, margin: 0 }}>{error}</p>}
          <button type="submit" disabled={submitting} className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px 20px', opacity: submitting ? 0.7 : 1 }}>
            <Icon.download style={{ width: 16, height: 16 }} /> {submitting ? 'Sending...' : 'Download free'}
          </button>
          <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
            By downloading you agree to our <a href="privacy.html" style={{ color: 'var(--blue)' }}>privacy policy</a>.
          </div>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(24,154,57,.12)', color: 'var(--green)', display: 'grid', placeItems: 'center' }}>
            <Icon.check style={{ width: 32, height: 32 }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 22, margin: 0 }}>Check your inbox</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>
            We've emailed you the e-book. If it's not there in 2 minutes, check your spam folder.
          </p>
        </div>
      )}
    </Modal>
  );
}

// =============================================================
// MODAL CONTEXT (so any button can open a modal)
// =============================================================
const ModalCtx = createContext({});
function useModals() { return useContext(ModalCtx); }

function ModalProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [apps, setApps] = useState(false);
  const [ebook, setEbook] = useState(false);
  return (
    <ModalCtx.Provider value={{
      openLogin: () => setLogin(true),
      openApps: () => setApps(true),
      openEbook: () => setEbook(true),
    }}>
      {children}
      <LoginModal open={login} onClose={() => setLogin(false)} />
      <AccessAppsModal open={apps} onClose={() => setApps(false)} />
      <EbookModal open={ebook} onClose={() => setEbook(false)} />
    </ModalCtx.Provider>
  );
}

// =============================================================
// TOP UTILITY BAR
// =============================================================
function TopBar() {
  const modals = useModals();
  const linkStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    color: '#fff', opacity: 0.82, padding: '4px 8px', borderRadius: 4,
    transition: 'opacity .15s, background .15s',
    fontSize: 13,
  };
  return (
    <div className="topbar-root" style={{
      background: '#000', color: '#fff',
      fontSize: 13, fontFamily: 'var(--font)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        maxWidth: 1600, margin: '0 auto',
        padding: '8px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
      }} className="topbar-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#189A38', boxShadow: '0 0 0 4px rgba(24,154,57,.18)' }} />
          <span style={{ opacity: 0.85 }}>
            New: <a href="news.html" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>Siemens publishes NX CAM integration with SenseNC →</a>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="topbar-actions">
          <button onClick={modals.openEbook} style={linkStyle}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.background = 'transparent'; }}>
            <Icon.download style={{ width: 14, height: 14 }} />
            Download free e-book
          </button>
          <span style={{ opacity: 0.3 }}>·</span>
          <button onClick={modals.openApps} style={linkStyle}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.background = 'transparent'; }}>
            <Icon.grid style={{ width: 14, height: 14 }} />
            Access apps
          </button>
          <span style={{ opacity: 0.3 }}>·</span>
          <button onClick={modals.openLogin} style={linkStyle}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.background = 'transparent'; }}>
            <Icon.user style={{ width: 14, height: 14 }} />
            Login
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .topbar-inner > div:first-child { display: none !important; }
          .topbar-inner { justify-content: center !important; padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </div>
  );
}

// =============================================================
// NAV — sticky, hides on scroll down, shows on scroll up
// =============================================================
function Nav() {
  const [openIdx, setOpenIdx] = useState(null);
  const closeT = useRef(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 80) { setHidden(false); lastY.current = y; return; }
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      if (delta > 0) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    if (mobileOpen) document.body.classList.add('body-locked');
    else document.body.classList.remove('body-locked');
  }, [mobileOpen]);

  const open = (i) => { clearTimeout(closeT.current); setOpenIdx(i); };
  const scheduleClose = () => { closeT.current = setTimeout(() => setOpenIdx(null), 200); };

  return (
    <div className={`nav-root ${hidden && !mobileOpen ? 'is-hidden' : ''}`}>
      <TopBar />
      <header style={{
        background: '#fff',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid #EEEEEE',
        boxShadow: scrolled ? '0 6px 24px -16px rgba(0,0,0,0.10)' : 'none',
        transition: 'all 0.25s ease',
      }}>
        <div style={{
          maxWidth: 1600, margin: '0 auto',
          padding: '12px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
        }} className="nav-inner">
          <BrandLogo height={42} />

          <nav className="nav-desktop" onMouseLeave={scheduleClose}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {MENU.map((m, i) => (
              <a key={m.label} href={m.href}
                onMouseEnter={() => open(i)}
                style={{
                  padding: '10px 16px',
                  fontFamily: 'var(--font)', fontWeight: 500, fontSize: 15,
                  color: '#000', display: 'inline-flex', alignItems: 'center', gap: 6,
                  borderRadius: 6, background: openIdx === i ? '#f5f5f5' : 'transparent',
                  transition: 'background .2s',
                }}>
                {m.label}
                <Icon.chev style={{ width: 12, height: 12, opacity: 0.5, transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }} />
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="nav-cta-desktop">
            <a href="contact.html" className="btn btn-secondary" style={{ padding: '10px 16px', fontSize: 14 }}>Talk to us</a>
            <a href="book-demo.html" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 14 }}>Book demo</a>
          </div>

          <button className={`hamburger ${mobileOpen ? 'is-open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            <img className="hamburger-menu-icon" src="assets/material-symbols_menu.svg" alt="" aria-hidden="true" />
            <span className="hamburger-close-line" /><span className="hamburger-close-line" />
          </button>
        </div>

        {/* Mega menu (desktop) */}
        {openIdx !== null && !mobileOpen && (
          <div onMouseEnter={() => open(openIdx)} onMouseLeave={scheduleClose}
            className="mega-panel"
            style={{
              position: 'absolute', left: 0, right: 0, top: '100%',
              background: '#fff',
              borderTop: '1px solid #EEEEEE',
              borderBottom: '1px solid #EEEEEE',
              boxShadow: '0 24px 48px -24px rgba(0,0,0,0.12)',
              animation: 'slideDown .25s cubic-bezier(.2,.7,.2,1)',
            }}>
            <MegaPanel menu={MENU[openIdx]} />
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-head">
            <span>Menu</span>
            <span>{MENU.length} sections</span>
          </div>
          {MENU.map((m, i) => (
            <details key={m.label} className="mobile-menu-section" open={i === 0}>
              <summary>
                {m.label}
                <Icon.chev className="ham-chev" style={{ width: 18, height: 18 }} />
              </summary>
              <div style={{ paddingTop: 8 }}>
                {m.columns.flatMap(c => c.items).map(it => (
                  <a key={it.name} href={it.href} className="mobile-menu-sublink">{it.name}</a>
                ))}
              </div>
            </details>
          ))}
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="contact.html" className="btn btn-secondary" style={{ justifyContent: 'center', padding: '14px 20px' }}>Talk to us</a>
            <a href="book-demo.html" className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px 20px' }}>Book a demo <Icon.arrow className="arr" /></a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) { .nav-inner { padding: 12px 20px !important; } }
      `}</style>
    </div>
  );
}

function MegaPanel({ menu }) {
  return (
    <div style={{
      maxWidth: 1600, margin: '0 auto', padding: '40px 32px 44px',
      display: 'grid', gridTemplateColumns: '1fr 1fr 1.1fr', gap: 56,
    }}>
      {menu.columns.map((col, i) => (
        <div key={i}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#000', opacity: 0.55, marginBottom: 18 }}>{col.h}</div>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {col.items.map(it => (
              <li key={it.name}>
                <a href={it.href} className="mega-link" style={{
                  display: 'block', padding: '12px 14px', margin: '0 -14px',
                  borderRadius: 8, transition: 'background .2s',
                }}>
                  <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: 16, color: '#000', marginBottom: 2 }}>{it.name}</div>
                  <div style={{ fontSize: 13, color: '#000', opacity: 0.6 }}>{it.desc}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <a href={menu.feature.href} style={{
        background: 'linear-gradient(135deg, #2250FC, #144A9A)',
        color: '#fff', borderRadius: 14, padding: 28,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        textAlign: 'left', alignItems: 'flex-start',
        position: 'relative', overflow: 'hidden', minHeight: 200,
      }}>
        <div aria-hidden style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 12 }}>Featured</div>
          <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.15 }}>{menu.feature.title}</div>
          <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.9, margin: 0 }}>{menu.feature.text}</p>
        </div>
        <div style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font)', fontWeight: 600, fontSize: 14, position: 'relative', alignSelf: 'flex-start', textAlign: 'left' }}>
          {menu.feature.cta} <Icon.arrow style={{ width: 14, height: 14 }} />
        </div>
      </a>
    </div>
  );
}

// Reserve top padding for fixed nav
function NavSpacer() {
  return <div className="nav-spacer">
    <style>{`
      .nav-spacer { height: 116px; }
      @media (max-width: 800px) { .nav-spacer { height: 67px; } }
    `}</style>
  </div>;
}

// =============================================================
// FOOTER — fixed letter-spacing
// =============================================================
function Footer() {
  const ref = useReveal();
  return (
    <footer ref={ref} data-reveal style={{
      background: '#2250FC', color: '#fff', padding: '88px 0 32px', position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 90% 0%, rgba(255,255,255,0.08), transparent 50%)' }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr)', gap: 56, paddingBottom: 56 }} className="footer-grid">
          <div>
            <BrandLogo height={50} white />
            <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', maxWidth: 320 }}>
              Advanced Manufacturing Park<br />
              Technology Centre<br />
              Rotherham, S60 5WG · UK
            </p>
            <p style={{ marginTop: 12, fontSize: 14 }}>
              <a href="mailto:hello@productivemachines.co.uk" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>hello@productivemachines.co.uk</a>
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              <a href="https://www.linkedin.com/company/productivemachines/" aria-label="LinkedIn" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', transition: 'background .2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}>
                <Icon.li style={{ width: 16, height: 16 }} />
              </a>
              <a href="https://www.youtube.com/@productivemachines" aria-label="YouTube" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', transition: 'background .2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}>
                <Icon.yt style={{ width: 18, height: 18 }} />
              </a>
            </div>
          </div>
          {[
            { h: 'Products', links: [['SenseNC Finesse', 'sensenc-finesse.html'], ['SenseNC Feeds', 'sensenc-feeds.html'], ['TapStarter', 'tapstarter.html'], ['Compare tiers', 'products.html#compare'], ['Explore all', 'products.html']] },
            { h: 'Partners', links: [['Channel Partners', 'channel-partners.html'], ['CAM Integrations', 'cam-integrations.html'], ['Research Centres', 'research-centres.html'], ['Trusted by', 'trusted-by.html'], ['Become a partner', 'become-a-partner.html']] },
            { h: 'Resources', links: [['Tap Testing Hub', 'tap-testing-hub.html'], ['News & Blogs', 'news.html'], ['Case Studies', 'case-studies.html'], ['Events', 'events.html'], ['ROI Calculator', 'roi-calculator.html'], ['FAQ', 'faq.html'], ['Free e-book', 'ebook.html']] },
            { h: 'About us', links: [['Our Story', 'our-story.html'], ['Vision', 'vision.html'], ['Technology', 'technology.html'], ['Team', 'team.html'], ['Careers', 'careers.html'], ['Contact us', 'contact.html']] },
          ].map(g => (
            <div key={g.h}>
              <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 18 }}>{g.h}</div>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {g.links.map(([name, href]) => (
                  <li key={name}><a href={href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.92'}>{name}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big wordmark watermark — fixed letter spacing */}
        <div aria-hidden style={{
          fontFamily: 'var(--font)', fontWeight: 800,
          fontSize: 'clamp(80px, 18vw, 268px)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.95)',
          padding: '24px 0',
          textAlign: 'left',
          textWrap: 'balance',
        }}>
          Productive Machines.
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.20)', margin: '16px 0 24px' }} />

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, color: 'rgba(255,255,255,0.85)', flexWrap: 'wrap', gap: 18,
        }} className="footer-bottom">
          <div>© 2026 Productive Machines Ltd · All rights reserved</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="privacy.html" style={{ color: '#fff' }}>Privacy Policy</a>
            <a href="terms.html" style={{ color: '#fff' }}>Terms & Conditions</a>
            <a href="cookies.html" style={{ color: '#fff' }}>Cookies</a>
          </div>
          <div style={{ opacity: 0.8 }}>AMRC spin-out · Rotherham, UK</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// =============================================================
// Generic page hero (reusable across detail pages)
// =============================================================
function PageHero({ tag, headline, subhead, accent = '#2250FC', image, dark = false, animated = true }) {
  return (
    <section className="page-hero-premium" style={{
      background: dark ? '#0a0a0a' : '#fff', color: dark ? '#fff' : '#000',
      padding: '80px 0 80px', position: 'relative', overflow: 'hidden',
    }} data-screen-label="P · Hero">
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: dark
          ? `radial-gradient(ellipse 50% 60% at 100% 0%, ${accent}30, transparent 60%)`
          : `radial-gradient(ellipse 50% 60% at 100% 0%, ${accent}15, transparent 60%)`,
      }} />
      <div className="container" style={{ position: 'relative', maxWidth: 1240 }}>
        <div className="page-hero-signal" aria-hidden="true">
          <span>AMRC verified</span>
          <span>CAM-native</span>
          <span>Shop-floor proof</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: image ? '1.2fr 1fr' : '1fr', gap: 64, alignItems: 'center' }} className="page-hero-grid">
          <div>
            <span className="tagline" style={{ color: accent, fontWeight: 500 }}>{tag}</span>
            {animated ? (
              <WordReveal text={headline} as="h1"
                style={{
                  fontFamily: 'var(--font)', fontWeight: 700,
                  fontSize: 'clamp(36px, 5.4vw, 88px)',
                  lineHeight: 1.0, letterSpacing: '-0.03em',
                  margin: '14px 0 22px', textWrap: 'balance',
                }} />
            ) : (
              <h1 style={{
                fontFamily: 'var(--font)', fontWeight: 700,
                fontSize: 'clamp(36px, 5.4vw, 88px)',
                lineHeight: 1.02, letterSpacing: '-0.03em',
                margin: '14px 0 22px', textWrap: 'balance',
              }}>{headline}</h1>
            )}
            <p style={{ fontSize: 20, lineHeight: 1.5, opacity: dark ? 0.85 : 0.75, margin: 0, maxWidth: 640, textWrap: 'pretty' }}>{subhead}</p>
          </div>
          {image && (
            <div className="img-reveal" ref={useReveal()} data-reveal style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .page-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, {
  ASSETS, MENU,
  useReveal, useInView, useCountUp,
  BrandLogo, Icon, WordReveal,
  TopBar, Nav, NavSpacer, Footer,
  Modal, ModalProvider, useModals,
  LoginModal, AccessAppsModal, EbookModal,
  PageHero,
});
