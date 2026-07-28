import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type Page = 'privacy' | 'terms' | 'careers'

const socials = [
  {
    name: 'Twitter / X',
    href: 'https://x.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    name: 'Dribbble',
    href: 'https://dribbble.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8S12.408 0 8 0zm5.736 3.67a6.715 6.715 0 0 1 1.534 4.177c-.224-.045-2.464-.496-4.72-.216-.053-.12-.097-.248-.152-.376-.144-.336-.296-.68-.448-.992 2.48-1.008 3.608-2.448 3.786-2.593zM8 1.336a6.683 6.683 0 0 1 4.688 1.904c-.152.128-1.168 1.464-3.568 2.36C7.88 3.664 6.632 2.216 6.432 1.984A6.685 6.685 0 0 1 8 1.336zm-3.272.664c.184.208 1.448 1.664 2.704 3.592C3.976 6.4 1.896 6.384 1.672 6.384A6.716 6.716 0 0 1 4.728 2zm-3.392 6A6.665 6.665 0 0 1 1.336 8c0-.056 0-.112.008-.168.216.008 2.8.056 5.08-.696.144.28.28.56.408.84-.064.016-.128.04-.192.064-2.352.76-3.6 2.848-3.704 3.04a6.695 6.695 0 0 1-1.6-3.08zm3.272 4.656a6.697 6.697 0 0 1-1.608-2.272c.08-.128 1.104-1.888 3.224-2.76.008-.008.016-.008.024-.008a24.248 24.248 0 0 1 1.184 4.2 6.662 6.662 0 0 1-2.824.84zm3.464.488a25.64 25.64 0 0 0-1.12-3.952c1.792-.288 3.368.184 3.568.248a6.713 6.713 0 0 1-2.448 3.704zm.832-5.408c-.16-.048-1.888-.592-3.8-.304-.096-.264-.184-.536-.272-.8-.072-.2-.144-.4-.208-.6 2.336-.952 3.304-2.312 3.376-2.424a6.681 6.681 0 0 1 1.976 4.056c-.176-.04-.584-.136-1.072.072z" />
      </svg>
    ),
  },
]

const footerLinks: Record<string, Array<{ label: string; action?: Page; scroll?: string; href?: string }>> = {
  Services: [
    { label: 'Website Design', scroll: '#services' },
    { label: 'Web Development', scroll: '#services' },
    { label: 'UI/UX Design', scroll: '#services' },
    { label: 'E-Commerce', scroll: '#services' },
    { label: 'SEO Strategy', scroll: '#services' },
    { label: 'Brand Identity', scroll: '#services' },
  ],
  Company: [
    { label: 'About Us', scroll: '#about' },
    { label: 'Our Process', scroll: '#process' },
    { label: 'Case Studies', scroll: '#projects' },
    { label: 'Careers', action: 'careers' },
    { label: 'FAQ', scroll: '#faq' },
    { label: 'Contact', scroll: '#contact' },
  ],
  Resources: [
    { label: 'Free Audit', scroll: '#contact' },
    { label: 'Tech Stack', scroll: '#tech' },
    { label: 'FAQ', scroll: '#faq' },
    { label: 'Privacy Policy', action: 'privacy' },
    { label: 'Terms of Service', action: 'terms' },
  ],
}

