import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const reasons = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Every site we build loads in under 1.5 seconds. Performance is not an afterthought — it is the foundation.',
    color: '#fbbf24',
  },
  {
    icon: '🔍',
    title: 'SEO Optimized',
    desc: 'Structured data, semantic HTML, Core Web Vitals — built in from day one, not bolted on at the end.',
    color: '#4f8cff',
  },
  {
    icon: '✦',
    title: 'Premium UI',
    desc: 'Obsessively crafted interfaces. Micro-interactions, motion design, and visual details that set you apart.',
    color: '#7b5cff',
  },
  {
    icon: '📱',
    title: 'Mobile First',
    desc: 'Over 60% of traffic is mobile. We design mobile experiences first, then scale up — not down.',
    color: '#00d084',
  },
  {
    icon: '🔧',
    title: 'Scalable',
    desc: 'Architecture that grows with you. No spaghetti code. Clean systems built to handle what comes next.',
    color: '#ff6b6b',
  },
  {
    icon: '🔒',
    title: 'Secure',
    desc: 'SSL, WAF, OWASP compliance, regular audits. Your site and your customers data are protected.',
    color: '#4f8cff',
  },
  {
    icon: '⚙️',
    title: 'Modern Stack',
    desc: 'React, Next.js, TypeScript, Supabase. We use the tools that top engineers rely on.',
    color: '#7b5cff',
  },
  {
    icon: '🎯',
    title: 'Pixel Perfect',
    desc: 'Every element aligned. Every spacing token consistent. Because the details are what people feel.',
    color: '#fbbf24',
  },
]

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<number | null>(null)

  return (
    <section style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient */}
      <div
        className="blob"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(79,140,255,0.07) 0%, transparent 65%)',
          top: '20%',
          right: '-10%',
          animationDuration: '10s',
        }}
      />

      <div className="container-xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>
            Why Digital Shine
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(36px, 3.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#fff',
              maxWidth: 600,
              margin: '0 auto 20px',
            }}
          >
            Built different.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>In every way.</span>
          </h2>
        </motion.div>

        {/* Reasons grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                background: active === i ? '#161616' : '#0d0d0d',
                border: `1px solid ${active === i ? r.color + '30' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 20,
                padding: '32px 28px',
                cursor: 'default',
                transition: 'all 0.3s ease',
                transform: active === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: active === i ? `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${r.color}10` : 'none',
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  marginBottom: 16,
                  display: 'inline-flex',
                  width: 54,
                  height: 54,
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${r.color}12`,
                  borderRadius: 14,
                  border: `1px solid ${r.color}20`,
                }}
              >
                {r.icon}
              </div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: 10,
                  letterSpacing: '-0.02em',
                }}
              >
                {r.title}
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
