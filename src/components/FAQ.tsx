import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'How long does a typical website project take?',
    a: 'Most projects take 4–8 weeks from kickoff to launch, depending on scope. A simple marketing site can be 3 weeks; a complex web app might be 12. We\'ll give you a precise timeline in our discovery call.',
  },
  {
    q: 'What\'s the investment for a Digital Shine website?',
    a: 'Projects typically start at $5,000 for a focused marketing site and scale up for full web apps, e-commerce, or custom platforms. We provide fixed-price quotes upfront — no hourly surprises.',
  },
  {
    q: 'Do you work with clients outside your timezone?',
    a: 'Absolutely. We work with clients across 12 countries. We use async communication tools and schedule regular sync calls at times that work for both sides. Distance has never been a barrier for us.',
  },
  {
    q: 'Will I be able to update my website after launch?',
    a: 'Yes — we build on modern CMS platforms (Sanity, Contentful, or custom dashboards) so you can manage your own content. We also provide a handoff session and documentation so you\'re never dependent on us for basic updates.',
  },
  {
    q: 'What happens if I need changes after launch?',
    a: 'All projects include a 30-day post-launch support period for bug fixes and minor tweaks. For ongoing work, we offer retainer plans and one-off project rates. We\'re designed to be a long-term partner, not just a one-time vendor.',
  },
  {
    q: 'Do you offer SEO services?',
    a: 'Yes. Technical SEO is baked into every build — semantic HTML, structured data, Core Web Vitals optimization. We also offer strategic SEO packages including keyword research, content strategy, and link-building programs.',
  },
  {
    q: 'How do you handle revisions and feedback?',
    a: 'We use structured feedback rounds with clear revision limits defined upfront. Most projects include 2–3 design revision rounds. We use collaborative tools like Figma and Loom to make feedback fast and precise.',
  },
  {
    q: 'Can you redesign our existing website?',
    a: 'Definitely. We do full redesigns and rebuilds regularly. We\'ll audit your existing site first, identify what\'s working and what isn\'t, and propose a strategy that improves both design and performance.',
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section ref={ref} style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container-xl">
        <div className="faq-layout-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="faq-sticky-col"
          >
            <div className="section-label" style={{ marginBottom: 20 }}>FAQs</div>
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(36px, 3.5vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#fff',
                marginBottom: 24,
              }}
            >
              Questions
              <br />
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>answered.</span>
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 36,
              }}
            >
              Can't find what you're looking for? We're happy to answer any question directly.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
              style={{ padding: '14px 28px', borderRadius: 12, fontSize: 14 }}
            >
              Ask a Question
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M7 2L12 7L7 12" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="faq-item"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '24px 0',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      color: open === i ? '#fff' : 'rgba(255,255,255,0.7)',
                      letterSpacing: '-0.02em',
                      transition: 'color 0.2s',
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: open === i ? 'linear-gradient(135deg, #4f8cff, #7b5cff)' : 'rgba(255,255,255,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'background 0.25s',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1V11M1 6H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 15,
                          lineHeight: 1.7,
                          color: 'rgba(255,255,255,0.5)',
                          paddingBottom: 24,
                          paddingRight: 44,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
