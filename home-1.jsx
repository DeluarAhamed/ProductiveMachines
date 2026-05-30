// Productive Machines — HOME (top sections)
// 1. Hero with YouTube background video + custom play/pause
// 2. Hero stats strip (3 cards w/ images: cycle / waste / tooling)
// 3. Logo carousel — 2 rows, opposite directions
// 4. Premium counter section

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

// =============================================================
// 1. HERO — YouTube background video
// =============================================================

const YT_ID = 'sAt3MNXX5lM';

function Hero() {
  const [playing, setPlaying] = useStateA(true);
  const [modalOpen, setModalOpen] = useStateA(false);
  const iframeRef = useRefA(null);
  const modalIframeRef = useRefA(null);

  const toggle = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const cmd = playing ? 'pauseVideo' : 'playVideo';
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: [] }), '*');
    setPlaying(!playing);
  };

  const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const embedBase = `https://www.youtube.com/embed/${YT_ID}`;
  const closeModal = () => {
    const iframe = modalIframeRef.current;
    if (iframe) {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo', args: [] }), '*');
    }
    setModalOpen(false);
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: 'min(900px, 100vh)',
      color: '#fff',
      overflow: 'hidden',
      background: '#000',
    }} data-screen-label="01 Hero">

      {/* Fallback poster (visible while YT loads or if blocked) */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg)`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'saturate(0.85) brightness(0.7)',
      }} />

      {/* YT iframe — sized to cover */}
      <div className="hero-video-frame" aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          title="Productive Machines background video"
          src={`${embedBase}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&enablejsapi=1&playsinline=1&disablekb=1&start=3&origin=${origin}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          style={{
            position: 'absolute',
            top: '50%', left: '54%',
            transform: 'translate(-50%, -50%)',
            width: 'max(100vw, 177.78vh)',
            height: 'max(56.25vw, 100vh)',
            pointerEvents: 'none',
            opacity: 0.62,
          }}
        />
      </div>

      {/* Dark overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.92) 42%, rgba(0,0,0,0.34) 70%, rgba(0,0,0,0.34) 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: [
          'radial-gradient(ellipse 46% 58% at 36% 43%, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.46) 38%, transparent 72%)',
          'radial-gradient(ellipse 28% 36% at 76% 42%, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.82) 44%, transparent 78%)',
        ].join(', '),
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.42) 0%, transparent 36%, rgba(0,0,0,0.84) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="container hero-copy" style={{
        position: 'relative', zIndex: 2,
        paddingTop: 118, paddingBottom: 104,
        minHeight: 'min(900px, 100vh)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 14px', borderRadius: 999,
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.20)',
          fontSize: 13, fontWeight: 500,
          alignSelf: 'flex-start',
          marginBottom: 28,
          animation: 'fadeUp 0.8s 0.2s both',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: '#3FFD7E',
            boxShadow: '0 0 0 4px rgba(63,253,126,0.20)',
          }} />
          AMRC-verified · Trusted by Boeing, Siemens & AMRC
        </div>

        <div className="hero-grid hero-grid-hybrid" style={{ textAlign: 'left' }}>
          <div className="hero-message">
            <h1
              style={{
                fontFamily: 'Host Grotesk',
                fontWeight: 720,
                fontSize: 'clamp(48px, 6.4vw, 92px)',
                lineHeight: 0.98,
                letterSpacing: '0',
                color: '#fff',
                margin: 0,
                textWrap: 'balance',
                textAlign: 'left',
                textShadow: '0 20px 70px rgba(0,0,0,0.38)',
              }}
            >
              CNC shops cut 53% faster. First time.
            </h1>

            <div style={{ textAlign: 'left', marginTop: 26, maxWidth: 620 }}>
              <p style={{
                fontSize: 20,
                lineHeight: 1.58,
                color: 'rgba(255,255,255,0.92)',
                textWrap: 'pretty',
                margin: 0,
                textShadow: '0 10px 34px rgba(0,0,0,0.45)',
              }}>
                SenseNC turns AMRC machining physics into CAM-ready optimisation, reducing cycle time, chatter, tooling cost, and trial cuts on real production parts.
              </p>
              <div className="hero-actions" style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
                <a href="book-demo.html" className="btn btn-primary" style={{ padding: '14px 24px', fontSize: 16 }}>
                  Book demo <Icon.arrow className="arr" />
                </a>
                <button type="button" onClick={() => setModalOpen(true)} className="btn btn-secondary on-dark hero-watch-btn" style={{ padding: '14px 22px', fontSize: 16 }}>
                  <Icon.play style={{ width: 15, height: 15, marginLeft: 1 }} />
                  Watch video
                </button>
                <a href="products.html" className="btn btn-secondary on-dark" style={{ padding: '14px 22px', fontSize: 16 }}>
                  Explore products
                </a>
              </div>
            </div>
          </div>
          <aside className="hero-proof-card" aria-label="Verified customer results">
            <div className="hero-proof-top">
              <span>Verified outcomes</span>
              <strong>AMRC methodology</strong>
            </div>
            <div className="hero-proof-metrics">
              <div><strong>+110%</strong><span>productivity uplift</span></div>
              <div><strong>-53%</strong><span>cycle time</span></div>
              <div><strong>-11%</strong><span>tooling cost</span></div>
            </div>
            <a href="case-studies.html">Read case studies <Icon.arrow /></a>
          </aside>
        </div>

        {/* Video controls — bottom right */}
        <div style={{
          position: 'absolute', bottom: 40, right: 64, zIndex: 4,
          display: 'flex', alignItems: 'center', gap: 14,
          animation: 'fadeUp 0.8s 1.2s both',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 14px', borderRadius: 999,
            background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.18)',
            fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: playing ? '#3FFD7E' : '#999' }} />
            {playing ? 'Live · machining' : 'Paused'}
          </div>
          <button onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'} style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: '#fff', display: 'grid', placeItems: 'center',
            cursor: 'pointer', transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.transform = ''; }}>
            {playing ? <Icon.pause style={{ width: 18, height: 18 }} /> : <Icon.play style={{ width: 18, height: 18, marginLeft: 2 }} />}
          </button>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          animation: 'fadeUp 0.8s 1.4s both',
        }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent, #fff, transparent)',
              animation: 'scrollLine 2.2s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label="Productive Machines video">
          <button type="button" className="video-modal-backdrop" aria-label="Close video" onClick={closeModal} />
          <div className="video-modal-shell">
            <div className="video-modal-topbar">
              <div>
                <span>Productive Machines</span>
                <strong>Watch with sound</strong>
              </div>
              <button type="button" onClick={closeModal} aria-label="Close video">
                <Icon.close />
              </button>
            </div>
            <div className="video-modal-frame">
              <iframe
                ref={modalIframeRef}
                title="Productive Machines video"
                src={`${embedBase}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&enablejsapi=1&playsinline=1&origin=${origin}`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scrollLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .hero-copy { justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}

// =============================================================
// 2. HERO STATS STRIP — 3 image cards from the live site
// (Maximize Productivity / Reduce Waste / Minimize tooling costs)
// =============================================================

function HeroStatStrip() {
  const cards = [
    {
      img: ASSETS.hero.cycle,
      title: 'Maximize Productivity',
      text: 'Increase productivity up to 110%, reduce cycle times by 53%, minimise design and set-up time by 20%, save 11% on tooling costs.',
      tag: '01 · Productivity',
      stats: [['+110%', 'productivity'], ['−53%', 'cycle time']],
      accent: '#2250FC',
      href: 'sensenc-feeds.html',
    },
    {
      img: ASSETS.hero.eliminate,
      title: 'Reduce Waste',
      text: 'Run sustainable processes with first-time manufacture eliminating iterations and expensive prove-outs to avoid wasting time, energy & materials.',
      tag: '02 · Sustainability',
      stats: [['−20%', 'set-up time'], ['0%', 'scrap']],
      accent: '#189A38',
      href: 'sensenc-finesse.html',
    },
    {
      img: ASSETS.hero.tool,
      title: 'Minimize tooling costs',
      text: 'Eliminate chatter vibrations to prevent wear and save on tooling costs. Produce quality parts with optimal surface finish and dimensional accuracy.',
      tag: '03 · Tool life',
      stats: [['−11%', 'tooling cost'], ['+38%', 'tool life']],
      accent: '#F59E0B',
      href: 'tap-testing-hub.html',
    },
  ];
  const ref = useReveal();

  return (
    <section ref={ref} data-reveal style={{ background: '#fff', padding: '120px 0', position: 'relative' }} data-screen-label="02 Outcomes">
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'end', marginBottom: 72,
        }} className="benefits-head">
          <div>
            <span className="tagline" style={{ color: '#2250FC', fontWeight: 500 }}>The benefits</span>
            <h2 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 1.02, letterSpacing: '-0.035em',
              margin: '14px 0 0', color: '#000', textWrap: 'balance',
            }}>
              Three reasons CNC shops switch to <span style={{ color: '#2250FC' }}>SenseNC</span>.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: '#000', opacity: 0.78, margin: 0, maxWidth: 520 }}>
              Productivity, sustainability and tool life. Every customer sees gains across all three from the first month — measurable, audited, on the parts they ship today.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="benefits-grid">
          {cards.map((c, i) => <StatStripCard key={c.title} {...c} idx={i} />)}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .benefits-head, .benefits-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }`}</style>
    </section>
  );
}

function StatStripCard({ img, title, text, tag, stats, accent, href, idx }) {
  const ref = useReveal();
  const [hover, setHover] = useStateA(false);
  return (
    <a href={href} ref={ref} data-reveal
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        transitionDelay: `${idx * 120}ms`,
        borderRadius: 18, overflow: 'hidden',
        border: '1px solid #EEEEEE', background: '#fff',
        transition: 'transform 0.5s cubic-bezier(.2,.7,.2,1), box-shadow 0.5s, border-color 0.3s',
        transform: hover ? 'translateY(-8px)' : 'none',
        boxShadow: hover ? '0 40px 60px -32px rgba(0,0,0,0.20)' : 'none',
        borderColor: hover ? accent : '#EEEEEE',
        display: 'flex', flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
      }}>
      <div style={{
        aspectRatio: '4/3', position: 'relative', overflow: 'hidden',
        background: '#0a0a0a',
      }}>
        <img src={img} alt={title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.7s cubic-bezier(.2,.7,.2,1), filter 0.5s',
          transform: hover ? 'scale(1.08)' : 'scale(1.02)',
          filter: hover ? 'none' : 'brightness(0.95)',
        }} onError={(e) => { e.target.style.display = 'none'; }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)`,
          opacity: hover ? 0.8 : 0.6, transition: 'opacity 0.4s',
        }} />
        <div style={{
          position: 'absolute', top: 16, left: 16,
          padding: '6px 12px',
          background: accent, color: '#fff',
          fontSize: 11, fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          borderRadius: 999,
        }}>{tag}</div>
        {/* stat chips overlay */}
        <div style={{
          position: 'absolute', bottom: 16, left: 16, right: 16,
          display: 'flex', gap: 8, flexWrap: 'wrap',
        }}>
          {stats.map(([v, l], i) => (
            <div key={i} style={{
              padding: '8px 12px', borderRadius: 8,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              transition: 'transform 0.5s',
              transform: hover ? `translateY(${i * -3}px)` : 'none',
            }}>
              <div style={{ fontFamily: 'Host Grotesk', fontWeight: 800, fontSize: 22, color: accent, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 style={{
          fontFamily: 'Host Grotesk', fontWeight: 700,
          fontSize: 28, lineHeight: 1.12, letterSpacing: '-0.022em',
          margin: 0, color: '#000',
        }}>{title}</h3>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: '#000', opacity: 0.72, margin: 0, flex: 1 }}>{text}</p>
        <div style={{
          marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'Host Grotesk', fontWeight: 600, fontSize: 14, color: accent,
          transition: 'gap 0.3s',
          gap: hover ? 14 : 8,
        }}>
          Learn more <Icon.arrowR style={{ width: 14, height: 14 }} />
        </div>
      </div>
    </a>
  );
}

// =============================================================
// 3. LOGO CAROUSEL — two rows, opposite directions, edge fade
// =============================================================

function LogoCarousel() {
  const partners = ASSETS.partners;
  // split into two roughly equal rows
  const row1 = partners.slice(0, Math.ceil(partners.length / 2));
  const row2 = partners.slice(Math.ceil(partners.length / 2));

  const ref = useReveal();
  return (
    <section ref={ref} data-reveal className="home-partners" style={{
      background: '#fff', padding: '80px 0 100px',
      borderTop: '1px solid #EEEEEE', borderBottom: '1px solid #EEEEEE',
    }}>
      <div className="container home-partners-head" style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="tagline" style={{ color: '#2250FC', fontWeight: 500 }}>In partnership with</span>
        <h2 style={{
          fontFamily: 'Host Grotesk', fontWeight: 700,
          fontSize: 'clamp(28px, 2.8vw, 40px)',
          lineHeight: 1.1, letterSpacing: '-0.025em',
          margin: '12px 0 0', color: '#000',
        }}>
          Trusted across aerospace, motorsport &amp; precision manufacturing
        </h2>
      </div>

      <div className="home-partners-rows" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <LogoRow logos={row1} direction="left" duration={42} />
        <LogoRow logos={[...row2, ...row1]} direction="right" duration={50} />
      </div>
    </section>
  );
}

function LogoRow({ logos, direction = 'left', duration = 40 }) {
  return (
    <div className="logo-row-mask" style={{
      overflow: 'hidden', position: 'relative',
      maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
    }}>
      <div className="logo-row-track" style={{
        display: 'flex',
        width: 'max-content',
        animation: `${direction === 'left' ? 'marqueeL' : 'marqueeR'} ${duration}s linear infinite`,
        gap: 80,
        paddingRight: 80,
      }}
        onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}>
        {[...logos, ...logos, ...logos].map((l, i) => (
          <LogoTile key={i} logo={l} />
        ))}
      </div>
      <style>{`
        @keyframes marqueeL { from { transform: translateX(0); } to { transform: translateX(-33.3333%); } }
        @keyframes marqueeR { from { transform: translateX(-33.3333%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

function LogoTile({ logo }) {
  const [ok, setOk] = useStateA(true);
  const [hover, setHover] = useStateA(false);
  return (
    <div
      className="logo-tile"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height: 110, width: 240, padding: '20px 28px',
        flexShrink: 0,
        background: '#fff',
        borderRadius: 14,
        border: '1px solid #EEEEEE',
        boxShadow: hover ? '0 16px 32px -16px rgba(0,0,0,0.12)' : 'none',
        transition: 'box-shadow 0.3s, transform 0.3s',
        transform: hover ? 'translateY(-3px)' : 'none',
      }}>
      {ok ? (
        <img src={logo.src} alt={logo.name}
          className={logo.name === 'MachineWorks' ? 'logo-img-machineworks' : ''}
          style={{
            width: '100%',
            maxHeight: 72,
            transform: logo.scale ? `scale(${logo.scale})` : 'none',
            objectFit: 'contain',
            filter: hover ? 'grayscale(0%)' : 'grayscale(100%)',
            opacity: hover ? 1 : 0.78,
            transition: 'filter 0.3s, opacity 0.3s, transform 0.3s',
          }}
          onError={() => setOk(false)} />
      ) : (
        <span style={{
          fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 18,
          color: '#000', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
          opacity: hover ? 1 : 0.72,
        }}>{logo.name}</span>
      )}
    </div>
  );
}

// =============================================================
// 4. PREMIUM COUNTER — big numbers, premium layout
// Per brand guidelines: +110% / -53% / -20% / -11%
// =============================================================

function Counter() {
  const [ref, seen] = useInView(0.25);
  const stats = [
    { num: 110, prefix: '+', suffix: '%', label: 'Productivity', desc: 'increase' },
    { num: 53,  prefix: '−', suffix: '%', label: 'Cycle time',   desc: 'reduction' },
    { num: 20,  prefix: '−', suffix: '%', label: 'Set-up time',  desc: 'saved' },
    { num: 11,  prefix: '−', suffix: '%', label: 'Tooling costs', desc: 'lowered' },
  ];

  return (
    <section ref={ref} className="home-counter" style={{
      background: '#000', color: '#fff',
      padding: '120px 0 140px',
      position: 'relative', overflow: 'hidden',
    }} data-screen-label="03 Counter">

      {/* Decorative gradient + grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 40% at 100% 20%, rgba(34,80,252,0.4), transparent 60%), radial-gradient(ellipse 50% 40% at 0% 80%, rgba(24,154,57,0.18), transparent 60%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 100%)',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        {/* Heading row */}
        <div className="counter-head" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'end', marginBottom: 80,
        }}>
          <div>
            <span style={{
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#3FFD7E', display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 24, height: 1, background: '#3FFD7E' }} />
              The numbers
            </span>
            <h2 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 76px)',
              lineHeight: 1.02, letterSpacing: '-0.035em',
              margin: '20px 0 0', color: '#fff',
              textWrap: 'balance',
            }}>
              Real machines.<br />Real gains.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.78)', maxWidth: 520, margin: 0 }}>
              These aren't lab numbers. They come from manufacturers running Productive Machines in production — aerospace, motorsport, energy, medical. Verified by AMRC.
            </p>
            <a href="resources.html#case-studies" className="btn-link on-dark" style={{ marginTop: 20, display: 'inline-flex' }}>
              Read the case studies <Icon.arrow className="arr" style={{ width: 14, height: 14 }} />
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div className="counter-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 18,
          gap: 1,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {stats.map((s, i) => <CounterTile key={s.label} {...s} trigger={seen} delay={i * 110} />)}
        </div>

        {/* Bottom band: small detail row */}
        <div className="counter-proof-row" style={{
          marginTop: 28, padding: '18px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          fontSize: 13, color: 'rgba(255,255,255,0.65)',
          fontFamily: 'JetBrains Mono',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3FFD7E', boxShadow: '0 0 0 4px rgba(63,253,126,0.22)' }} />
            Sourced from 2024–2025 customer audits
          </span>
          <span>· AMRC-verified methodology</span>
          <span>· Across 200+ machine tools deployed</span>
        </div>
      </div>
    </section>
  );
}

function CounterTile({ num, prefix, suffix, label, desc, trigger, delay }) {
  const v = useCountUp(num, trigger);
  const [hover, setHover] = useStateA(false);
  return (
    <div
      className="counter-tile"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: '40px 36px',
        background: hover ? 'rgba(34,80,252,0.18)' : '#0a0a0a',
        transition: `opacity 0.8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.8s cubic-bezier(.2,.7,.2,1) ${delay}ms, background 0.3s`,
        opacity: trigger ? 1 : 0,
        transform: trigger ? 'none' : 'translateY(28px)',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
      }}>
      {/* Top mono label */}
      <div style={{
        fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono',
        marginBottom: 24,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>{String(Math.floor(delay / 110) + 1).padStart(2, '0')} / 04</span>
        <span style={{ color: '#3FFD7E' }}>{desc}</span>
      </div>

      {/* Number */}
      <div className="counter-number" style={{
        fontFamily: 'Host Grotesk', fontWeight: 800,
        fontSize: 'clamp(72px, 7vw, 116px)',
        lineHeight: 0.92, letterSpacing: '-0.05em',
        color: '#fff',
        display: 'flex', alignItems: 'baseline', gap: 2,
      }}>
        <span style={{ color: '#3FFD7E', fontSize: '0.7em', fontWeight: 700 }}>{prefix}</span>
        <span>{Math.round(v)}</span>
        <span style={{ fontSize: '0.55em', opacity: 0.7 }}>{suffix}</span>
      </div>

      {/* Label */}
      <div style={{
        marginTop: 20, fontSize: 18, fontWeight: 500, color: '#fff',
      }}>{label}</div>

      {/* Hover accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: 2,
        width: hover ? '100%' : '20%',
        background: 'linear-gradient(90deg, #2250FC, #3FFD7E)',
        transition: 'width 0.5s cubic-bezier(.2,.7,.2,1)',
      }} />
    </div>
  );
}

Object.assign(window, { Hero, HeroStatStrip, LogoCarousel, Counter });
