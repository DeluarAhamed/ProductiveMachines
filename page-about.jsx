// ABOUT page sections
const { useState: useStateAB, useEffect: useEffectAB } = React;

function AboutHero() {
  return (
    <section style={{
      background: '#fff', padding: '40px 0 80px',
      position: 'relative', overflow: 'hidden',
    }} data-screen-label="A01 About hero">
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 40% 60% at 100% 0%, rgba(34,80,252,0.10), transparent 60%), radial-gradient(ellipse 40% 60% at 0% 100%, rgba(24,154,57,0.06), transparent 60%)',
      }} />
      <div className="container" style={{ position: 'relative', maxWidth: 1320 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }} className="about-hero-grid">
          <div>
            <span className="tagline" style={{ color: '#2250FC', fontWeight: 500 }}>About Productive Machines</span>
            <WordReveal
              text="An AMRC spin-out solving CNC's hardest problem."
              as="h1"
              style={{
                fontFamily: 'Host Grotesk', fontWeight: 700,
                fontSize: 'clamp(40px, 5.6vw, 84px)',
                lineHeight: 1.02, letterSpacing: '-0.03em',
                margin: '14px 0 22px', color: '#000', textWrap: 'balance',
              }}
            />
            <p style={{ fontSize: 20, lineHeight: 1.5, color: '#000', opacity: 0.78, margin: '0 0 28px', textWrap: 'pretty', maxWidth: 560 }}>
              We build software that listens to your machine, understands its limits, and runs every cut at the true envelope. Born inside AMRC Sheffield. Trusted by Boeing, Siemens and AML.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="book-demo.html" className="btn btn-primary" style={{ padding: '14px 24px' }}>
                Book a demo <Icon.arrow className="arr" />
              </a>
              <a href="careers.html" className="btn btn-secondary" style={{ padding: '14px 24px' }}>
                See careers
              </a>
            </div>
          </div>

          {/* Hero team photo */}
          <div style={{
            borderRadius: 20, overflow: 'hidden',
            aspectRatio: '4/3', background: '#2250FC',
            position: 'relative',
          }}>
            <img src="assets/site-media/mp-visit-manufacturing-innovation.jpg"
              alt="Productive Machines team"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function OurStory() {
  return (
    <section id="story" style={{ background: '#fff', padding: '100px 0', borderTop: '1px solid #EEEEEE' }} data-screen-label="A02 Story">
      <div className="container story-timeline-grid" style={{ maxWidth: 1240, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'flex-start' }}>
        <div>
          <span className="tagline" style={{ color: '#2250FC' }}>Our story</span>
          <h2 style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(32px, 3.6vw, 52px)',
            lineHeight: 1.05, letterSpacing: '-0.025em',
            margin: '14px 0 0', color: '#000',
            textWrap: 'balance',
          }}>From a research bench to 200+ shop floors.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            ['2019', 'Founded as a spin-out from the AMRC at the University of Sheffield to commercialise a decade of chatter-vibration research.'],
            ['2021', 'First UK Innovation Programme grant. SenseNC Feeds shipped to Boeing and Siemens.'],
            ['2023', 'AMRC-validated stability map. UKISF Manufacturing Innovation award. 50+ live machines.'],
            ['2025', 'SenseNC integrates directly into Siemens NX. Over 200 deployments across aerospace, energy and motorsport.'],
          ].map(([year, text]) => (
            <div key={year} className="story-timeline-row" style={{
              display: 'grid', gridTemplateColumns: '90px 1fr', gap: 24,
              padding: '20px 0', borderTop: '1px solid #EEEEEE',
            }}>
              <div style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22, color: '#2250FC' }}>{year}</div>
              <div style={{ fontSize: 17, lineHeight: 1.55, color: '#000', opacity: 0.85 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" style={{
      background: '#0a0a0a', color: '#fff', padding: '120px 0',
      position: 'relative', overflow: 'hidden',
    }} data-screen-label="A03 Vision">
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,80,252,0.30), transparent 60%)',
      }} />
      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 1100 }}>
        <span className="tagline" style={{ color: '#3FFD7E', fontWeight: 500 }}>Our vision</span>
        <h2 style={{
          fontFamily: 'Host Grotesk', fontWeight: 700,
          fontSize: 'clamp(48px, 6.4vw, 104px)',
          lineHeight: 0.98, letterSpacing: '-0.04em',
          margin: '16px auto 24px', color: '#fff',
          textWrap: 'balance',
        }}>
          Make the best part. <span style={{ color: '#3FFD7E' }}>Faster.</span> First time.
        </h2>
        <p style={{
          fontSize: 22, lineHeight: 1.55, color: 'rgba(255,255,255,0.78)', margin: '0 auto', maxWidth: 760,
        }}>
          Every CNC operator should have an expert on their shoulder — telling them exactly how hard to push, every cut, every job. That's what SenseNC does. That's what we're here to scale.
        </p>
      </div>
    </section>
  );
}

