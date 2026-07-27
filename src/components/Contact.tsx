import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

const benefits = [
  { label: 'Fast Turnaround', desc: '4–8 week delivery', icon: 'bolt' },
  { label: 'Fixed Pricing', desc: 'No hourly surprises', icon: 'target' },
  { label: 'NDA Available', desc: 'Full confidentiality', icon: 'lock' },
  { label: 'Remote-Friendly', desc: 'Async-first workflow', icon: 'globe' },
  { label: '30-Day Support', desc: 'Post-launch coverage', icon: 'infinity' },
]

const budgets = [
  { value: '5k-10k', label: '$5k – $10k' },
  { value: '10k-25k', label: '$10k – $25k' },
  { value: '25k-50k', label: '$25k – $50k' },
  { value: '50k+', label: '$50k+' },
]

function BenefitIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    bolt: 'M9.5 1.5 3 8.2h4l-.5 6.3L13 7.8H9l.5-6.3Z',
    target: 'M14 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-3 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-2 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
    lock: 'M4 7h8v6H4V7Zm2 0V5a2 2 0 1 1 4 0v2',
    globe: 'M8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM2.4 8h11.2M8 2c1.2 1.5 1.8 3.5 1.8 6S9.2 12.5 8 14c-1.2-1.5-1.8-3.5-1.8-6S6.8 3.5 8 2Z',
    infinity: 'M4.3 10.5C2.7 10.5 2 9.2 2 8s.7-2.5 2.3-2.5c1.5 0 2.4 1.2 3.7 2.5 1.3 1.3 2.2 2.5 3.7 2.5 1.6 0 2.3-1.3 2.3-2.5S13.3 5.5 11.7 5.5C10.2 5.5 9.3 6.7 8 8c-1.3 1.3-2.2 2.5-3.7 2.5Z',
  }

  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8H14M8 2L14 8L8 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
      <path d="m6 12.8 4.1 4.1L19.5 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} className="contact-section">
      <div className="contact-grid" />
      <div className="contact-glow contact-glow-left" />
      <div className="contact-glow contact-glow-right" />
      <motion.div
        className="contact-orbit contact-orbit-one"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="contact-orbit contact-orbit-two"
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-xl contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-eyebrow-row">
            <div className="section-label">Get in Touch</div>
            <div className="contact-availability">
              <span />
              Taking on select projects
            </div>
          </div>
          <h2 className="contact-title">
            Let&apos;s build something
            <br />
            <span>extraordinary.</span>
          </h2>
          <p className="contact-subtitle">
            Tell us what you&apos;re imagining. We&apos;ll turn the first conversation into a clear path forward.
          </p>
          <div className="contact-header-scroll">
            <span className="contact-scroll-line" />
            Start a conversation
            <ArrowIcon />
          </div>
        </motion.div>

        <div className="contact-layout">
          <motion.div
            className="contact-story"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-story-card">
              <div className="contact-card-topline">
                <span>Why Digital Shine</span>
                <span className="contact-card-index">01 / 05</span>
              </div>
              <h3>Good work starts with a good conversation.</h3>
              <p>
                We bring clarity to complex ideas, create with intent, and stay close from the first sketch to the final launch.
              </p>

              <div className="contact-benefits">
                {benefits.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="contact-benefit"
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.28 + index * 0.07 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="contact-benefit-icon">
                      <BenefitIcon name={item.icon} />
                    </span>
                    <span className="contact-benefit-copy">
                      <strong>{item.label}</strong>
                      <small>{item.desc}</small>
                    </span>
                    <span className="contact-benefit-arrow">
                      <ArrowIcon />
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.a
              className="contact-email-card"
              href="mailto:hello@digitalshine.io"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            >
              <span className="contact-email-icon">@</span>
              <span>
                <small>Prefer email?</small>
                <strong>hello@digitalshine.io</strong>
              </span>
              <ArrowIcon />
            </motion.a>
          </motion.div>

          <motion.div
            className="contact-form-shell"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-form-shell-bar">
              <span className="contact-window-dots"><i /><i /><i /></span>
              <span>digitalshine / project-brief</span>
              <span className="contact-form-status">Encrypted</span>
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                >
                  <motion.div
                    className="contact-success-icon"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 230, damping: 15 }}
                  >
                    <CheckIcon />
                  </motion.div>
                  <div className="contact-success-kicker">Your brief is in</div>
                  <h3>You&apos;re on the radar.</h3>
                  <p>Thanks for reaching out. We&apos;ll review your project and get back to you within 24 hours.</p>
                  <button type="button" onClick={() => setSent(false)} className="contact-reset-button">
                    Send another brief <ArrowIcon />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="contact-form-heading">
                    <div>
                      <span className="contact-form-step">Step 01 <b>of 01</b></span>
                      <h3>Start your project</h3>
                    </div>
                    <span className="contact-form-spark">✦</span>
                  </div>

                  <div className="contact-form-fields contact-form-fields-two">
                    <label className="contact-field">
                      <span>Your name</span>
                      <input
                        required
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={event => setForm(current => ({ ...current, name: event.target.value }))}
                      />
                    </label>
                    <label className="contact-field">
                      <span>Email address</span>
                      <input
                        required
                        type="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={event => setForm(current => ({ ...current, email: event.target.value }))}
                      />
                    </label>
                  </div>

                  <fieldset className="contact-budget-field">
                    <legend>Project budget</legend>
                    <div className="contact-budget-options">
                      {budgets.map(budget => (
                        <button
                          key={budget.value}
                          type="button"
                          className={form.budget === budget.value ? 'is-selected' : ''}
                          onClick={() => setForm(current => ({ ...current, budget: budget.value }))}
                          aria-pressed={form.budget === budget.value}
                        >
                          {budget.label}
                        </button>
                      ))}
                    </div>
                    <input required tabIndex={-1} value={form.budget} onChange={() => {}} className="contact-budget-validation" aria-label="Project budget" />
                  </fieldset>

                  <label className="contact-field contact-message-field">
                    <span>Tell us about your project</span>
                    <textarea
                      required
                      rows={4}
                      placeholder="What are you building? What would success look like?"
                      value={form.message}
                      onChange={event => setForm(current => ({ ...current, message: event.target.value }))}
                    />
                    <small>{form.message.length} / 500</small>
                  </label>

                  <div className="contact-form-footer">
                    <span>We reply within 24 hours.</span>
                    <button type="submit" className="contact-submit">
                      Send project brief <ArrowIcon />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}