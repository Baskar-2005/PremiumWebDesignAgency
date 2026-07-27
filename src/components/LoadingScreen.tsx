import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 700)
          }, 200)
          return 100
        }
        return p + Math.random() * 8 + 2
      })
    }, 60)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#050505' }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient blobs */}
          <div
            className="blob"
            style={{
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(79,140,255,0.12) 0%, transparent 70%)',
              top: '20%',
              left: '30%',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-10"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4f8cff, #7b5cff)' }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L20 7V15L11 20L2 15V7L11 2Z" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M11 2V20M2 7L20 15M20 7L2 15" stroke="white" strokeWidth="0.75" opacity="0.5" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                }}
              >
                Digital Shine
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col items-center gap-4" style={{ width: 280 }}>
              <div
                style={{
                  width: '100%',
                  height: 1,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #4f8cff, #7b5cff)',
                    borderRadius: 1,
                    boxShadow: '0 0 8px rgba(79,140,255,0.6)',
                  }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em',
                }}
              >
                {Math.round(Math.min(progress, 100))}%
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
