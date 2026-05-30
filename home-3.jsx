// Productive Machines — HOME (bottom sections)
// 8. Products (Three ways to optimize — bolder cards with motion)
// 9. Blog (real content + real images from the live site)
// 10. Newsletter band (CAM_engineer image, real copy)
// 11. Contact section (improved form layout)

const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

// =============================================================
// 8. PRODUCTS — "Introducing the SenseNC Suite"
// =============================================================

function Products() {
  const items = [
    {
      slug: 'tapstarter',
      tag: 'Entry · From £49/mo',
      tagColor: '#F59E0B',
      heading: 'TapStarter',
      sub: 'Optimal spindle speeds in seconds. No CAM required.',
      text: 'Upload a tool combo. Get a safe operating range instantly. Perfect for shops without a CAM seat — or as a fast sanity check before any job.',
      bullets: ['Web app · no install', 'Works on any spindle / tool combo', 'Free 30-day trial'],
      featured: false,
      bg: '#fff',
      color: '#000',
      cta: 'Try free',
    },
    {
      slug: 'feeds',
      tag: 'Advanced · From £249/mo',
      tagColor: '#2250FC',
      heading: 'SenseNC Feeds',
      sub: 'Toolpath feed-rate optimisation, inside your CAM.',
      text: 'Sends every move at the right feed. Plugs into NX and Mastercam — your programmers stay productive on day one. Optimised programs in minutes.',
      bullets: ['NX & Mastercam plugin', 'Whole-program optimisation', 'AMRC-verified models'],
      featured: false,
      bg: '#fff',
      color: '#000',
      cta: 'Book demo',
    },
    {
      slug: 'finesse',
      tag: 'Full power · Enterprise',
      tagColor: '#3FFD7E',
      heading: 'SenseNC Finesse',
      sub: 'Digital twin. Zero chatter. Maximum machine.',
      text: 'The full platform — full toolpath optimisation, real-time chatter elimination, in-process monitoring. Used by Boeing, Siemens and AML Aerospace.',
      bullets: ['Full digital-twin simulation', 'Real-time chatter elimination', 'Dedicated AMRC engineer'],
      featured: true,
      bg: '#0a0a0a',
      color: '#fff',
      cta: 'Talk to engineering',
    },
  ];
  const ref = useReveal();

  return (
    <section id="products" ref={ref} data-reveal className="home-products" data-screen-label="07 Products" style={{
      background: '#f8f8f8', padding: '120px 0 140px',
    }}>
      <div className="container">
        <div className="home-products-head" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'end', marginBottom: 72,
        }}>
          <div>
            <span className="tagline" style={{ color: '#2250FC', fontWeight: 500 }}>The platform</span>
            <h2 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 76px)',
              lineHeight: 1.02, letterSpacing: '-0.035em',
              margin: '14px 0 0', color: '#000', textWrap: 'balance',
            }}>
              Introducing the<br />
              <span style={{ color: '#2250FC' }}>SenseNC</span> Suite.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: '#000', opacity: 0.78, margin: 0, maxWidth: 520 }}>
              Transform your machining processes. Eliminate trial-and-error iterations and get optimal feed rates and spindle speeds for your machine settings — before a single chip flies.
            </p>
            <a href="products.html" className="btn-link" style={{ marginTop: 18, display: 'inline-flex' }}>
              Explore all products <Icon.arrow className="arr" style={{ width: 14, height: 14 }} />
            </a>
          </div>
        </div>

        <div className="home-products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {items.map((p, i) => <ProductCard key={p.slug} {...p} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ slug, tag, tagColor, heading, sub, text, bullets, featured, bg, color, cta, idx }) {
  const [hover, setHover] = useStateC(false);
  const ref = useReveal();
  const detailHref = slug === 'tapstarter' ? 'tapstarter.html'
    : slug === 'feeds' ? 'sensenc-feeds.html'
    : 'sensenc-finesse.html';
  return (
    <article ref={ref} data-reveal className="home-product-card"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        // Make the whole card clickable (but don't double-fire if a real link inside was clicked)
        if (e.target.closest('a')) return;
        window.location.href = detailHref;
      }}
      style={{
        transitionDelay: `${idx * 100}ms`,
        background: bg, color: color,
        borderRadius: 20, padding: 32,
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        minHeight: 640,
        border: featured ? '1px solid transparent' : '1px solid #EEEEEE',
        transform: hover ? 'translateY(-8px)' : 'none',
        boxShadow: hover ? '0 40px 80px -32px rgba(0,0,0,0.30)' : '0 1px 0 rgba(0,0,0,0.04)',
        transition: 'transform 0.5s cubic-bezier(.2,.7,.2,1), box-shadow 0.5s, all 0.5s',
        cursor: 'pointer',
      }}>

      {/* Featured glow */}
      {featured && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 100% 0%, rgba(34,80,252,0.35), transparent 60%), radial-gradient(ellipse 50% 30% at 0% 100%, rgba(63,253,126,0.10), transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Visual */}
      <div style={{
        position: 'relative', height: 220,
        marginBottom: 28,
        borderRadius: 14, overflow: 'hidden',
        background: featured ? 'rgba(255,255,255,0.05)' : '#f5f5f5',
      }}>
        <ProductVisual which={slug} hover={hover} />
      </div>

      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          alignSelf: 'flex-start',
          padding: '5px 12px', borderRadius: 999,
          background: featured ? 'rgba(63,253,126,0.18)' : `${tagColor}15`,
          color: featured ? '#3FFD7E' : tagColor,
          fontSize: 11, fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
          {tag}
        </div>

        <h3 style={{
          marginTop: 20, marginBottom: 10,
          fontFamily: 'Host Grotesk', fontWeight: 700,
          fontSize: featured ? 38 : 32, lineHeight: 1.05, letterSpacing: '-0.025em',
        }}>{heading}</h3>

        <p style={{
          fontSize: 16, lineHeight: 1.5, margin: 0,
          opacity: featured ? 0.88 : 0.85, fontWeight: 500,
        }}>{sub}</p>

        <p style={{
          marginTop: 14, fontSize: 14, lineHeight: 1.55, margin: '14px 0 0',
          opacity: featured ? 0.65 : 0.65,
        }}>{text}</p>

        <ul style={{ padding: 0, margin: '24px 0 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
              <Icon.check style={{ width: 14, height: 14, marginTop: 4, color: featured ? '#3FFD7E' : '#2250FC', flexShrink: 0 }} />
              <span style={{ opacity: 0.92 }}>{b}</span>
            </li>
          ))}
        </ul>

        <a href={detailHref} style={{
          marginTop: 'auto', paddingTop: 24,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 10,
          fontFamily: 'Host Grotesk', fontWeight: 600, fontSize: 15,
        }}>
          <span style={{ borderBottom: `1px solid ${featured ? '#3FFD7E' : '#000'}`, color: featured ? '#3FFD7E' : '#000', paddingBottom: 2 }}>
            {cta}
          </span>
          <span style={{
            width: 36, height: 36, borderRadius: '50%',
            background: featured ? '#3FFD7E' : '#000',
            color: featured ? '#000' : '#fff',
            display: 'grid', placeItems: 'center',
            transition: 'transform 0.3s',
            transform: hover ? 'rotate(-45deg) scale(1.08)' : 'none',
          }}>
            <Icon.arrowR style={{ width: 16, height: 16, transform: 'rotate(45deg)' }} />
          </span>
        </a>
      </div>
    </article>
  );
}

