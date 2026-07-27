import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    slug: 'novapay',
    title: 'NovaPay',
    category: 'Fintech',
    type: 'Web App',
    desc: 'A next-generation digital banking platform with real-time analytics, sleek card management, and frictionless transfers for modern consumers.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=640&fit=crop&auto=format',
    color: '#4f8cff',
    year: '2024',
    num: '01',
    metric: '97/100',
    metricLabel: 'Lighthouse',
  },
  {
    id: 2,
    slug: 'luminary-studio',
    title: 'Luminary Studio',
    category: 'Creative',
    type: 'Website',
    desc: 'Award-winning creative studio branding and website — built with cinematic scroll, full-bleed imagery, and custom cursor interactions.',
    tags: ['React', 'Framer Motion', 'GSAP', 'Figma'],
    img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&h=640&fit=crop&auto=format',
    color: '#a78bfa',
    year: '2024',
    num: '02',
    metric: '+210%',
    metricLabel: 'Inquiries',
  },
  {
    id: 3,
    slug: 'orbit-commerce',
    title: 'Orbit Commerce',
    category: 'E-Commerce',
    type: 'Platform',
    desc: 'A premium e-commerce experience for a luxury fashion brand — personalized discovery, one-click checkout, and 98% Lighthouse performance.',
    tags: ['Next.js', 'Shopify', 'Node.js', 'Cloudflare'],
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=640&fit=crop&auto=format',
    color: '#34d399',
    year: '2023',
    num: '03',
    metric: '+280%',
    metricLabel: 'Revenue',
  },
  {
    id: 4,
    slug: 'synapse-ai',
    title: 'Synapse AI',
    category: 'SaaS',
    type: 'Dashboard',
    desc: 'Enterprise AI insights platform with complex data visualization, role-based access control, and real-time inference pipeline monitoring.',
    tags: ['React', 'TypeScript', 'Firebase', 'D3.js'],
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&h=640&fit=crop&auto=format',
    color: '#f59e0b',
    year: '2024',
    num: '04',
    metric: '300ms',
    metricLabel: 'Latency',
  },
]

const FILTERS = ['All', 'Fintech', 'Creative', 'E-Commerce', 'SaaS']

