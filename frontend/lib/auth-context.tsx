'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  // Add your user properties here
  id?: string
  email?: string
  // ... other user properties
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      // Get token from cookie
      const storedToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
        ?.split('=')[1]

      if (storedToken) {
        setToken(storedToken)
        // Make API call to verify session with token
        const response = await fetch('/api/auth/session', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        })
        const data = await response.json()
        
        if (data.user) {
          setUser(data.user)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      // Clear invalid token
      setToken(null)
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message)
      }
      
      setUser(data.user)
      setToken(data.token)
      // Set auth cookie
      document.cookie = `auth-token=${data.token}; path=/`
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    setIsLoading(true)
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : undefined
      })
      setUser(null)
      setToken(null)
      // Remove auth cookie
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}