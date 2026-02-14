// Global type definitions for PawDash

export type ServiceType = '15min' | '30min' | '60min' | 'dropin' | 'sitting'
export type TimingType = 'asap' | 'scheduled'
export type BookingStatus = 'pending' | 'dispatched' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
export type WalkerStatus = 'pending_verification' | 'active' | 'suspended' | 'inactive'

export interface User {
  userId: string
  email: string
  name: string
  phone: string
  address: string
  createdAt: string
  profileComplete: boolean
}

export interface Pet {
  petId: string
  ownerId: string
  name: string
  breed: string
  size: 'small' | 'medium' | 'large'
  age: number
  temperament: string
  reactivity?: string
  biteHistory?: boolean
  specialNeeds?: string[]
  vetContact?: {
    name: string
    phone: string
    address: string
  }
  photos?: string[]
  createdAt: string
  updatedAt: string
}

export interface AccessInstructions {
  type: 'smart_lock' | 'lockbox' | 'key' | 'person'
  details: string
  code?: string
  smartLockIntegration?: {
    provider: 'august' | 'schlage' | 'yale' | 'kwikset'
    deviceId: string
  }
}

export interface WalkReport {
  reportId: string
  bookingId: string
  walkerId: string
  photos: string[]
  bathroomLog: {
    pee: boolean
    poop: boolean
    time: string
  }[]
  behaviorNotes: string
  distance?: number
  duration: number
  route?: {
    lat: number
    lng: number
    timestamp: string
  }[]
  incidents?: {
    type: string
    description: string
    timestamp: string
  }[]
  createdAt: string
}

export interface Subscription {
  subscriptionId: string
  userId: string
  type: 'owner' | 'walker'
  plan: 'basic' | 'premium'
  status: 'active' | 'cancelled' | 'expired'
  price: number
  billingCycle: 'monthly' | 'yearly'
  features: string[]
  startDate: string
  endDate?: string
}

export interface WalkerCertification {
  type: 'pet_first_aid' | 'dog_training' | 'anxiety_specialist' | 'behavior_expert'
  issuer: string
  issueDate: string
  expiryDate?: string
  verified: boolean
}

export interface Location {
  lat: number
  lng: number
  address?: string
  city?: string
  state?: string
  zip?: string
}

export interface Review {
  reviewId: string
  bookingId: string
  userId: string
  walkerId: string
  rating: number
  comment: string
  photos?: string[]
  createdAt: string
}

export interface Notification {
  notificationId: string
  userId: string
  type: 'booking_confirmed' | 'walker_matched' | 'walk_started' | 'walk_completed' | 'payment_processed'
  title: string
  message: string
  read: boolean
  data?: any
  createdAt: string
}

export interface PaymentMethod {
  paymentMethodId: string
  userId: string
  type: 'card' | 'bank_account'
  last4: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Transaction {
  transactionId: string
  bookingId: string
  userId: string
  walkerId: string
  amount: number
  currency: 'USD'
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  paymentMethod: string
  commission: number
  walkerPayout: number
  createdAt: string
  completedAt?: string
}
