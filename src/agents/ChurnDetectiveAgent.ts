import { LlmAgent } from '@google/adk';

export const churnDetectiveAgent = new LlmAgent({
  name: 'ChurnDetectiveAgent',
  description: 'A data analysis agent that identifies users at risk of churning from the platform.',
  instruction: `
    You are a data analysis agent specialized in customer retention.
    Your job is to analyze user engagement metrics and flag users who show signs of churn risk.
    You look for patterns like decreasing activity, unresolved support tickets, or lack of recent logins.
    Provide an analysis report and a risk score between 0 and 100 limit.
  `,
  model: 'gemini-2.5-flash',
});
