'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react'

export default function WalkerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    availability: '',
    certifications: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Walker application:', formData)
    alert('Application submitted! (Demo mode - AWS integration pending)')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Become a PawDash Walker
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Turn your love for pets into income. Set your own schedule and earn up to $30/hour.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <div className="lg:col-span-1 space-y-4">
            <BenefitCard
              icon={<DollarSign className="w-6 h-6" />}
              title="Earn $20-30/hr"
              description="Competitive pay with surge pricing during peak times"
            />
            <BenefitCard
              icon={<CheckCircle className="w-6 h-6" />}
              title="Flexible Schedule"
              description="Work when you want. Toggle availability on/off anytime"
            />
            <BenefitCard
              icon={<Shield className="w-6 h-6" />}
              title="Fully Insured"
              description="Comprehensive insurance coverage for every walk"
            />
            <BenefitCard
              icon={<MapPin className="w-6 h-6" />}
              title="Local Jobs"
              description="Get matched with pets in your neighborhood"
            />
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <GlassCard>
              <h2 className="text-2xl font-bold text-white mb-6">
                Apply Now
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="glass-input"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="glass-input"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="glass-input"
                    placeholder="123 Main St, City, State"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">
                    Pet Care Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="glass-input min-h-[100px] resize-none"
                    placeholder="Tell us about your experience with pets..."
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">
                    Availability
                  </label>
                  <textarea
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="glass-input min-h-[80px] resize-none"
                    placeholder="What hours/days are you typically available?"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">
                    Certifications (Optional)
                  </label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    className="glass-input"
                    placeholder="e.g., Pet First Aid, Dog Training Certification"
                  />
                </div>

                <div className="glass rounded-lg p-4 border border-accent-400/50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-white/80">
                      <p className="font-semibold mb-1">Next Steps:</p>
                      <ul className="list-disc list-inside space-y-1 text-white/70">
                        <li>Background check (federal + state)</li>
                        <li>Identity and photo verification</li>
                        <li>Pet handling orientation module</li>
                        <li>Sign independent contractor agreement</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="glass-button w-full py-4 text-white text-lg bg-gradient-to-r from-primary-500 to-accent-500"
                >
                  Submit Application
                </button>
              </form>
            </GlassCard>
          </div>
        </div>

        {/* Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Walker Requirements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RequirementCard
              title="Background Check"
              items={['Federal check', 'State check', 'Clean record']}
            />
            <RequirementCard
              title="Age & Identity"
              items={['18+ years old', 'Valid ID', 'Photo verification']}
            />
            <RequirementCard
              title="Equipment"
              items={['Smartphone', 'Reliable transport', 'Walking gear']}
            />
            <RequirementCard
              title="Skills"
              items={['Pet experience', 'Responsible', 'Good communication']}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BenefitCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <GlassCard className="glass-hover cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="text-primary-400 flex-shrink-0">{icon}</div>
        <div>
          <h3 className="font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
      </div>
    </GlassCard>
  )
}

function RequirementCard({ title, items }: {
  title: string
  items: string[]
}) {
  return (
    <GlassCard>
      <h3 className="font-bold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-white/70">
            <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}
