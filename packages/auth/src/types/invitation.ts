/**
 * @kepenk/auth — Invitation Types
 */

import { SiteRole } from './roles'

export interface Invitation {
  id: string
  siteId: string
  siteName: string
  email: string
  role: Exclude<SiteRole, SiteRole.OWNER>  // owner davet EDİLEMEZ
  token: string                             // nanoid(64)
  status: 'pending' | 'accepted' | 'expired' | 'cancelled'
  invitedBy: string
  invitedByName: string
  createdAt: string                         // ISO date
  expiresAt: string                         // ISO date (7 gün)
  acceptedAt?: string
  acceptedBy?: string
}

export interface TeamMember {
  userId: string
  email: string
  displayName: string
  photoURL?: string
  role: SiteRole
  invitedBy?: string
  joinedAt: string
}

export interface OwnershipTransfer {
  id: string
  siteId: string
  fromUserId: string
  toUserId: string
  token: string
  status: 'pending' | 'completed' | 'cancelled' | 'expired'
  createdAt: string
  expiresAt: string  // 48 saat
  completedAt?: string
}
