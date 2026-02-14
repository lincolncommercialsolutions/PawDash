'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { 
  UserPlus, 
  Calendar, 
  Bell, 
  MapPin, 
  Camera 
} from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            How PawDash Works
          </h1>
          <p className="text-xl text-white/70">
            On-demand pet care in four simple steps
          </p>
        </motion.div>

        {/* For Pet Owners */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            For Pet Owners
          </h2>
          
          <div className="space-y-12">
            <StepCard
              number={1}
              icon={<UserPlus className="w-8 h-8" />}
              title="Create Your Profile"
              description="Sign up and add your pet's details - breed, size, temperament, special needs, and access instructions. This one-time setup ensures walkers know exactly how to care for your pet."
              details={[
                'Pet information (breed, size, age)',
                'Behavioral notes (reactivity, anxiety)',
                'Access instructions (smart lock/lockbox)',
                'Emergency contacts and vet info',
                'Camera disclosure (if applicable)',
              ]}
            />

            <StepCard
              number={2}
              icon={<Calendar className="w-8 h-8" />}
              title="Request a Walk"
              description="Choose your service type and timing. Need a walker right now? Select ASAP. Planning ahead? Schedule for a specific date and time."
              details={[
                'Select service: 15/30/60 min walk, drop-in, or sitting',
                'Choose ASAP or scheduled timing',
                'Add special instructions',
                'Confirm your location',
                'Review pricing',
              ]}
            />

            <StepCard
              number={3}
              icon={<Bell className="w-8 h-8" />}
              title="Get Matched Instantly"
              description="Our AI-powered dispatch system immediately matches you with available, qualified walkers nearby. First walker to accept gets the job."
              details={[
                'Broadcast to nearby walkers (2-mile radius)',
                'Filter by rating (4+ stars)',
                'Behavioral matching (e.g., anxiety-certified)',
                'Typically matched within 2-5 minutes',
                'Receive walker profile and ETA',
              ]}
            />

            <StepCard
              number={4}
              icon={<MapPin className="w-8 h-8" />}
              title="Track & Receive Report"
              description="Watch your walker's live location on the map. After the walk, get a detailed photo report card with bathroom logs and behavior notes."
              details={[
                'Real-time GPS tracking',
                'Route map and distance',
                'Start/end notifications',
                'Photo report card',
                'Bathroom log (pee/poop)',
                'Behavioral notes and observations',
              ]}
            />
          </div>
        </section>

        {/* For Walkers */}
        <section>
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            For Walkers
          </h2>
          
          <div className="space-y-12">
            <StepCard
              number={1}
              icon={<UserPlus className="w-8 h-8" />}
              title="Apply & Get Verified"
              description="Submit your application with pet experience. We'll conduct a background check, verify your identity, and provide orientation training."
              details={[
                'Submit online application',
                'Background check (federal + state)',
                'Photo and ID verification',
                'Pet handling orientation module',
                'Sign independent contractor agreement',
              ]}
              variant="walker"
            />

            <StepCard
              number={2}
              icon={<Bell className="w-8 h-8" />}
              title="Toggle Availability"
              description="Control when you work. Turn 'Available' on when you're ready for jobs. You'll only receive requests when you're active."
              details={[
                'Toggle available/unavailable',
                'Update your location',
                'Set service radius',
                'Receive job notifications instantly',
              ]}
              variant="walker"
            />

            <StepCard
              number={3}
              icon={<MapPin className="w-8 h-8" />}
              title="Accept Jobs"
              description="View job details and accept walks that work for you. First to accept wins. Navigate to the pet using built-in maps."
              details={[
                'See pet details and location',
                'View service type and pay',
                'Accept or decline',
                'GPS navigation to location',
                'Access instructions provided',
              ]}
              variant="walker"
            />

            <StepCard
              number={4}
              icon={<Camera className="w-8 h-8" />}
              title="Complete Walk & Report"
              description="Start the timer when you begin. Complete the walk, take photos, log bathroom breaks, and submit your report. Get paid immediately."
              details={[
                'Start/stop timer (activates insurance)',
                'Take before/after photos',
                'Log bathroom breaks',
                'Add behavior notes',
                'Submit report',
                'Instant payment to your account',
              ]}
              variant="walker"
            />
          </div>
        </section>

        {/* Safety Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Safety & Trust
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <SafetyCard
              title="Background Checks"
              description="All walkers undergo federal and state background checks before approval."
            />
            <SafetyCard
              title="Full Insurance"
              description="Every walk covered by comprehensive liability and pet care insurance."
            />
            <SafetyCard
              title="GPS Tracking"
              description="Real-time location tracking and route logging for transparency."
            />
            <SafetyCard
              title="Smart Lock Integration"
              description="Secure, keyless access with temporary codes and audit logs."
            />
            <SafetyCard
              title="Photo Verification"
              description="Mandatory check-in photos ensure walker arrived and departed safely."
            />
            <SafetyCard
              title="24/7 Support"
              description="Emergency panic button and dedicated support team always available."
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function StepCard({ number, icon, title, description, details, variant = 'owner' }: {
  number: number
  icon: React.ReactNode
  title: string
  description: string
  details: string[]
  variant?: 'owner' | 'walker'
}) {
  const color = variant === 'owner' ? 'primary' : 'accent'
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6"
    >
      <div className={`flex-shrink-0 w-16 h-16 rounded-full glass flex items-center justify-center text-2xl font-bold text-${color}-400`}>
        {number}
      </div>
      <div className="flex-1">
        <GlassCard>
          <div className={`flex items-center gap-3 mb-3 text-${color}-400`}>
            {icon}
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-white/80 mb-4">{description}</p>
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                <span className={`text-${color}-400 mt-1`}>•</span>
                {detail}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </motion.div>
  )
}

function SafetyCard({ title, description }: {
  title: string
  description: string
}) {
  return (
    <GlassCard className="glass-hover cursor-pointer text-center">
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </GlassCard>
  )
}