function ProductVisual({ which, hover }) {
  if (which === 'tapstarter') return <VisualTapStarter hover={hover} />;
  if (which === 'feeds') return <VisualFeeds hover={hover} />;
  return <VisualFinesse hover={hover} />;
}

function VisualTapStarter({ hover }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(135deg, #fff5e0, #ffeac0)' }}>
      <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        {/* Tap holder + cutting tool */}
        <g transform={`translate(160, 110)`}>
          <g transform={`rotate(${hover ? 30 : 0})`} style={{ transition: 'transform 0.7s cubic-bezier(.2,.7,.2,1)' }}>
            <circle r="90" fill="none" stroke="#F59E0B" strokeOpacity="0.2" strokeWidth="1" />
            <circle r="70" fill="none" stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="1" />
            <circle r="50" fill="#fff" stroke="#000" strokeWidth="1" />
            <circle r="14" fill="#F59E0B" />
            {[0, 60, 120, 180, 240, 300].map(a => {
              const r = a * Math.PI / 180;
              return <line key={a} x1={Math.cos(r) * 56} y1={Math.sin(r) * 56} x2={Math.cos(r) * 78} y2={Math.sin(r) * 78} stroke="#000" strokeOpacity="0.5" strokeWidth="1.5" />;
            })}
          </g>
        </g>
        {/* Numeric readout */}
        <g transform="translate(20, 30)">
          <text fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.5" fill="#000" opacity="0.55">RPM</text>
          <text y="32" fontFamily="Host Grotesk" fontSize="32" fontWeight="700" letterSpacing="-1" fill="#000">12,480</text>
        </g>
        <g transform="translate(20, 180)">
          <text fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.5" fill="#000" opacity="0.55">FEED</text>
          <text y="18" fontFamily="Host Grotesk" fontSize="16" fontWeight="500" fill="#000">1,840 mm/min</text>
        </g>
      </svg>
    </div>
  );
}

