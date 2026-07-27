import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, NovaPay',
    avatar: 'SC',
    color: '#4f8cff',
    stars: 5,
    text: 'Digital Shine completely transformed our online presence. Our conversion rate jumped 340% in the first month. The attention to detail is unlike anything I\'ve seen.',
  },
  {
    name: 'Marcus Webb',
    role: 'Founder, Luminary Studio',
    avatar: 'MW',
    color: '#7b5cff',
    stars: 5,
    text: 'They didn\'t just build a website — they built a brand experience. Visitors constantly tell us our site "feels like Apple". That\'s exactly what we wanted.',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Product, Synapse AI',
    avatar: 'PN',
    color: '#00d084',
    stars: 5,
    text: 'The dashboard they built for us handles complex real-time data beautifully. Performance is insane — 98 Lighthouse score on a data-heavy app. Unbelievable.',
  },
  {
    name: 'James Okafor',
    role: 'Director, Orbit Commerce',
    avatar: 'JO',
    color: '#ff6b6b',
    stars: 5,
    text: 'Launched our new store with Digital Shine and revenue doubled within 60 days. Their e-commerce expertise is world-class. I recommend them to every founder I know.',
  },
  {
    name: 'Elena Vasquez',
    role: 'CMO, BrightPath Agency',
    avatar: 'EV',
    color: '#fbbf24',
    stars: 5,
    text: 'Professional, fast, creative, and they actually listen. They delivered 3 days early with zero revisions needed. This is how every agency should work.',
  },
  {
    name: 'Tom Hirsch',
    role: 'CTO, Stackflow',
    avatar: 'TH',
    color: '#4f8cff',
    stars: 5,
    text: 'As a developer, I\'m very picky about code quality. Their output is clean, well-structured, and genuinely impressive. The team clearly cares about their craft.',
  },
]

// Duplicate for infinite scroll
const allTestimonials = [...testimonials, ...testimonials]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: '120px 0', overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(79,140,255,0.03) 50%, transparent)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-xl" style={{ marginBottom: 60 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>
            Client Love
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(36px, 3.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#fff',
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            What our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f8cff, #7b5cff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              clients
            </span>{' '}
            say.
          </h2>
        </motion.div>
      </div>

      {/* Infinite scroll track */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 200,
            background: 'linear-gradient(to right, #050505, transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 200,
            background: 'linear-gradient(to left, #050505, transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        <div style={{ overflow: 'hidden', padding: '8px 0' }}>
          <div className="testimonial-track" style={{ width: 'max-content' }}>
            {allTestimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  width: 360,
                  flexShrink: 0,
                  background: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20,
                  padding: '28px 28px',
                  transition: 'border-color 0.3s, transform 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = `${t.color}30`
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Stars */}
                <div style={{ marginBottom: 16, display: 'flex', gap: 2 }}>
                  {[...Array(t.stars)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#fbbf24">
                      <path d="M7 0.5L8.56 5.02H13.33L9.49 7.82L10.93 12.28L7 9.5L3.07 12.28L4.51 7.82L0.67 5.02H5.44L7 0.5Z" />
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: 24,
                  }}
                >
                  "{t.text}"
                </p>

                <div className="flex items-center gap-12">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${t.color}20`,
                      border: `1px solid ${t.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 700,
                      fontSize: 13,
                      color: t.color,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#fff',
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.35)',
                        marginTop: 2,
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
