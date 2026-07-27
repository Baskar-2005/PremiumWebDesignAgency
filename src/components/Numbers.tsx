import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({
  to, suffix = '', prefix = '', duration = 2.2, decimal = false,
}: { to: number; suffix?: string; prefix?: string; duration?: number; decimal?: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setCount(decimal ? parseFloat((eased * to).toFixed(1)) : Math.round(eased * to))
      if (t < 1) requestAnimationFrame(tick)
      else setCount(to)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration, decimal])

  const display = typeof count === 'number' && count >= 1000
    ? count.toLocaleString()
    : decimal
    ? (count as number).toFixed(1)
    : count

  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

const numbers = [
  {
    value: 50, suffix: '+', label: 'Projects Completed', sub: 'Across 12 industries',
    color: '#4f8cff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 48, suffix: '+', label: 'Happy Clients', sub: 'Worldwide trust',
    color: '#ff6b6b',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 3, suffix: '+', label: 'Years Experience', sub: 'Since 2021',
    color: '#fbbf24',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 98, suffix: '', label: 'Avg Lighthouse Score', sub: 'Performance grade',
    color: '#00d084',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 120000, suffix: '+', label: 'Lines of Code Written', sub: 'Clean & documented',
    color: '#7b5cff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3M7 12h2l2-3 2 6 2-3h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 12, suffix: '+', label: 'Countries Served', sub: 'Global reach',
    color: '#4f8cff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3C12 3 9 8 9 12s3 9 3 9M12 3c0 0 3 5 3 9s-3 9-3 9M3 12h18" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 7.5h15M4.5 16.5h15" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),
  },
]

// Animated SVG arc ring
function ArcRing({ color, inView, delay }: { color: string; inView: boolean; delay: number }) {
  const r = 32
  const circ = 2 * Math.PI * r
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', top: 20, right: 20, opacity: 0.18, pointerEvents: 'none' }}>
      <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <motion.circle
        cx="40" cy="40" r={r}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={inView ? { strokeDashoffset: circ * 0.25 } : { strokeDashoffset: circ }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '40px 40px', transform: 'rotate(-90deg)' }}
      />
    </svg>
  )
}

function NumberCard({ n, i, inView }: { n: typeof numbers[0]; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{
          background: hovered
            ? `linear-gradient(135deg, ${n.color}50, ${n.color}10 50%, ${n.color}28)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
        }}
        transition={{ duration: 0.35 }}
        style={{ borderRadius: 24, padding: 1 }}
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
            borderRadius: 23,
            padding: '36px 32px 32px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: 200,
          }}
        >
          {/* Mouse glow */}
          <div style={{
            position: 'absolute',
            width: 280, height: 280, borderRadius: '50%',
            background: `radial-gradient(circle, ${n.color}20 0%, transparent 70%)`,
            left: mouse.x - 140, top: mouse.y - 140,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s',
            pointerEvents: 'none',
          }} />

          {/* Animated arc ring */}
          <ArcRing color={n.color} inView={inView} delay={0.1 + i * 0.07} />

          {/* Top accent line */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
              background: `linear-gradient(90deg, transparent, ${n.color}, transparent)`,
              transformOrigin: 'center',
            }}
          />

          {/* Corner glow on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', top: 0, right: 0,
              width: 120, height: 120,
              background: `radial-gradient(circle at top right, ${n.color}18 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Icon */}
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: `${n.color}14`,
              border: `1px solid ${n.color}28`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: n.color, marginBottom: 20, position: 'relative', zIndex: 1,
            }}
          >
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute', inset: 0, borderRadius: 12,
                background: `${n.color}1e`,
                boxShadow: `0 0 16px ${n.color}44`,
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>{n.icon}</span>
          </motion.div>

          {/* Big number */}
          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(38px, 3.2vw, 54px)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              marginBottom: 10,
              background: `linear-gradient(135deg, #fff 20%, ${n.color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'relative', zIndex: 1,
            }}
          >
            <Counter to={n.value} suffix={n.suffix} />
          </div>

          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 14, fontWeight: 600,
            color: 'rgba(255,255,255,0.78)',
            letterSpacing: '-0.01em',
            marginBottom: 4,
            position: 'relative', zIndex: 1,
          }}>
            {n.label}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            position: 'relative', zIndex: 1,
          }}>
            {n.sub}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Numbers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.16, 1], opacity: [0.09, 0.16, 0.09] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, #4f8cff 0%, transparent 65%)',
          filter: 'blur(110px)', pointerEvents: 'none',
        }}
      />

      {/* Faint watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
        fontSize: '28vw', color: 'rgba(255,255,255,0.012)',
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        letterSpacing: '-0.05em', whiteSpace: 'nowrap',
      }}>
        50+
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
      }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <motion.div
              animate={{ width: inView ? 20 : 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: 1, background: '#4f8cff' }}
            />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4f8cff',
            }}>By the Numbers</span>
            <motion.div
              animate={{ width: inView ? 20 : 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: 1, background: '#4f8cff' }}
            />
          </div>

          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(36px, 3.5vw, 56px)',
            fontWeight: 700, letterSpacing: '-0.04em',
            lineHeight: 1.06, margin: '0 auto 18px',
          }}>
            <span style={{ color: '#fff' }}>Numbers that </span>
            <span style={{
              background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>prove it.</span>
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.35)', maxWidth: 420, margin: '0 auto',
          }}>
            Real metrics from real projects. No inflated numbers, no marketing fluff.
          </p>
        </motion.div>

        {/* Numbers grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}>
          {numbers.map((n, i) => (
            <NumberCard key={n.label} n={n} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
