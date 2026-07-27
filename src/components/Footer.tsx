import { motion } from 'framer-motion'

const footerLinks = {
  Services: ['Website Design', 'Web Development', 'UI/UX Design', 'E-Commerce', 'SEO Strategy', 'Brand Identity'],
  Company: ['About Us', 'Our Process', 'Case Studies', 'Blog', 'Careers', 'Press Kit'],
  Resources: ['Style Guide', 'Free Audit', 'Tech Stack', 'FAQ', 'Privacy Policy', 'Terms of Service'],
}

const socials = [
  {
    name: 'Twitter',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    name: 'Dribbble',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8S12.408 0 8 0zm5.736 3.67a6.715 6.715 0 0 1 1.534 4.177c-.224-.045-2.464-.496-4.72-.216-.053-.12-.097-.248-.152-.376-.144-.336-.296-.68-.448-.992 2.48-1.008 3.608-2.448 3.786-2.593zM8 1.336a6.683 6.683 0 0 1 4.688 1.904c-.152.128-1.168 1.464-3.568 2.36C7.88 3.664 6.632 2.216 6.432 1.984A6.685 6.685 0 0 1 8 1.336zm-3.272.664c.184.208 1.448 1.664 2.704 3.592C3.976 6.4 1.896 6.384 1.672 6.384A6.716 6.716 0 0 1 4.728 2zm-3.392 6A6.665 6.665 0 0 1 1.336 8c0-.056 0-.112.008-.168.216.008 2.8.056 5.08-.696.144.28.28.56.408.84-.064.016-.128.04-.192.064-2.352.76-3.6 2.848-3.704 3.04a6.695 6.695 0 0 1-1.6-3.08zm3.272 4.656a6.697 6.697 0 0 1-1.608-2.272c.08-.128 1.104-1.888 3.224-2.76.008-.008.016-.008.024-.008a24.248 24.248 0 0 1 1.184 4.2 6.662 6.662 0 0 1-2.824.84zm3.464.488a25.64 25.64 0 0 0-1.12-3.952c1.792-.288 3.368.184 3.568.248a6.713 6.713 0 0 1-2.448 3.704zm.832-5.408c-.16-.048-1.888-.592-3.8-.304-.096-.264-.184-.536-.272-.8-.072-.2-.144-.4-.208-.6 2.336-.952 3.304-2.312 3.376-2.424a6.681 6.681 0 0 1 1.976 4.056c-.176-.04-.584-.136-1.072.072z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 80,
        paddingBottom: 48,
        overflow: 'hidden',
      }}
    >
      {/* Large background logo */}
      <div
        style={{
          position: 'absolute',
          bottom: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(80px, 14vw, 200px)',
          color: 'rgba(255,255,255,0.015)',
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        DIGITAL SHINE
      </div>

      <div className="container-xl">
        {/* Top row: brand + back to top */}
        <div
          className="flex items-start justify-between"
          style={{ marginBottom: 64 }}
        >
          <div style={{ maxWidth: 380 }}>
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L18 6.5V13.5L10 18L2 13.5V6.5L10 2Z" stroke="white" strokeWidth="1.2" fill="none" />
                  <path d="M10 2V18M2 6.5L18 13.5M18 6.5L2 13.5" stroke="white" strokeWidth="0.6" opacity="0.5" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                }}
              >
                Digital Shine
              </span>
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 24,
              }}
            >
              We build digital experiences that people remember. Premium websites, powerful
              brands, and modern web applications.
            </p>

            {/* Newsletter */}
            <div
              style={{
                display: 'flex',
                gap: 8,
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '11px 16px',
                  fontSize: 13,
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'rgba(79,140,255,0.4)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              />
              <button
                className="btn-primary"
                style={{ padding: '11px 18px', borderRadius: 10, fontSize: 13, whiteSpace: 'nowrap' }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Back to top */}
          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              padding: '14px 20px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(255,255,255,0.5)',
              transition: 'all 0.3s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M4 8L8 4L12 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Top
            </span>
          </motion.button>
        </div>

        {/* Links grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 48,
            paddingBottom: 60,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 40,
          }}
        >
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                {category}
              </div>
              <div className="flex flex-col gap-3">
                {links.map(link => (
                  <button
                    key={link}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.4)',
                      padding: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#fff')}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            © 2024 Digital Shine. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            {socials.map(s => (
              <button
                key={s.name}
                title={s.name}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.color = '#fff'
                  el.style.background = 'rgba(79,140,255,0.15)'
                  el.style.borderColor = 'rgba(79,140,255,0.3)'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.color = 'rgba(255,255,255,0.4)'
                  el.style.background = 'rgba(255,255,255,0.05)'
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
