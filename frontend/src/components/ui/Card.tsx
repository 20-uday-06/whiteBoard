'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'gradient' | 'glass' | 'elevated'
  hover?: boolean
  animate?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hover = true,
  animate = true,
  className,
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300'
  
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg',
    glass: 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl',
    elevated: 'bg-white shadow-xl border border-gray-100'
  }
  
  const hoverEffects = hover ? 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]' : ''
  
  const MotionDiv = animate ? motion.div : 'div'
  
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {}

  return (
    <MotionDiv
      className={cn(
        baseClasses,
        variants[variant],
        hoverEffects,
        className
      )}
      {...(animate ? motionProps : {})}
      {...props}
    >
      {children}
    </MotionDiv>
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('p-6 pb-4', className)} {...props}>
    {children}
  </div>
)

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('px-6 pb-6', className)} {...props}>
    {children}
  </div>
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={cn('text-xl font-semibold text-gray-900 mb-2', className)} {...props}>
    {children}
  </h3>
)

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p className={cn('text-gray-600 text-sm', className)} {...props}>
    {children}
  </p>
)
