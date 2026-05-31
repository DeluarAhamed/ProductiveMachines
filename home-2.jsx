// Productive Machines — HOME (middle sections)
// 5. Sticky-stacking story cards (Problem / Answer / Result) — Clearwater-style
// 6. Process section (NEW — 4 steps)
// 7. Premium testimonial (brand-blue stars, large quote, AML logo)

const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

// =============================================================
// 5. STICKY-STACKING STORY CARDS
// =============================================================

function StoryStack() {
  const stageRef = useRefB(null);
  const [stackProgress, setStackProgress] = useStateB(0);
  const items = [
    {
      n: '01', tag: 'The problem', tagColor: '#FF7849',
      bg: '#0a0a0a', color: '#fff',
      eyebrow: 'Pain',
      heading: 'Chatter eats time, tools and yield.',
      body: 'Every shop fights it the same way — drop the feed rate, add safety margin, accept slower cycles. The numbers tell you it works. The chatter tells you you\'re leaving fifty percent on the table.',
      stats: [['Tool wear', '+38%'], ['Cycle slip', '+12 min'], ['Scrap rate', '4.2%']],
      viz: 'problem',
    },
    {
      n: '02', tag: 'The answer', tagColor: '#2250FC',
      bg: '#fff', color: '#000',
      eyebrow: 'Precision',
      heading: 'Real-time stability tells you what works.',
      body: 'Productive Machines listens to your machine and knows its limits in real time. Stability lobes and chatter detection run continuously, telling you exactly how hard you can push. No guessing. No wasted safety margins.',
      stats: [['Stability', 'Live'], ['CAM integrations', 'NX / Mastercam'], ['AMRC validated', '✓']],
      viz: 'answer',
    },
    {
      n: '03', tag: 'The result', tagColor: '#189A38',
      bg: '#2250FC', color: '#fff',
      eyebrow: 'Proof',
      heading: 'Cycle time drops. Margins improve. Machines earn.',
      body: 'Your machines run at their true capability. Every job. Every time. The gains compound — faster cycles, longer tool life, fewer setups. The difference shows up in your numbers within weeks.',
      stats: [['Cycle time', '−53%'], ['Tool life', '+38%'], ['Productivity', '+110%']],
      viz: 'result',
    },
  ];

  useEffectB(() => {
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const topOffset = parseFloat(getComputedStyle(stage.closest('.story-stack-section')).getPropertyValue('--story-current-top')) || (window.innerWidth <= 560 ? 66 : window.innerWidth <= 900 ? 76 : 96);
      const rect = stage.getBoundingClientRect();
      const pinnedHeight = Math.max(1, window.innerHeight - topOffset);
      const available = Math.max(1, stage.offsetHeight - pinnedHeight);
      const traveled = Math.min(Math.max(-rect.top + topOffset, 0), available);
      setStackProgress(traveled / available);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="story-stack-section" data-screen-label="04 Story">
      <div className="container">
        <div className="story-stack-head" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 80px' }}>
          <span className="tagline" style={{ color: '#2250FC', fontWeight: 500 }}>How it works</span>
          <h2 style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 72px)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            margin: '14px 0 0', color: '#000',
            textWrap: 'balance',
          }}>
            From <em style={{ fontStyle: 'italic', color: '#2250FC' }}>"chatter is unavoidable"</em> to <span style={{ color: '#189A38' }}>"this is the new baseline."</span>
          </h2>
        </div>

        {/* The viewport pins once; cards advance inside it one by one. */}
        <div ref={stageRef} className="story-stack-stage" style={{ '--story-count': items.length + 1 }}>
          <div className="story-stack-viewport">
            {items.map((it, i) => (
              <StoryCard
                key={it.n}
                {...it}
                idx={i}
                total={items.length}
                progress={stackProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ n, tag, tagColor, bg, color, eyebrow, heading, body, stats, viz, idx, total, progress }) {
  const cardRef = useRefB(null);
  const raw = progress * total;
  const active = Math.min(total - 1, Math.floor(raw));
  const local = Math.min(1, Math.max(0, raw - active));
  let translateY = 112;
  let opacity = 0;
  let scale = 0.98;

  if (idx < active) {
    translateY = -8;
    opacity = 0;
    scale = 0.96;
  } else if (idx === active) {
    translateY = 0;
    opacity = 1;
    scale = 1;
  } else if (idx === active + 1) {
    const easedLocal = Math.min(1, Math.max(0, (local - 0.35) / 0.65));
    translateY = (1 - easedLocal) * 112;
    opacity = easedLocal > 0.02 ? 1 : 0;
    scale = 0.98 + easedLocal * 0.02;
  }

  return (
    <article
      ref={cardRef}
      className="story-sticky-card"
      aria-hidden={idx !== active}
      style={{
        zIndex: idx + 1,
        opacity,
        transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
        pointerEvents: idx === active ? 'auto' : 'none',
      }}
    >
      <div className="story-card-inner" style={{
        background: bg, color: color,
        border: bg === '#fff' ? '1px solid #EEEEEE' : 'none',
      }}>
        {/* Decorative big number behind */}
        <div aria-hidden className="story-card-watermark" style={{
          position: 'absolute', right: 64, top: 64,
          fontFamily: 'Host Grotesk', fontWeight: 800,
          fontSize: 'clamp(180px, 22vw, 320px)',
          lineHeight: 0.85, letterSpacing: '-0.07em',
          color: 'transparent',
          WebkitTextStroke: `1px ${bg === '#fff' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.14)'}`,
          pointerEvents: 'none',
        }}>{n}</div>

        <div className="story-card-grid" style={{
          position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64,
          alignItems: 'center', minHeight: 416,
        }}>
          <div>
            <div className="story-card-kicker" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span className="story-card-step-number" aria-label={`Step ${n}`} style={{
                minWidth: 36, height: 28, padding: '0 10px',
                borderRadius: 999,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${bg === '#fff' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.24)'}`,
                background: bg === '#fff' ? 'rgba(0,0,0,0.035)' : 'rgba(255,255,255,0.09)',
                color: bg === '#fff' ? 'rgba(0,0,0,0.68)' : 'rgba(255,255,255,0.78)',
                fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.08em',
              }}>{n}</span>
              <span className="story-card-step-label" style={{
                padding: '6px 12px', borderRadius: 999,
                background: `${tagColor}20`, color: tagColor,
                border: `1px solid ${tagColor}38`,
                fontSize: 12, fontWeight: 650,
                letterSpacing: '0.035em',
              }}>{tag}</span>
              <span style={{ fontSize: 13, opacity: 0.55 }}>{eyebrow}</span>
            </div>

            <h3 className="story-card-title" style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(32px, 3.8vw, 56px)',
              lineHeight: 1.06, letterSpacing: '-0.03em',
              margin: '0 0 28px',
              textWrap: 'pretty', maxWidth: 560,
            }}>{heading}</h3>

            <p className="story-card-body" style={{
              fontSize: 18, lineHeight: 1.6, margin: 0,
              opacity: 0.85, maxWidth: 540, textWrap: 'pretty',
            }}>{body}</p>

            <div className="story-card-stats" style={{
              marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 32,
              borderTop: `1px solid ${bg === '#fff' ? '#EEEEEE' : 'rgba(255,255,255,0.18)'}`,
              paddingTop: 24,
              maxWidth: 520,
            }}>
              {stats.map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>{k}</div>
                  <StoryStatValue value={v} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <StoryViz which={viz} />
          </div>
        </div>
      </div>
    </article>
  );
}

function StoryStatValue({ value }) {
  const [ref, seen] = useInView(0.35);
  const match = String(value).match(/^([+\u2212-]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return <div ref={ref} style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22 }}>{value}</div>;
  }
  const decimals = match[2].includes('.') ? 1 : 0;
  const animated = useCountUp(Number(match[2]), seen, 1000);
  return (
    <div ref={ref} style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22 }}>
      {match[1]}{animated.toFixed(decimals)}{match[3]}
    </div>
  );
}