function VisualFeeds({ hover }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(135deg, #e8edff, #d4dcff)' }}>
      <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="0" y1={20 + i * 26} x2="320" y2={20 + i * 26} stroke="#2250FC" strokeOpacity="0.06" />
        ))}
        <text x="20" y="40" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.5" fill="#2250FC" opacity="0.6">TOOLPATH · OPTIMISED</text>
        <path
          d="M 10 160 L 60 80 L 110 180 L 160 70 L 220 200 L 280 100 L 310 140"
          fill="none" stroke="#2250FC" strokeWidth="2.5"
          strokeDasharray="800" strokeDashoffset={hover ? 0 : 380}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)' }}
        />
        {[[10, 160], [60, 80], [110, 180], [160, 70], [220, 200], [280, 100], [310, 140]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#2250FC" strokeWidth="2"
            style={{ opacity: hover ? 1 : 0.4, transition: 'opacity 0.6s' }} />
        ))}
        {/* arrows showing direction */}
        <g opacity={hover ? 0.8 : 0}>
          <polygon points="58,80 70,75 70,85" fill="#2250FC" style={{ transition: 'opacity 0.6s' }} />
        </g>
      </svg>
    </div>
  );
}

function VisualFinesse({ hover }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
      <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="finesseG" x1="0" x2="1">
            <stop offset="0%" stopColor="#3FFD7E" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#3FFD7E" stopOpacity="1" />
            <stop offset="100%" stopColor="#3FFD7E" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <text x="20" y="36" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.5" fill="#fff" opacity="0.6">DIGITAL TWIN · LIVE</text>
        {/* Multiple wave layers */}
        <path d="M 0 120 Q 80 80, 160 120 T 320 120" stroke="url(#finesseG)" strokeWidth="2" fill="none" />
        {[100, 130, 150].map((y, i) => (
          <path key={i}
            d={`M 0 ${y} Q 80 ${y - 6}, 160 ${y} T 320 ${y}`}
            stroke="#fff" strokeOpacity={0.15 - i * 0.04} strokeWidth="1" fill="none" />
        ))}
        <path d="M 0 120 Q 80 80, 160 120 T 320 120 L 320 220 L 0 220 Z" fill="#3FFD7E" fillOpacity="0.06" />
        {/* Live marker */}
        <circle cx={hover ? 220 : 160} cy="120" r="6" fill="#3FFD7E"
          style={{ transition: 'cx 1s cubic-bezier(.2,.7,.2,1)' }} />
        <circle cx={hover ? 220 : 160} cy="120" r="14" fill="none" stroke="#3FFD7E" strokeOpacity="0.35"
          style={{ transition: 'cx 1s cubic-bezier(.2,.7,.2,1)' }} />
        <circle cx={hover ? 220 : 160} cy="120" r="22" fill="none" stroke="#3FFD7E" strokeOpacity="0.15"
          style={{ transition: 'cx 1s cubic-bezier(.2,.7,.2,1)' }} />
      </svg>
    </div>
  );
}

