import { z } from 'zod'

export const ServicePrincipalAuthTypeSchema = z.enum([
  'signed_service_token',
  'legacy_cron_secret',
])

export type ServicePrincipalAuthType = z.infer<typeof ServicePrincipalAuthTypeSchema>

export const ServicePrincipalSchema = z.object({
  principalId: z.string().min(1),
  subject: z.string().min(1),
  scopes: z.array(z.string().min(1)).min(1),
  authType: ServicePrincipalAuthTypeSchema,
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  invocationId: z.string().min(1),
}).strict()

export type ServicePrincipal = z.infer<typeof ServicePrincipalSchema>

export const TaskInvocationSchema = z.object({
  invocationId: z.string().min(1),
  subject: z.string().min(1),
  audience: z.string().min(1),
  scopes: z.array(z.string().min(1)).min(1),
  issuedAt: z.string().datetime(),
  notBefore: z.string().datetime(),
  expiresAt: z.string().datetime(),
}).strict()

export type TaskInvocation = z.infer<typeof TaskInvocationSchema>

export const SERVICE_SCOPES = {
  queueProcess: 'queue:process',
  siteGenerate: 'site:generate',
  taskInvoke: 'task:invoke',
} as const

export const SERVICE_AUDIENCES = {
  queueProcessor: 'kepenk.ai:/api/cron/kuyruk-isleyici',
  siteGenerator: 'kepenk.ai:/api/workers/site-ureticisi',
} as const