function StoryViz({ which }) {
  if (which === 'problem') return <VizChatter />;
  if (which === 'answer') return <VizLobes />;
  return <VizGain />;
}

function VizChatter() {
  // Jagged amber chatter waveform on dark
  const w = 600, h = 360;
  const points = useRefB(null);
  if (!points.current) {
    const pts = [];
    for (let x = 0; x <= w; x += 4) {
      const phase = x / w * Math.PI * 12;
      const decay = 1.0 - x / w * 0.3;
      const y = h * 0.5
        + Math.sin(phase) * 38 * decay
        + Math.sin(phase * 2.3 + 1) * 18 * decay
        + (((x * 9301 + 49297) % 233280) / 233280 - 0.5) * 22;
      pts.push([x, y]);
    }
    points.current = 'M ' + pts.map(([x, y]) => `${x},${y.toFixed(1)}`).join(' L ');
  }
  return (
    <div style={{ position: 'relative', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: 28, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.55 }}>Chatter · Without optimisation</div>
        <span style={{
          fontSize: 10.5, padding: '4px 10px', borderRadius: 999,
          background: 'rgba(255,120,73,0.22)', color: '#FFAB80',
          letterSpacing: '0.16em', textTransform: 'uppercase',
        }}>Unstable</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 240 }}>
        {[0.25, 0.5, 0.75].map((y, i) => (
          <line key={i} x1="0" y1={h * y} x2={w} y2={h * y} stroke="rgba(255,255,255,0.06)" />
        ))}
        <path d={points.current} stroke="#FF7849" strokeWidth="1.6" fill="none" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5, marginTop: 10 }}>
        <span>0:00</span><span>6:00</span><span>12:00 min</span>
      </div>
    </div>
  );
}

