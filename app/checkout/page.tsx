'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { useAuthStore } from '@/lib/auth'
import { CreditCard, Lock, ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuthStore()

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card')
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    zip: '',
  })

  // Get checkout details from URL params
  const type = searchParams.get('type') // 'booking' or 'subscription'
  const service = searchParams.get('service')
  const plan = searchParams.get('plan')
  const amount = searchParams.get('amount')
  const timing = searchParams.get('timing')

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/checkout?${searchParams.toString()}`)
    }
  }, [isAuthenticated, router, searchParams])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <GlassCard>
          <p className="text-white">Redirecting to login...</p>
        </GlassCard>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Integrate with Stripe API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.userId,
          type,
          service,
          plan,
          amount,
          paymentMethod: formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to success page
        router.push(`/checkout/success?session=${data.sessionId}`)
      } else {
        alert('Payment failed: ' + data.error)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Payment processing failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Format card number
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }
    
    // Format expiry
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)
    }

    setFormData({ ...formData, [e.target.name]: value })
  }

  const getOrderSummary = () => {
    if (type === 'booking') {
      return {
        title: `${service?.replace('min', '-Min')} Walk`,
        description: timing === 'asap' ? 'ASAP Service' : 'Scheduled Service',
        price: parseFloat(amount || '0'),
      }
    } else {
      return {
        title: `${plan} Subscription`,
        description: 'Monthly billing',
        price: parseFloat(amount || '0'),
      }
    }
  }

  const order = getOrderSummary()

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href={type === 'booking' ? '/book' : '/pricing'}>
          <button className="glass-button mb-6 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <GlassCard>
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-white/70 text-sm">Item</p>
                  <p className="text-white font-semibold">{order.title}</p>
                  <p className="text-white/60 text-sm">{order.description}</p>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">Subtotal</span>
                    <span className="text-white">${order.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">Service Fee</span>
                    <span className="text-white">${(order.price * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-white/20 pt-2 mt-2">
                    <span className="text-white">Total</span>
                    <span className="text-primary-400">${(order.price * 1.05).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </div>
            </GlassCard>

            {/* Trust Badges */}
            <div className="mt-6 space-y-3">
              <TrustBadge
                icon={<Lock className="w-5 h-5" />}
                text="256-bit SSL encrypted"
              />
              <TrustBadge
                icon={<ShieldCheck className="w-5 h-5" />}
                text="100% secure checkout"
              />
              <TrustBadge
                icon={<CreditCard className="w-5 h-5" />}
                text="PCI DSS compliant"
              />
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <GlassCard>
              <h2 className="text-2xl font-bold text-white mb-6">Payment Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Info */}
                <div className="glass rounded-lg p-4 mb-6">
                  <p className="text-white/70 text-sm mb-1">Paying as</p>
                  <p className="text-white font-semibold">{user?.name}</p>
                  <p className="text-white/60 text-sm">{user?.email}</p>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-white mb-3">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-primary-400 bg-primary-500/20'
                          : 'border-white/20 glass'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Credit Card</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'bank'
                          ? 'border-primary-400 bg-primary-500/20'
                          : 'border-white/20 glass'
                      } opacity-50 cursor-not-allowed`}
                      disabled
                    >
                      <div className="w-6 h-6 mx-auto mb-2 text-white">🏦</div>
                      <p className="text-white text-sm">Bank Account</p>
                      <p className="text-white/50 text-xs mt-1">Coming Soon</p>
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div>
                  <label className="block text-white mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength={19}
                    required
                    className="glass-input"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      maxLength={5}
                      required
                      className="glass-input"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      maxLength={4}
                      required
                      className="glass-input"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Name on Card</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="glass-input"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Billing ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    maxLength={5}
                    required
                    className="glass-input"
                    placeholder="12345"
                  />
                </div>

                {/* Terms */}
                <div className="glass rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-sm text-white/80">
                      I agree to the{' '}
                      <Link href="#" className="text-primary-400 hover:text-primary-300">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="text-primary-400 hover:text-primary-300">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="glass-button w-full py-4 text-white text-lg bg-gradient-to-r from-primary-500 to-accent-500 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>Pay ${(order.price * 1.05).toFixed(2)}</>
                  )}
                </button>

                <p className="text-center text-xs text-white/50">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </form>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="glass rounded-lg p-3 flex items-center gap-3">
      <div className="text-green-400">{icon}</div>
      <span className="text-sm text-white/80">{text}</span>
    </div>
  )
}
