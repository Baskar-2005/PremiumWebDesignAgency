import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const reasons = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Lightning Fast',
    desc: 'Every site we build loads in under 1.5 seconds. Performance is not an afterthought — it is the foundation.',
    metric: '<1.5s',
    metricLabel: 'load time',
    color: '#fbbf24',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'SEO Optimized',
    desc: 'Structured data, semantic HTML, Core Web Vitals — built in from day one, not bolted on at the end.',
    metric: 'Top 3',
    metricLabel: 'ranking',
    color: '#4f8cff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Premium UI',
    desc: 'Obsessively crafted interfaces. Micro-interactions, motion design, and visual details that set you apart.',
    metric: '99%',
    metricLabel: 'satisfaction',
    color: '#7b5cff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 18h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9 7h6M9 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Mobile First',
    desc: 'Over 60% of traffic is mobile. We design mobile experiences first, then scale up — not down.',
    metric: '60%+',
    metricLabel: 'mobile traffic',
    color: '#00d084',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Scalable',
    desc: 'Architecture that grows with you. No spaghetti code. Clean systems built to handle what comes next.',
    metric: '10×',
    metricLabel: 'growth ready',
    color: '#ff6b6b',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Secure',
    desc: 'SSL, WAF, OWASP compliance, regular audits. Your site and your customers\' data are always protected.',
    metric: 'A+',
    metricLabel: 'security grade',
    color: '#4f8cff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 12h2l2-3 2 6 2-3h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Modern Stack',
    desc: 'React, Next.js, TypeScript, Supabase. We use the tools that top engineers rely on.',
    metric: '2024',
    metricLabel: 'tech stack',
    color: '#7b5cff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Pixel Perfect',
    desc: 'Every element aligned. Every spacing token consistent. Because the details are what people feel.',
    metric: '100%',
    metricLabel: 'fidelity',
    color: '#fbbf24',
  },
]

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 1.4, suffix: 's', label: 'Avg Load Time', decimal: true },
  { value: 5, suffix: '★', label: 'Average Rating' },
]

function CountUp({ to, suffix, decimal, inView }: { to: number; suffix: string; decimal?: boolean; inView: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1600
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setCount(parseFloat((ease * to).toFixed(decimal ? 1 : 0)))
      if (t < 1) requestAnimationFrame(raf)
      else setCount(to)
    }
    requestAnimationFrame(raf)
  }, [inView, to, decimal])
  return <>{decimal ? count.toFixed(1) : count}{suffix}</>
}

function WhyCard({ r, i, inView }: { r: (typeof reasons)[0]; i: number; inView: boolean }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gradient border wrapper */}
      <motion.div
        animate={{
          background: hovered
            ? `linear-gradient(135deg, ${r.color}50 0%, ${r.color}10 50%, ${r.color}28 100%)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        }}
        transition={{ duration: 0.35 }}
        style={{ borderRadius: 22, padding: 1, height: '100%' }}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: '#0d0d10',
            borderRadius: 21,
            padding: '28px 26px 24px',
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Mouse glow */}
          <div
            style={{
              position: 'absolute',
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${r.color}1e 0%, transparent 70%)`,
              left: mouse.x - 130,
              top: mouse.y - 130,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.35s',
              pointerEvents: 'none',
            }}
          />

          {/* Top accent line */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: '15%',
              right: '15%',
              height: 1,
              background: `linear-gradient(90deg, transparent, ${r.color}, transparent)`,
              transformOrigin: 'center',
            }}
          />

          {/* Metric badge — top right */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? 0 : 8,
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 18,
                fontWeight: 700,
                color: r.color,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {r.metric}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: 2,
              }}
            >
              {r.metricLabel}
            </span>
          </motion.div>

          {/* Ghost number */}
          <div
            style={{
              position: 'absolute',
              bottom: -12,
              right: 12,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 80,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.022)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </div>

          {/* Icon */}
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 13,
              background: `${r.color}14`,
              border: `1px solid ${r.color}26`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: r.color,
              marginBottom: 20,
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 13,
                background: `${r.color}1e`,
                boxShadow: `0 0 18px ${r.color}44`,
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>{r.icon}</span>
          </motion.div>

          {/* Title */}
          <motion.div
            animate={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.86)' }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginBottom: 10,
            }}
          >
            {r.title}
          </motion.div>

          {/* Desc */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12.5,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.36)',
              margin: 0,
              flex: 1,
            }}
          >
            {r.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          top: '5%',
          right: '-12%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #7b5cff 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-8%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #4f8cff 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black, transparent)',
        }}
      />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 22,
            }}
          >
            <motion.div
              animate={{ width: inView ? 20 : 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: 1, background: '#7b5cff' }}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#7b5cff',
              }}
            >
              Why Digital Shine
            </span>
            <motion.div
              animate={{ width: inView ? 20 : 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: 1, background: '#7b5cff' }}
            />
          </div>

          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(36px, 3.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.06,
              margin: '0 auto 20px',
              maxWidth: 580,
            }}
          >
            <span style={{ color: '#fff' }}>Built different.</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.28), rgba(255,255,255,0.1))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              In every way.
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.38)',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Eight reasons agencies, startups, and scale-ups trust us to build what matters.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="whyus-stats-strip"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '20px 28px',
                background: '#0a0a0c',
                textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                <CountUp to={s.value} suffix={s.suffix} decimal={s.decimal} inView={inView} />
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.32)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid-4col">
          {reasons.map((r, i) => (
            <WhyCard key={r.title} r={r} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
