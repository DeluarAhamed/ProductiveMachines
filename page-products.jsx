// PRODUCTS page sections
const { useState: useStatePR, useEffect: useEffectPR } = React;

function ProductsHero() {
  return (
    <section className="products-hero-premium" style={{ background: '#0a0a0a', color: '#fff', padding: '140px 0 96px', position: 'relative', overflow: 'hidden' }} data-screen-label="P01 Hero">
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 60% at 100% 0%, rgba(34,80,252,0.35), transparent 60%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(24,154,57,0.15), transparent 60%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 60%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 60%, #000 30%, transparent 100%)',
      }} />
      <div className="container products-hero-grid" style={{ position: 'relative', maxWidth: 1240 }}>
        <span className="tagline" style={{ color: '#3FFD7E', fontWeight: 500 }}>The SenseNC suite</span>
        <WordReveal
          text="Three tools. One mission."
          as="h1"
          style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(56px, 7.4vw, 120px)',
            lineHeight: 0.98, letterSpacing: '-0.04em',
            margin: '16px 0 24px', color: '#fff', textWrap: 'balance',
          }}
        />
        <p style={{
          fontSize: 22, lineHeight: 1.5,
          color: 'rgba(255,255,255,0.85)',
          maxWidth: 720, margin: 0,
        }}>
          Start simple. Go deep. Every SenseNC product uses the same physics engine — validated at AMRC Sheffield, trusted across aerospace, motorsport and precision manufacturing.
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <a href="book-demo.html" className="btn btn-primary" style={{ padding: '14px 24px', fontSize: 16 }}>
            Book demo <Icon.arrow className="arr" />
          </a>
          <a href="#compare" className="btn btn-secondary on-dark" style={{ padding: '14px 24px', fontSize: 16 }}>
            Compare tiers
          </a>
        </div>
        <div className="products-hero-visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-console">
            <div className="hero-console-top"><span>Live optimisation</span><strong>Stable</strong></div>
            <svg viewBox="0 0 520 320" className="hero-console-chart">
              <defs><linearGradient id="productHeroLine" x1="0" x2="1"><stop offset="0%" stopColor="#3FFD7E" /><stop offset="50%" stopColor="#2250FC" /><stop offset="100%" stopColor="#FFFFFF" /></linearGradient></defs>
              {[40, 100, 160, 220, 280].map(y => <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="rgba(255,255,255,0.08)" />)}
              {[70, 150, 230, 310, 390, 470].map(x => <line key={x} x1={x} y1="0" x2={x} y2="320" stroke="rgba(255,255,255,0.05)" />)}
              <path d="M 0 220 C 80 80, 130 78, 185 210 S 305 265, 355 118 S 455 90, 520 190" fill="none" stroke="url(#productHeroLine)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 0 220 C 80 80, 130 78, 185 210 S 305 265, 355 118 S 455 90, 520 190 L 520 320 L 0 320 Z" fill="#3FFD7E" opacity="0.08" />
              <circle cx="355" cy="118" r="8" fill="#3FFD7E" />
              <circle cx="355" cy="118" r="22" fill="none" stroke="#3FFD7E" opacity="0.35" />
            </svg>
            <div className="hero-console-metrics"><span><strong>53%</strong> faster</span><span><strong>110%</strong> productivity</span><span><strong>0</strong> chatter</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDetail({ id, tag, tagColor, name, sub, body, bullets, image, dark, reverse, cta = 'Book demo' }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} data-reveal style={{
      background: dark ? '#0a0a0a' : '#fff', color: dark ? '#fff' : '#000',
      padding: '120px 0',
      borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #EEEEEE',
    }} data-screen-label={`P · ${name}`}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
      }}>
        <div style={{ order: reverse ? 2 : 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 999,
            background: dark ? 'rgba(255,255,255,0.08)' : `${tagColor}15`,
            color: dark ? '#fff' : tagColor,
            fontSize: 11, fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            {tag}
          </div>
          <h2 style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 76px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            margin: '0 0 16px', textWrap: 'balance',
          }}>{name}</h2>
          <p style={{ fontSize: 20, lineHeight: 1.45, opacity: 0.85, margin: '0 0 24px', fontWeight: 500 }}>{sub}</p>
          <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.75, margin: '0 0 28px', textWrap: 'pretty' }}>{body}</p>

          <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: dark ? 'rgba(63,253,126,0.18)' : `${tagColor}15`,
                  color: dark ? '#3FFD7E' : tagColor,
                  display: 'grid', placeItems: 'center',
                }}><Icon.check style={{ width: 12, height: 12 }} /></span>
                <span style={{ fontSize: 15, lineHeight: 1.5, opacity: 0.92 }}>{b}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 36, display: 'flex', gap: 14 }}>
            <a href="contact.html" className="btn btn-primary" style={{ padding: '14px 22px' }}>
              {cta} <Icon.arrow className="arr" />
            </a>
            <a href="#compare" className={`btn btn-secondary${dark ? ' on-dark' : ''}`} style={{ padding: '14px 22px' }}>
              Compare
            </a>
          </div>
        </div>

        <div style={{ order: reverse ? 1 : 2 }}>
          <ProductDetailImage image={image} dark={dark} />
        </div>
      </div>
    </section>
  );
}

