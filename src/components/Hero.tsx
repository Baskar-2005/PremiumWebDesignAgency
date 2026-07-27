import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function BrowserMockup() {

  const metrics = [
    { label: 'Conversion Rate', value: '8.4%', change: '+2.1%', up: true },
    { label: 'Page Speed', value: '98', change: 'Lighthouse', up: true },
    { label: 'Monthly Visitors', value: '124K', change: '+18%', up: true },
    { label: 'Bounce Rate', value: '21%', change: '-5%', up: false },
  ]

  const barWidths = [85, 62, 78, 91, 55, 70, 83]

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 520,
        borderRadius: 20,
        overflow: 'hidden',
        background: 'rgba(16,16,16,0.9)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: '#1a1a1a',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div className="flex gap-2">
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 6,
            padding: '5px 12px',
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          https://yourclient.com/dashboard
        </div>
      </div>

      {/* Dashboard content */}
      <div style={{ padding: '20px 20px 16px' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-0.01em',
              }}
            >
              Analytics Overview
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
              Last 30 days
            </div>
          </div>
          <div
            style={{
              background: 'rgba(79,140,255,0.15)',
              border: '1px solid rgba(79,140,255,0.3)',
              color: '#4f8cff',
              fontSize: 11,
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            Live
          </div>
        </div>

        {/* Metric cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10,
                padding: '10px 12px',
              }}
            >
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: m.up ? '#00d084' : '#ff6b6b',
                  marginTop: 2,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {m.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance chart */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10,
            padding: '12px 14px',
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 10,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Weekly Performance
          </div>
          <div className="flex items-end gap-2" style={{ height: 56 }}>
            {barWidths.map((w, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  flex: 1,
                  height: `${w}%`,
                  borderRadius: '3px 3px 0 0',
                  background:
                    i === 5
                      ? 'linear-gradient(to top, #4f8cff, #7b5cff)'
                      : 'rgba(255,255,255,0.1)',
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
          <div
            className="flex justify-between mt-1"
            style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}
          >
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        {/* Website preview strip */}
        <div
          style={{
            marginTop: 12,
            borderRadius: 8,
            overflow: 'hidden',
            height: 48,
            background: 'linear-gradient(135deg, rgba(79,140,255,0.1), rgba(123,92,255,0.1))',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00d084',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.15)',
                marginBottom: 4,
                width: '65%',
              }}
            />
            <div
              style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)', width: '40%' }}
            />
          </div>
          <div
            style={{
              fontSize: 10,
              color: '#00d084',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
            }}
          >
            Online
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })
  const rotateX = useTransform(springY, [-300, 300], [8, -8])
  const rotateY = useTransform(springX, [-300, 300], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'circOut' as const } },
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-overlay" style={{ opacity: 0.6 }} />

      {/* Animated blobs */}
      <motion.div
        className="blob"
        animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(79,140,255,0.12) 0%, transparent 65%)',
          top: '-10%',
          left: '-5%',
        }}
      />
      <motion.div
        className="blob"
        animate={{ x: [0, -30, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(123,92,255,0.1) 0%, transparent 65%)',
          bottom: '-5%',
          right: '-5%',
        }}
      />

      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -Math.random() * 60 - 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#4f8cff' : i % 3 === 1 ? '#7b5cff' : '#fff',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div className="container-xl w-full">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* Left: copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(79,140,255,0.08)',
                  border: '1px solid rgba(79,140,255,0.2)',
                  borderRadius: 100,
                  padding: '6px 14px 6px 8px',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00d084',
                    boxShadow: '0 0 8px #00d084',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Award-Winning Digital Agency
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(52px, 5.5vw, 88px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                color: '#fff',
                marginBottom: 28,
              }}
            >
              We Build{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4f8cff 0%, #7b5cff 50%, #4f8cff 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 4s ease infinite',
                }}
              >
                Digital
              </span>
              <br />
              Experiences
              <br />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>People Remember.</span>
            </motion.h1>

            <motion.p
              variants={item}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 18,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.55)',
                maxWidth: 460,
                marginBottom: 44,
              }}
            >
              We design and build modern websites, premium brands, and powerful digital
              experiences that help businesses grow beyond expectations.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-primary"
                style={{ padding: '16px 32px', borderRadius: 14, fontSize: 16 }}
              >
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 8H14M8 2L14 8L8 14"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-ghost"
                style={{ padding: '16px 32px', borderRadius: 14, fontSize: 16 }}
              >
                View Our Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2C11.314 2 14 4.686 14 8C14 11.314 11.314 14 8 14C4.686 14 2 11.314 2 8C2 4.686 4.686 2 8 2Z"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.2"
                  />
                  <path d="M6 8L9 5.5V10.5L6 8Z" fill="rgba(255,255,255,0.5)" />
                </svg>
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={item}
              className="flex items-center gap-6 mt-10"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28 }}
            >
              <div className="flex -space-x-3">
                {['4F8CFF', '7B5CFF', '00D084', 'FF6B6B', 'FEBC2E'].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: `#${c}`,
                      border: '2px solid #050505',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#fbbf24">
                      <path d="M6.5 0.5L7.96 4.48H12.18L8.82 7.02L10.18 11.02L6.5 8.5L2.82 11.02L4.18 7.02L0.82 4.48H5.04L6.5 0.5Z" />
                    </svg>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>
                  Trusted by 50+ clients worldwide
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: browser mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="animate-float"
            >
              <BrowserMockup />
            </motion.div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '15%',
                right: '-5%',
                background: 'rgba(16,16,16,0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div style={{ fontSize: 18 }}>⚡</div>
              <div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  98 / 100
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>
                  Lighthouse Score
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '-8%',
                background: 'rgba(16,16,16,0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(79,140,255,0.2)',
                borderRadius: 12,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(0,208,132,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}
              >
                ✓
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#00d084',
                  }}
                >
                  Project Delivered
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>
                  On time &amp; on budget
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: 0.4,
        }}
      >
        <div
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Scroll
        </div>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