// =============================================================
// 9. BLOG — real content + real images
// =============================================================

function Blog() {
  const ref = useReveal();
  const posts = ASSETS.blog;
  return (
    <section ref={ref} data-reveal data-screen-label="08 News" style={{
      background: '#fff', padding: '120px 0',
      borderTop: '1px solid #EEEEEE',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 64, gap: 32, flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 720 }}>
            <span className="tagline" style={{ color: '#2250FC', fontWeight: 500 }}>News & Case Studies</span>
            <h2 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(36px, 4.4vw, 64px)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              margin: '14px 0 24px', textWrap: 'balance',
            }}>
              Latest News, Blog &amp; Case Studies
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: '#000', opacity: 0.75, margin: 0 }}>
              Field notes from the shop floor — recent visits, case studies, and engineering deep-dives from across the SenseNC ecosystem.
            </p>
          </div>
          <a href="resources.html#news" className="btn btn-secondary">View all news</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {posts.map((p, i) => <BlogCard key={i} {...p} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ slug, tag, date, img, title, text, idx }) {
  const ref = useReveal();
  const [hover, setHover] = useStateC(false);
  const [imgOk, setImgOk] = useStateC(true);
  const href = slug ? `blog-${slug}.html` : '#';

  return (
    <a href={href} ref={ref} data-reveal
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        transitionDelay: `${idx * 100}ms`,
        display: 'flex', flexDirection: 'column',
        background: '#fff', borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #EEEEEE',
        transition: 'transform 0.5s cubic-bezier(.2,.7,.2,1), box-shadow 0.5s',
        transform: hover ? 'translateY(-6px)' : 'none',
        boxShadow: hover ? '0 30px 60px -30px rgba(0,0,0,0.20)' : 'none',
      }}>
      <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#0a0a0a', position: 'relative' }}>
        {imgOk ? (
          <img src={img} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(.2,.7,.2,1)',
            transform: hover ? 'scale(1.08)' : 'none',
          }} onError={() => setImgOk(false)} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(135deg, ${idx === 0 ? '#2250FC' : idx === 1 ? '#0E3578' : '#189A38'}, #000)`,
          }} />
        )}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          padding: '5px 12px', background: '#fff',
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000',
        }}>{tag}</div>
      </div>
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono', letterSpacing: '0.08em', color: '#000', opacity: 0.55 }}>{date}</div>
        <h3 style={{
          fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22,
          lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0, color: '#000',
          textWrap: 'pretty',
        }}>{title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: '#000', opacity: 0.72, margin: 0, textWrap: 'pretty', flex: 1 }}>{text}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontFamily: 'Host Grotesk', fontWeight: 600, fontSize: 14, color: '#2250FC', borderBottom: '1px solid #2250FC', paddingBottom: 2 }}>
            Read article
          </span>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid #000', display: 'grid', placeItems: 'center',
            transition: 'all 0.3s',
            background: hover ? '#000' : 'transparent', color: hover ? '#fff' : '#000',
            transform: hover ? 'rotate(-45deg)' : 'none',
          }}>
            <Icon.arrowR style={{ width: 14, height: 14, transform: 'rotate(45deg)' }} />
          </span>
        </div>
      </div>
    </a>
  );
}

// =============================================================
// 10. NEWSLETTER + CONTACT (split layout)
// =============================================================

