import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    num: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
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
    tag: 'Design',
  },
  {
    num: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M7 10L4 14L7 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 10L24 14L21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Web Development',
    desc: 'Clean, scalable code built with modern frameworks. Fast, secure, and maintainable.',
    accent: '#7b5cff',
    tag: 'Engineering',
  },
  {
    num: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'UI / UX Design',
    desc: 'Interfaces that feel intuitive and beautiful. Research-driven design that delights users.',
    accent: '#4f8cff',
    tag: 'Experience',
  },
  {
    num: '04',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 8.5V19.5L14 25L3 19.5V8.5L14 3Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3V25M3 8.5L25 19.5M25 8.5L3 19.5" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      </svg>
    ),
    title: 'E-Commerce',
    desc: 'Stores that sell. Optimized checkout flows, stunning product pages, and seamless UX.',
    accent: '#00d084',
    tag: 'Commerce',
  },
  {
    num: '05',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3C14 3 10 8 10 14C10 20 14 25 14 25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3C14 3 18 8 18 14C18 20 14 25 14 25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 14H25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.5 9H23.5M4.5 19H23.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),
    title: 'SEO Strategy',
    desc: 'Rank higher, get found. Technical SEO, content strategy, and long-term organic growth.',
    accent: '#7b5cff',
    tag: 'Growth',
  },
  {
    num: '06',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M14 5L17 11H23L18.5 15L20 21L14 17.5L8 21L9.5 15L5 11H11L14 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Brand Identity',
    desc: 'Logos, colors, typography systems. A brand that commands attention and builds trust.',
    accent: '#ff6b6b',
    tag: 'Branding',
  },
  {
    num: '07',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 14L14 18L20 10L24 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="14" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    title: 'Performance',
    desc: 'Sub-second load times. Core Web Vitals optimization. 95+ Lighthouse scores guaranteed.',
    accent: '#4f8cff',
    tag: 'Speed',
  },
  {
    num: '08',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 9V19L14 24L4 19V9L14 4Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 10V14L17 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: 'AI Integrations',
    desc: 'Embed intelligent features — chatbots, personalization, automation — into your product.',
    accent: '#7b5cff',
    tag: 'AI',
  },
]

function ServiceCard({ s, i, inView }: { s: (typeof services)[0]; i: number; inView: boolean }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Gradient border wrapper */}
      <motion.div
        animate={{
          background: hovered
            ? `linear-gradient(135deg, ${s.accent}55 0%, ${s.accent}10 40%, ${s.accent}30 100%)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        }}
        transition={{ duration: 0.4 }}
        style={{ borderRadius: 20, padding: 1 }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: '#0d0d10',
            borderRadius: 19,
            padding: '32px 28px 28px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'default',
            height: '100%',
          }}
        >
          {/* Mouse-following radial glow */}
          <div
            style={{
              position: 'absolute',
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${s.accent}22 0%, transparent 70%)`,
              left: mouse.x - 140,
              top: mouse.y - 140,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
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
              left: '10%',
              right: '10%',
              height: 1,
              background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
              transformOrigin: 'center',
            }}
          />

          {/* Big ghost number */}
          <div
            style={{
              position: 'absolute',
              bottom: -10,
              right: 16,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 96,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.025)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              pointerEvents: 'none',
              userSelect: 'none',
              transition: 'color 0.4s',
            }}
          >
            {s.num}
          </div>

          {/* Icon */}
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: `${s.accent}16`,
              border: `1px solid ${s.accent}28`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: s.accent,
              marginBottom: 24,
              position: 'relative',
            }}
          >
            {/* Icon inner glow on hover */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 14,
                background: `${s.accent}22`,
                boxShadow: `0 0 20px ${s.accent}44`,
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>{s.icon}</span>
          </motion.div>

          {/* Number + tag row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 10,
                fontWeight: 700,
                color: s.accent,
                letterSpacing: '0.12em',
                opacity: 0.8,
              }}
            >
              {s.num}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 10,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {s.tag}
            </span>
          </div>

          {/* Title */}
          <motion.div
            animate={{ color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)' }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginBottom: 10,
            }}
          >
            {s.title}
          </motion.div>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.38)',
              margin: 0,
            }}
          >
            {s.desc}
          </p>

          {/* Arrow link */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: s.accent,
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            Learn more
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 4l4 3-4 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #4f8cff 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-8%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #7b5cff 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
        }}
      />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="services-header-grid">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
              }}
            >
              <motion.div
                animate={{ width: inView ? 24 : 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ height: 1, background: '#4f8cff', overflow: 'hidden' }}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#4f8cff',
                }}
              >
                What We Do
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(34px, 3.5vw, 54px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.06,
                color: '#fff',
                margin: 0,
              }}
            >
              Every service,
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.22), rgba(255,255,255,0.1))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                expertly executed.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ paddingBottom: 6 }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 17,
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.42)',
                margin: '0 0 28px',
                maxWidth: 520,
              }}
            >
              From strategy to launch, we handle everything in-house. No outsourcing, no
              middlemen — just a focused team delivering excellence at every step.
            </p>
            {/* Service count pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 16px',
                borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f8cff' }} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.04em',
                }}
              >
                8 core services · end-to-end delivery
              </span>
            </div>
          </motion.div>
        </div>

        {/* Service grid */}
        <div className="grid-4col">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
