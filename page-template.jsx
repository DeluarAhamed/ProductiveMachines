// Sub-page section primitives — used by all CMS-style detail pages
const { useState: useStateSub, useEffect: useEffectSub, useRef: useRefSub } = React;

// =============================================================
// TOC + Article body shell (for cms-style content pages)
// =============================================================
function ArticleLayout({ tag, title, intro, image, sections, accent = '#2250FC', meta }) {
  const [activeId, setActiveId] = useStateSub(sections[0]?.id || '');

  useEffectSub(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;
    const syncActive = () => {
      const current = els.reduce((best, el) => {
        const top = el.getBoundingClientRect().top;
        return top <= 340 ? el : best;
      }, els[0]);
      if (current) setActiveId(current.id);
    };
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveId(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ block: 'start' });
        setTimeout(syncActive, 180);
      }, 120);
    }
    syncActive();
    window.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', syncActive);
    return () => {
      window.removeEventListener('scroll', syncActive);
      window.removeEventListener('resize', syncActive);
    };
  }, [sections]);

  return (
    <>
      <PageHero tag={tag} headline={title} subhead={intro} image={image} accent={accent} />
      <section style={{ background: '#fff', padding: '40px 0 100px' }}>
        <div className="container" style={{ maxWidth: 1080 }}>
          {meta && (
            <div style={{
              display: 'flex', gap: 18, padding: '18px 0',
              borderBottom: '1px solid #EEEEEE',
              marginBottom: 56, fontSize: 14, color: 'var(--muted)',
              flexWrap: 'wrap',
            }}>
              {meta.map(([k, v]) => (
                <div key={k}>
                  <span style={{ opacity: 0.55 }}>{k}: </span>
                  <strong style={{ color: '#000', fontWeight: 600 }}>{v}</strong>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 64 }} className="article-grid">
            <aside style={{ position: 'sticky', top: 110, alignSelf: 'flex-start', height: 'fit-content' }} className="article-toc">
              <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#000', opacity: 0.55, marginBottom: 14 }}>
                In this article
              </div>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, borderLeft: '1px solid #EEEEEE' }}>
                {sections.map((s, i) => (
                  <li key={s.id} style={{ paddingLeft: 14, marginLeft: -1 }}>
                    <a href={`#${s.id}`} onClick={() => setActiveId(s.id)} className={activeId === s.id ? 'toc-link active' : 'toc-link'} style={{
                      fontSize: 14, color: activeId === s.id ? accent : '#000', opacity: activeId === s.id ? 1 : 0.78, borderLeft: `2px solid ${activeId === s.id ? accent : 'transparent'}`,
                      paddingLeft: 12, marginLeft: -14, display: 'block', padding: '4px 0 4px 14px',
                      transition: 'opacity 0.2s, border-color 0.2s, color 0.2s',
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = accent; e.currentTarget.style.borderLeftColor = accent; }}
                      onMouseLeave={(e) => { if (activeId !== s.id) { e.currentTarget.style.opacity = '0.78'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderLeftColor = 'transparent'; } }}>
                      {String(i + 1).padStart(2, '0')} · {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <div style={{ minWidth: 0 }}>
              {sections.map((s) => <ArticleSection key={s.id} {...s} accent={accent} />)}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .toc-link.active { font-weight: 650; }
        .article-body p { font-size: 17px; line-height: 1.7; color: #000; opacity: 0.82; margin: 0 0 18px; text-wrap: pretty; }
        .article-body ul, .article-body ol { font-size: 17px; line-height: 1.7; color: #000; opacity: 0.82; margin: 0 0 18px 24px; padding: 0; }
        .article-body li { margin-bottom: 8px; }
        .article-body strong { font-weight: 600; color: #000; opacity: 1; }
        .article-body a { color: var(--accent); border-bottom: 1px solid currentColor; }
        .article-body blockquote {
          margin: 24px 0; padding: 20px 24px; border-left: 4px solid var(--accent);
          background: #f8f8f8; border-radius: 0 12px 12px 0;
          font-size: 19px; line-height: 1.5; font-style: italic; color: #000;
        }
        .article-body h3 {
          font-family: var(--font); font-weight: 700; font-size: 22px;
          margin: 32px 0 12px; color: #000; letter-spacing: -0.02em;
        }
      `}</style>
    </>
  );
}

function ArticleSection({ id, title, body, image, accent }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} data-reveal style={{ marginBottom: 64 }}>
      <h2 style={{
        fontFamily: 'var(--font)', fontWeight: 700,
        fontSize: 'clamp(28px, 3vw, 38px)',
        lineHeight: 1.1, letterSpacing: '-0.025em',
        margin: '0 0 24px', color: '#000', textWrap: 'balance',
      }}>{title}</h2>
      {image && (
        <div className="img-reveal" ref={useReveal()} data-reveal style={{
          margin: '0 0 24px', borderRadius: 14, overflow: 'hidden',
          aspectRatio: '16/9',
        }}>
          <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div className="article-body" style={{ '--accent': accent }} dangerouslySetInnerHTML={{ __html: body }} />
    </section>
  );
}

// =============================================================
// Stat band (small CTA inside article pages)
// =============================================================
function StatBand({ stats, accent = '#2250FC' }) {
  return (
    <section style={{ background: accent, color: '#fff', padding: '64px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 24 }} className="statband-grid">
          {stats.map((s, i) => (
            <div key={i} style={{ borderLeft: '1px solid rgba(255,255,255,0.25)', paddingLeft: 24 }}>
              <div style={{ fontFamily: 'var(--font)', fontWeight: 800, fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.num}</div>
              <div style={{ marginTop: 8, fontSize: 14, opacity: 0.85 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .statband-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

// =============================================================
// CTA strip
// =============================================================
function PageCTA({ heading, sub, primary = { label: 'Book a demo', href: 'book-demo.html' }, secondary, accent = '#2250FC' }) {
  return (
    <section className="page-cta-premium" style={{
      background: '#0a0a0a', color: '#fff', padding: '100px 0',
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accent}40, transparent 60%)`,
      }} />
      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 880 }}>
        <h2 style={{
          fontFamily: 'var(--font)', fontWeight: 700,
          fontSize: 'clamp(36px, 4.6vw, 64px)',
          lineHeight: 1.05, letterSpacing: '-0.03em',
          margin: '0 0 16px', textWrap: 'balance',
        }}>{heading}</h2>
        {sub && <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.78, margin: '0 auto 32px', maxWidth: 560 }}>{sub}</p>}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={primary.href} className="btn btn-primary" style={{ padding: '14px 24px', fontSize: 16 }}>
            {primary.label} <Icon.arrow className="arr" />
          </a>
          {secondary && (
            <a href={secondary.href} className="btn btn-secondary on-dark" style={{ padding: '14px 24px', fontSize: 16 }}>
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// =============================================================
// 3-column feature grid (for product detail pages, partner pages)
// =============================================================
function FeatureGrid({ tag, heading, sub, items, accent = '#2250FC' }) {
  return (
    <section style={{ background: '#fff', padding: '100px 0', borderTop: '1px solid #EEEEEE' }}>
      <div className="container">
        <div style={{ maxWidth: 880, marginBottom: 56 }}>
          {tag && <span className="tagline" style={{ color: accent, fontWeight: 500 }}>{tag}</span>}
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 56px)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            margin: '12px 0 16px', color: '#000', textWrap: 'balance',
          }}>{heading}</h2>
          {sub && <p style={{ fontSize: 18, lineHeight: 1.6, color: '#000', opacity: 0.78, margin: 0, maxWidth: 720 }}>{sub}</p>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="fgrid">
          {items.map((it, i) => <FeatureGridCard key={i} {...it} idx={i} accent={accent} />)}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .fgrid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function FeatureGridCard({ icon, title, text, idx, accent }) {
  const ref = useReveal();
  const [hover, setHover] = useStateSub(false);
  return (
    <div ref={ref} data-reveal
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        transitionDelay: `${idx * 80}ms`,
        padding: 28, borderRadius: 16,
        border: '1px solid #EEEEEE',
        background: '#fff',
        transition: 'transform 0.4s, box-shadow 0.4s, border-color 0.3s',
        transform: hover ? 'translateY(-4px)' : 'none',
        boxShadow: hover ? '0 24px 48px -24px rgba(0,0,0,0.10)' : 'none',
        borderColor: hover ? accent : '#EEEEEE',
      }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${accent}15`, color: accent,
        display: 'grid', placeItems: 'center',
        fontFamily: 'var(--font)', fontWeight: 800, fontSize: 22,
        marginBottom: 20,
      }}>{icon}</div>
      <h3 style={{
        fontFamily: 'var(--font)', fontWeight: 700, fontSize: 22,
        lineHeight: 1.2, letterSpacing: '-0.02em',
        margin: '0 0 10px', color: '#000', textWrap: 'pretty',
      }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: '#000', opacity: 0.72, margin: 0, textWrap: 'pretty' }}>{text}</p>
    </div>
  );
}

// =============================================================
// Lead-capture form (e-book + downloads)
// =============================================================
function LeadCaptureBand({ heading, sub, fileLabel = 'Get the e-book', accent = '#2250FC' }) {
  const [sent, setSent] = useStateSub(false);
  const [error, setError] = useStateSub('');
  const [submitting, setSubmitting] = useStateSub(false);
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
    <section style={{ background: '#f8f8f8', padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div style={{
          background: '#0a0a0a', color: '#fff',
          borderRadius: 20, padding: 48, position: 'relative', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center',
        }} className="lcb-grid">
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 60% 60% at 100% 100%, ${accent}40, transparent 60%)`,
          }} />
          <div style={{ position: 'relative' }}>
            <span className="tagline" style={{ color: '#3FFD7E' }}>Free download</span>
            <h2 style={{
              fontFamily: 'var(--font)', fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: 1.1, letterSpacing: '-0.025em',
              margin: '12px 0 12px', color: '#fff', textWrap: 'balance',
            }}>{heading}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.78, margin: 0 }}>{sub}</p>
          </div>
          <div style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.06)', borderRadius: 14,
            padding: 28, border: '1px solid rgba(255,255,255,0.12)',
          }}>
            {!sent ? (
              <form data-lead-type="download" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>Work email</span>
                  <input name="email" type="email" required placeholder="jane@yourshop.com" style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: 8, padding: '13px 14px', color: '#fff', fontFamily: 'var(--font)', fontSize: 15, outline: 'none',
                  }} />
                </label>
                {error && <p role="alert" style={{ color: '#FFB4B4', fontSize: 13, margin: 0 }}>{error}</p>}
                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px 20px', opacity: submitting ? 0.7 : 1 }}>
                  <Icon.download style={{ width: 16, height: 16 }} />
                  {submitting ? 'Sending...' : fileLabel}
                </button>
                <p style={{ fontSize: 12, opacity: 0.55, margin: 0, textAlign: 'center' }}>
                  No spam · unsubscribe anytime · GDPR-friendly
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(63,253,126,0.18)', color: '#3FFD7E', display: 'grid', placeItems: 'center' }}>
                  <Icon.check style={{ width: 28, height: 28 }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font)', fontSize: 20, fontWeight: 700, margin: 0 }}>Check your inbox</h3>
                <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>If it's not there in 2 min, check your spam folder.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .lcb-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// =============================================================
