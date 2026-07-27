import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

function MagneticLink({
  label,
  href,
  onClick,
  active,
}: {
  label: string
  href: string
  onClick: (href: string) => void
  active: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.25)
    y.set((e.clientY - cy) * 0.25)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY, position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 2px' }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={() => onClick(href)}
      whileHover="hover"
    >
      <motion.span
        variants={{ hover: { color: '#fff' } }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '-0.01em',
          color: active ? '#fff' : 'rgba(255,255,255,0.5)',
          transition: 'color 0.25s',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {label}
      </motion.span>

      {/* Active dot */}
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="nav-active-dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'absolute',
              bottom: -2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
              boxShadow: '0 0 8px rgba(79,140,255,0.8)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Hover highlight pill */}
      <motion.span
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        style={{
          position: 'absolute',
          inset: '0 -10px',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.05)',
          zIndex: 0,
        }}
      />
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Active section detection
  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          paddingTop: scrolled ? 0 : 0,
        }}
      >
        {/* Top border glow line */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, rgba(79,140,255,0.4) 30%, rgba(123,92,255,0.4) 70%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          animate={{
            background: scrolled
              ? 'rgba(5,5,5,0.80)'
              : 'rgba(5,5,5,0)',
            backdropFilter: scrolled ? 'blur(32px) saturate(180%)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(180%)' : 'blur(0px)',
            borderBottom: scrolled
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%' }}
        >
          <div className="container-xl flex items-center justify-between" style={{ height: 72 }}>

            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
              whileHover="hover"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.1, rotate: 10 },
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 20px rgba(79,140,255,0.3)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5L16.5 5.5V12.5L9 16.5L1.5 12.5V5.5L9 1.5Z" stroke="white" strokeWidth="1.2" fill="none" />
                  <path d="M9 1.5V16.5M1.5 5.5L16.5 12.5M16.5 5.5L1.5 12.5" stroke="white" strokeWidth="0.6" opacity="0.5" />
                </svg>
              </motion.div>

              <motion.span
                variants={{ hover: { color: '#fff' } }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: '-0.03em',
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                Digital Shine
              </motion.span>
            </motion.button>

            {/* Desktop nav — floating pill */}
            <div
              className="hidden md:flex items-center"
              style={{
                gap: 4,
                padding: '6px 8px',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{ padding: '0 10px' }}
                >
                  <MagneticLink
                    label={link.label}
                    href={link.href}
                    onClick={handleNav}
                    active={activeSection === link.href.replace('#', '')}
                  />
                </motion.div>
              ))}
            </div>

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-4">
              {/* CTA Button */}
              <motion.button
                onClick={() => handleNav('#contact')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-2"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #4f8cff 0%, #7b5cff 100%)',
                  border: 'none',
                  borderRadius: 100,
                  padding: '10px 22px',
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 4px 24px rgba(79,140,255,0.35)',
                }}
              >
                {/* Shimmer sweep */}
                <motion.span
                  variants={{
                    hover: { x: ['−100%', '200%'], opacity: [0, 0.6, 0] },
                  }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)',
                    transform: 'skewX(-15deg)',
                    pointerEvents: 'none',
                  }}
                />
                Start Project
                <motion.svg
                  variants={{ hover: { x: 3 } }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path d="M2 7H12M7 2L12 7L7 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.button>

              {/* Hamburger */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl"
                onClick={() => setMobileOpen(o => !o)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  gap: 5,
                }}
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'block', width: 18, height: 1.5, background: '#fff', borderRadius: 2 }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'block', width: 12, height: 1.5, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'block', width: 18, height: 1.5, background: '#fff', borderRadius: 2 }}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 72,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5,5,5,0.97)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              zIndex: 998,
              display: 'flex',
              flexDirection: 'column',
              padding: '32px 28px 40px',
            }}
          >
            {/* Ambient blob */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: 400,
                height: 300,
                background: 'radial-gradient(ellipse at center, rgba(79,140,255,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNav(link.href)}
                  whileHover={{ x: 12 }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 36,
                    fontWeight: 700,
                    color: activeSection === link.href.replace('#', '') ? '#fff' : 'rgba(255,255,255,0.25)',
                    padding: '10px 0',
                    letterSpacing: '-0.04em',
                    transition: 'color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif', minWidth: 28 }}>
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              onClick={() => handleNav('#contact')}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 16,
                background: 'linear-gradient(135deg, #4f8cff 0%, #7b5cff 100%)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 17,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em',
                boxShadow: '0 8px 32px rgba(79,140,255,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M7 2L12 7L7 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
