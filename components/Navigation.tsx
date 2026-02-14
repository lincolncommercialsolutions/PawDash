'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dog, Menu, X, User } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Dog className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-white">PawDash</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/book">Book a Walk</NavLink>
            <NavLink href="/walker">Become a Walker</NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Sign In
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden glass-button p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-card mx-4 mb-4"
        >
          <div className="flex flex-col space-y-4 p-4">
            <MobileNavLink href="/book" onClick={() => setIsOpen(false)}>
              Book a Walk
            </MobileNavLink>
            <MobileNavLink href="/walker" onClick={() => setIsOpen(false)}>
              Become a Walker
            </MobileNavLink>
            <MobileNavLink href="/how-it-works" onClick={() => setIsOpen(false)}>
              How It Works
            </MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => setIsOpen(false)}>
              Pricing
            </MobileNavLink>
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="glass-button w-full flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Sign In
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }: {
  href: string
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white/80 hover:text-white transition-colors duration-200 font-medium text-lg"
    >
      {children}
    </Link>
  )
}
