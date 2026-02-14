'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { Mail, Lock, User, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, signup, isAuthenticated } = useAuthStore()
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'owner' as 'owner' | 'walker',
  })

  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect)
    }
  }, [isAuthenticated, router, redirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isSignUp) {
        await signup(formData.name, formData.email, formData.password, formData.role)
      } else {
        await login(formData.email, formData.password)
      }
      router.push(redirect)
    } catch (error) {
      alert('Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-white/70">
            {isSignUp ? 'Join PawDash today' : 'Sign in to your account'}
          </p>
        </div>

        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <>
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
                    required={isSignUp}
                    className="glass-input"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'owner' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.role === 'owner'
                          ? 'border-primary-400 bg-primary-500/20'
                          : 'border-white/20 glass'
                      }`}
                    >
                      <p className="text-white font-semibold">Pet Owner</p>
                      <p className="text-white/60 text-xs mt-1">Book walks</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'walker' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.role === 'walker'
                          ? 'border-primary-400 bg-primary-500/20'
                          : 'border-white/20 glass'
                      }`}
                    >
                      <p className="text-white font-semibold">Walker</p>
                      <p className="text-white/60 text-xs mt-1">Earn money</p>
                    </button>
                  </div>
                </div>
              </>
            )}

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
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-white mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="glass-input"
                placeholder="••••••••"
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <a href="#" className="text-primary-400 hover:text-primary-300">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="glass-button w-full py-3 text-white text-lg bg-gradient-to-r from-primary-500 to-accent-500 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                isSignUp ? 'Sign Up' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-center text-sm text-white/50 mb-4">Or continue with</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="glass-button py-2 text-sm">
                Google
              </button>
              <button className="glass-button py-2 text-sm">
                Apple
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-white/50">
              By signing up, you agree to our{' '}
              <Link href="#" className="text-primary-400">Terms</Link> and{' '}
              <Link href="#" className="text-primary-400">Privacy Policy</Link>
            </p>
          </div>
        </GlassCard>

        <div className="mt-6 text-center">
          <div className="glass rounded-lg p-4 text-sm text-white/70">
            <p className="font-semibold text-white mb-2">🚧 Demo Mode</p>
            <p>
              Authentication is not yet implemented. This would connect to AWS Cognito, Auth0, or similar service in production.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