// Team showcase
// =============================================================
function TeamShowcase({ members = window.TEAM_MEMBERS || [], accent = '#2250FC' }) {
  const groups = ['Leadership', 'Commercial', 'Board', 'Engineering', 'People'];
  const visibleGroups = groups.filter((group) => members.some((member) => member.group === group));
  return (
    <section className="team-showcase">
      <div className="container">
        <div className="team-showcase-head">
          <span className="tagline" style={{ color: accent }}>Our team</span>
          <h2>People behind the physics.</h2>
          <p>
            The Productive Machines team brings together machining dynamics researchers, software builders,
            commercial operators, and customer specialists from AMRC and industry.
          </p>
        </div>
        {visibleGroups.map((group) => (
          <div className="team-group" id={`team-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={group}>
            <div className="team-group-label">
              <span>{group}</span>
            </div>
            <div className="team-grid-premium">
              {members.filter((member) => member.group === group).map((member, index) => (
                <TeamMemberCard key={member.slug} member={member} index={index} accent={accent} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TeamMemberCard({ member, index, accent }) {
  const linkedinHref = member.linkedin || 'https://www.linkedin.com/company/productivemachines/';
  return (
    <article className="team-member-card" style={{ transitionDelay: `${Math.min(index, 5) * 55}ms`, '--team-accent': accent }}>
      <a className="team-photo-panel" href={linkedinHref} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}>
        <img src={member.photo} alt={`${member.name}, ${member.role}`} loading="eager" />
        <div className="team-hover-panel">
          <p>{member.bio}</p>
          <span>
            <Icon.li />
            {member.linkedin ? 'View LinkedIn' : 'Company LinkedIn'}
          </span>
        </div>
      </a>
      <div className="team-card-copy">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
    </article>
  );
}

Object.assign(window, { ArticleLayout, StatBand, PageCTA, FeatureGrid, LeadCaptureBand, TeamShowcase });