function Technology() {
  const pillars = [
    {
      n: '01', h: 'Physics + ML',
      t: 'A digital-twin model of every spindle, tool and holder. Stability lobes computed in real time, validated against thousands of recorded cuts at AMRC.',
    },
    {
      n: '02', h: 'CAM-native',
      t: 'Sits inside NX and Mastercam — no new seat to learn, no workflow swap. Optimised programs ship back in minutes.',
    },
    {
      n: '03', h: 'Audited gains',
      t: 'Every optimisation is measured against the original program. Customers see verified time and tool savings in their dashboard.',
    },
  ];
  return (
    <section id="technology" style={{ background: '#fff', padding: '120px 0' }} data-screen-label="A04 Technology">
      <div className="container">
        <div style={{ maxWidth: 880, marginBottom: 64 }}>
          <span className="tagline" style={{ color: '#2250FC' }}>Technology</span>
          <h2 style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(36px, 4.4vw, 64px)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            margin: '14px 0 0', color: '#000', textWrap: 'balance',
          }}>
            A decade of research — productised.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {pillars.map(p => <TechCard key={p.n} {...p} />)}
        </div>
      </div>
    </section>
  );
}

function TechCard({ n, h, t }) {
  const ref = useReveal();
  const [hover, setHover] = useStateAB(false);
  return (
    <div ref={ref} data-reveal
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: '#0a0a0a', color: '#fff',
        borderRadius: 18, padding: 32, position: 'relative', overflow: 'hidden',
        transition: 'transform 0.5s', transform: hover ? 'translateY(-6px)' : 'none',
        minHeight: 320, display: 'flex', flexDirection: 'column',
      }}>
      <div aria-hidden style={{
        position: 'absolute', right: -50, top: -50,
        fontFamily: 'Host Grotesk', fontWeight: 800, fontSize: 240,
        lineHeight: 0.8, letterSpacing: '-0.06em',
        color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.10)',
        transition: 'transform 0.6s', transform: hover ? 'translate(-10px, 10px)' : 'none',
      }}>{n}</div>
      <div style={{
        position: 'relative', fontFamily: 'JetBrains Mono', fontSize: 11,
        letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55,
      }}>{n}</div>
      <h3 style={{
        position: 'relative',
        marginTop: 16, marginBottom: 14,
        fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 28,
        lineHeight: 1.1, letterSpacing: '-0.02em',
      }}>{h}</h3>
      <p style={{ position: 'relative', fontSize: 15, lineHeight: 1.55, opacity: 0.78, margin: 0, textWrap: 'pretty' }}>{t}</p>
    </div>
  );
}

