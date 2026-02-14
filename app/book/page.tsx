'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { Dog, Clock, MapPin, Calendar, CreditCard } from 'lucide-react'

type ServiceType = '15min' | '30min' | '60min' | 'dropin' | 'sitting'
type TimingType = 'asap' | 'scheduled'

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [serviceType, setServiceType] = useState<ServiceType>('30min')
  const [timing, setTiming] = useState<TimingType>('asap')
  const [scheduledTime, setScheduledTime] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')

  const services = [
    { id: '15min', name: '15-Min Walk', price: 15, icon: '🏃' },
    { id: '30min', name: '30-Min Walk', price: 25, icon: '🚶' },
    { id: '60min', name: '60-Min Walk', price: 40, icon: '🎯' },
    { id: 'dropin', name: 'Drop-In Visit', price: 20, icon: '🏠' },
    { id: 'sitting', name: '2-4 Hour Sitting', price: 60, icon: '⏰' },
  ]

  const handleSubmit = async () => {
    // This would integrate with AWS API
    console.log('Booking:', { serviceType, timing, scheduledTime, specialInstructions })
    alert('Booking submitted! (Demo mode - AWS integration pending)')
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Book a Walk
          </h1>
          <p className="text-center text-white/70 mb-12">
            Get your furry friend the care they need, right when you need it.
          </p>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              <StepIndicator number={1} active={step >= 1} label="Service" />
              <div className="w-12 h-0.5 bg-white/20" />
              <StepIndicator number={2} active={step >= 2} label="Timing" />
              <div className="w-12 h-0.5 bg-white/20" />
              <StepIndicator number={3} active={step >= 3} label="Details" />
            </div>
          </div>

          <GlassCard>
            {/* Step 1: Select Service */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Choose Your Service
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      onClick={() => setServiceType(service.id as ServiceType)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        serviceType === service.id
                          ? 'border-primary-400 bg-primary-500/20'
                          : 'border-white/20 glass'
                      }`}
                    >
                      <div className="text-4xl mb-2">{service.icon}</div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {service.name}
                      </h3>
                      <p className="text-2xl font-bold text-primary-400">
                        ${service.price}
                      </p>
                    </motion.button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="glass-button w-full py-4 text-white text-lg"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 2: Select Timing */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  When do you need a walker?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => setTiming('asap')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      timing === 'asap'
                        ? 'border-primary-400 bg-primary-500/20'
                        : 'border-white/20 glass'
                    }`}
                  >
                    <Clock className="w-12 h-12 mx-auto mb-3 text-primary-400" />
                    <h3 className="text-lg font-bold text-white">ASAP</h3>
                    <p className="text-sm text-white/70">
                      Get matched with a walker now
                    </p>
                  </motion.button>
                  <motion.button
                    onClick={() => setTiming('scheduled')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      timing === 'scheduled'
                        ? 'border-primary-400 bg-primary-500/20'
                        : 'border-white/20 glass'
                    }`}
                  >
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-primary-400" />
                    <h3 className="text-lg font-bold text-white">Scheduled</h3>
                    <p className="text-sm text-white/70">
                      Pick a specific date & time
                    </p>
                  </motion.button>
                </div>

                {timing === 'scheduled' && (
                  <div>
                    <label className="block text-white mb-2">
                      Select Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="glass-button w-full py-4 text-white"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="glass-button w-full py-4 text-white text-lg"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Details & Confirm */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Booking Summary
                </h2>

                <div className="space-y-4">
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Dog className="w-5 h-5 text-primary-400" />
                      <span className="text-white/70">Service</span>
                    </div>
                    <p className="text-white font-semibold">
                      {services.find(s => s.id === serviceType)?.name}
                    </p>
                  </div>

                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-primary-400" />
                      <span className="text-white/70">When</span>
                    </div>
                    <p className="text-white font-semibold">
                      {timing === 'asap' ? 'As soon as possible' : scheduledTime}
                    </p>
                  </div>

                  <div>
                    <label className="block text-white mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special notes for the walker..."
                      className="glass-input min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="glass rounded-lg p-4 border-2 border-primary-400/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Total</span>
                      <span className="text-2xl font-bold text-primary-400">
                        ${services.find(s => s.id === serviceType)?.price}
                      </span>
                    </div>
                    <p className="text-xs text-white/50">
                      Payment will be processed after service completion
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="glass-button w-full py-4 text-white"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="glass-button w-full py-4 text-white text-lg bg-gradient-to-r from-primary-500 to-accent-500"
                  >
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            )}
          </GlassCard>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <InfoCard
              icon={<MapPin className="w-6 h-6" />}
              title="Real-Time Tracking"
              text="Track your walker's location live on the map"
            />
            <InfoCard
              icon={<Dog className="w-6 h-6" />}
              title="Photo Updates"
              text="Get a detailed report card with photos"
            />
            <InfoCard
              icon={<CreditCard className="w-6 h-6" />}
              title="Secure Payment"
              text="Pay only after service completion"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function StepIndicator({ number, active, label }: {
  number: number
  active: boolean
  label: string
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
          active
            ? 'bg-primary-500 text-white'
            : 'glass text-white/50'
        }`}
      >
        {number}
      </div>
      <span className="text-xs text-white/70 mt-1">{label}</span>
    </div>
  )
}

function InfoCard({ icon, title, text }: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <GlassCard className="text-center">
      <div className="text-primary-400 flex justify-center mb-2">{icon}</div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-white/70">{text}</p>
    </GlassCard>
  )
}
