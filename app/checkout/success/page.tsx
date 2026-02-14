'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { CheckCircle, Home, Calendar } from 'lucide-react'
import Link from 'next/link'

function CheckoutSuccessPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session')
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <GlassCard className="text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Thank you for your purchase. We're processing your order now.
            </p>

            <div className="glass rounded-lg p-6 mb-8">
              <p className="text-white/70 text-sm mb-2">Order Confirmation</p>
              <p className="text-white font-mono text-lg">
                #{sessionId || 'DEMO-' + Date.now()}
              </p>
              <p className="text-white/60 text-sm mt-2">
                A confirmation email has been sent to your inbox.
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4 text-left">
                <h3 className="font-semibold text-white mb-2">What's Next?</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Check your email for booking details and walker match notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Track your walk in real-time once it starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Receive a photo report card after service completion</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/" className="flex-1">
                <button className="glass-button w-full py-3 flex items-center justify-center gap-2">
                  <Home className="w-5 h-5" />
                  Back to Home
                </button>
              </Link>
              <Link href="/book" className="flex-1">
                <button className="glass-button w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500">
                  <Calendar className="w-5 h-5" />
                  Book Another Walk
                </button>
              </Link>
            </div>

            <p className="text-white/50 text-sm mt-6">
              Redirecting to home in {countdown} seconds...
            </p>
          </motion.div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
          <GlassCard>
            <p className="text-white">Loading...</p>
          </GlassCard>
        </div>
      }
    >
      <CheckoutSuccessPageContent />
    </Suspense>
  )
}
