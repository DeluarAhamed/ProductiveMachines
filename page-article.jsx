// Article-style detail pages (blog posts + case studies)
const { useState: useStateA2, useEffect: useEffectA2, useRef: useRefA2 } = React;

// =============================================================
// BLOG POST LAYOUT — full article + right-side CTA card
// =============================================================
function BlogPostLayout({ slug }) {
  const post = window.BLOG_POSTS[slug];
  if (!post) return <div style={{ padding: 80, textAlign: 'center' }}>Post not found.</div>;
  const headings = extractArticleHeadings(post.body);
  const [activeId, setActiveId] = useStateA2(headings[0]?.id || '');
  const bodyHtml = withArticleHeadingIds(post.body, headings);

  // Related posts
  const related = Object.entries(window.BLOG_POSTS)
    .filter(([k]) => k !== slug)
    .slice(0, 2)
    .map(([k, p]) => ({ slug: k, ...p }));

  useEffectA2(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
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
  }, [slug]);

  return (
    <>
      {/* HERO */}
      <article>
        <header style={{ background: '#fff', padding: '40px 0 56px', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 50% at 100% 0%, rgba(34,80,252,0.06), transparent 60%)' }} />
          <div className="container" style={{ position: 'relative', maxWidth: 1080 }}>
            <a href="news.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#000', opacity: 0.65, marginBottom: 24, transition: 'opacity .2s' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.65'}>
              <Icon.arrowL style={{ width: 14, height: 14 }} /> All articles
            </a>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
              <span style={{ padding: '5px 12px', background: '#2250FC', color: '#fff', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 999 }}>{post.tag}</span>
              <span style={{ fontSize: 13, color: '#000', opacity: 0.55 }}>{post.date} · {post.readTime}</span>
            </div>
            <h1 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700,
              fontSize: 'clamp(32px, 4.8vw, 64px)',
              lineHeight: 1.05, letterSpacing: '-0.025em',
              margin: '0 0 22px', color: '#000', textWrap: 'balance',
            }}>{post.title}</h1>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: '#000', opacity: 0.78, margin: 0, maxWidth: 760, textWrap: 'pretty' }}>{post.intro}</p>
            <div style={{ marginTop: 28, fontSize: 13, color: '#000', opacity: 0.6 }}>By {post.author}</div>
          </div>
        </header>

        {/* Hero image */}
        <div className="container" style={{ maxWidth: 1280, marginBottom: 56 }}>
          <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: 20 }}>
            <img src={post.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Body + sidebar */}
        <div className="container" style={{ maxWidth: 1280, paddingBottom: 100 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 340px', gap: 44 }} className="blog-grid blog-grid-with-toc">
            <aside className="article-toc blog-toc" style={{ position: 'sticky', top: 110, alignSelf: 'flex-start', height: 'fit-content' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#000', opacity: 0.55, marginBottom: 14 }}>In this article</div>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', borderLeft: '1px solid #EEEEEE' }}>
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} onClick={() => setActiveId(h.id)} className={activeId === h.id ? 'toc-link active' : 'toc-link'} style={{
                      display: 'block', padding: '6px 0 6px 14px', marginLeft: -1,
                      fontSize: 14, color: activeId === h.id ? '#2250FC' : '#000',
                      opacity: activeId === h.id ? 1 : 0.78,
                      borderLeft: `2px solid ${activeId === h.id ? '#2250FC' : 'transparent'}`,
                      transition: 'opacity .2s, color .2s, border-color .2s',
                    }}>{String(i + 1).padStart(2, '0')} · {h.title}</a>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {/* Sticky right-side CTA */}
            <aside style={{ position: 'sticky', top: 140, alignSelf: 'flex-start', height: 'fit-content' }} className="blog-sidebar">
              <div style={{
                background: 'linear-gradient(165deg, #2250FC, #144A9A)',
                color: '#fff', borderRadius: 20, padding: 32,
                position: 'relative', overflow: 'hidden',
              }}>
                <div aria-hidden style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 14 }}>Maximise your machines</div>
                  <h3 style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.15 }}>
                    See what SenseNC does on your CAM file.
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.9, margin: '0 0 24px' }}>
                    Send us a real part. Our AMRC engineer benchmarks SenseNC against your existing program — no obligation.
                  </p>
                  <a href="book-demo.html" className="btn btn-primary" style={{ background: '#fff', color: '#2250FC', padding: '12px 18px', justifyContent: 'center', width: '100%', boxShadow: 'none' }}>
                    Book a demo <Icon.arrow className="arr" />
                  </a>
                  <a href="ebook.html" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    marginTop: 14, fontSize: 13, color: '#fff', opacity: 0.85,
                    borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: 2,
                  }}>
                    <Icon.download style={{ width: 13, height: 13 }} /> Free e-book
                  </a>
                </div>
              </div>

              {/* Stats card */}
              <div style={{
                marginTop: 16, padding: 24, borderRadius: 16,
                border: '1px solid #EEEEEE', background: '#fff',
              }}>
                <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#000', opacity: 0.55, marginBottom: 16 }}>By the numbers</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[['+110%', 'Productivity'], ['−53%', 'Cycle time'], ['+38%', 'Tool life'], ['−11%', 'Tooling cost']].map(([v, k]) => (
                    <div key={k}>
                      <div style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 22, color: '#2250FC', letterSpacing: '-0.02em' }}>{v}</div>
                      <div style={{ fontSize: 12, color: '#000', opacity: 0.6 }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section style={{ background: '#f8f8f8', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 1280 }}>
          <h3 style={{
            fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 28,
            letterSpacing: '-0.02em', margin: '0 0 32px', color: '#000',
          }}>Keep reading</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="related-grid">
            {related.map(r => (
              <a key={r.slug} href={`blog-${r.slug}.html`} style={{
                display: 'grid', gridTemplateColumns: '180px 1fr', gap: 20,
                padding: 16, borderRadius: 14, background: '#fff',
                border: '1px solid #EEEEEE', transition: 'transform .3s, box-shadow .3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 24px 48px -28px rgba(0,0,0,0.14)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: 10 }}>
                  <img src={r.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 12, color: '#000', opacity: 0.55, marginBottom: 8 }}>{r.tag} · {r.date}</div>
                  <h4 style={{ fontFamily: 'Host Grotesk', fontWeight: 600, fontSize: 17, lineHeight: 1.25, margin: 0, color: '#000', letterSpacing: '-0.015em' }}>{r.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1120px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-sidebar { position: static !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
        .toc-link.active { font-weight: 650; }
      `}</style>
    </>
  );
}

function extractArticleHeadings(html) {
  return Array.from(html.matchAll(/<h3>(.*?)<\/h3>/g)).map((match, i) => ({
    id: `section-${i + 1}-${match[1].toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    title: match[1].replace(/<[^>]+>/g, ''),
  }));
}

function withArticleHeadingIds(html, headings) {
  let index = 0;
  return html.replace(/<h3>(.*?)<\/h3>/g, (_match, title) => {
    const id = headings[index]?.id || `section-${index + 1}`;
    index += 1;
    return `<h3 id="${id}">${title}</h3>`;
  });
}

// =============================================================
// CASE STUDY LAYOUT
// =============================================================
function CaseStudyLayout({ slug }) {
  const cs = window.CASE_STUDIES[slug];
  if (!cs) return <div style={{ padding: 80, textAlign: 'center' }}>Case study not found.</div>;
  const [activeId, setActiveId] = useStateA2(cs.sections[0]?.id || '');

  useEffectA2(() => {
    const els = cs.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
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
  }, [slug]);

  return (
    <>
      <header style={{ background: '#0a0a0a', color: '#fff', padding: '60px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 100% 0%, rgba(34,80,252,0.35), transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', maxWidth: 1280 }}>
          <a href="case-studies.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#fff', opacity: 0.7, marginBottom: 24 }}>
            <Icon.arrowL style={{ width: 14, height: 14 }} /> All case studies
          </a>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, alignItems: 'flex-end' }} className="case-hero-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
                <div style={{ height: 48, padding: '8px 16px', background: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center' }}>
                  <img src={cs.logo} alt={cs.company} style={{ maxHeight: 32, maxWidth: 120, objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7 }}>{cs.sector}</span>
              </div>
              <h1 style={{
                fontFamily: 'Host Grotesk', fontWeight: 700,
                fontSize: 'clamp(36px, 5.4vw, 80px)',
                lineHeight: 1.02, letterSpacing: '-0.03em',
                margin: '0 0 22px', color: '#fff', textWrap: 'balance',
              }}>{cs.headline}</h1>
              <p style={{ fontSize: 20, lineHeight: 1.5, opacity: 0.85, margin: '0 0 28px', textWrap: 'pretty', maxWidth: 580 }}>{cs.intro}</p>
              <a href="book-demo.html" className="btn btn-primary" style={{ padding: '14px 24px' }}>
                See it on your part <Icon.arrow className="arr" />
              </a>
            </div>
            <div style={{ aspectRatio: '4/3', borderRadius: 16, overflow: 'hidden', background: '#000' }}>
              <img src={cs.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Stats band */}
      <section style={{ background: '#2250FC', color: '#fff', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: 1280 }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cs.stats.length}, 1fr)`, gap: 24 }} className="case-stats">
            {cs.stats.map((s, i) => (
              <div key={i} style={{ borderLeft: i ? '1px solid rgba(255,255,255,0.25)' : 'none', paddingLeft: i ? 24 : 0 }}>
                <div style={{ fontFamily: 'Host Grotesk', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.num}</div>
                <div style={{ marginTop: 6, fontSize: 13, opacity: 0.85 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 700px) { .case-stats { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>

      {/* Quote */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 880, textAlign: 'center' }}>
          <div style={{ fontSize: 80, lineHeight: 0.5, color: '#2250FC', fontFamily: 'Host Grotesk', fontWeight: 800, marginBottom: 16 }}>"</div>
          <p style={{
            fontFamily: 'Host Grotesk', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(22px, 2.4vw, 32px)', lineHeight: 1.4,
            margin: '0 0 28px', color: '#000', textWrap: 'pretty',
          }}>{cs.quote}</p>
          <div style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 18, color: '#000' }}>{cs.quoteAuthor}</div>
          <div style={{ fontSize: 14, color: '#000', opacity: 0.6 }}>{cs.quoteTitle}</div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: '#fff', padding: '20px 0 100px' }}>
        <div className="container" style={{ maxWidth: 1280 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 64 }} className="case-body-grid">
            <aside style={{ position: 'sticky', top: 110, alignSelf: 'flex-start', height: 'fit-content' }} className="case-toc">
              <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#000', opacity: 0.55, marginBottom: 14 }}>In this study</div>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', borderLeft: '1px solid #EEEEEE' }}>
                {cs.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} onClick={() => setActiveId(s.id)} className={activeId === s.id ? 'toc-link active' : 'toc-link'} style={{
                      display: 'block', padding: '6px 0 6px 14px', marginLeft: -1,
                      fontSize: 14, color: activeId === s.id ? '#2250FC' : '#000', opacity: activeId === s.id ? 1 : 0.78, borderLeft: `2px solid ${activeId === s.id ? '#2250FC' : 'transparent'}`,
                      transition: 'opacity .2s, color .2s, border-color .2s',
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#2250FC'; e.currentTarget.style.borderLeftColor = '#2250FC'; }}
                      onMouseLeave={(e) => { if (activeId !== s.id) { e.currentTarget.style.color = '#000'; e.currentTarget.style.borderLeftColor = 'transparent'; } }}>
                      {String(i + 1).padStart(2, '0')} · {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="article-body">
              {cs.sections.map(s => (
                <section key={s.id} id={s.id} style={{ marginBottom: 48 }}>
                  <h2 style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 20px', color: '#000' }}>{s.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: s.body }} />
                </section>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .case-hero-grid { grid-template-columns: 1fr !important; }
            .case-body-grid { grid-template-columns: 1fr !important; }
          }
          .toc-link.active { font-weight: 650; }
        `}</style>
      </section>
    </>
  );
}

Object.assign(window, { BlogPostLayout, CaseStudyLayout });