export default function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleLink = (link: (typeof footerLinks)[string][number]) => {
    if (link.action) { onNavigate(link.action) }
    else if (link.scroll) { document.querySelector(link.scroll)?.scrollIntoView({ behavior: 'smooth' }) }
    else if (link.href) { window.open(link.href, '_blank') }
  }

  const handleSubscribe = () => {
    if (email.includes('@')) { setSubscribed(true) }
  }

  return (
    <footer
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Animated top border */}
      <div style={{ position: 'relative', height: 1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.06)' }} />
        <motion.div
          initial={{ x: '-100%' }}
          animate={inView ? { x: '100%' } : {}}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, #4f8cff, #7b5cff, transparent)',
          }}
        />
      </div>

      {/* Background orbs */}
      <div style={{ position: 'absolute', bottom: '30%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(79,140,255,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(123,92,255,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ghost watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(60px, 12vw, 180px)',
          color: 'rgba(255,255,255,0.018)',
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        DIGITAL SHINE
      </div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: '80px 48px 0', maxWidth: 1280, margin: '0 auto' }}
      >
        <div
          style={{
            position: 'relative',
            borderRadius: 28,
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(79,140,255,0.3), rgba(123,92,255,0.15), rgba(79,140,255,0.05))',
            marginBottom: 80,
            overflow: 'hidden',
          }}
        >
          {/* Inner glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '20%',
              right: '20%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.6), transparent)',
            }}
          />
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(10,10,18,0.97), rgba(13,10,22,0.97))',
              borderRadius: 27,
              padding: 'clamp(40px, 5vw, 72px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 40,
              flexWrap: 'wrap',
            }}
          >
            {/* Ambient orb inside */}
            <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 300, height: 300, background: 'radial-gradient(circle, rgba(79,140,255,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(0,208,132,0.1)',
                  border: '1px solid rgba(0,208,132,0.2)',
                  borderRadius: 8,
                  padding: '5px 12px',
                  marginBottom: 24,
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d084' }}
                />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#00d084', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Accepting new projects
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(28px, 3vw, 48px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                Ready to build something{' '}
                <span style={{ background: 'linear-gradient(135deg, #4f8cff, #7b5cff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  remarkable?
                </span>
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: 420 }}>
                Let's talk about your project. No commitments — just an honest conversation about what's possible.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                style={{ padding: '16px 36px', borderRadius: 14, fontSize: 16, whiteSpace: 'nowrap' }}
              >
                Start a Project →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14,
                  padding: '14px 36px',
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                View Our Work
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container-xl" style={{ position: 'relative' }}>
        {/* Brand + Newsletter row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48, marginBottom: 64, flexWrap: 'wrap' }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(79,140,255,0.3)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L18 6.5V13.5L10 18L2 13.5V6.5L10 2Z" stroke="white" strokeWidth="1.2" fill="none" />
                  <path d="M10 2V18M2 6.5L18 13.5M18 6.5L2 13.5" stroke="white" strokeWidth="0.6" opacity="0.5" />
                </svg>
              </div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: '-0.03em', color: '#fff' }}>
                Digital Shine
              </span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
              We build digital experiences that people remember. Premium websites, powerful brands, and modern web applications.
            </p>
            {/* Status badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(0,208,132,0.08)',
                border: '1px solid rgba(0,208,132,0.15)',
                borderRadius: 8,
                padding: '6px 12px',
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d084' }}
              />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#00d084', fontWeight: 500 }}>
                Open for new projects
              </span>
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ maxWidth: 360 }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
              Design insights. No noise.
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 16, lineHeight: 1.6 }}>
              Monthly thoughts on design, performance, and building products people love.
            </p>
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'rgba(0,208,132,0.1)',
                    border: '1px solid rgba(0,208,132,0.2)',
                    borderRadius: 12,
                    padding: '14px 18px',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 5" stroke="#00d084" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#00d084', fontWeight: 500 }}>
                    You're on the list!
                  </span>
                </motion.div>
              ) : (
                <motion.div key="form" style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${emailFocused ? 'rgba(79,140,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: 11,
                        padding: '12px 16px',
                        fontSize: 13,
                        color: '#fff',
                        fontFamily: 'Inter, sans-serif',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                        boxShadow: emailFocused ? '0 0 0 3px rgba(79,140,255,0.08)' : 'none',
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubscribe}
                    className="btn-primary"
                    style={{ padding: '12px 20px', borderRadius: 11, fontSize: 13, whiteSpace: 'nowrap' }}
                  >
                    Subscribe
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Back to top */}
          <motion.button
            whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(79,140,255,0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              padding: '14px 20px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(255,255,255,0.45)',
              transition: 'all 0.3s',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M4 8L8 4L12 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Top
            </span>
          </motion.button>
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 56 }} />

        {/* Links grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 40,
            paddingBottom: 56,
          }}
        >
          {Object.entries(footerLinks).map(([category, links], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + ci * 0.07 }}
            >
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 16, height: 1, background: 'rgba(255,255,255,0.15)' }} />
                {category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {links.map(link => (
                  <motion.button
                    key={link.label}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleLink(link)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.38)',
                      padding: '5px 0',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.color = 'rgba(255,255,255,0.38)'
                    }}
                  >
                    {link.label}
                    {link.action && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
                        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 32 }} />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 48, flexWrap: 'wrap', gap: 16 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>
              © 2026 Digital Shine. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Privacy Policy', 'Terms of Service'].map(label => (
                <button
                  key={label}
                  onClick={() => onNavigate(label === 'Privacy Policy' ? 'privacy' : 'terms')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.25)',
                    padding: 0,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.25)')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {socials.map(s => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = '#fff'
                  el.style.background = 'rgba(79,140,255,0.12)'
                  el.style.borderColor = 'rgba(79,140,255,0.25)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'rgba(255,255,255,0.35)'
                  el.style.background = 'rgba(255,255,255,0.04)'
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
