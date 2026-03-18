/**
 * @kepenk/chatbot — KPI Dashboard Types
 */

export interface OrgKPI {
  orgId: string
  period: string              // '2026-03'

  taskCompletion: {
    total: number
    completed: number
    rate: number              // 0-1
  }

  avgCompletionTime: {
    estimatedHours: number
    actualHours: number
    ratio: number             // >1 = slower than estimated
  }

  chatbotResolution: {
    totalQueries: number
    aiResolved: number
    humanEscalated: number
    resolutionRate: number    // 0-1
  }

  teamEfficiency: TeamMemberKPI[]

  overdueCount: number

  priorityDistribution: {
    low: number
    medium: number
    high: number
    urgent: number
  }
}

export interface TeamMemberKPI {
  userId: string
  name: string
  tasksCompleted: number
  avgCompletionHours: number
  onTimeRate: number          // 0-1
}
