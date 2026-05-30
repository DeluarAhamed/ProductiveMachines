// SHARED PAGE TEMPLATES — Resources, Partners, Careers
const { useState: useStatePG, useEffect: useEffectPG } = React;

// =============================================================
// Generic page hero
// =============================================================
function PageHero({ tag, headline, subhead, accent = '#2250FC' }) {
  return (
    <section className="page-hero-premium" style={{
      background: '#fff', padding: '140px 0 80px',
      position: 'relative', overflow: 'hidden',
    }} data-screen-label="P · Hero">
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 50% 60% at 100% 0%, ${accent}15, transparent 60%)`,
      }} />
      <div className="container" style={{ position: 'relative', maxWidth: 1240 }}>
        <div className="page-hero-signal" aria-hidden="true">
          <span>AMRC verified</span>
          <span>UK manufacturing</span>
          <span>Physics-led optimisation</span>
        </div>
        <span className="tagline" style={{ color: accent, fontWeight: 500 }}>{tag}</span>
        <WordReveal
          text={headline}
          as="h1"
          style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(48px, 6.4vw, 104px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            margin: '14px 0 24px', color: '#000', textWrap: 'balance', maxWidth: 1080,
          }}
        />
        <p style={{ fontSize: 22, lineHeight: 1.5, color: '#000', opacity: 0.78, margin: 0, maxWidth: 720, textWrap: 'pretty' }}>
          {subhead}
        </p>
      </div>
    </section>
  );
}

// =============================================================
// PARTNERS page
// =============================================================
function PartnersGroups() {
  const groups = [
    {
      id: 'channel',
      title: 'Channel Partners',
      text: 'Resell SenseNC in your region with co-marketing, training and revenue share.',
      logos: ASSETS.partners.slice(0, 6),
    },
    {
      id: 'cam',
      title: 'CAM Integrations',
      text: 'SenseNC ships native plugins for Siemens NX and Mastercam — with more in flight.',
      logos: ASSETS.partners.slice(5, 9),
    },
    {
      id: 'research',
      title: 'Research Centres',
      text: 'Built at AMRC. Partnerships across the UK, EU and North American research community.',
      logos: ASSETS.partners.slice(3, 7),
    },
  ];

  return (
    <section style={{ background: '#fff', padding: '40px 0 120px' }} data-screen-label="P · Groups">
      <div className="container">
        {groups.map((g, i) => (
          <div key={g.id} id={g.id} className="partner-group" style={{
            padding: '64px 0',
            borderTop: i ? '1px solid #EEEEEE' : 'none',
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'flex-start',
          }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#000', opacity: 0.55 }}>
                {String(i + 1).padStart(2, '0')} / 03
              </div>
              <h2 style={{
                fontFamily: 'Host Grotesk', fontWeight: 700,
                fontSize: 'clamp(32px, 3.6vw, 52px)',
                lineHeight: 1.05, letterSpacing: '-0.025em',
                margin: '12px 0 16px', color: '#000', textWrap: 'balance',
              }}>{g.title}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: '#000', opacity: 0.78, margin: 0, maxWidth: 380 }}>{g.text}</p>
              <a href="contact.html" className="btn-link" style={{ marginTop: 20, display: 'inline-flex' }}>
                Become a partner <Icon.arrow className="arr" style={{ width: 14, height: 14 }} />
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="partner-logos-grid">
              {g.logos.map(l => <PartnerCard key={l.name} {...l} />)}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .partner-group { grid-template-columns: 1fr !important; gap: 32px !important; }
          .partner-logos-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .partner-logos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PartnerCard({ name, src }) {
  const [ok, setOk] = useStatePG(true);
  return (
    <div className="partner-tile" aria-label={name}>
      {ok ? (
        <img src={src} alt={name} onError={() => setOk(false)} />
      ) : (
        <div style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 18, color: '#000', letterSpacing: '-0.01em', textAlign: 'center' }}>{name}</div>
      )}
    </div>
  );
}

function PartnersCTA() {
  return (
    <section style={{
      background: '#2250FC', color: '#fff', padding: '96px 0', position: 'relative', overflow: 'hidden',
    }} data-screen-label="P · CTA">
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 60% at 0% 100%, rgba(255,255,255,0.15), transparent 60%)',
      }} />
      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 880 }}>
        <h2 style={{
          fontFamily: 'Host Grotesk', fontWeight: 700,
          fontSize: 'clamp(40px, 5vw, 76px)',
          lineHeight: 1.0, letterSpacing: '-0.035em',
          margin: '0 0 20px', color: '#fff', textWrap: 'balance',
        }}>
          Bring SenseNC to your customers.
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', margin: '0 auto 32px', maxWidth: 560 }}>
          Co-marketing, training, technical support and revenue share. We'll help you close.
        </p>
        <a href="contact.html" className="btn btn-primary" style={{ background: '#fff', color: '#2250FC', padding: '14px 24px' }}>
          Apply now <Icon.arrow className="arr" />
        </a>
      </div>
    </section>
  );
}

// =============================================================
// RESOURCES page (catch-all for News, Case Studies, FAQ, Events, Tap Testing Hub, ROI)
// =============================================================
function ResourcesGrid() {
  const cards = [
    {
      tag: 'Tap Testing Hub', title: 'The chatter-free milling primer',
      text: 'Why tap testing unlocks 50% more performance from any spindle. A 12-minute read with diagrams.',
      tone: 'blue', href: 'tap-testing-hub.html',
    },
    {
      tag: 'Case Studies', title: 'AML\'s success with Productive Machines',
      text: 'Reshoring aerospace parts cost-effectively — measured cycle, tool and yield gains.',
      tone: 'green', href: 'case-studies.html',
      img: ASSETS.aml,
    },
    {
      tag: 'ROI Calculator', title: 'See payback on your fleet',
      text: 'Drag the sliders for machines, hours and tier. Live £ value and ROI multiple.',
      tone: 'amber', href: 'roi-calculator.html',
    },
    {
      tag: 'News & Blogs', title: 'Latest field notes',
      text: 'Visits, conference takeaways, engineering posts. Updated monthly.',
      tone: 'dark', href: 'news.html',
    },
    {
      tag: 'Events', title: 'Where to find us',
      text: 'EMO Hannover · MACH 2026 · MIC 2026. Come see the platform live.',
      tone: 'blue', href: 'events.html',
    },
    {
      tag: 'Free e-book', title: 'The Chatter-Free Shop',
      text: '28-page primer on stability lobes, feeds & speeds. Just email — instant download.',
      tone: 'green', href: 'ebook.html',
    },
  ];

  return (
    <section style={{ background: '#fff', padding: '40px 0 120px' }} data-screen-label="R · Grid">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="resources-grid">
          {cards.map((c, i) => <ResourceCard key={i} {...c} idx={i} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .resources-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .resources-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function ResourceCard({ tag, title, text, tone, href, img, idx }) {
  const ref = useReveal();
  const [hover, setHover] = useStatePG(false);
  const tones = {
    blue: { bg: '#2250FC', fg: '#fff' },
    green: { bg: '#189A38', fg: '#fff' },
    amber: { bg: '#F59E0B', fg: '#000' },
    dark: { bg: '#0a0a0a', fg: '#fff' },
  };
  const t = tones[tone];
  return (
    <a href={href} ref={ref} data-reveal
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        transitionDelay: `${idx * 80}ms`,
        background: t.bg, color: t.fg,
        borderRadius: 18, padding: 32, position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 16,
        minHeight: 280,
        transition: 'transform 0.4s cubic-bezier(.2,.7,.2,1), box-shadow 0.4s, all 0.4s',
        transform: hover ? 'translateY(-6px)' : 'none',
        boxShadow: hover ? '0 30px 60px -24px rgba(0,0,0,0.30)' : 'none',
      }}>
      {img && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15,
        }} />
      )}
      <div style={{
        position: 'relative',
        display: 'inline-flex', alignSelf: 'flex-start',
        padding: '5px 12px', borderRadius: 999,
        background: 'rgba(255,255,255,0.18)', color: t.fg,
        fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>{tag}</div>
      <h3 style={{
        position: 'relative',
        fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 26,
        lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0,
        textWrap: 'pretty',
      }}>{title}</h3>
      <p style={{ position: 'relative', fontSize: 15, lineHeight: 1.55, margin: 0, opacity: 0.88, flex: 1, textWrap: 'pretty' }}>{text}</p>
      <div style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: 'Host Grotesk', fontWeight: 600, fontSize: 14,
        transition: 'transform 0.3s',
        transform: hover ? 'translateX(4px)' : 'none',
      }}>
        Explore <Icon.arrow style={{ width: 14, height: 14 }} />
      </div>
    </a>
  );
}

// ROI calculator (interactive)
function ROICalc() {
  const [machines, setMachines] = useStatePG(6);
  const [shift, setShift] = useStatePG(16);
  const [hourly, setHourly] = useStatePG(120);
  const [tier, setTier] = useStatePG('SenseNC Feeds');
  const uplift = { TapStarter: 0.18, 'SenseNC Feeds': 0.42, 'SenseNC Finesse': 0.53 }[tier];
  const yearlyHours = machines * shift * 240;
  const saved = yearlyHours * uplift;
  const value = saved * hourly;
  const monthlyCost = { TapStarter: 49, 'SenseNC Feeds': 249, 'SenseNC Finesse': 1800 }[tier] * 12;
  const roi = (value - monthlyCost) / Math.max(monthlyCost, 1);
  const ref = useReveal();
  return (
    <section id="roi" ref={ref} data-reveal style={{
      background: '#2250FC', color: '#fff', padding: '120px 0', position: 'relative', overflow: 'hidden',
    }} data-screen-label="R · ROI">
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(255,255,255,0.12), transparent 60%)',
      }} />
      <div className="container roi-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }}>
        <div>
          <span className="tagline" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>ROI Calculator</span>
          <h2 style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.0, letterSpacing: '-0.03em',
            margin: '14px 0 20px', color: '#fff', textWrap: 'balance',
          }}>What does SenseNC pay back?</h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: 420 }}>
            Drag the sliders. Pick a tier. We use the same models we ship to customers — no email required.
          </p>
        </div>
        <div className="roi-panel" style={{
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.20)', borderRadius: 20, padding: 36,
        }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 10 }}>Tier</div>
            <div className="roi-tier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {['TapStarter', 'SenseNC Feeds', 'SenseNC Finesse'].map(v => (
                <button key={v} onClick={() => setTier(v)} style={{
                  padding: '11px 6px', borderRadius: 8,
                  background: v === tier ? '#fff' : 'rgba(255,255,255,0.10)',
                  color: v === tier ? '#2250FC' : '#fff',
                  fontFamily: 'Host Grotesk', fontWeight: 600, fontSize: 13,
                }}>{v}</button>
              ))}
            </div>
          </div>
          <RangeR label="Machines in fleet" v={machines} min={1} max={40} set={setMachines} unit=" machines" />
          <RangeR label="Spindle hours / day" v={shift} min={4} max={24} set={setShift} unit=" hrs" />
          <RangeR label="Machine-hour rate" v={hourly} min={40} max={400} step={5} set={setHourly} unit="" prefix="£" />
          <div className="roi-result-grid" style={{
            marginTop: 24, padding: '22px 24px',
            background: 'rgba(255,255,255,0.12)', borderRadius: 12,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
          }}>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.75 }}>Year-one value</div>
              <div style={{ fontFamily: 'Host Grotesk', fontWeight: 800, fontSize: 38, letterSpacing: '-0.03em', marginTop: 6 }}>£{Math.round(value).toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.75 }}>ROI multiple</div>
              <div style={{ fontFamily: 'Host Grotesk', fontWeight: 800, fontSize: 38, letterSpacing: '-0.03em', marginTop: 6 }}>{Math.max(0, roi).toFixed(0)}×</div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>~{Math.round(saved).toLocaleString()} spindle hours recovered · {Math.round(uplift * 100)}% uplift · licence £{monthlyCost.toLocaleString()}/yr</div>
        </div>
      </div>
    </section>
  );
}

function RangeR({ label, v, min, max, step = 1, set, unit, prefix = '' }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.75 }}>{label}</span>
        <span style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 18 }}>{prefix}{v.toLocaleString()}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(Number(e.target.value))}
        style={{
          width: '100%', appearance: 'none', WebkitAppearance: 'none', height: 4, borderRadius: 4,
          background: `linear-gradient(to right, #fff 0%, #fff ${((v - min) / (max - min)) * 100}%, rgba(255,255,255,0.20) ${((v - min) / (max - min)) * 100}%, rgba(255,255,255,0.20) 100%)`,
          outline: 'none', cursor: 'grab',
        }} />
      <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #fff; cursor: grab; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
        input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 0; cursor: grab; }
      `}</style>
    </div>
  );
}

// =============================================================
// CAREERS page
// =============================================================
function CareersIntro() {
  return (
    <section style={{ background: '#fff', padding: '40px 0 100px' }} data-screen-label="Careers · Intro">
      <div className="container" style={{ maxWidth: 1240 }}>
        <div className="careers-intro-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 80 }}>
          {[
            ['Real impact', 'Every line of code, every demo, every cut — it ships to a real shop floor within weeks.'],
            ['Engineers first', 'We hire engineers and let engineers ship. Tiny PR-to-merge cycles. No design-by-committee.'],
            ['Built at AMRC', 'Backed by a decade of research from the AMRC at Sheffield. Real science, real machines.'],
            ['Hybrid by default', 'Most of the team is in Rotherham 2-3 days a week. Remote-friendly for the rest.'],
          ].map(([h, t]) => (
            <div key={h}>
              <h3 style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 26, color: '#000', margin: '0 0 10px', letterSpacing: '-0.02em' }}>{h}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: '#000', opacity: 0.78, margin: 0, maxWidth: 480 }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenRoles() {
  const roles = [
    { title: 'Senior Application Engineer', dept: 'Engineering', loc: 'Rotherham · Hybrid', type: 'Full-time' },
    { title: 'Computational Physics Engineer', dept: 'R&D', loc: 'Rotherham · Hybrid', type: 'Full-time' },
    { title: 'Customer Success Manager — DACH', dept: 'Customer', loc: 'Remote · DE/AT/CH', type: 'Full-time' },
    { title: 'Product Designer', dept: 'Product', loc: 'Remote · UK', type: 'Full-time' },
    { title: 'Founders Associate (Operations)', dept: 'Ops', loc: 'Rotherham · 4 days on-site', type: 'Full-time' },
  ];
  return (
    <section style={{ background: '#f8f8f8', padding: '100px 0' }} data-screen-label="Careers · Roles">
      <div className="container">
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="tagline" style={{ color: '#2250FC' }}>Open roles</span>
            <h2 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(36px, 4.4vw, 60px)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              margin: '14px 0 0', color: '#000', textWrap: 'balance',
            }}>{roles.length} ways to join.</h2>
          </div>
          <a href="contact.html" className="btn btn-secondary">Speculative apply</a>
        </div>
        <div className="role-list" style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #EEEEEE' }}>
          {roles.map((r, i) => <RoleRow key={r.title} {...r} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function RoleRow({ title, dept, loc, type, idx }) {
  const [hover, setHover] = useStatePG(false);
  return (
    <a href="contact.html"
      className="role-row"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1.4fr 0.8fr auto',
        padding: '28px 32px', alignItems: 'center', gap: 24,
        borderTop: idx ? '1px solid #EEEEEE' : 'none',
        background: hover ? '#0a0a0a' : '#fff',
        color: hover ? '#fff' : '#000',
        transition: 'background 0.3s, color 0.3s',
      }}>
      <div style={{
        fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em',
      }}>{title}</div>
      <div style={{ fontSize: 14, opacity: 0.7 }}>{dept}</div>
      <div style={{ fontSize: 14, opacity: 0.7 }}>{loc}</div>
      <div style={{ fontSize: 14, opacity: 0.7 }}>{type}</div>
      <span className="role-row-arrow" style={{
        width: 40, height: 40, borderRadius: '50%',
        background: hover ? '#3FFD7E' : 'transparent', color: hover ? '#000' : '#000',
        border: hover ? 'none' : '1px solid #000',
        display: 'grid', placeItems: 'center',
        transition: 'transform 0.3s, background 0.3s',
        transform: hover ? 'rotate(-45deg)' : 'none',
      }}>
        <Icon.arrowR style={{ width: 16, height: 16, transform: 'rotate(45deg)' }} />
      </span>
    </a>
  );
}

Object.assign(window, {
  PageHero,
  PartnersGroups, PartnersCTA,
  ResourcesGrid, ROICalc,
  CareersIntro, OpenRoles,
});
