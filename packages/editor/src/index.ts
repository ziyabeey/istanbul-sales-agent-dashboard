/**
 * @kepenk/editor — Barrel Export
 */

// Module Swap
export type { ModuleSwapRequest, ModuleSwapResult } from './types/module-swap'
export { mergeContent, deepMerge } from './utils/contentMerger'

// Code Injection
export type { CodeInjectionConfig, ValidationResult } from './types/code-injection'
export { validateInjectedCode, sanitizeCode, DEFAULT_INJECTION } from './types/code-injection'

// AI Editor
export type { AIEditorMessage, AIToolResult, AIUsage, AIOperation } from './types/ai-editor'
export { TOKEN_LIMITS, TOOL_COSTS, AI_QUICK_ACTIONS } from './types/ai-editor'
