import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'NovaPay',
    category: 'Fintech',
    type: 'Web App',
    desc: 'A next-generation digital banking platform with real-time analytics, sleek card management, and frictionless transfers for modern consumers.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=640&fit=crop&auto=format',
    color: '#4f8cff',
    year: '2024',
    num: '01',
  },
  {
    id: 2,
    title: 'Luminary Studio',
    category: 'Creative Agency',
    type: 'Website',
    desc: 'Award-winning creative studio branding and website — built with cinematic scroll, full-bleed imagery, and custom cursor interactions.',
    tags: ['React', 'Framer Motion', 'GSAP', 'Figma'],
    img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&h=640&fit=crop&auto=format',
    color: '#a78bfa',
    year: '2024',
    num: '02',
  },
  {
    id: 3,
    title: 'Orbit Commerce',
    category: 'E-Commerce',
    type: 'Platform',
    desc: 'A premium e-commerce experience for a luxury fashion brand — personalized discovery, one-click checkout, and 98% Lighthouse performance.',
    tags: ['Next.js', 'Shopify', 'Node.js', 'Cloudflare'],
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=640&fit=crop&auto=format',
    color: '#34d399',
    year: '2023',
    num: '03',
  },
  {
    id: 4,
    title: 'Synapse AI',
    category: 'SaaS',
    type: 'Dashboard',
    desc: 'Enterprise AI insights platform with complex data visualization, role-based access control, and real-time inference pipeline monitoring.',
    tags: ['React', 'TypeScript', 'Firebase', 'D3.js'],
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&h=640&fit=crop&auto=format',
    color: '#f59e0b',
    year: '2024',
    num: '04',
  },
]

function ProjectCard({ p, i }: { p: (typeof projects)[0]; i: number }) {
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
      style={{ position: 'relative' }}
    >
      {/* Card */}
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
  p: (typeof projects)[0]
  imgY: ReturnType<typeof useTransform>
  hovered: boolean
}) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Parallax image */}
      <motion.div style={{ y: imgY, height: '110%', top: '-5%', position: 'absolute', inset: 0 }}>
        <motion.img
          src={p.img}
          alt={p.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>

      {/* Color overlay */}
      <motion.div
        animate={{ opacity: hovered ? 0.18 : 0.08 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${p.color} 0%, transparent 60%)`,
        }}
      />

      {/* Dark gradient for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.3) 0%, transparent 50%)',
        }}
      />

      {/* Year badge */}
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

      {/* Bottom color line */}
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

function ProjectContent({ p, hovered }: { p: (typeof projects)[0]; hovered: boolean }) {
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
      {/* Giant ghost number */}
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

      {/* Category + type pill */}
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

      {/* Title */}
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

      {/* Description */}
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

      {/* Tags */}
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

      {/* CTA link */}
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

export default function Projects() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="projects" style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
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
            {/* Project count */}
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
              whileHover="hover"
              className="btn-ghost flex items-center gap-2"
              style={{ padding: '11px 22px', borderRadius: 100, fontSize: 13.5 }}
            >
              View All Projects
              <motion.svg
                variants={{ hover: { x: 4 } }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
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
            <ProjectCard key={p.id} p={p} i={i} />
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
          <motion.button
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            onClick={() => {}}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              borderRadius: 100,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '-0.01em',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span>See all {projects.length} case studies</span>
            <motion.span
              variants={{ hover: { x: 4 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M7 2L12 7L7 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
