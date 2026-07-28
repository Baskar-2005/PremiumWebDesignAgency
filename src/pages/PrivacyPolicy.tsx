import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onBack() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onBack])

  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you fill out our contact form, request a project quote, or subscribe to our newsletter. This includes: name, email address, company name, phone number, and project details.\n\nWe also automatically collect certain information when you visit our website, including IP address, browser type, operating system, referring URLs, and pages viewed. This is collected via standard web analytics tools.`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:\n• Respond to your inquiries and project requests\n• Send project proposals, updates, and invoices\n• Deliver the newsletter you opted into\n• Improve our website and services\n• Comply with legal obligations\n\nWe do not sell, rent, or trade your personal information to third parties. Ever.`,
    },
    {
      title: 'Cookies',
      content: `Our website uses cookies to enhance your browsing experience. These include essential cookies (required for the site to function), analytics cookies (to understand how visitors use our site), and preference cookies (to remember your settings).\n\nYou can control cookies through your browser settings. Disabling cookies may affect some features of the site.`,
    },
    {
      title: 'Data Storage & Security',
      content: `Your data is stored on secure servers with industry-standard encryption. We implement technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.\n\nWe retain your data only as long as necessary to fulfil the purposes outlined in this policy, or as required by law.`,
    },
    {
      title: 'Third-Party Services',
      content: `We may share your information with trusted third-party service providers who assist us in operating our business (e.g., email services, payment processors, analytics platforms). These providers are contractually obligated to protect your data and may not use it for any other purpose.\n\nLinks to third-party websites are provided for convenience. We are not responsible for their privacy practices.`,
    },
    {
      title: 'Your Rights',
      content: `You have the right to:\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Opt out of marketing communications at any time\n• Lodge a complaint with a supervisory authority\n\nTo exercise any of these rights, email us at privacy@digitalshine.agency`,
    },
    {
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
    },
  ]

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
          Digital Shine · Privacy Policy
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 48px 120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(79,140,255,0.1)',
              border: '1px solid rgba(79,140,255,0.2)',
              borderRadius: 8,
              padding: '6px 14px',
              marginBottom: 32,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f8cff' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#4f8cff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Legal
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#fff',
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.35)', marginBottom: 64 }}>
            Last updated: July 2026
          </p>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 64,
              paddingBottom: 48,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            At Digital Shine, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our website or engage our services.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {sections.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
              >
                <h2
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'rgba(79,140,255,0.12)',
                      border: '1px solid rgba(79,140,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#4f8cff',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  {s.title}
                </h2>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.5)',
                    whiteSpace: 'pre-line',
                    paddingLeft: 40,
                  }}
                >
                  {s.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <div
            style={{
              marginTop: 80,
              padding: '40px',
              background: 'rgba(79,140,255,0.05)',
              border: '1px solid rgba(79,140,255,0.15)',
              borderRadius: 20,
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
              Questions about your data?
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
              We're happy to clarify anything in this policy.
            </p>
            <a
              href="mailto:privacy@digitalshine.agency"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(79,140,255,0.15)',
                border: '1px solid rgba(79,140,255,0.3)',
                borderRadius: 10,
                padding: '10px 20px',
                color: '#4f8cff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              privacy@digitalshine.agency
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
