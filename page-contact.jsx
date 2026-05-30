// CONTACT page
const { useState: useStateCT, useEffect: useEffectCT } = React;

function ContactHero() {
  return (
    <section style={{
      background: '#fff', padding: '140px 0 60px', position: 'relative', overflow: 'hidden',
    }} data-screen-label="C01 Hero">
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 40% 50% at 100% 100%, rgba(34,80,252,0.08), transparent 60%)',
      }} />
      <div className="container" style={{ position: 'relative', maxWidth: 1240 }}>
        <span className="tagline" style={{ color: '#2250FC', fontWeight: 500 }}>Contact us</span>
        <WordReveal
          text="Let's get your machines running faster."
          as="h1"
          style={{
            fontFamily: 'Host Grotesk', fontWeight: 700,
            fontSize: 'clamp(48px, 6.4vw, 104px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            margin: '14px 0 0', color: '#000',
            maxWidth: 1080, textWrap: 'balance',
          }}
        />
        <p style={{
          marginTop: 24, fontSize: 22, lineHeight: 1.5, color: '#000', opacity: 0.78,
          margin: '24px 0 0', maxWidth: 700, textWrap: 'pretty',
        }}>
          Send us a CAM file, a tool list or just a question. An AMRC engineer responds within one working day.
        </p>
      </div>
    </section>
  );
}

