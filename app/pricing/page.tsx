'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { Check } from 'lucide-react'

export default function PricingPage() {
  const router = useRouter()
  
  const handleSubscribe = (plan: string, price: number) => {
    const params = new URLSearchParams({
      type: 'subscription',
      plan: plan,
      amount: price.toString(),
    })
    router.push(`/checkout?${params.toString()}`)
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-white/70">
            Pay-per-walk or subscribe for better rates
          </p>
        </motion.div>

        {/* Pay-Per-Walk */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Pay-Per-Walk
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            <ServiceCard
              name="15-Min Walk"
              price={15}
              description="Quick potty break"
            />
            <ServiceCard
              name="30-Min Walk"
              price={25}
              description="Standard walk"
              popular
            />
            <ServiceCard
              name="60-Min Walk"
              price={40}
              description="Extended exercise"
            />
            <ServiceCard
              name="Drop-In Visit"
              price={20}
              description="15-min check-in"
            />
            <ServiceCard
              name="2-4 Hour Sitting"
              price={60}
              description="Extended care"
            />
          </div>
        </div>

        {/* Subscriptions */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Monthly Subscriptions
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <SubscriptionCard
            title="Owner Premium"
            price={19}
            features={[
              'Priority dispatch',
              '15% off all walks',
              'Faster walker matching',
              'Access to top-rated walkers',
              'Free walk report analytics',
              '24/7 priority support',
            ]}
            onSubscribe={handleSubscribe}
          />
          <SubscriptionCard
            title="Walker Premium"
            price={15}
            features={[
              'Access to premium jobs',
              'Higher earning potential',
              'Priority job notifications',
              'Advanced analytics dashboard',
              'Training resources',
              'Lower platform fees',
            ]}
            onSubscribe={handleSubscribe}
          />
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <GlassCard>
            <h3 className="text-2xl font-bold text-white mb-4">
              Additional Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-white/80">
              <div>
                <h4 className="font-semibold text-white mb-2">Surge Pricing</h4>
                <p className="text-sm">
                  During peak times (rain, holidays, evenings), prices may increase by 1.5-2x to ensure walker availability.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Cancellation</h4>
                <p className="text-sm">
                  Free cancellation up to 2 hours before scheduled time. ASAP bookings: cancel within 5 minutes for free.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Payment</h4>
                <p className="text-sm">
                  All payments processed securely through Stripe. Card charged after walk completion.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Insurance</h4>
                <p className="text-sm">
                  Every walk fully insured. Up to $1M coverage for property damage and pet care.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

function ServiceCard({ name, price, description, popular }: {
  name: string
  price: number
  description: string
  popular?: boolean
}) {
  return (
    <GlassCard className={`text-center relative ${popular ? 'border-2 border-primary-400' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
            Popular
          </span>
        </div>
      )}
      <h3 className="font-bold text-white mb-1">{name}</h3>
      <p className="text-3xl font-bold text-primary-400 mb-2">
        ${price}
      </p>
      <p className="text-sm text-white/70">{description}</p>
    </GlassCard>
  )
}

function SubscriptionCard({ title, price, features, onSubscribe }: {
  title: string
  price: number
  features: string[]
  onSubscribe: (plan: string, price: number) => void
}) {
  return (
    <GlassCard className="glass-hover">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-primary-400">${price}</span>
        <span className="text-white/70">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
            <span className="text-white/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSubscribe(title, price)}
        className="glass-button w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500"
      >
        Get Started
      </button>
    </GlassCard>
  )
}
