import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'NovaPay',
    category: 'Fintech · Web App',
    desc: 'A next-generation digital banking platform with real-time analytics, sleek card management, and frictionless transfers for modern consumers.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=560&fit=crop&auto=format',
    color: '#4f8cff',
    year: '2024',
  },
  {
    id: 2,
    title: 'Luminary Studio',
    category: 'Creative Agency · Website',
    desc: 'Award-winning creative studio branding and website — built with cinematic scroll, full-bleed imagery, and custom cursor interactions.',
    tags: ['React', 'Framer Motion', 'GSAP', 'Figma'],
    img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=560&fit=crop&auto=format',
    color: '#7b5cff',
    year: '2024',
  },
  {
    id: 3,
    title: 'Orbit Commerce',
    category: 'E-Commerce · Platform',
    desc: 'A premium e-commerce experience for a luxury fashion brand — personalized discovery, one-click checkout, and 98% Lighthouse performance.',
    tags: ['Next.js', 'Shopify', 'Node.js', 'Cloudflare'],
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=560&fit=crop&auto=format',
    color: '#00d084',
    year: '2023',
  },
  {
    id: 4,
    title: 'Synapse AI',
    category: 'SaaS · Dashboard',
    desc: 'Enterprise AI insights platform with complex data visualization, role-based access control, and real-time inference pipeline monitoring.',
    tags: ['React', 'TypeScript', 'Firebase', 'D3.js'],
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=560&fit=crop&auto=format',
    color: '#4f8cff',
    year: '2024',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} style={{ padding: '140px 0', position: 'relative' }}>
      <div
        className="blob"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(79,140,255,0.06) 0%, transparent 65%)',
          top: '30%',
          right: '-10%',
          animationDuration: '12s',
          pointerEvents: 'none',
          position: 'absolute',
        }}
      />

      <div className="container-xl">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 64,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label" style={{ marginBottom: 20 }}>Our Work</div>
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
              Projects that{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                speak.
              </span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="btn-ghost hidden md:flex"
            style={{ padding: '12px 24px', borderRadius: 12, fontSize: 14 }}
          >
            View All Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M7 2L12 7L7 12" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i }}
              className="project-card"
              style={{
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                minHeight: 340,
                cursor: 'default',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${p.color}30`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              {/* Image - alternating sides */}
              {i % 2 === 0 ? (
                <>
                  <div
                    style={{
                      padding: '48px 48px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <ProjectContent p={p} />
                  </div>
                  <ProjectImage p={p} />
                </>
              ) : (
                <>
                  <ProjectImage p={p} />
                  <div
                    style={{
                      padding: '48px 48px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <ProjectContent p={p} />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectImage({ p }: { p: (typeof projects)[number] }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <img
        src={p.img}
        alt={p.title}
        className="project-img"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.2), transparent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          padding: '4px 10px',
          fontSize: 11,
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.05em',
        }}
      >
        {p.year}
      </div>
    </div>
  )
}

function ProjectContent({ p }: { p: (typeof projects)[number] }) {
  return (
    <>
      <div
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 12,
          fontWeight: 600,
          color: p.color,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        {p.category}
      </div>
      <h3
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(28px, 2.5vw, 40px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: '#fff',
          marginBottom: 16,
        }}
      >
        {p.title}
      </h3>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 15,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.45)',
          marginBottom: 28,
          maxWidth: 400,
        }}
      >
        {p.desc}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {p.tags.map(tag => (
          <span
            key={tag}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 12,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              padding: '4px 10px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 14,
          fontWeight: 600,
          color: p.color,
          padding: 0,
          transition: 'gap 0.3s ease',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.gap = '14px')}
        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.gap = '8px')}
      >
        View Project
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8H14M8 2L14 8L8 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}