function Team() {
  const team = [
    { name: 'Dr Erdem Ozturk', role: 'CEO & Founder', tag: 'Founder', bg: '#2250FC',
      bio: 'Co-founder. 20+ years of machining innovation research at AMRC Sheffield.' },
    { name: 'Dr Cristina Sesma-Forcada', role: 'CTO & Founder', tag: 'Founder', bg: '#144A9A',
      bio: 'PhD in machine tool dynamics. Leads R&D and product engineering.' },
    { name: 'Dr Jose Garcia-Suarez', role: 'Head of Engineering', tag: 'Engineering', bg: '#0E3578',
      bio: 'Drives the SenseNC physics engine and CAM integration teams.' },
    { name: 'Dr Norberto Lopez de Lacalle', role: 'Scientific Advisor', tag: 'Research', bg: '#189A39',
      bio: 'Professor at the University of the Basque Country. Industry liaison.' },
    { name: 'Sam Turner', role: 'Strategic Advisor', tag: 'Advisor', bg: '#0E6F26',
      bio: 'CTO of the AMRC. Industry strategy and partnerships.' },
    { name: 'Mark Krynski', role: 'Commercial Director', tag: 'Commercial', bg: '#2250FC',
      bio: 'Leads commercial strategy and customer success across the global fleet.' },
    { name: 'Dr Naveed Iqbal', role: 'Senior Software Engineer', tag: 'Engineering', bg: '#144A9A',
      bio: 'Builds the SenseNC web stack and Mastercam plugin.' },
    { name: 'Dr Vahid Vajdi', role: 'Applications Engineer', tag: 'Customer', bg: '#0E3578',
      bio: 'Runs customer deployments and tap-testing engagements.' },
    { name: 'Khurshid Alam', role: 'CAM Specialist', tag: 'Engineering', bg: '#189A39',
      bio: 'NX & Mastercam integration. Customer onboarding lead.' },
  ];
  return (
    <section id="team" style={{ background: '#fff', padding: '120px 0' }} data-screen-label="A05 Team">
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 640 }}>
            <span className="tagline" style={{ color: '#2250FC' }}>Team</span>
            <h2 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(36px, 4.4vw, 64px)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              margin: '14px 0 0', color: '#000', textWrap: 'balance',
            }}>
              Engineers, machinists, researchers.
            </h2>
          </div>
          <a href="careers.html" className="btn btn-secondary">We're hiring →</a>
        </div>

        {/* Team grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="team-grid">
          {team.map((p, i) => (
            <TeamCard key={p.name} {...p} idx={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .team-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function TeamCard({ name, role, tag, bg, bio, idx }) {
  const ref = useReveal();
  const [hover, setHover] = useStateAB(false);
  // "silhouette" SVG portrait placeholder — brand colour bg, white silhouette
  return (
    <div ref={ref} data-reveal
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        transitionDelay: `${idx * 70}ms`,
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: '1px solid #EEEEEE',
        transition: 'transform 0.4s, box-shadow 0.4s',
        transform: hover ? 'translateY(-6px)' : 'none',
        boxShadow: hover ? '0 28px 56px -28px rgba(0,0,0,0.16)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{
        aspectRatio: '4/5', position: 'relative', overflow: 'hidden',
        background: bg,
      }}>
        {/* Subtle pattern */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 130%, rgba(255,255,255,0.18), transparent 60%)',
        }} />
        {/* Stylised silhouette */}
        <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMax meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id={`silh-${idx}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="100" cy="90" r="42" fill={`url(#silh-${idx})`} />
          {/* Shoulders / body */}
          <path d="M 30 250 C 30 175 65 145 100 145 C 135 145 170 175 170 250 Z" fill={`url(#silh-${idx})`} />
        </svg>
        {/* Tag chip */}
        <span style={{
          position: 'absolute', top: 16, left: 16,
          fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: 999,
          background: 'rgba(0,0,0,0.20)', backdropFilter: 'blur(8px)',
          color: '#fff', fontWeight: 500,
        }}>{tag}</span>
      </div>
      <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 20, color: '#000', letterSpacing: '-0.015em' }}>{name}</div>
        <div style={{ fontSize: 14, color: '#000', opacity: 0.65 }}>{role}</div>
        <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: '#000', opacity: 0.72, margin: '6px 0 0', textWrap: 'pretty' }}>{bio}</p>
      </div>
    </div>
  );
}

Object.assign(window, { AboutHero, OurStory, Vision, Technology, Team });
