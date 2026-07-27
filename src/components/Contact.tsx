import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient blobs */}
      <div
        className="blob"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(79,140,255,0.1) 0%, transparent 65%)',
          top: '20%',
          left: '-10%',
          animationDuration: '10s',
          position: 'absolute',
          pointerEvents: 'none',
        }}
      />
      <div
        className="blob"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(123,92,255,0.08) 0%, transparent 65%)',
          bottom: '10%',
          right: '-5%',
          animationDuration: '14s',
          position: 'absolute',
          pointerEvents: 'none',
        }}
      />

      <div className="container-xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>
            Get in Touch
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(44px, 5vw, 80px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#fff',
              maxWidth: 800,
              margin: '0 auto 20px',
            }}
          >
            Let's build something{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f8cff 0%, #7b5cff 50%, #4f8cff 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 4s ease infinite',
              }}
            >
              extraordinary.
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 17,
              color: 'rgba(255,255,255,0.4)',
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Tell us about your project. We respond within 24 hours — usually much faster.
          </p>
        </motion.div>

        {/* Split layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Left: info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              style={{
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24,
                padding: '36px 32px',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: 24,
                  letterSpacing: '-0.03em',
                }}
              >
                Why work with us?
              </div>

              {[
                { icon: '⚡', label: 'Fast Turnaround', desc: '4–8 week delivery' },
                { icon: '🎯', label: 'Fixed Pricing', desc: 'No hourly surprises' },
                { icon: '🔒', label: 'NDA Available', desc: 'Full confidentiality' },
                { icon: '🌍', label: 'Remote-Friendly', desc: 'Async-first workflow' },
                { icon: '♾️', label: '30-Day Support', desc: 'Post-launch coverage' },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center gap-3"
                  style={{
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(79,140,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#fff',
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div
              style={{
                background: '#0d0d0d',
                border: '1px solid rgba(79,140,255,0.15)',
                borderRadius: 20,
                padding: '24px 28px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: 4,
                }}
              >
                Email us directly
              </div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#4f8cff',
                }}
              >
                hello@digitalshine.io
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: 6,
                }}
              >
                Response within 24 hours
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              style={{
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24,
                padding: '48px 44px',
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 0' }}
                >
                  <div
                    style={{
                      fontSize: 56,
                      marginBottom: 20,
                    }}
                  >
                    🎉
                  </div>
                  <div
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: 12,
                    }}
                  >
                    Message Sent!
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                    Thanks for reaching out. We'll review your project details and get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: 32,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Start Your Project
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.4)',
                          marginBottom: 8,
                          letterSpacing: '0.05em',
                        }}
                      >
                        YOUR NAME
                      </label>
                      <input
                        required
                        className="form-input"
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.4)',
                          marginBottom: 8,
                          letterSpacing: '0.05em',
                        }}
                      >
                        EMAIL ADDRESS
                      </label>
                      <input
                        required
                        type="email"
                        className="form-input"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: 8,
                        letterSpacing: '0.05em',
                      }}
                    >
                      PROJECT BUDGET
                    </label>
                    <select
                      required
                      className="form-input"
                      value={form.budget}
                      onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select a range</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k-25k">$10,000 – $25,000</option>
                      <option value="25k-50k">$25,000 – $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: 8,
                        letterSpacing: '0.05em',
                      }}
                    >
                      TELL US ABOUT YOUR PROJECT
                    </label>
                    <textarea
                      required
                      className="form-input"
                      placeholder="What are you building? What's your timeline? Any special requirements?"
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '18px', borderRadius: 14, fontSize: 16, justifyContent: 'center' }}
                  >
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8H14M8 2L14 8L8 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <p
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.25)',
                      marginTop: 16,
                    }}
                  >
                    No spam. No pressure. Just a conversation.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
