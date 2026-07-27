import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 9H26" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6" cy="6.5" r="1" fill="currentColor" />
        <circle cx="10" cy="6.5" r="1" fill="currentColor" />
        <circle cx="14" cy="6.5" r="1" fill="currentColor" />
        <path d="M8 15L11 18L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Website Design',
    desc: 'Pixel-perfect websites that convert visitors into customers. Every pixel placed with intent.',
    accent: '#4f8cff',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 10L4 14L7 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 10L24 14L21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Web Development',
    desc: 'Clean, scalable code built with modern frameworks. Fast, secure, and maintainable.',
    accent: '#7b5cff',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'UI / UX Design',
    desc: 'Interfaces that feel intuitive and beautiful. Research-driven design that delights users.',
    accent: '#4f8cff',
  },
  {
    num: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 8.5V19.5L14 25L3 19.5V8.5L14 3Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3V25M3 8.5L25 19.5M25 8.5L3 19.5" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      </svg>
    ),
    title: 'E-Commerce',
    desc: 'Stores that sell. Optimized checkout flows, stunning product pages, and seamless UX.',
    accent: '#00d084',
  },
  {
    num: '05',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3C14 3 10 8 10 14C10 20 14 25 14 25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3C14 3 18 8 18 14C18 20 14 25 14 25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 14H25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.5 9H23.5M4.5 19H23.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),
    title: 'SEO Strategy',
    desc: 'Rank higher, get found. Technical SEO, content strategy, and long-term growth.',
    accent: '#7b5cff',
  },
  {
    num: '06',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5L17 11H23L18.5 15L20 21L14 17.5L8 21L9.5 15L5 11H11L14 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Brand Identity',
    desc: 'Logos, colors, typography systems. A brand that commands attention and builds trust.',
    accent: '#ff6b6b',
  },
  {
    num: '07',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22C6 22 8 18 14 18C20 18 22 22 22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 14L6 16L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Performance',
    desc: 'Sub-second load times. Core Web Vitals optimization. 95+ Lighthouse scores guaranteed.',
    accent: '#4f8cff',
  },
  {
    num: '08',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 9V19L14 24L4 19V9L14 4Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 10V14L17 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: 'AI Integrations',
    desc: 'Embed intelligent features — chatbots, personalization, automation — into your product.',
    accent: '#7b5cff',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} style={{ padding: '140px 0', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(79,140,255,0.03) 50%, transparent)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 80,
            alignItems: 'start',
            marginBottom: 72,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label" style={{ marginBottom: 20 }}>What We Do</div>
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(36px, 3.5vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#fff',
              }}
            >
              Every service,
              <br />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>expertly executed.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 17,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.45)',
              paddingTop: 48,
              maxWidth: 540,
            }}
          >
            From strategy to launch, we handle everything in-house. No outsourcing, no
            middlemen — just a focused team delivering excellence at every step.
          </motion.p>
        </div>

        {/* Service grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              whileHover={{ y: -4 }}
              style={{
                background: '#111',
                padding: '32px 28px',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.3s ease',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = '#161616'
                el.style.borderColor = `${s.accent}20`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = '#111'
                el.style.borderColor = 'rgba(255,255,255,0.04)'
              }}
            >
              {/* Glow on hover */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${s.accent}60, transparent)`,
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              />

              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `${s.accent}14`,
                  border: `1px solid ${s.accent}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: s.accent,
                  marginBottom: 20,
                }}
              >
                {s.icon}
              </div>

              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  color: s.accent,
                  letterSpacing: '0.1em',
                  marginBottom: 8,
                  opacity: 0.7,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 17,
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  marginBottom: 10,
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
