import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ to, suffix = '', prefix = '', duration = 2.2 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setCount(Math.round(eased * to))
      if (t < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const numbers = [
  { value: 50, suffix: '+', label: 'Projects Completed', icon: '🚀', color: '#4f8cff' },
  { value: 48, suffix: '+', label: 'Happy Clients', icon: '❤️', color: '#ff6b6b' },
  { value: 3, suffix: '+', label: 'Years Experience', icon: '⚡', color: '#fbbf24' },
  { value: 98, suffix: '', label: 'Avg Lighthouse Score', icon: '📊', color: '#00d084' },
  { value: 120000, suffix: '+', label: 'Lines of Code Written', icon: '💻', color: '#7b5cff' },
  { value: 12, suffix: '+', label: 'Countries Served', icon: '🌍', color: '#4f8cff' },
]

export default function Numbers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent, #0a0a0a 10%, #0a0a0a 90%, transparent)',
      }}
    >
      {/* Large decorative number */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 900,
          fontSize: '30vw',
          color: 'rgba(255,255,255,0.015)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        50+
      </div>

      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>
            By the Numbers
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(36px, 3.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#fff',
            }}
          >
            Numbers that{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              prove it.
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            borderRadius: 28,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {numbers.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              style={{
                background: '#0d0d0d',
                padding: '48px 40px',
                borderRight: [1, 4].includes(i) ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = '#141414'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = '#0d0d0d'
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '30%',
                  right: '30%',
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${n.color}60, transparent)`,
                }}
              />

              <div style={{ fontSize: 32, marginBottom: 16 }}>{n.icon}</div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(36px, 3vw, 52px)',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  marginBottom: 10,
                  background: `linear-gradient(135deg, #fff 0%, ${n.color} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <Counter to={n.value} suffix={n.suffix} />
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {n.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