function VizLobes() {
  const t = useTimeB();
  const cx = 200 + Math.sin(t * 0.6) * 28;
  const cy = 110 + Math.cos(t * 0.5) * 10;
  return (
    <div style={{ background: '#f5f5f5', border: '1px solid #EEEEEE', borderRadius: 16, padding: 28, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.55 }}>SenseNC · Stability Map</div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 10.5, padding: '4px 10px', borderRadius: 999,
          background: 'rgba(34,80,252,0.14)', color: '#2250FC',
          letterSpacing: '0.16em', textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2250FC', animation: 'pulse-dot 1.6s ease-in-out infinite' }} />
          Computing
        </span>
      </div>
      <svg viewBox="0 0 600 320" style={{ width: '100%', height: 240 }}>
        <defs>
          <linearGradient id="lobeFillS" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2250FC" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2250FC" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[60, 120, 180, 240].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(0,0,0,0.05)" />)}
        <path d="M 0 230 Q 60 80, 120 230 T 240 230 T 360 230 T 480 230 T 600 230 L 600 320 L 0 320 Z" fill="url(#lobeFillS)" />
        <path d="M 0 230 Q 60 80, 120 230 T 240 230 T 360 230 T 480 230 T 600 230" stroke="#2250FC" strokeWidth="1.8" fill="none" />
        <circle cx={cx} cy={cy} r="7" fill="#2250FC" />
        <circle cx={cx} cy={cy} r="16" fill="none" stroke="#2250FC" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="26" fill="none" stroke="#2250FC" strokeOpacity="0.15" strokeWidth="1" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', opacity: 0.55, marginTop: 10 }}>
        <span>4.2 mm depth</span><span style={{ color: '#2250FC' }}>● 12,480 rpm</span><span>+18% reserve</span>
      </div>
    </div>
  );
}

