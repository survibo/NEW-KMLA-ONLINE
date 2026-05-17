import * as React from "react"
import { useEffect } from "react"

type UserRole = "guest" | "student" | "admin"

interface ProtectedRouteProps {
  children: React.ReactNode
  userRole?: UserRole
  requiredRoles?: UserRole[]
  isAuthenticated?: boolean
  loginUrl?: string
  fallback?: React.ReactNode
  childrenWhenUnauthorized?: React.ReactNode
}

const roleHierarchy: Record<UserRole, number> = {
  guest: 0,
  student: 1,
  admin: 2,
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  userRole = "guest",
  requiredRoles = ["student", "admin"],
  isAuthenticated = false,
  loginUrl = "/login",
  fallback,
  childrenWhenUnauthorized,
}) => {
  const hasRequiredRole = React.useMemo(() => {
    if (requiredRoles.length === 0) return true

    const minRequiredLevel = Math.min(...requiredRoles.map((role) => roleHierarchy[role]))

    return roleHierarchy[userRole] >= minRequiredLevel
  }, [userRole, requiredRoles])

  useEffect(() => {
    if (!isAuthenticated && !childrenWhenUnauthorized && !fallback) {
      if (typeof window !== "undefined") {
        window.location.href = loginUrl
      }
    }
  }, [isAuthenticated, childrenWhenUnauthorized, fallback, loginUrl])

  if (!isAuthenticated) {
    if (childrenWhenUnauthorized) {
      return <>{childrenWhenUnauthorized}</>
    }

    if (fallback) {
      return <>{fallback}</>
    }

    return null
  }

  if (!hasRequiredRole) {
    if (childrenWhenUnauthorized) {
      return <>{childrenWhenUnauthorized}</>
    }

    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--color-surface-base)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Access Denied</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export type { ProtectedRouteProps }
