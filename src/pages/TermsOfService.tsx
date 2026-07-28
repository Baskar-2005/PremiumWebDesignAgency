import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TermsOfService({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onBack() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onBack])

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using the Digital Shine website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our site or services.\n\nThese terms apply to all visitors, clients, and others who access or use our services.`,
    },
    {
      title: 'Our Services',
      content: `Digital Shine provides web design, web development, UI/UX design, e-commerce development, SEO strategy, and brand identity services. The specific scope, timeline, and deliverables for each project are defined in a separate Statement of Work (SOW) or project proposal agreed upon in writing.\n\nWe reserve the right to refuse service to anyone for any reason at any time.`,
    },
    {
      title: 'Payment Terms',
      content: `All projects require a deposit before work begins — typically 50% of the total project fee, unless otherwise agreed in writing. The remaining balance is due upon project completion before final files or access credentials are handed over.\n\nInvoices are due within 14 days of issue unless otherwise specified. Late payments may incur a 1.5% monthly interest charge. We reserve the right to pause work on any project with an outstanding invoice.`,
    },
    {
      title: 'Intellectual Property',
      content: `Upon receipt of full payment, the client receives full ownership of all custom design and code created specifically for their project, including source files.\n\nDigital Shine retains the right to display the work in our portfolio and marketing materials unless a written non-disclosure agreement is in place. We also retain ownership of any proprietary tools, frameworks, libraries, or methodologies used in delivering the project.`,
    },
    {
      title: 'Client Responsibilities',
      content: `Clients are responsible for:\n• Providing accurate, complete, and timely content, assets, and feedback\n• Ensuring they have the legal right to use any content, images, or materials supplied to us\n• Designating a primary point of contact for approvals\n• Reviewing and approving deliverables within the agreed timelines\n\nDelays caused by the client may result in revised project timelines and, in some cases, additional fees.`,
    },
    {
      title: 'Revisions & Scope Changes',
      content: `Each project includes a defined number of revision rounds as specified in the proposal. Additional revisions or scope changes requested beyond what's included will be scoped and billed separately.\n\nAll scope changes must be agreed upon in writing before work commences. Verbal approvals are not binding.`,
    },
    {
      title: 'Limitation of Liability',
      content: `Digital Shine's liability to any client shall not exceed the total fees paid for the specific project in question. We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.\n\nWe make no warranty that our websites or applications will be error-free, uninterrupted, or free from security vulnerabilities after handover.`,
    },
    {
      title: 'Termination',
      content: `Either party may terminate a project with 14 days' written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date, including any non-refundable deposits.\n\nIn cases of material breach by either party, the non-breaching party may terminate immediately upon written notice.`,
    },
    {
      title: 'Governing Law',
      content: `These Terms of Service are governed by and construed in accordance with applicable law. Any disputes arising from these terms or our services shall be resolved through good-faith negotiation first, followed by binding arbitration if necessary.`,
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
          Digital Shine · Terms of Service
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
              background: 'rgba(123,92,255,0.1)',
              border: '1px solid rgba(123,92,255,0.2)',
              borderRadius: 8,
              padding: '6px 14px',
              marginBottom: 32,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7b5cff' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#7b5cff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
            Terms of Service
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
            These terms govern your use of the Digital Shine website and our professional services. Please read them carefully before engaging with us.
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
                      background: 'rgba(123,92,255,0.12)',
                      border: '1px solid rgba(123,92,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#7b5cff',
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

          <div
            style={{
              marginTop: 80,
              padding: '40px',
              background: 'rgba(123,92,255,0.05)',
              border: '1px solid rgba(123,92,255,0.15)',
              borderRadius: 20,
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
              Questions about these terms?
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
              We'll explain anything in plain language.
            </p>
            <a
              href="mailto:legal@digitalshine.agency"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(123,92,255,0.15)',
                border: '1px solid rgba(123,92,255,0.3)',
                borderRadius: 10,
                padding: '10px 20px',
                color: '#7b5cff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              legal@digitalshine.agency
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