function ContactSplit() {
  const [sent, setSent] = useStateCT(false);
  const [error, setError] = useStateCT('');
  const [submitting, setSubmitting] = useStateCT(false);
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
    <section ref={ref} data-reveal style={{
      background: '#fff', padding: '60px 0 120px',
    }} data-screen-label="C02 Form">
      <div className="container contact-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'flex-start' }}>
        {/* Left — meta */}
        <div>
          <div style={{
            padding: 36, borderRadius: 20,
            background: '#0a0a0a', color: '#fff',
            position: 'relative', overflow: 'hidden',
          }}>
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(34,80,252,0.25), transparent 60%)',
            }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65, marginBottom: 12 }}>Direct</div>
              <a href="mailto:hello@productivemachines.co.uk" style={{
                display: 'block', fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 26,
                color: '#fff', letterSpacing: '-0.02em',
                borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 8, marginBottom: 32, transition: 'border-color 0.2s',
              }}>hello@productivemachines.co.uk</a>

              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65, marginBottom: 10 }}>Visit</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.92, margin: 0 }}>
                Advanced Manufacturing Park<br />
                Technology Centre<br />
                Rotherham, S60 5WG · United Kingdom
              </p>

              <div style={{ marginTop: 32, padding: 16, background: 'rgba(255,255,255,0.06)', borderRadius: 12, borderLeft: '3px solid #3FFD7E' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 6, color: '#3FFD7E' }}>Response time</div>
                <div style={{ fontSize: 16 }}>One working day for new enquiries. Often the same hour.</div>
              </div>

              <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
                <a href="https://www.linkedin.com/company/productivemachines/" aria-label="LinkedIn" style={socialBtn}>
                  <Icon.li style={{ width: 16, height: 16 }} />
                </a>
                <a href="https://www.youtube.com/@productivemachines" aria-label="YouTube" style={socialBtn}>
                  <Icon.yt style={{ width: 18, height: 18 }} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick "what to send" tips */}
          <div style={{ marginTop: 24, padding: 28, borderRadius: 16, border: '1px solid #EEEEEE' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#000', opacity: 0.55, marginBottom: 14 }}>Pro tip</div>
            <div style={{ fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 19, color: '#000', marginBottom: 8, lineHeight: 1.3 }}>
              Send us a real job.
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: '#000', opacity: 0.7, margin: 0 }}>
              A tool list, an NX program, a Mastercam file — even a screenshot. We'll show you exactly what SenseNC does on <em>your</em> parts in the demo.
            </p>
          </div>
        </div>

        {/* Right — form card */}
        <div style={{
          background: '#0a0a0a', color: '#fff',
          borderRadius: 24, padding: 44, position: 'relative', overflow: 'hidden',
          boxShadow: '0 30px 80px -30px rgba(34,80,252,0.30)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 50% at 100% 0%, rgba(34,80,252,0.30), transparent 60%)',
          }} />
          {!sent ? (
            <form data-lead-type="contact" onSubmit={handleSubmit} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <input type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
              <h2 style={{
                fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 36,
                margin: '0 0 6px', letterSpacing: '-0.025em', color: '#fff',
              }}>We'll be in touch</h2>
              <p style={{ fontSize: 15, opacity: 0.7, margin: 0 }}>
                Tell us what you machine. We'll come back with a tailored demo plan.
              </p>

              <div className="contact-name-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
                <Field2 name="firstName" label="First name *" placeholder="Jane" required />
                <Field2 name="lastName" label="Last name *" placeholder="Marchetti" required />
              </div>
              <Field2 name="email" label="Work email *" type="email" placeholder="jane@yourshop.com" required />
              <Field2 name="company" label="Company *" placeholder="Marchetti Precision Ltd" required />
              <Field2 name="country" label="Country *" select required options={['United Kingdom', 'United States', 'Germany', 'France', 'Italy', 'Spain', 'Other']} />
              <Field2 name="message" label="Tell us about your shop" placeholder="DMG Mori NHX5000, Hermle C42U, mostly Ti-6Al-4V aerospace parts..." textarea />

              {error && <p role="alert" style={{ color: '#FFB4B4', fontSize: 13, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ marginTop: 12, justifyContent: 'center', padding: '16px 24px', fontSize: 16, opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Submitting...' : 'Submit'} <Icon.arrow className="arr" />
              </button>
              <p style={{ fontSize: 12, opacity: 0.55, margin: '4px 0 0', textAlign: 'center' }}>
                No obligation. We respond within one working day.
              </p>
            </form>
          ) : (
            <div style={{ padding: '60px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, position: 'relative' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(63,253,126,0.18)', color: '#3FFD7E',
                display: 'grid', placeItems: 'center',
              }}>
                <Icon.check style={{ width: 36, height: 36 }} />
              </div>
              <h3 style={{ fontFamily: 'Host Grotesk', fontSize: 28, fontWeight: 700, margin: 0 }}>Form submitted successfully!</h3>
              <p style={{ fontSize: 15, opacity: 0.75, margin: 0, maxWidth: 360 }}>
                We will be in touch with you soon. An AMRC engineer typically responds within one working day.
              </p>
              <a href="index.html" className="btn btn-secondary on-dark" style={{ marginTop: 8 }}>Back to home</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const socialBtn = {
  width: 40, height: 40, borderRadius: '50%',
  background: 'rgba(255,255,255,0.10)', color: '#fff',
  display: 'grid', placeItems: 'center', transition: 'background 0.2s',
};

function Field2({ name, label, placeholder, type = 'text', textarea, select, options = [], required }) {
  const [focus, setFocus] = useStateCT(false);
  const baseInputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: focus ? '1px solid #3FFD7E' : '1px solid rgba(255,255,255,0.14)',
    borderRadius: 8, padding: '13px 14px',
    color: '#fff', fontFamily: 'Host Grotesk', fontSize: 15, outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    width: '100%',
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>{label}</span>
      {textarea ? (
        <textarea placeholder={placeholder} rows={3}
          name={name} required={required}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ ...baseInputStyle, resize: 'vertical' }} />
      ) : select ? (
        <select name={name} required={required} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={baseInputStyle}>
          <option value="" style={{ background: '#0a0a0a' }}>Select country</option>
          {options.map(o => <option key={o} style={{ background: '#0a0a0a' }}>{o}</option>)}
        </select>
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={baseInputStyle} />
      )}
    </label>
  );
}

// FAQ from website
function ContactFAQ() {
  const items = [
    {
      q: 'What are the benefits on offer?',
      a: 'Time, material and money saved by reducing trial and error. Lower cycle times, increased productivity, extended tool life, improved surface and dimensional quality, reduced need for post-manufacture inspection.',
    },
    {
      q: 'How does Productive Machines compare to other solutions?',
      a: 'Our unique stability map identifies and eliminates chatter vibrations on the whole toolpath before they cause issues. SaaS-based — no need to train your engineers on complex software. Simple subscription, no capital investment.',
    },
    {
      q: 'What CAM programs can you work with?',
      a: 'Our solutions work best with Siemens NX and Mastercam, but we are actively developing APIs to support more CAM programs. Some of our web apps don\'t require a toolpath to optimise.',
    },
    {
      q: 'What problems does chatter cause?',
      a: 'Lower surface finish and dimensional accuracy, increased tool wear and cutting tool costs, higher machine maintenance, louder shop floor and increased material waste.',
    },
  ];
  const [open, setOpen] = useStateCT(0);
  const ref = useReveal();
  return (
    <section ref={ref} data-reveal style={{ background: '#f8f8f8', padding: '120px 0' }} data-screen-label="C03 FAQ">
      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64 }}>
          <div>
            <span className="tagline" style={{ color: '#2250FC' }}>FAQ</span>
            <h2 style={{
              fontFamily: 'Host Grotesk', fontWeight: 700, fontSize: 'clamp(32px, 3.6vw, 52px)',
              lineHeight: 1.05, letterSpacing: '-0.025em', margin: '14px 0 0', color: '#000', textWrap: 'balance',
            }}>Common questions, answered.</h2>
            <a href="resources.html#faq" className="btn-link" style={{ marginTop: 24, display: 'inline-flex' }}>Browse all FAQs <Icon.arrow className="arr" style={{ width: 14, height: 14 }} /></a>
          </div>
          <div>
            {items.map((it, i) => (
              <div key={i} style={{ borderBottom: '1px solid #EEEEEE' }}>
                <button className="faq-question" onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: '100%', textAlign: 'left',
                  padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: 'Host Grotesk', fontWeight: 600, fontSize: 19,
                  color: '#000',
                }}>
                  {it.q}
                  <span style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: open === i ? '#000' : 'transparent',
                    border: '1px solid #000', color: open === i ? '#fff' : '#000',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                    transition: 'transform 0.3s, background 0.2s, color 0.2s',
                    transform: open === i ? 'rotate(45deg)' : 'none',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M7 1v12M1 7h12" />
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: open === i ? 320 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(.2,.7,.2,1)',
                }}>
                  <p style={{ paddingBottom: 24, fontSize: 16, lineHeight: 1.6, color: '#000', opacity: 0.78, margin: 0 }}>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ContactHero, ContactSplit, ContactFAQ });
