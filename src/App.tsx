import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Numbers from './components/Numbers'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CaseStudy from './components/CaseStudy'
import { getProjectBySlug } from './data/projectsData'

function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }
    let raf: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top = `${ring.current.y}px`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <motion.div id="scroll-progress" style={{ scaleX, transformOrigin: 'left' }} />
}

const divider = (
  <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 50%, transparent)', margin: '0 48px' }} />
)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
  }, [])

  const activeProject = activeSlug ? getProjectBySlug(activeSlug) : null

  return (
    <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {!isMobile && <CursorFollower />}
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {activeProject ? (
          <CaseStudy
            key={activeSlug}
            project={activeProject}
            onBack={() => {
              setActiveSlug(null)
              setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100)
            }}
          />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />

            <main>
              <Hero />
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)', margin: '0 48px' }} />
              <About />
              {divider}
              <Services />
              <WhyUs />
              {divider}
              <TechStack />
              {divider}
              <Projects onViewProject={(slug) => { setActiveSlug(slug); window.scrollTo(0, 0) }} />
              {divider}
              <Process />
              {divider}
              <Testimonials />
              <Numbers />
              {divider}
              <FAQ />
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)', margin: '0 48px' }} />
              <Contact />
            </main>

            <Footer />

            <div className="md:hidden" style={{ position: 'fixed', bottom: 20, left: 20, right: 20, zIndex: 500 }}>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', borderRadius: 16, fontSize: 16, justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,140,255,0.2)' }}
              >
                Start Your Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
