'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  const Component = hover ? motion.div : 'div'
  const hoverProps = hover ? {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <Component
      className={`glass-card ${className}`}
      {...hoverProps}
    >
      {children}
    </Component>
  )
}