function VizGain() {
  const [animH, setH] = useStateB('0%');
  const ref = useRefB(null);
  useEffectB(() => {
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        setTimeout(() => setH('100%'), 200);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 16, padding: 28, color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.8 }}>Ti-6Al-4V impeller · Before vs After</div>
        <span style={{
          fontSize: 12, padding: '5px 12px',
          background: '#189A38', color: '#fff',
          fontWeight: 500,
        }}>−53%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36, justifyContent: 'center', height: 220 }}>
        <BarColB label="Before" value="42:18" max />
        <BarColB label="After" value="19:52" pct={46} animH={animH} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
        {[
          ['Tool life', '+38%'],
          ['Tool changes', '−2'],
          ['Scrap', '0'],
        ].map(([k, v]) => (
          <div key={k} style={{ background: 'rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: 8 }}>
            <div style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7 }}>{k}</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarColB({ label, value, pct = 100, max, animH = '100%' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
        <div style={{
          width: 76, height: max ? '100%' : animH,
          background: max ? 'rgba(255,255,255,0.18)' : '#3FFD7E',
          borderRadius: '6px 6px 0 0',
          transition: 'height 1.4s cubic-bezier(.2,.7,.2,1)',
          position: 'relative',
          minHeight: max ? '100%' : `${pct}%`,
          maxHeight: max ? '100%' : `${pct}%`,
        }}>
          <div className="bar-value-label" style={{
            position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'Host Grotesk', fontWeight: 600, fontSize: 20,
            color: max ? 'rgba(255,255,255,0.85)' : '#3FFD7E',
            whiteSpace: 'nowrap',
          }}>{value}</div>
        </div>
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.75 }}>{label}</div>
    </div>
  );
}

function useTimeB() {
  const [t, setT] = useStateB(0);
  useEffectB(() => {
    let raf;
    const tick = (now) => { setT(now / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

// =============================================================
// 6. PROCESS — 4 steps
// =============================================================

function Process() {
  const steps = [
    {
      n: '01', title: 'Upload your CAM file',
      text: 'NX, Mastercam, ISO G-code or just a tool list. We accept it all. No CAM swap, no install.',
      icon: '↑',
    },
    {
      n: '02', title: 'Tap test (optional)',
      text: '90 seconds with our wireless hammer. We build a physics-accurate digital twin of your spindle and tool.',
      icon: '~',
    },
    {
      n: '03', title: 'SenseNC optimises',
      text: 'Stability lobes computed across every move. Feeds and speeds set to the true machine envelope.',
      icon: '◇',
    },
    {
      n: '04', title: 'Run faster. Track gains.',
      text: 'Optimised program ships back in minutes. Audited gains visible in your dashboard from day one.',
      icon: '→',
    },
  ];
  const ref = useReveal();

  return (
    <section ref={ref} data-reveal className="home-process" data-screen-label="05 Process" style={{
      background: '#fff', padding: '120px 0',
      borderTop: '1px solid #EEEEEE',
    }}>
      <div className="container">
        <div className="process-head" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          marginBottom: 80, alignItems: 'end',
        }}>
          <div>
            <span className="tagline" style={{ color: '#2250FC', fontWeight: 500 }}>The process</span>
            <h2 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 1.04, letterSpacing: '-0.03em',
              margin: '14px 0 0', color: '#000',
              textWrap: 'balance', maxWidth: 540,
            }}>
              From file to faster cycles in <span style={{ color: '#2250FC' }}>minutes</span>.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: '#000', opacity: 0.75, maxWidth: 480, margin: 0 }}>
              Four steps. No new CAM seat. No retraining. Your programmers stay productive from day one — and your machines start running at their true envelope from the first job.
            </p>
          </div>
        </div>

        {/* Steps row */}
        <div className="process-track" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
          {/* Connecting line */}
          <div aria-hidden className="process-line" style={{
            position: 'absolute', top: 32, left: '12.5%', right: '12.5%', height: 1,
            background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.2) 0 6px, transparent 6px 12px)',
          }} />
          {steps.map((s, i) => <ProcessStep key={s.n} {...s} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ n, title, text, icon, idx }) {
  const ref = useReveal();
  return (
    <div ref={ref} data-reveal className="process-step" style={{
      transitionDelay: `${idx * 120}ms`,
      padding: '0 24px',
      position: 'relative',
      textAlign: 'center',
    }}>
      <div className="process-step-icon" style={{
        width: 64, height: 64, margin: '0 auto',
        background: '#fff',
        border: '1px solid #000',
        borderRadius: '50%',
        display: 'grid', placeItems: 'center',
        fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 24,
        color: '#2250FC',
        position: 'relative', zIndex: 1,
      }}>{icon}</div>
      <div style={{
        marginTop: 24, fontFamily: 'JetBrains Mono',
        fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: '#000', opacity: 0.55,
      }}>Step {n}</div>
      <h3 style={{
        fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22,
        margin: '10px 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em',
      }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: '#000', opacity: 0.72, margin: 0, textWrap: 'pretty' }}>{text}</p>
    </div>
  );
}

// =============================================================
// 7. PREMIUM TESTIMONIAL — brand blue stars, AML logo
// =============================================================

