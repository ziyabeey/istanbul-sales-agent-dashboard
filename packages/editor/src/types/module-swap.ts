/**
 * @kepenk/editor — Module Swap Types
 */

export interface ModuleSwapRequest {
  siteId: string
  blockId: string
  currentType: string
  currentVariant: string
  newVariant: string
  preserveContent: boolean
}

export interface ModuleSwapResult {
  success: boolean
  mergedContent: Record<string, unknown>
  warnings: string[]
}
