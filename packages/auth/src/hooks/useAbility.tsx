/**
 * @kepenk/auth — React Hooks for RBAC
 */

'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { SiteRole, hasPermission, Permission, ROLE_PERMISSIONS } from './types/roles'
import { buildAbilityRules, checkAbility, type AbilityAction, type AbilitySubject, type AbilityRule } from './abilities'

/* ═══════ Context ═══════ */

interface AuthContextValue {
  role: SiteRole
  rules: AbilityRule[]
  can: (action: AbilityAction, subject: AbilitySubject) => boolean
  hasPermission: (permission: Permission) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

/* ═══════ Provider ═══════ */

interface AbilityProviderProps {
  children: ReactNode
  role: SiteRole
}

/**
 * Wraps children with RBAC context.
 * Role should come from Firebase custom claims: user.customClaims.sites[siteId]
 */
export function AbilityProvider({ children, role }: AbilityProviderProps) {
  const value = useMemo<AuthContextValue>(() => {
    const rules = buildAbilityRules(role)
    return {
      role,
      rules,
      can: (action, subject) => checkAbility(rules, action, subject),
      hasPermission: (perm) => hasPermission(role, perm),
    }
  }, [role])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/* ═══════ Hooks ═══════ */

/**
 * Access current user's RBAC abilities.
 * Must be used within <AbilityProvider>.
 */
export function useAbility(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAbility must be used within <AbilityProvider>')
  return ctx
}

/**
 * Shorthand: check single permission.
 */
export function useCanDo(action: AbilityAction, subject: AbilitySubject): boolean {
  const { can } = useAbility()
  return can(action, subject)
}

/* ═══════ Component ═══════ */

interface CanProps {
  I: AbilityAction
  a: AbilitySubject
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Declarative permission gate.
 * @example <Can I="edit" a="Product"><EditButton /></Can>
 */
export function Can({ I: action, a: subject, children, fallback = null }: CanProps) {
  const { can } = useAbility()
  return can(action, subject) ? <>{children}</> : <>{fallback}</>
}
