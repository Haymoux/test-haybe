'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

interface User {
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  logout: () => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const API_BASE_URL = 'https://api.hosoptima.com/api/v1'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to set cookies with expiration
  const setCookie = useCallback((name: string, value: string, expiryHours: number = 1) => {
    const date = new Date()
    date.setTime(date.getTime() + expiryHours * 60 * 60 * 1000)
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value}; ${expires}; path=/; secure; samesite=strict`
  }, [])

  // Function to get cookie value
  const getCookie = useCallback((name: string): string | null => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
    return null
  }, [])

  // Function to remove cookie
  const removeCookie = useCallback((name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/admin/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setToken(null)
      setRefreshToken(null)
      removeCookie('auth-token')
      removeCookie('refresh-token')
      setIsLoading(false)
    }
  }, [token, removeCookie])

  const refreshAccessToken = useCallback(async () => {
    try {
      if (!refreshToken) throw new Error('No refresh token available')

      const response = await fetch(`${API_BASE_URL}/admin/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) throw new Error('Token refresh failed')

      const data = await response.json()
      setToken(data.token)
      setCookie('token', data.token)
      return data.token
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
      throw error
    }
  }, [refreshToken, setCookie, logout])

  const checkAuth = useCallback(async () => {
    try {
      const storedToken = getCookie('token')
      const storedRefreshToken = getCookie('refresh-token')

      if (storedToken && storedRefreshToken) {
        setToken(storedToken)
        setRefreshToken(storedRefreshToken)

        const response = await fetch(`${API_BASE_URL}/admin/auth`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })

        if (!response.ok) {
          throw new Error('Session verification failed')
        }

        const data = await response.json()
        if (data.user) {
          setUser(data.user)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      await logout()
    } finally {
      setIsLoading(false)
    }
  }, [getCookie, logout])

  useEffect(() => {
    const setupAxiosInterceptor = () => {
      const originalFetch = window.fetch
      window.fetch = async (...args) => {
        const response = await originalFetch(...args)
        
        if (response.status === 401 && refreshToken) {
          try {
            const newToken = await refreshAccessToken()
            const [resource, config] = args
            if (config && typeof config === 'object') {
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${newToken}`,
              }
            }
            return originalFetch(resource, config)
          } catch (error) {
            throw error
          }
        }
        return response
      }
    }

    setupAxiosInterceptor()
  }, [refreshToken, refreshAccessToken])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        logout, 
        isLoading,
        isAuthenticated: !!user && !!token,
      }}
    >
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