function ProductDetailImage({ image, dark }) {
  const ref = useReveal();
  const [ok, setOk] = useStatePR(true);
  return (
    <div ref={ref} className="img-reveal" data-reveal style={{
      aspectRatio: '4/3', borderRadius: 20, overflow: 'hidden',
      background: dark ? '#000' : '#f5f5f5',
      position: 'relative',
      boxShadow: dark ? '0 30px 80px -30px rgba(34,80,252,0.4)' : '0 30px 80px -30px rgba(0,0,0,0.15)',
    }}>
      {ok && image ? (
        <img src={image} alt="" onError={() => setOk(false)}
          style={{ width: '100%', height: '100%', objectFit: String(image).endsWith('.svg') ? 'contain' : 'cover', padding: String(image).endsWith('.svg') ? 18 : 0 }} />
      ) : (
        <ProductDecor dark={dark} />
      )}
    </div>
  );
}

function ProductDecor({ dark }) {
  return (
    <svg viewBox="0 0 600 450" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="pdG" x1="0" x2="1">
          <stop offset="0%" stopColor="#2250FC" />
          <stop offset="100%" stopColor="#189A38" />
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill={dark ? '#0a0a0a' : '#f5f5f5'} />
      {[...Array(20)].map((_, i) => (
        <line key={i} x1="0" y1={i * 24} x2="600" y2={i * 24} stroke={dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} />
      ))}
      <g transform="translate(300, 225)">
        <circle r="140" fill="none" stroke={dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
        <circle r="100" fill="none" stroke="url(#pdG)" strokeOpacity="0.4" strokeWidth="1.5" />
        <circle r="60" fill="url(#pdG)" fillOpacity="0.15" />
        <circle r="20" fill="url(#pdG)" />
      </g>
    </svg>
  );
}

function ProductsCompare() {
  const rows = [
    ['Optimal feeds & speeds', true, true, true],
    ['Runs as a web app (no install)', true, false, false],
    ['Plugs into NX & Mastercam', false, true, true],
    ['Whole-toolpath optimisation', false, true, true],
    ['Stability lobe modelling', false, false, true],
    ['Real-time chatter elimination', false, false, true],
    ['Digital-twin simulation', false, false, true],
    ['Dedicated AMRC application engineer', false, false, true],
    ['In-process monitoring', false, false, true],
  ];
  return (
    <section id="compare" className="compare-section" style={{ background: '#fff', padding: '120px 0', borderTop: '1px solid #EEEEEE' }} data-screen-label="P · Compare">
      <div className="container">
        <div className="compare-head" style={{ textAlign: 'center', marginBottom: 56, maxWidth: 720, margin: '0 auto 56px' }}>
          <span className="tagline" style={{ color: '#2250FC' }}>Compare tiers</span>
          <h2 style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(36px, 4.4vw, 64px)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            margin: '14px 0 0', color: '#000', textWrap: 'balance',
          }}>Which one fits your shop?</h2>
          <p className="compare-intro" style={{ fontSize: 18, lineHeight: 1.55, color: '#000', opacity: 0.72, margin: '18px auto 0', maxWidth: 680 }}>
            Choose a starting point, then scale toward full digital-twin optimisation as your machine minutes become more valuable.
          </p>
        </div>

        <div className="compare-panel" style={{ background: '#0a0a0a', color: '#fff', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
            padding: '24px 32px',
            background: '#000',
            fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            opacity: 0.7,
          }}>
            <div>Capability</div>
            <div style={{ textAlign: 'center' }}>TapStarter</div>
            <div style={{ textAlign: 'center' }}>SenseNC Feeds</div>
            <div style={{ textAlign: 'center', color: '#3FFD7E', opacity: 1 }}>SenseNC Finesse</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '18px 32px', alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              fontSize: 15,
            }}>
              <div style={{ opacity: 0.92 }}>{r[0]}</div>
              {r.slice(1).map((v, j) => (
                <div key={j} style={{ textAlign: 'center' }}>
                  {v ? (
                    <span style={{
                      display: 'inline-grid', placeItems: 'center',
                      width: 24, height: 24, borderRadius: '50%',
                      background: j === 2 ? 'rgba(63,253,126,0.18)' : 'rgba(34,80,252,0.18)',
                      color: j === 2 ? '#3FFD7E' : '#5A7CFF',
                    }}><Icon.check style={{ width: 14, height: 14 }} /></span>
                  ) : (
                    <span style={{ opacity: 0.3, fontSize: 20 }}>—</span>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
            padding: '24px 32px', alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ fontSize: 13, opacity: 0.55 }}>Pricing</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>£49<span style={{ fontSize: 12, opacity: 0.7 }}>/mo</span></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>£249<span style={{ fontSize: 12, opacity: 0.7 }}>/mo</span></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#3FFD7E' }}>Custom</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center', display: 'flex', gap: 16, justifyContent: 'center' }}>
          <a href="book-demo.html" className="btn btn-primary" style={{ padding: '14px 24px' }}>
            Book a demo <Icon.arrow className="arr" />
          </a>
          <a href="resources.html#roi" className="btn btn-secondary" style={{ padding: '14px 24px' }}>
            ROI calculator
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProductsHero, ProductDetail, ProductsCompare });
