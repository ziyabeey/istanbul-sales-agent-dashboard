/**
 * @kepenk/auth — Role & Permission Types
 * RBAC role hierarchy and permission definitions for multi-tenant site access.
 */

export enum SiteRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export enum Permission {
  // Site
  SITE_VIEW = 'site:view',
  SITE_EDIT = 'site:edit',
  SITE_PUBLISH = 'site:publish',
  SITE_DELETE = 'site:delete',
  SITE_SETTINGS = 'site:settings',
  SITE_TRANSFER = 'site:transfer',

  // Ürün/Hizmet
  PRODUCT_VIEW = 'product:view',
  PRODUCT_CREATE = 'product:create',
  PRODUCT_EDIT = 'product:edit',
  PRODUCT_DELETE = 'product:delete',

  // Sipariş
  ORDER_VIEW = 'order:view',
  ORDER_MANAGE = 'order:manage',
  ORDER_REFUND = 'order:refund',

  // Müşteri (CRM)
  CUSTOMER_VIEW = 'customer:view',
  CUSTOMER_CREATE = 'customer:create',
  CUSTOMER_EDIT = 'customer:edit',
  CUSTOMER_EXPORT = 'customer:export',

  // Randevu
  BOOKING_VIEW = 'booking:view',
  BOOKING_MANAGE = 'booking:manage',

  // Blog
  BLOG_VIEW = 'blog:view',
  BLOG_CREATE = 'blog:create',
  BLOG_PUBLISH = 'blog:publish',
  BLOG_DELETE = 'blog:delete',

  // Pazarlama
  MARKETING_VIEW = 'marketing:view',
  MARKETING_MANAGE = 'marketing:manage',
  MARKETING_SPEND = 'marketing:spend',

  // Muhasebe
  FINANCE_VIEW = 'finance:view',
  FINANCE_MANAGE = 'finance:manage',

  // Ekip
  TEAM_VIEW = 'team:view',
  TEAM_INVITE = 'team:invite',
  TEAM_REMOVE = 'team:remove',
  TEAM_CHANGE_ROLE = 'team:change_role',

  // Ödeme/Abonelik
  BILLING_VIEW = 'billing:view',
  BILLING_MANAGE = 'billing:manage',

  // Restoran
  RESTAURANT_VIEW = 'restaurant:view',
  RESTAURANT_MANAGE = 'restaurant:manage',
  RESTAURANT_KDS = 'restaurant:kds',

  // Stok
  STOCK_VIEW = 'stock:view',
  STOCK_MANAGE = 'stock:manage',
}

/** Role → Permission mapping */
export const ROLE_PERMISSIONS: Record<SiteRole, Permission[]> = {
  [SiteRole.OWNER]: Object.values(Permission),

  [SiteRole.ADMIN]: Object.values(Permission).filter(
    (p) => p !== Permission.SITE_TRANSFER && p !== Permission.SITE_DELETE
  ),

  [SiteRole.EDITOR]: [
    Permission.SITE_VIEW,
    Permission.SITE_EDIT,
    Permission.PRODUCT_VIEW,
    Permission.PRODUCT_CREATE,
    Permission.PRODUCT_EDIT,
    Permission.ORDER_VIEW,
    Permission.ORDER_MANAGE,
    Permission.CUSTOMER_VIEW,
    Permission.BOOKING_VIEW,
    Permission.BOOKING_MANAGE,
    Permission.BLOG_VIEW,
    Permission.BLOG_CREATE,
    Permission.BLOG_PUBLISH,
    Permission.MARKETING_VIEW,
    Permission.RESTAURANT_VIEW,
    Permission.RESTAURANT_KDS,
    Permission.STOCK_VIEW,
  ],

  [SiteRole.VIEWER]: [
    Permission.SITE_VIEW,
    Permission.PRODUCT_VIEW,
    Permission.ORDER_VIEW,
    Permission.CUSTOMER_VIEW,
    Permission.BOOKING_VIEW,
    Permission.BLOG_VIEW,
    Permission.MARKETING_VIEW,
    Permission.FINANCE_VIEW,
    Permission.RESTAURANT_VIEW,
    Permission.STOCK_VIEW,
    Permission.TEAM_VIEW,
    Permission.BILLING_VIEW,
  ],
}

/** Role display config for UI */
export const ROLE_CONFIG: Record<SiteRole, { label: string; emoji: string; color: string; bgColor: string }> = {
  [SiteRole.OWNER]: { label: 'Sahip', emoji: '👑', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.1)' },
  [SiteRole.ADMIN]: { label: 'Yönetici', emoji: '🛡️', color: '#3b82f6', bgColor: 'rgba(59,130,246,0.1)' },
  [SiteRole.EDITOR]: { label: 'Editör', emoji: '✏️', color: '#22c55e', bgColor: 'rgba(34,197,94,0.1)' },
  [SiteRole.VIEWER]: { label: 'İzleyici', emoji: '👁️', color: '#9ca3af', bgColor: 'rgba(156,163,175,0.1)' },
}

/** Check if roleA can manage roleB (higher roles manage lower ones) */
export function canManageRole(actorRole: SiteRole, targetRole: SiteRole): boolean {
  const hierarchy: Record<SiteRole, number> = {
    [SiteRole.OWNER]: 4,
    [SiteRole.ADMIN]: 3,
    [SiteRole.EDITOR]: 2,
    [SiteRole.VIEWER]: 1,
  }
  return hierarchy[actorRole] > hierarchy[targetRole]
}

/** Check if a role has a specific permission */
export function hasPermission(role: SiteRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission)
}