// ─── All Projects Modal ────────────────────────────────────────────────────────
function AllProjectsModal({
  onClose,
  onViewProject,
}: {
  onClose: () => void
  onViewProject: (slug: string) => void
}) {
  const [filter, setFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        overflowY: 'auto',
        background: 'rgba(5,5,5,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Ambient top glow */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '20%',
          right: '20%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.5), rgba(167,139,250,0.5), transparent)',
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 80px' }}
      >
        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 40,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'rgba(5,5,5,0.7)',
            backdropFilter: 'blur(20px)',
            padding: '20px 0',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div style={{ width: 20, height: 1, background: '#4f8cff' }} />
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
                Our Work
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: '#fff',
                margin: 0,
              }}
            >
              All Projects
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0',
                  marginLeft: 14,
                }}
              >
                {visible.length} case {visible.length === 1 ? 'study' : 'studies'}
              </span>
            </h2>
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 36,
            flexWrap: 'wrap',
          }}
        >
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: filter === f ? '#4f8cff' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${filter === f ? '#4f8cff' : 'rgba(255,255,255,0.08)'}`,
                color: filter === f ? '#fff' : 'rgba(255,255,255,0.45)',
                boxShadow: filter === f ? '0 0 20px rgba(79,140,255,0.3)' : 'none',
              }}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
            marginBottom: 36,
          }}
        />

        {/* Project grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
            }}
          >
            {visible.map((p, i) => (
              <ModalCard
                key={p.id}
                p={p}
                i={i}
                hovered={hoveredId === p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => { onClose(); setTimeout(() => onViewProject(p.slug), 200) }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {visible.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)' }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>—</div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>No projects in this category yet.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

function ModalCard({
  p, i, hovered, onMouseEnter, onMouseLeave, onClick,
}: {
  p: typeof projects[0]
  i: number
  hovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gradient border */}
      <motion.div
        animate={{
          background: hovered
            ? `linear-gradient(135deg, ${p.color}55, ${p.color}10 50%, ${p.color}30)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
        }}
        transition={{ duration: 0.35 }}
        style={{ borderRadius: 24, padding: 1 }}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          style={{
            background: '#0c0c0e',
            borderRadius: 23,
            overflow: 'hidden',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          {/* Mouse glow */}
          <div
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${p.color}18 0%, transparent 70%)`,
              left: mouse.x - 150,
              top: mouse.y - 150,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.35s',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Image */}
          <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
            <motion.img
              src={p.img}
              alt={p.title}
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Color overlay */}
            <motion.div
              animate={{ opacity: hovered ? 0.22 : 0.1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${p.color} 0%, transparent 60%)`,
              }}
            />
            {/* Bottom fade */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(to top, #0c0c0e, transparent)',
              }}
            />
            {/* Year + category badges */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                right: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  color: p.color,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: `${p.color}18`,
                  border: `1px solid ${p.color}30`,
                  borderRadius: 6,
                  padding: '4px 10px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {p.category}
              </span>
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.04em',
                }}
              >
                {p.year}
              </span>
            </div>
            {/* Bottom accent line */}
            <motion.div
              animate={{ scaleX: hovered ? 1 : 0 }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${p.color}, transparent)`,
                transformOrigin: 'left',
              }}
            />
          </div>

          {/* Content */}
          <div style={{ padding: '24px 28px 28px', position: 'relative', zIndex: 1 }}>
            {/* Number */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                right: 16,
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 72,
                fontWeight: 800,
                color: 'rgba(255,255,255,0.025)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {p.num}
            </div>

            {/* Metric badge */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 24,
                right: 28,
                textAlign: 'right',
              }}
            >
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 17,
                  fontWeight: 700,
                  color: p.color,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {p.metric}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.28)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                {p.metricLabel}
              </div>
            </motion.div>

            <h3
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(20px, 2vw, 28px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: '#fff',
                marginBottom: 8,
                lineHeight: 1.05,
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.38)',
                marginBottom: 18,
                maxWidth: 400,
              }}
            >
              {p.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {p.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.36)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 5,
                    padding: '3px 10px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <motion.div
                animate={{
                  background: hovered ? p.color : 'rgba(255,255,255,0.06)',
                  borderColor: hovered ? p.color : 'rgba(255,255,255,0.1)',
                  x: hovered ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M7 2L12 7L7 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <motion.span
                animate={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.3)' }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                View Case Study
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Individual project card (main section) ────────────────────────────────────
function ProjectCard({
  p,
  i,
  onViewProject,
}: {
  p: typeof projects[0]
  i: number
  onViewProject: (slug: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onViewProject(p.slug)}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onViewProject(p.slug)
        }
      }}
      role="button"
      tabIndex={0}
      style={{ position: 'relative' }}
    >
      <motion.div
        animate={{
          borderColor: hovered ? `${p.color}35` : 'rgba(255,255,255,0.07)',
          boxShadow: hovered
            ? `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${p.color}20`
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, #0e0e0e 0%, #0a0a0a 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 28,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: i % 2 === 0 ? '1fr 1.15fr' : '1.15fr 1fr',
          minHeight: 380,
          cursor: 'pointer',
        }}
      >
        {i % 2 === 0 ? (
          <>
            <ProjectContent p={p} hovered={hovered} />
            <ProjectImage p={p} imgY={imgY} hovered={hovered} />
          </>
        ) : (
          <>
            <ProjectImage p={p} imgY={imgY} hovered={hovered} />
            <ProjectContent p={p} hovered={hovered} />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

function ProjectImage({
  p,
  imgY,
  hovered,
}: {
  p: typeof projects[0]
  imgY: ReturnType<typeof useTransform>
  hovered: boolean
}) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ y: imgY, height: '110%', top: '-5%', position: 'absolute', inset: 0 }}>
        <motion.img
          src={p.img}
          alt={p.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>
      <motion.div
        animate={{ opacity: hovered ? 0.18 : 0.08 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${p.color} 0%, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.3) 0%, transparent 50%)',
        }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          padding: '5px 12px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 12,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.06em',
        }}
      >
        {p.year}
      </motion.div>
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${p.color}, transparent)`,
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}

