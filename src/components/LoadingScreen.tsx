import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame = 0
    let finishTimer: ReturnType<typeof setTimeout> | undefined
    const startedAt = performance.now()
    const duration = 2800

    const tick = (now: number) => {
      const elapsed = now - startedAt
      const nextProgress = Math.min(100, (elapsed / duration) * 100)
      setProgress(nextProgress)

      if (nextProgress < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        finishTimer = setTimeout(() => {
          setDone(true)
          finishTimer = setTimeout(onComplete, 850)
        }, 250)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      if (finishTimer) clearTimeout(finishTimer)
    }
  }, [onComplete])

  const progressValue = Math.round(Math.min(progress, 100))
  const status =
    progressValue < 28
      ? 'Calibrating the canvas'
      : progressValue < 58
        ? 'Tuning the details'
        : progressValue < 86
          ? 'Polishing the experience'
          : 'Ready to make an impression'

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="loading-noise" />
          <div className="loading-grid" />
          <div className="loading-glow loading-glow-left" />
          <div className="loading-glow loading-glow-right" />

          <div className="loading-header">
            <div className="loading-brand">
              <span className="loading-brand-mark">DS</span>
              <span>Digital Shine</span>
            </div>
            <span className="loading-header-index">EST. 2024&nbsp;&nbsp; / &nbsp;&nbsp;01</span>
          </div>

          <motion.main
            className="loading-content"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="loading-orbital-system" aria-hidden="true">
              <motion.div
                className="loading-orbit loading-orbit-wide"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="loading-orbit loading-orbit-tight"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="loading-orbit loading-orbit-tilted"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />
              <span className="loading-orbit-dot loading-orbit-dot-one" />
              <span className="loading-orbit-dot loading-orbit-dot-two" />
              <span className="loading-orbit-dot loading-orbit-dot-three" />

              <motion.div
                className="loading-prism"
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="loading-prism-inner">
                  <svg viewBox="0 0 80 80" fill="none">
                    <path d="M40 8L68 24V56L40 72L12 56V24L40 8Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M40 8V40M12 24L40 40L68 24M40 40V72" stroke="currentColor" strokeWidth="1" opacity=".6" />
                    <path d="M23 30L40 40L57 30" stroke="white" strokeWidth="1.4" opacity=".85" />
                  </svg>
                </div>
              </motion.div>
            </div>

            <div className="loading-wordmark">
              <span className="loading-kicker">A DIGITAL STUDIO</span>
              <h1>
                <span>Digital</span>
                <em>Shine</em>
              </h1>
              <p>Thoughtful digital experiences, coming into focus.</p>
            </div>

            <div className="loading-progress-wrap">
              <div className="loading-progress-meta">
                <span className="loading-status">
                  <i />
                  {status}
                </span>
                <span className="loading-percent">{String(progressValue).padStart(2, '0')}%</span>
              </div>
              <div className="loading-progress-track">
                <motion.div
                  className="loading-progress-fill"
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 0.18, ease: 'linear' }}
                >
                  <span className="loading-progress-spark" />
                </motion.div>
              </div>
            </div>
          </motion.main>

          <div className="loading-footer">
            <span>STRATEGY&nbsp;&nbsp;·&nbsp;&nbsp;DESIGN&nbsp;&nbsp;·&nbsp;&nbsp;TECHNOLOGY</span>
            <span className="loading-footer-pulse"><i /> SYSTEM ONLINE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
