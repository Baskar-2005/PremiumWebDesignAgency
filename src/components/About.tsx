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

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 3, suffix: '+', label: 'Years of Excellence', desc: 'Crafting digital experiences' },
  { value: 50, suffix: '+', label: 'Projects Delivered', desc: 'Across 12 industries' },
  { value: 100, suffix: '%', label: 'Client Satisfaction', desc: 'Every single time' },
  { value: 24, suffix: '/7', label: 'Support Available', desc: 'Always here for you' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* bg gradient */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,92,255,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-xl">
        {/* Top: split headline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'end',
            marginBottom: 100,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="section-label" style={{ marginBottom: 24 }}>About us</div>
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(40px, 4vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#fff',
              }}
            >
              Not another
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                web agency.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 17,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 24,
              }}
            >
              We started Digital Shine because we were tired of mediocre. Tired of templates
              masquerading as design. Tired of agencies that build the same website for every
              client.
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 17,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Every project we take on is a chance to prove that the internet can be beautiful,
              fast, and meaningful. We obsess over the details so your customers never have to.
            </p>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="counter-item"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
              style={{
                background: '#0d0d0d',
                padding: '44px 36px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* shimmer on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(79,140,255,0.04), rgba(123,92,255,0.04))',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.opacity = '1')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.opacity = '0')}
              />
              <div
                className="stat-number"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(40px, 3.5vw, 56px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 12,
                  display: 'block',
                }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                {s.label}
              </div>
              <div
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}
              >
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