function ProjectContent({ p, hovered }: { p: typeof projects[0]; hovered: boolean }) {
  return (
    <div
      style={{
        padding: '44px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          right: -10,
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 140,
          fontWeight: 800,
          color: hovered ? `${p.color}12` : 'rgba(255,255,255,0.025)',
          lineHeight: 1,
          letterSpacing: '-0.06em',
          userSelect: 'none',
          pointerEvents: 'none',
          transition: 'color 0.5s',
        }}
      >
        {p.num}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <span
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            color: p.color,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {p.category}
        </span>
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
        <span
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {p.type}
        </span>
      </div>
      <h3
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(30px, 2.8vw, 44px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: '#fff',
          marginBottom: 14,
          lineHeight: 1.05,
        }}
      >
        {p.title}
      </h3>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14.5,
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.42)',
          marginBottom: 24,
          maxWidth: 380,
        }}
      >
        {p.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 32 }}>
        {p.tags.map(tag => (
          <span
            key={tag}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 11.5,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.38)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 6,
              padding: '4px 11px',
              letterSpacing: '-0.01em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <motion.div
        animate={{ x: hovered ? 6 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: hovered ? p.color : 'rgba(255,255,255,0.06)',
            border: `1px solid ${hovered ? p.color : 'rgba(255,255,255,0.1)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.35s ease',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M7 2L12 7L7 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 13.5,
            fontWeight: 600,
            color: hovered ? '#fff' : 'rgba(255,255,255,0.35)',
            letterSpacing: '-0.01em',
            transition: 'color 0.3s',
          }}
        >
          View Project
        </span>
      </motion.div>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Projects({ onViewProject }: { onViewProject: (slug: string) => void }) {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-60px' })
  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <AnimatePresence>
        {showAll && (
          <AllProjectsModal
            onClose={() => setShowAll(false)}
            onViewProject={onViewProject}
          />
        )}
      </AnimatePresence>

      <section id="projects" style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Background glows */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-15%',
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(79,140,255,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-10%',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-xl">
          {/* Header */}
          <div
            ref={headerRef}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="section-label"
                style={{ marginBottom: 18 }}
              >
                Our Work
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(36px, 3.5vw, 58px)',
                  fontWeight: 700,
                  letterSpacing: '-0.045em',
                  lineHeight: 1.02,
                  color: '#fff',
                }}
              >
                Projects that{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #4f8cff 0%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  speak.
                </span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center gap-6"
            >
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '-0.01em',
                }}
              >
                {projects.length} projects
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAll(true)}
                className="btn-ghost flex items-center gap-2"
                style={{ padding: '11px 22px', borderRadius: 100, fontSize: 13.5 }}
              >
                View All Projects
                <motion.svg
                  width="13" height="13" viewBox="0 0 14 14" fill="none"
                >
                  <path d="M2 7H12M7 2L12 7L7 12" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                </motion.svg>
              </motion.button>
            </motion.div>
          </div>

          {/* Project cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i} onViewProject={onViewProject} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}
          >
            {/* Gradient border wrapper */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAll(true)}
              style={{
                padding: 1,
                borderRadius: 100,
                background: 'linear-gradient(135deg, rgba(79,140,255,0.4), rgba(167,139,250,0.2) 50%, rgba(79,140,255,0.3))',
                cursor: 'pointer',
              }}
            >
              <motion.div
                whileHover={{ background: 'rgba(79,140,255,0.08)' }}
                transition={{ duration: 0.25 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 36px',
                  borderRadius: 100,
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Animated dot */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f8cff', flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Browse all {projects.length} case studies
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <path d="M2 7H12M7 2L12 7L7 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