function Testimonial() {
  const quotes = [
    {
      quote: 'Innovation is part of AML\'s DNA, we are constantly looking at innovative ways to improve our manufacturing processes and reduce the carbon footprint. Productive Machines ticked all the boxes and helped us become more competitive.',
      author: 'Dr Gareth Morgan',
      title: 'Managing Director, AML',
      logo: 'assets/aml-logo.svg',
      brand: 'AML',
      caseHref: 'case-aml.html',
    },
    {
      quote: 'We hit a 53% cycle-time reduction on a Ti impeller in week three. Three months in, it\'s our default workflow on every 5-axis job — and our programmers love it.',
      author: 'Markus Faber',
      title: 'Head of Machining, Faber Präzision GmbH',
      logo: 'assets/partner-logos/sandvik.png',
      brand: 'FABER',
      caseHref: 'case-faber.html',
    },
    {
      quote: 'The AMRC validation was the green light. SenseNC sits alongside Mastercam — programmers don\'t even change tools. It just makes every job faster.',
      author: 'Sarah Chen',
      title: 'CTO, Vanguard Precision Tooling',
      logo: 'assets/partner-logos/amrc.png',
      brand: 'AMRC',
      caseHref: 'case-vanguard.html',
    },
  ];
  const [i, setI] = useStateB(0);
  const ref = useReveal();

  useEffectB(() => {
    const t = setInterval(() => setI(x => (x + 1) % quotes.length), 9000);
    return () => clearInterval(t);
  }, []);

  const cur = quotes[i];

  return (
    <section ref={ref} data-reveal className="home-testimonial" data-screen-label="06 Testimonial" style={{
      background: '#fff', padding: '120px 0',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid #EEEEEE',
    }}>
      {/* Decorative quote mark */}
      <div aria-hidden style={{
        position: 'absolute', left: -40, top: 60,
        fontFamily: 'Host Grotesk', fontWeight: 800, fontSize: 480, lineHeight: 0.8,
        color: 'rgba(34,80,252,0.05)', pointerEvents: 'none',
      }}>"</div>

      <div className="container" style={{ position: 'relative', maxWidth: 1240 }}>
        <div className="testimonial-card" style={{
          background: '#fff',
          border: '1px solid #EEEEEE',
          borderRadius: 24,
          padding: '64px 80px',
          display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64,
          alignItems: 'center',
          boxShadow: '0 30px 80px -40px rgba(0,0,0,0.10)',
          position: 'relative',
        }}>
          {/* Decorative blue corner */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, right: 0, width: 240, height: 240,
            background: 'radial-gradient(circle at 100% 0%, rgba(34,80,252,0.10), transparent 60%)',
            borderRadius: 24, pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative' }}>
            {/* Stars in brand blue */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
              {Array.from({ length: 5 }).map((_, k) => (
                <Icon.star key={k} style={{ width: 22, height: 22, color: '#2250FC' }} />
              ))}
              <span style={{
                marginLeft: 12, fontSize: 13, color: '#000', opacity: 0.6,
                fontFamily: 'JetBrains Mono', letterSpacing: '0.1em',
                display: 'inline-flex', alignItems: 'center',
              }}>5.0 · Verified customer</span>
            </div>

            <p key={cur.quote} style={{
              fontFamily: 'Host Grotesk',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(22px, 1.9vw, 30px)',
              lineHeight: 1.4, letterSpacing: '-0.005em',
              color: '#000',
              margin: 0,
              textWrap: 'pretty',
              animation: 'fadeUp 0.6s cubic-bezier(.2,.7,.2,1)',
            }}>
              "{cur.quote}"
            </p>

            <div className="testimonial-author" style={{
              marginTop: 36, display: 'flex', alignItems: 'center', gap: 24,
            }} key={cur.author + 'a'}>
              <div className="testimonial-avatar" style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#2250FC', color: '#fff',
                display: 'grid', placeItems: 'center',
                fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 18,
              }}>
                {cur.author.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#000' }}>{cur.author}</div>
                <div style={{ fontSize: 15, color: '#000', opacity: 0.65 }}>{cur.title}</div>
              </div>
            </div>
          </div>

          {/* Right: Logo + CTA */}
          <div className="testimonial-side" style={{
            paddingLeft: 64, borderLeft: '1px solid #EEEEEE',
            display: 'flex', flexDirection: 'column', gap: 24, height: '100%',
            justifyContent: 'center',
          }}>
            <div className="testimonial-logo-card" style={{
              height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 16,
              background: '#0a0a0a', borderRadius: 12,
              position: 'relative', overflow: 'hidden',
            }}>
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(34,80,252,0.10), transparent 70%)',
              }} />
              {cur.logo ? (
                <img src={cur.logo} alt={cur.brand}
                  style={{
                    maxHeight: 64, maxWidth: 200, objectFit: 'contain',
                    position: 'relative',
                  }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
              ) : null}
              <span style={{
                display: cur.logo ? 'none' : 'block',
                fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22,
                letterSpacing: '0.04em', color: '#fff',
                position: 'relative',
              }}>{cur.brand}</span>
            </div>

            <a href={cur.caseHref} className="btn btn-secondary" style={{ justifyContent: 'center' }}>
              Read full case study <Icon.arrow className="arr" />
            </a>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#000', opacity: 0.55 }}>
                {String(i + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="slider-arrow"
                  onClick={() => setI((i - 1 + quotes.length) % quotes.length)}
                  style={{ width: 40, height: 40 }} aria-label="Previous">
                  <Icon.arrowL style={{ width: 18, height: 18 }} />
                </button>
                <button className="slider-arrow"
                  onClick={() => setI((i + 1) % quotes.length)}
                  style={{ width: 40, height: 40 }} aria-label="Next">
                  <Icon.arrowR style={{ width: 18, height: 18 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { StoryStack, Process, Testimonial });
