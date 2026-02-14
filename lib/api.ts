// API Client for PawDash Backend
// Handles all API calls to AWS backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

class PawDashAPI {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Request failed' }
      }

      return { data }
    } catch (error) {
      console.error('API Error:', error)
      return { error: 'Network error occurred' }
    }
  }

  // Booking endpoints
  async createBooking(booking: CreateBookingRequest): Promise<ApiResponse<Booking>> {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    })
  }

  async getBooking(bookingId: string): Promise<ApiResponse<Booking>> {
    return this.request(`/bookings/${bookingId}`)
  }

  async getUserBookings(userId: string): Promise<ApiResponse<Booking[]>> {
    return this.request(`/bookings/user/${userId}`)
  }

  // Walker endpoints
  async createWalker(walker: CreateWalkerRequest): Promise<ApiResponse<Walker>> {
    return this.request('/walkers', {
      method: 'POST',
      body: JSON.stringify(walker),
    })
  }

  async getWalker(walkerId: string): Promise<ApiResponse<Walker>> {
    return this.request(`/walkers/${walkerId}`)
  }

  async updateWalkerAvailability(
    walkerId: string,
    isAvailable: boolean,
    location?: Location
  ): Promise<ApiResponse<void>> {
    return this.request(`/walkers/${walkerId}/availability`, {
      method: 'PUT',
      body: JSON.stringify({ isAvailable, location }),
    })
  }

  // Dispatch endpoint
  async dispatchWalkers(dispatch: DispatchRequest): Promise<ApiResponse<DispatchResponse>> {
    return this.request('/dispatch', {
      method: 'POST',
      body: JSON.stringify(dispatch),
    })
  }

  // Chat endpoint (handled by Next.js API route)
  async sendChatMessage(
    message: string,
    history: ChatMessage[]
  ): Promise<ApiResponse<{ message: string }>> {
    return this.request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    })
  }
}

// Types
export interface Location {
  lat: number
  lng: number
  address?: string
}

export interface CreateBookingRequest {
  userId: string
  petId: string
  serviceType: '15min' | '30min' | '60min' | 'dropin' | 'sitting'
  timing: 'asap' | 'scheduled'
  scheduledTime?: string
  specialInstructions?: string
  location: Location
}

export interface Booking {
  bookingId: string
  userId: string
  petId: string
  walkerId?: string
  serviceType: string
  timing: string
  scheduledTime?: string
  specialInstructions?: string
  location: Location
  status: 'pending' | 'dispatched' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
  dispatchedWalkers?: string[]
}

export interface CreateWalkerRequest {
  name: string
  email: string
  phone: string
  address: string
  experience?: string
  availability?: string
  certifications?: string
}

export interface Walker {
  walkerId: string
  name: string
  email: string
  rating: number
  totalWalks: number
  isAvailable: boolean
  status: 'pending_verification' | 'active' | 'suspended' | 'inactive'
  certifications?: string
  location?: Location
  createdAt: string
  updatedAt: string
}

export interface DispatchRequest {
  bookingId: string
  location: Location
  petRequirements?: {
    size?: string
    temperament?: string
    specialNeeds?: string[]
  }
}

export interface DispatchResponse {
  message: string
  matchedWalkers: number
  estimatedMatchTime: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Export singleton instance
export const api = new PawDashAPI()
export default api
