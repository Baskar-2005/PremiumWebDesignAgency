import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * to))
      if (t < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 3, suffix: '+', label: 'Years of Excellence', desc: 'Crafting digital experiences', color: '#4f8cff' },
  { value: 50, suffix: '+', label: 'Projects Delivered', desc: 'Across 12 industries', color: '#7b5cff' },
  { value: 100, suffix: '%', label: 'Client Satisfaction', desc: 'Every single time', color: '#00d084' },
  { value: 24, suffix: '/7', label: 'Support Available', desc: 'Always here for you', color: '#fbbf24' },
]

const words = ['Not', 'another', 'web', 'agency.']

// Marquee strip values
const manifesto = [
  'Pixel Perfect', '·', 'Performance First', '·', 'No Templates', '·',
  'Obsessive Detail', '·', 'Built to Convert', '·', 'Made with Intent', '·',
  'Pixel Perfect', '·', 'Performance First', '·', 'No Templates', '·',
  'Obsessive Detail', '·', 'Built to Convert', '·', 'Made with Intent', '·',
]

function StatCard({ s, i, inView }: { s: typeof stats[0]; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.65, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{
          background: hovered
            ? `linear-gradient(135deg, ${s.color}50, ${s.color}10 50%, ${s.color}28)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
        }}
        transition={{ duration: 0.35 }}
        style={{ borderRadius: 20, padding: 1 }}
      >
        <div
          onMouseMove={e => {
            const r = e.currentTarget.getBoundingClientRect()
            setMouse({ x: e.clientX - r.left, y: e.clientY - r.top })
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: '#0d0d10',
            borderRadius: 19,
            padding: '32px 28px',
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
          }}
        >
          {/* Mouse glow */}
          <div style={{
            position: 'absolute',
            width: 240, height: 240, borderRadius: '50%',
            background: `radial-gradient(circle, ${s.color}1e 0%, transparent 70%)`,
            left: mouse.x - 120, top: mouse.y - 120,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s',
            pointerEvents: 'none',
          }} />

          {/* Top accent line */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
              background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
              transformOrigin: 'center',
            }}
          />

          {/* Accent dot */}
          <motion.div
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: s.color,
              boxShadow: `0 0 12px ${s.color}88`,
              marginBottom: 20,
              position: 'relative',
            }}
          />

          {/* Number */}
          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(38px, 3.2vw, 52px)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              marginBottom: 10,
              background: `linear-gradient(135deg, #fff 30%, ${s.color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Counter to={s.value} suffix={s.suffix} />
          </div>

          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 14,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '-0.01em',
            marginBottom: 4,
            position: 'relative', zIndex: 1,
          }}>
            {s.label}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            position: 'relative', zIndex: 1,
          }}>
            {s.desc}
          </div>

          {/* Ghost number */}
          <div style={{
            position: 'absolute', bottom: -8, right: 12,
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 72, fontWeight: 800,
            color: 'rgba(255,255,255,0.022)',
            lineHeight: 1, letterSpacing: '-0.04em',
            userSelect: 'none', pointerEvents: 'none',
          }}>
            {String(i + 1).padStart(2, '0')}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.14, 1], opacity: [0.1, 0.17, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '10%', left: '-10%',
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, #7b5cff 0%, transparent 70%)',
          filter: 'blur(90px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{
          position: 'absolute', bottom: '5%', right: '-8%',
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, #4f8cff 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
      />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
      }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Split headline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'end',
          marginBottom: 80,
        }}>
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}
            >
              <motion.div
                animate={{ width: inView ? 22 : 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ height: 1, background: '#7b5cff' }}
              />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7b5cff',
              }}>About Us</span>
            </motion.div>

            {/* Word-by-word headline */}
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(40px, 4vw, 64px)',
              fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05,
              margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0 12px',
            }}>
              {words.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={
                    i >= 2
                      ? {
                          background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : { color: '#fff' }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ paddingBottom: 4 }}
          >
            {/* Vertical accent line + text */}
            <div style={{ display: 'flex', gap: 24 }}>
              <motion.div
                animate={{ height: inView ? 120 : 0, opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: 1, flexShrink: 0,
                  background: 'linear-gradient(180deg, #7b5cff, transparent)',
                  alignSelf: 'flex-start', marginTop: 4,
                }}
              />
              <div>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.48)', marginBottom: 20,
                }}>
                  We started Digital Shine because we were tired of mediocre. Tired of templates
                  masquerading as design. Tired of agencies that build the same website for every client.
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.48)',
                }}>
                  Every project we take on is a chance to prove that the internet can be beautiful,
                  fast, and meaningful. We obsess over the details so your customers never have to.
                </p>

                {/* "Our promise" tag */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    marginTop: 28, padding: '8px 16px', borderRadius: 100,
                    border: '1px solid rgba(79,140,255,0.2)',
                    background: 'rgba(79,140,255,0.06)',
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f8cff' }}
                  />
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em',
                  }}>
                    Every project. Full dedication.
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
        }}>
          {stats.map((s, i) => (
            <StatCard key={s.label} s={s} i={i} inView={inView} />
          ))}
        </div>

        {/* Manifesto marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: 48, overflow: 'hidden',
            maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: 24, whiteSpace: 'nowrap', width: 'max-content' }}
          >
            {manifesto.map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 12,
                  fontWeight: item === '·' ? 400 : 600,
                  color: item === '·' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                  letterSpacing: item === '·' ? '0' : '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
