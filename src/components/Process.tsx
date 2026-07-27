import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We deep-dive into your business, your goals, your competitors, and your audience. No guesswork — pure research.',
    duration: '1–2 days',
    deliverable: 'Project brief',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'We map out the complete project plan: information architecture, tech stack, timeline, and success metrics.',
    duration: '2–3 days',
    deliverable: 'Growth roadmap',
  },
  {
    num: '03',
    title: 'Wireframe',
    desc: 'Low-fidelity layouts that solve UX problems before they become expensive design problems.',
    duration: '3–5 days',
    deliverable: 'UX blueprint',
  },
  {
    num: '04',
    title: 'Design',
    desc: 'High-fidelity Figma designs. Every screen, every state, every interaction — crafted to perfection.',
    duration: '5–10 days',
    deliverable: 'Visual system',
  },
  {
    num: '05',
    title: 'Development',
    desc: 'Clean, maintainable code. We build what we designed — pixel-perfect, performant, and accessible.',
    duration: '10–20 days',
    deliverable: 'Production build',
  },
  {
    num: '06',
    title: 'Testing',
    desc: 'Cross-browser, cross-device, and performance testing. We find the bugs before your users do.',
    duration: '3–5 days',
    deliverable: 'QA report',
  },
  {
    num: '07',
    title: 'Launch',
    desc: 'Deployment, DNS, SSL, CDN configuration. A smooth, zero-downtime launch with monitoring in place.',
    duration: '1–2 days',
    deliverable: 'Live experience',
  },
  {
    num: '08',
    title: 'Support',
    desc: "We don't disappear post-launch. Ongoing maintenance, updates, and growth optimization — 24/7.",
    duration: 'Ongoing',
    deliverable: 'Growth partner',
  },
]

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8H14M8 2L14 8L8 14" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhaseIcon({ index }: { index: number }) {
  const icons = [
    <path key="discover" d="M7.5 2.5a5 5 0 1 0 3.54 8.54L14 14M7.5 5.2v2.5l1.7 1" />,
    <path key="strategy" d="M3 12.5h10M4 10V6.5M8 10V3.5M12 10V5" />,
    <path key="wireframe" d="M3 3.5h10v9H3zM3 6.5h10M6.5 6.5v6" />,
    <path key="design" d="m4 11 7.7-7.7 1.5 1.5L5.5 12H4zM9.8 4.2l1.5 1.5" />,
    <path key="development" d="m6 4-4 4 4 4M10 4l4 4-4 4M8.5 2.5l-1 11" />,
    <path key="testing" d="m3 8 3 3 7-7M3 13h10" />,
    <path key="launch" d="M8 13V3M4.5 6.5 8 3l3.5 3.5M3 13h10" />,
    <path key="support" d="M3 8a5 5 0 0 1 10 0v3a1 1 0 0 1-1 1H9.5M3 9h2v3H4a1 1 0 0 1-1-1zM13 9h-2v3h1a1 1 0 0 0 1-1z" />,
  ]

  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        {icons[index]}
      </g>
    </svg>
  )
}

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!inView || isPaused) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % steps.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [inView, isPaused])

  const currentStep = steps[active]
  const progress = (active / (steps.length - 1)) * 100

  return (
    <section id="process" ref={ref} className="process-section">
      <div className="process-ambient process-ambient-one" />
      <div className="process-ambient process-ambient-two" />
      <div className="process-grid" />

      <div className="container-xl process-container">
        <div className="process-heading-row">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">How We Work</div>
            <div className="process-kicker">
              <span className="process-kicker-line" />
              A considered process for ambitious brands
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="process-heading-meta"
          >
            <span>01 — 08</span>
            <span className="process-heading-meta-dot" />
            <span>Built with intention</span>
          </motion.div>
        </div>

        <div className="process-layout">
          <div className="process-intro">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="process-title">
                Our proven
                <br />
                <span>8-step process.</span>
              </h2>
              <p className="process-description">
                Every project follows the same rigorous process — because consistency is the foundation of quality.
              </p>

              <div className="process-stats" aria-label="Process overview">
                <div>
                  <strong>08</strong>
                  <span>phases</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>partner</span>
                </div>
                <div>
                  <strong>∞</strong>
                  <span>possibility</span>
                </div>
              </div>
            </motion.div>

            <div className="process-detail-wrap">
              <motion.div
                className="process-detail-orb"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="process-detail-card"
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="process-detail-topline">
                    <span>Current phase</span>
                    <span>{String(active + 1).padStart(2, '0')} / 08</span>
                  </div>
                  <div className="process-detail-number">{currentStep.num}</div>
                  <div className="process-detail-icon">
                    <PhaseIcon index={active} />
                  </div>
                  <h3>{currentStep.title}</h3>
                  <p>{currentStep.desc}</p>
                  <div className="process-detail-footer">
                    <span className="process-duration">
                      <span className="process-pulse" />
                      {currentStep.duration}
                    </span>
                    <span className="process-deliverable">{currentStep.deliverable}</span>
                  </div>
                  <div className="process-detail-progress">
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="process-list-wrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="process-list-head">
              <span>From first conversation to launch day</span>
              <span className="process-list-hint">
                <span className="process-hint-dot" />
                Hover to explore
              </span>
            </div>

            <div className="process-list">
              <div className="process-rail">
                <motion.span
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(progress, 4)}%` }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {steps.map((step, i) => {
                const isActive = active === i

                return (
                  <motion.button
                    key={step.num}
                    type="button"
                    className={`process-step${isActive ? ' is-active' : ''}`}
                    initial={{ opacity: 0, x: 28 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={isActive}
                  >
                    <span className="process-step-index">
                      <PhaseIcon index={i} />
                      <span>{step.num}</span>
                    </span>
                    <span className="process-step-copy">
                      <span className="process-step-title">{step.title}</span>
                      <span className="process-step-duration">{step.duration}</span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            className="process-step-preview"
                            initial={{ opacity: 0, height: 0, y: -4 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                          >
                            {step.desc}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="process-step-arrow">
                      <ArrowIcon />
                    </span>
                  </motion.button>
                )
              })}
            </div>

            <div className="process-list-footer">
              <span>We make the complex feel effortless.</span>
              <span className="process-footer-line" />
              <span>Digital Shine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}