'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Dog, MapPin, Shield, Zap, Clock, Star } from 'lucide-react'
import GlassCard from '@/components/GlassCard'

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="gradient-text animate-gradient">PawDash</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-4">
              On-Demand Pet Care, Instantly
            </p>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              The Uber of dog walking. Last-minute walk? Unexpected delay? We've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button text-white text-lg px-8 py-4"
                >
                  Book a Walk Now
                </motion.button>
              </Link>
              <Link href="/walker">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button text-white text-lg px-8 py-4"
                >
                  Become a Walker
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            Why Choose PawDash?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Instant Dispatch"
              description="Like Uber, but for your furry friend. Request a walk and get matched in seconds."
              delay={0}
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Real-Time Tracking"
              description="See exactly where your pet is with live GPS tracking and route maps."
              delay={0.1}
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Fully Insured"
              description="Every walk is covered by comprehensive insurance and background-checked walkers."
              delay={0.2}
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Flexible Timing"
              description="Schedule ahead or book ASAP. 15-min, 30-min, or 60-min walks available."
              delay={0.3}
            />
            <FeatureCard
              icon={<Star className="w-8 h-8" />}
              title="Photo Report Cards"
              description="Get detailed reports with photos, bathroom logs, and behavioral notes after each walk."
              delay={0.4}
            />
            <FeatureCard
              icon={<Dog className="w-8 h-8" />}
              title="Behavioral Matching"
              description="AI-powered matching pairs your pet with certified walkers for anxious or high-energy dogs."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            How It Works
          </h2>

          <div className="space-y-8">
            <StepCard
              number="1"
              title="Create Your Profile"
              description="Add your pet's details, access instructions, and preferences. One-time setup."
            />
            <StepCard
              number="2"
              title="Request a Walk"
              description="Choose your service type (15/30/60 min) and timing (ASAP or scheduled)."
            />
            <StepCard
              number="3"
              title="Get Matched"
              description="Our system instantly dispatches to nearby, qualified walkers. First to accept gets the job."
            />
            <StepCard
              number="4"
              title="Track & Relax"
              description="Follow your walker in real-time. Receive photo report cards after each walk."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-12">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Give Your Pet the Best?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of happy pet owners who trust PawDash for on-demand care.
            </p>
            <Link href="/book">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button text-white text-lg px-12 py-4"
              >
                Get Started Now
              </motion.button>
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <GlassCard className="h-full glass-hover cursor-pointer">
        <div className="text-primary-400 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-white/70">{description}</p>
      </GlassCard>
    </motion.div>
  )
}

function StepCard({ number, title, description }: {
  number: string
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center text-2xl font-bold text-primary-400">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </motion.div>
  )
}
