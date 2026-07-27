import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import type { Project } from '../data/projectsData'
import { getRelatedProjects, projects as allProjects } from '../data/projectsData'

// ─── Animated Counter ──────────────────────────────────────────────
function AnimCounter({ to, suffix, prefix = '' }: { to: string; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const num = parseFloat(to)
    const isDecimal = to.includes('.')
    const duration = 1800
    const start = performance.now()
    const frame = (now: number) => {
      const pct = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - pct, 3)
      const cur = num * ease
      setDisplay(isDecimal ? cur.toFixed(1) : Math.round(cur).toString())
      if (pct < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

// ─── Section reveal wrapper ────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Section Label ────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg, #4f8cff, #7b5cff)' }} />
      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
        {text}
      </span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function CaseStudy({ project, onBack }: { project: Project; onBack: () => void }) {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])

  const related = getRelatedProjects(project.relatedIds).slice(0, 3)

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: '#050505', minHeight: '100vh' }}
    >
      {/* ─── Back button ──────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        onClick={onBack}
        style={{
          position: 'fixed', top: 24, left: 32, zIndex: 1100,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 100, padding: '10px 20px', cursor: 'pointer',
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
        }}
        whileHover={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M12 7H2M7 2L2 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All Projects
      </motion.button>

      {/* ─── HERO ─────────────────────────────────────── */}
      <div ref={heroRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', minHeight: 600 }}>
        <motion.div style={{ y: heroY, position: 'absolute', inset: 0 }}>
          <img src={project.heroImg} alt={project.title}
            style={{ width: '100%', height: '115%', objectFit: 'cover', display: 'block' }} />
        </motion.div>

        {/* Overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.55) 40%, rgba(5,5,5,0.92) 80%, #050505 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${project.color}10, transparent)` }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container-xl"
        >
          <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0 }}>
            <div className="container-xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Category pill */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 100,
                    background: `${project.color}18`, border: `1px solid ${project.color}35`,
                    fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600,
                    color: project.color, letterSpacing: '0.05em',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: project.color, boxShadow: `0 0 8px ${project.color}` }} />
                    {project.category} · {project.type}
                  </span>
                  <span style={{
                    padding: '6px 14px', borderRadius: 100,
                    background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)',
                    fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600,
                    color: '#34d399', letterSpacing: '0.05em',
                  }}>
                    ✓ {project.status}
                  </span>
                </div>

                {/* Title */}
                <h1 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(48px, 7vw, 100px)',
                  fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95,
                  color: '#fff', marginBottom: 20,
                }}>
                  {project.title}
                </h1>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 'clamp(16px, 1.5vw, 20px)',
                  color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.6, marginBottom: 32,
                }}>
                  {project.tagline}
                </p>

                {/* Badges */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
                  {project.badges.map(b => (
                    <span key={b} style={{
                      padding: '5px 13px', borderRadius: 100,
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 500,
                      color: 'rgba(255,255,255,0.55)',
                    }}>{b}</span>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '13px 28px', borderRadius: 100, textDecoration: 'none',
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)`,
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 700,
                      color: '#fff', boxShadow: `0 8px 30px ${project.color}40`,
                    }}>
                    Visit Live Website
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H5M11 3V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                  <motion.button onClick={onBack}
                    whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '13px 28px', borderRadius: 100,
                      background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 600,
                      color: '#fff', cursor: 'pointer', backdropFilter: 'blur(8px)',
                    }}>
                    View All Projects
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── MAIN CONTENT + STICKY SIDEBAR ───────────── */}
      <div className="container-xl" style={{ paddingTop: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 64, alignItems: 'start' }}>

          {/* ─── LEFT MAIN COLUMN ───────────────────── */}
          <div>

            {/* ── OVERVIEW ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Project Overview" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'start' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 2.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.1 }}>
                      {project.overview.heading}
                    </h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {[
                      { label: 'Client Goals', value: project.overview.goals },
                      { label: 'Business Problem', value: project.overview.problem },
                      { label: 'Target Audience', value: project.overview.audience },
                      { label: 'Our Solution', value: project.overview.solution },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: project.color, textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.55)' }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>

            {/* ── TIMELINE ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Project Timeline" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 48 }}>
                  How we built it
                </h2>
              </Reveal>
              <div style={{ position: 'relative' }}>
                {/* Vertical line */}
                <div style={{ position: 'absolute', left: 20, top: 8, bottom: 8, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 15%, rgba(255,255,255,0.08) 85%, transparent)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {project.timeline.map((phase, i) => (
                    <Reveal key={phase.phase} delay={i * 0.06}>
                      <div style={{ display: 'flex', gap: 32, paddingBottom: i < project.timeline.length - 1 ? 36 : 0 }}>
                        {/* Dot */}
                        <div style={{ flexShrink: 0, width: 40, display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
                          <div style={{
                            width: 10, height: 10, borderRadius: '50%', marginTop: 4,
                            background: project.color, boxShadow: `0 0 12px ${project.color}80`,
                            border: `2px solid ${project.color}50`,
                          }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{phase.phase}</span>
                            <span style={{ padding: '2px 10px', borderRadius: 100, background: `${project.color}14`, border: `1px solid ${project.color}30`, fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 600, color: project.color }}>{phase.duration}</span>
                          </div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>{phase.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ── THE CHALLENGE ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="The Challenge" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 48 }}>
                  Problems we set out to solve
                </h2>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {project.challenges.map((ch, i) => (
                  <Reveal key={ch.title} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
                      style={{
                        padding: '28px 28px', borderRadius: 20,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 14 }}>{ch.icon}</div>
                      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>{ch.title}</h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.42)' }}>{ch.desc}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── OUR SOLUTION ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Our Solution" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 48 }}>
                  How we solved every challenge
                </h2>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {project.solutions.map((sol, i) => (
                  <Reveal key={sol.title} delay={i * 0.07}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      style={{
                        display: 'flex', gap: 24, padding: '24px 28px', borderRadius: 18,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderLeft: `2px solid ${project.color}60`,
                      }}
                    >
                      <div style={{ fontSize: 28, flexShrink: 0 }}>{sol.icon}</div>
                      <div>
                        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>{sol.title}</h3>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.42)' }}>{sol.desc}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── KEY FEATURES ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Key Features" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 48 }}>
                  What we built
                </h2>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {project.features.map((feat, i) => (
                  <Reveal key={feat.title} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ y: -5, borderColor: `${project.color}30`, boxShadow: `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${project.color}15` }}
                      transition={{ duration: 0.3 }}
                      style={{
                        padding: '24px 22px', borderRadius: 18,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                        border: '1px solid rgba(255,255,255,0.07)',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                      }}
                    >
                      <div style={{ fontSize: 26, marginBottom: 12 }}>{feat.icon}</div>
                      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.01em' }}>{feat.title}</h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.38)' }}>{feat.desc}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── GALLERY ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Project Gallery" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 48 }}>
                  In the wild
                </h2>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {project.galleryImgs.map((img, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <motion.div
                      onClick={() => setGalleryOpen(i)}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        borderRadius: 16, overflow: 'hidden', cursor: 'zoom-in',
                        aspectRatio: '4/3', position: 'relative',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <img src={img.url} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                      <span style={{ position: 'absolute', bottom: 12, left: 14, fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{img.label}</span>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── PERFORMANCE ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Performance" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 48 }}>
                  Lighthouse audit results
                </h2>
              </Reveal>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
                padding: '32px', borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                {project.performance.map((perf, i) => (
                  <Reveal key={perf.label} delay={i * 0.08}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 16px' }}>
                        <svg width="80" height="80" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                          <motion.circle
                            cx="40" cy="40" r="32"
                            fill="none"
                            stroke={perf.color}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 32}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                            whileInView={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - perf.score / 100) }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            style={{ transformOrigin: 'center', transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 6px ${perf.color}80)` }}
                          />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 800, color: perf.color }}>
                          {perf.score}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{perf.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── RESULTS ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Project Results" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 48 }}>
                  Numbers that speak
                </h2>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {project.results.map((res, i) => (
                  <Reveal key={res.label} delay={i * 0.07}>
                    <div style={{
                      padding: '32px 28px', borderRadius: 20, textAlign: 'center',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      <div style={{
                        fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 2.5vw, 40px)',
                        fontWeight: 800, letterSpacing: '-0.04em',
                        background: `linear-gradient(135deg, #fff 30%, ${project.color} 100%)`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        marginBottom: 8,
                      }}>
                        <AnimCounter to={res.value} suffix={res.suffix} prefix={res.prefix} />
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{res.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── TESTIMONIAL ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Client Testimonial" />
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{
                  padding: '48px 48px', borderRadius: 28,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden',
                }}>
                  {/* Glow */}
                  <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${project.color}12, transparent)`, pointerEvents: 'none' }} />

                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                    {Array.from({ length: project.testimonial.rating }).map((_, i) => (
                      <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill={project.color}>
                        <path d="M9 1L11.39 6.26L17 7.27L13 11.14L14.18 17L9 14.27L3.82 17L5 11.14L1 7.27L6.61 6.26L9 1Z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote mark */}
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 120, lineHeight: 0.8, color: `${project.color}18`, marginBottom: 8, userSelect: 'none' }}>"</div>

                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.75)', marginBottom: 36, fontStyle: 'italic',
                  }}>
                    {project.testimonial.quote}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img src={project.testimonial.avatar} alt={project.testimonial.name}
                      style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${project.color}40` }} />
                    <div>
                      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff' }}>{project.testimonial.name}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{project.testimonial.role}, {project.testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* ── VIDEO PLACEHOLDER ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Client Review" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 32 }}>Watch the project walkthrough</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}>
                  <img src={project.videoPlaceholder} alt="Project walkthrough" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      style={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* ── PRICING ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Project Investment" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 48 }}>
                  Transparent pricing
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{
                  padding: '40px 40px', borderRadius: 28,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Total Project Investment</div>
                      <div style={{
                        fontFamily: 'Space Grotesk, sans-serif', fontSize: 48, fontWeight: 800, letterSpacing: '-0.05em',
                        background: `linear-gradient(135deg, #fff, ${project.color})`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}>{project.budgetRange}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 24 }}>
                      <div>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6 }}>Timeline</div>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff' }}>{project.duration}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6 }}>Support</div>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff' }}>{project.supportPeriod}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 28 }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {project.budgetBreakdown.map(item => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff' }}>{item.amount}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '28px 0 20px' }} />
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>
                    * Pricing varies depending on project requirements and custom features.
                  </p>
                </div>
              </Reveal>
            </section>

            {/* ── DELIVERABLES ── */}
            <section style={{ marginBottom: 100 }}>
              <Reveal>
                <SectionLabel text="Deliverables" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 40 }}>
                  Everything you get
                </h2>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {project.deliverables.map((item, i) => (
                  <Reveal key={item} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '14px 20px', borderRadius: 14,
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${project.color}20`, border: `1px solid ${project.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke={project.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── RELATED PROJECTS ── */}
            <section style={{ marginBottom: 80 }}>
              <Reveal>
                <SectionLabel text="Related Projects" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 2.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 40 }}>
                  More case studies
                </h2>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {related.map((rel, i) => (
                  <Reveal key={rel.id} delay={i * 0.08}>
                    <motion.button
                      onClick={() => { window.scrollTo(0, 0); onBack(); setTimeout(() => {}, 100) }}
                      whileHover={{ y: -6 }}
                      style={{
                        all: 'unset', cursor: 'pointer', display: 'block', width: '100%',
                        borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)',
                        background: '#0d0d0d',
                      }}
                    >
                      <img src={rel.heroImg} alt={rel.title} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '16px 18px' }}>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, color: rel.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{rel.category}</div>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{rel.title}</div>
                      </div>
                    </motion.button>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── CTA ── */}
            <Reveal>
              <div style={{
                padding: '72px 64px', borderRadius: 32, marginBottom: 80, textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(79,140,255,0.08) 0%, rgba(167,139,250,0.06) 100%)',
                border: '1px solid rgba(79,140,255,0.15)', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 400, height: 300, background: 'radial-gradient(circle, rgba(79,140,255,0.1), transparent)', pointerEvents: 'none' }} />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', marginBottom: 16 }}>
                  Ready to build something amazing?
                </h2>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: 36, maxWidth: 420, margin: '0 auto 36px' }}>
                  Let's create your next digital experience — together.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { onBack(); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 400) }}
                    style={{
                      padding: '14px 32px', borderRadius: 100, border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 700,
                      color: '#fff', boxShadow: '0 8px 32px rgba(79,140,255,0.4)',
                    }}>
                    Start Your Project →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { onBack(); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 400) }}
                    style={{
                      padding: '14px 32px', borderRadius: 100, cursor: 'pointer',
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 600,
                      color: '#fff',
                    }}>
                    Book Free Consultation
                  </motion.button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ─── STICKY SIDEBAR ─────────────────────── */}
          <aside className="hidden lg:block" style={{ position: 'sticky', top: 100 }}>
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}>
              {/* Color header */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${project.color}, ${project.color}66)` }} />

              <div style={{ padding: '28px 24px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 20 }}>Project Summary</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { label: 'Client', value: project.client },
                    { label: 'Industry', value: project.industry },
                    { label: 'Duration', value: project.duration },
                    { label: 'Team', value: project.teamSize },
                    { label: 'Completed', value: project.completionDate },
                    { label: 'Status', value: project.status },
                    { label: 'Budget', value: project.budgetRange },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{row.label}</span>
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textAlign: 'right' }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '20px 0' }} />

                {/* Services */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>Services</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.services.map(s => (
                      <span key={s} style={{
                        padding: '3px 10px', borderRadius: 100, fontSize: 11, fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 500, background: `${project.color}14`, border: `1px solid ${project.color}25`, color: project.color,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>Tech Stack</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.techStack.map(t => (
                      <span key={t} style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <motion.a
                    href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      padding: '11px', borderRadius: 12, textDecoration: 'none',
                      background: `linear-gradient(135deg, ${project.color}cc, ${project.color}88)`,
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff',
                      boxShadow: `0 4px 20px ${project.color}30`,
                    }}>
                    Visit Live Website ↗
                  </motion.a>
                  <motion.button
                    onClick={onBack}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      padding: '11px', borderRadius: 12, cursor: 'pointer',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
                    }}>
                    ← Back to Projects
                  </motion.button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── GALLERY LIGHTBOX ─────────────────────── */}
      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryOpen(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
            }}
          >
            <motion.img
              key={galleryOpen}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={project.galleryImgs[galleryOpen].url.replace('w=900&h=600', 'w=1400&h=900')}
              alt={project.galleryImgs[galleryOpen].label}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 16, boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}
              onClick={e => e.stopPropagation()}
            />
            {/* Prev / Next */}
            {galleryOpen > 0 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={e => { e.stopPropagation(); setGalleryOpen(galleryOpen - 1) }}
                style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 48, height: 48, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </motion.button>
            )}
            {galleryOpen < project.galleryImgs.length - 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={e => { e.stopPropagation(); setGalleryOpen(galleryOpen + 1) }}
                style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 48, height: 48, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </motion.button>
            )}
            {/* Close */}
            <button onClick={() => setGalleryOpen(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18 }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
