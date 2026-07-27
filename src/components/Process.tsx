import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We deep-dive into your business, your goals, your competitors, and your audience. No guesswork — pure research.',
    duration: '1–2 days',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'We map out the complete project plan: information architecture, tech stack, timeline, and success metrics.',
    duration: '2–3 days',
  },
  {
    num: '03',
    title: 'Wireframe',
    desc: 'Low-fidelity layouts that solve UX problems before they become expensive design problems.',
    duration: '3–5 days',
  },
  {
    num: '04',
    title: 'Design',
    desc: 'High-fidelity Figma designs. Every screen, every state, every interaction — crafted to perfection.',
    duration: '5–10 days',
  },
  {
    num: '05',
    title: 'Development',
    desc: 'Clean, maintainable code. We build what we designed — pixel-perfect, performant, and accessible.',
    duration: '10–20 days',
  },
  {
    num: '06',
    title: 'Testing',
    desc: 'Cross-browser, cross-device, and performance testing. We find the bugs before your users do.',
    duration: '3–5 days',
  },
  {
    num: '07',
    title: 'Launch',
    desc: 'Deployment, DNS, SSL, CDN configuration. A smooth, zero-downtime launch with monitoring in place.',
    duration: '1–2 days',
  },
  {
    num: '08',
    title: 'Support',
    desc: 'We don\'t disappear post-launch. Ongoing maintenance, updates, and growth optimization — 24/7.',
    duration: 'Ongoing',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<number>(0)

  return (
    <section id="process" ref={ref} style={{ padding: '140px 0', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(123,92,255,0.03) 50%, transparent)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: 100,
            alignItems: 'start',
          }}
        >
          {/* Left: sticky label + active detail */}
          <div style={{ position: 'sticky', top: 120 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="section-label" style={{ marginBottom: 20 }}>How We Work</div>
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
                Our proven
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  8-step process.
                </span>
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 40,
                }}
              >
                Every project follows the same rigorous process — because consistency is the
                foundation of quality.
              </p>

              {/* Active step detail card */}
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#0d0d0d',
                  border: '1px solid rgba(79,140,255,0.2)',
                  borderRadius: 20,
                  padding: '28px 28px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 40,
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: 'rgba(79,140,255,0.25)',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {steps[active].num}
                </div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: 10,
                  }}
                >
                  {steps[active].title}
                </div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 16,
                  }}
                >
                  {steps[active].desc}
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(79,140,255,0.08)',
                    border: '1px solid rgba(79,140,255,0.2)',
                    borderRadius: 8,
                    padding: '5px 12px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#4f8cff',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#4f8cff" strokeWidth="1" />
                    <path d="M6 3V6L8 8" stroke="#4f8cff" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  {steps[active].duration}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: step list */}
          <div style={{ paddingTop: 8 }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex',
                  gap: 24,
                  padding: '24px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  opacity: active === i ? 1 : 0.5,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={() => setActive(i)}
              >
                {/* Number + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background:
                        active === i
                          ? 'linear-gradient(135deg, #4f8cff, #7b5cff)'
                          : 'rgba(255,255,255,0.05)',
                      border: active === i ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 13,
                      fontWeight: 700,
                      color: active === i ? '#fff' : 'rgba(255,255,255,0.4)',
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        minHeight: 32,
                        background:
                          active === i
                            ? 'linear-gradient(to bottom, #4f8cff, transparent)'
                            : 'rgba(255,255,255,0.06)',
                        marginTop: 4,
                      }}
                    />
                  )}
                </div>

                <div style={{ flex: 1, paddingTop: 10 }}>
                  <div
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 18,
                      fontWeight: 600,
                      color: active === i ? '#fff' : 'rgba(255,255,255,0.7)',
                      marginBottom: 4,
                      transition: 'color 0.3s',
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {step.duration}
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: 12,
                    opacity: active === i ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8H14M8 2L14 8L8 14" stroke="#4f8cff" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