function ContactBand() {
  const [sent, setSent] = useStateC(false);
  const [error, setError] = useStateC('');
  const [submitting, setSubmitting] = useStateC(false);
  const ref = useReveal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await window.PM.submitLead(e.currentTarget);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section ref={ref} data-reveal data-screen-label="09 Contact" id="contact" style={{
      background: '#000', color: '#fff', padding: '120px 0', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background image */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${ASSETS.newsletter})`,
        backgroundSize: 'cover', backgroundPosition: 'center right',
        opacity: 0.35,
        maskImage: 'linear-gradient(90deg, #000 0%, transparent 70%)',
        WebkitMaskImage: 'linear-gradient(90deg, #000 0%, transparent 70%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.9) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <span className="tagline" style={{ color: '#3FFD7E', fontWeight: 500 }}>Ready?</span>
          <h2 style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(48px, 6vw, 96px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            margin: '14px 0 24px', color: '#fff',
            textWrap: 'balance',
          }}>
            Subscribe to<br />our newsletter
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: 460 }}>
            Exciting product releases coming up — watch this space. Stay up to date with product notifications and company news.
          </p>

          {/* Featurelets */}
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 32, alignItems: 'flex-start' }}>
            {[
              ['One', 'email per month'],
              ['Zero', 'spam — promise'],
              ['Unsubscribe', 'anytime'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22, color: '#3FFD7E' }}>{k}</div>
                <div style={{ fontSize: 13, opacity: 0.75 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: the form card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 20, padding: 36,
          position: 'relative',
        }}>
          {!sent ? (
            <form data-lead-type="newsletter" onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <input type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
              <div style={{
                fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.2em',
                textTransform: 'uppercase', opacity: 0.6,
              }}>Get monthly insights</div>
              <h3 style={{
                fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 26,
                margin: 0, color: '#fff', letterSpacing: '-0.02em',
              }}>Sign me up</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                <FieldD name="firstName" label="First name" placeholder="Jane" />
                <FieldD name="lastName" label="Last name" placeholder="Marchetti" />
              </div>
              <FieldD name="email" label="Work email" type="email" placeholder="jane@yourshop.com" required />
              <FieldD name="company" label="Company" placeholder="Marchetti Precision Ltd" />

              {error && <p role="alert" style={{ color: '#FFB4B4', fontSize: 13, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center', padding: '14px 24px', fontSize: 16, opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Subscribing...' : 'Subscribe'} <Icon.arrow className="arr" />
              </button>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '4px 0 0', textAlign: 'center' }}>
                By subscribing you agree to our <a href="#" style={{ color: 'rgba(255,255,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>privacy policy</a>.
              </p>
            </form>
          ) : (
            <SuccessD />
          )}
        </div>
      </div>
    </section>
  );
}

function FieldD({ name, label, placeholder, type = 'text', required }) {
  const [focused, setFocused] = useStateC(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6 }}>{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: focused ? '1px solid #3FFD7E' : '1px solid rgba(255,255,255,0.14)',
          borderRadius: 6, padding: '13px 14px',
          color: '#fff', fontFamily: 'Host Grotesk', fontSize: 15, outline: 'none',
          transition: 'border-color 0.2s, background 0.2s',
        }} />
    </label>
  );
}

function SuccessD() {
  return (
    <div style={{ padding: '32px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(63,253,126,0.18)', color: '#3FFD7E',
        display: 'grid', placeItems: 'center',
      }}>
        <Icon.check style={{ width: 32, height: 32 }} />
      </div>
      <h3 style={{ fontFamily: 'Host Grotesk', fontSize: 24, fontWeight: 700, margin: 0 }}>Form submitted successfully!</h3>
      <p style={{ fontSize: 14, opacity: 0.75, margin: 0, maxWidth: 320 }}>
        We will be in touch with you soon.
      </p>
    </div>
  );
}

Object.assign(window, { Products, Blog, ContactBand });
