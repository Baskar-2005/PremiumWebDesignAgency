import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const openRoles = [
  {
    title: 'Senior Frontend Engineer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    color: '#4f8cff',
    description: 'Build pixel-perfect, high-performance interfaces for our clients. You are obsessed with animation, accessibility, and code quality.',
    skills: ['React', 'TypeScript', 'Framer Motion', 'CSS / Tailwind', 'Vite'],
  },
  {
    title: 'Product Designer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Design',
    color: '#7b5cff',
    description: 'Own end-to-end design from discovery to final handoff. You think in systems, not screens, and your Figma files are a joy to work with.',
    skills: ['Figma', 'Design Systems', 'Motion Design', 'User Research', 'Prototyping'],
  },
  {
    title: 'Full-Stack Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    color: '#00d084',
    description: 'Work across the entire stack — from database schema to deployment pipeline. Node.js, Postgres, and edge functions are your comfort zone.',
    skills: ['Node.js', 'PostgreSQL', 'Next.js', 'AWS / Vercel', 'REST & GraphQL'],
  },
  {
    title: 'E-Commerce Specialist',
    type: 'Contract',
    location: 'Remote',
    department: 'Engineering',
    color: '#fbbf24',
    description: 'Build and optimise Shopify and custom e-commerce storefronts. You know conversion rate optimisation inside out.',
    skills: ['Shopify', 'Liquid', 'Shopify APIs', 'Analytics', 'CRO'],
  },
  {
    title: 'SEO & Growth Strategist',
    type: 'Part-time',
    location: 'Remote',
    department: 'Marketing',
    color: '#ff6b6b',
    description: 'Drive organic growth for our clients through technical SEO, content strategy, and data-driven experimentation.',
    skills: ['Technical SEO', 'GA4', 'Ahrefs', 'Content Strategy', 'Core Web Vitals'],
  },
]

const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12 7H17L13 11L15 16L10 13L5 16L7 11L3 7H8L10 2Z" stroke="#4f8cff" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Craft over speed',
    desc: 'We build things that last. Quality is non-negotiable, even when deadlines are tight.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#7b5cff" strokeWidth="1.3" />
        <path d="M10 6V10L13 13" stroke="#7b5cff" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Async by default',
    desc: 'No pointless meetings. Deep work is sacred. We communicate thoughtfully, not constantly.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10C4 10 6 4 10 4C14 4 16 10 16 10C16 10 14 16 10 16C6 16 4 10 4 10Z" stroke="#00d084" strokeWidth="1.3" fill="none" />
        <circle cx="10" cy="10" r="2" stroke="#00d084" strokeWidth="1.3" />
      </svg>
    ),
    title: 'Radical transparency',
    desc: 'Everyone knows what we\'re building and why. No information silos, no hidden agendas.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3L12.5 8H18L13.5 11.5L15.5 17L10 13.5L4.5 17L6.5 11.5L2 8H7.5L10 3Z" stroke="#fbbf24" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Growth is mandatory',
    desc: 'We invest in your learning. Conference tickets, courses, and a dedicated learning budget.',
  },
]

function RoleCard({ role, onApply }: { role: typeof openRoles[0]; onApply: () => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      style={{
        background: '#0d0d0d',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = `${role.color}25`)}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      {/* Role header */}
      <div
        style={{ padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
        onClick={() => setExpanded(x => !x)}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span
              style={{
                background: `${role.color}15`,
                border: `1px solid ${role.color}25`,
                borderRadius: 6,
                padding: '3px 10px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                color: role.color,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {role.department}
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
              {role.type} · {role.location}
            </span>
          </div>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>
            {role.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ padding: '0 32px 32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', margin: '24px 0 20px' }}>
                {role.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {role.skills.map(skill => (
                  <span
                    key={skill}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 7,
                      padding: '5px 12px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={e => { e.stopPropagation(); onApply() }}
                className="btn-primary"
                style={{ padding: '12px 28px', borderRadius: 12, fontSize: 14 }}
              >
                Apply for this role →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Careers({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onBack() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onBack])

  const handleApply = () => {
    window.open('mailto:careers@digitalshine.agency?subject=Job Application', '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: '#050505', minHeight: '100vh' }}
    >
      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(5,5,5,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '18px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '8px 16px',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </button>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>
          Digital Shine · Careers
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 48px 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0,208,132,0.1)',
              border: '1px solid rgba(0,208,132,0.2)',
              borderRadius: 8,
              padding: '6px 14px',
              marginBottom: 32,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d084', animation: 'pulse-glow 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#00d084', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {openRoles.length} open positions
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              color: '#fff',
              marginBottom: 24,
              lineHeight: 1.05,
            }}
          >
            Build the future of{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              digital
            </span>
            <br />with us.
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.4)',
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            We're a small, fully remote team obsessed with shipping world-class digital products. If that sounds like you, let's talk.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 80,
          }}
        >
          {values.map((v, i) => (
            <div
              key={i}
              style={{
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: '24px 24px',
              }}
            >
              <div style={{ marginBottom: 14 }}>{v.icon}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                {v.title}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.4)' }}>
                {v.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Open Roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 8 }}>
              Open Roles
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
              All roles are remote-first. Click any role to see more details.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 80 }}>
            {openRoles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
              >
                <RoleCard role={role} onApply={handleApply} />
              </motion.div>
            ))}
          </div>

          {/* Spontaneous applications */}
          <div
            style={{
              marginBottom: 120,
              padding: '48px 40px',
              background: 'rgba(79,140,255,0.04)',
              border: '1px solid rgba(79,140,255,0.12)',
              borderRadius: 24,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: 'rgba(79,140,255,0.1)',
                border: '1px solid rgba(79,140,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 4L3 11L10 14M20 4L13 21L10 14M20 4L10 14" stroke="#4f8cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              Don't see your role?
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.7 }}>
              We're always looking for exceptional people. Send us your portfolio and a note about what you'd bring to the team.
            </p>
            <button
              onClick={handleApply}
              className="btn-primary"
              style={{ padding: '14px 32px', borderRadius: 12, fontSize: 15 }}
            >
              Get in touch →
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
