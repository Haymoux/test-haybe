// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define your route configurations
const routeConfig = {
  // Public routes that don't require authentication
  public: ['/', '/login', '/register', '/forgot-password', '/admin/creator-dashboard', '/about'],
  
  // Routes that require user authentication
  authenticated: [
    '/dashboard',
    '/profile',
    '/settings',
    '/orders',
    '/messages',
  ],
  
  // Routes that require specific roles (optional)
  admin: [
    '/admin',
    '/admin/users', 
    '/admin/settings'
  ].filter(path => !path.startsWith('/admin/creator-dashboard')),
  
  // API routes that need protection
  protectedApi: ['/api/user', '/api/orders', '/api/settings'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get('auth-token')
  const userRole = request.cookies.get('user-role')?.value || 'user'
  
  // Check if the path matches any protected patterns
  const isPublicPath = routeConfig.public.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )
  
  const isAuthenticatedPath = routeConfig.authenticated.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )
  
  const isAdminPath = routeConfig.admin.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )
  
  const isProtectedApiPath = routeConfig.protectedApi.some(path => 
    pathname.startsWith(path)
  )

  // Redirect authenticated users away from public auth pages
  if (isAuthenticated && pathname.match(/^\/login|^\/register/) && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

//   const isCreatorDashboardPath = pathname.startsWith('/admin/creator-dashboard')
  
  // If it's a creator dashboard path, allow access
//   if (isCreatorDashboardPath) {
//     return NextResponse.next()
//   }

  // Handle protected API routes
  if (isProtectedApiPath) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  // Handle admin routes
  if (isAdminPath) {
    if (!isAuthenticated || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Handle regular authenticated routes
  if (isAuthenticatedPath && !isAuthenticated) {
    // Store the attempted URL to redirect back after login
    const callbackUrl = encodeURIComponent(pathname)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
    )
  }

  return NextResponse.next()
}

// Update matcher to include all your routes
export const config = {
  matcher: [
    // Match all public routes
    '/',
    '/login',
    '/register',
    '/about',
    // Match all authenticated routes
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/orders/:path*',
    '/messages/:path*',
    // Match all admin routes
    '/admin/:path*',
    '/admin/creator-dashboard/',
    '/admin/creator-dashboard/:path*',
    '/super-admin/:path*',
    '/sales-rep-flow/:path*',
    '/sales-rep-flow/i/:path*',
    // Match protected API routes
    '/api/user/:path*',
    '/api/orders/:path*',
    '/api/settings/:path*',
  ],
}