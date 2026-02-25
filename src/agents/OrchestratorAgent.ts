import { LlmAgent, InMemoryRunner, stringifyContent } from '@google/adk';
import { theCloserAgent } from './TheCloserAgent';
import { churnDetectiveAgent } from './ChurnDetectiveAgent';

export const orchestratorAgent = new LlmAgent({
  name: 'OrchestratorAgent',
  description: 'The root orchestrator that analyzes user intents and delegates tasks to specialized sub-agents.',
  instruction: `
    You are the central Orchestrator for kepenk.ai.
    You receive user queries (via Web, WhatsApp, etc) and decide how to fulfill them.
    If the user is asking about pricing or is ready to buy, delegate to TheCloserAgent.
    If the system asks for an analysis of a user's health, delegate to ChurnDetectiveAgent.
    Otherwise, answer general inquiries about kepenk.ai as a helpful assistant.
  `,
});

// A standard runner instance for our backend architecture
const runner = new InMemoryRunner({
  appName: 'kepenk.ai',
  agent: orchestratorAgent,
});

/**
 * Helper function to run the Orchestrator ADK agent
 * and return a unified string response.
 */
export async function runAdkOrchestrator(sessionId: string, userMessage: string): Promise<string> {
  // 1. Initialize or get conversation session
  try {
    // Attempt to create, it handles if it already exists depending on implementation,
    // but InMemorySessionService strictly needs creation if not exists.
    await runner.sessionService.createSession({
      appName: 'kepenk.ai',
      userId: 'system_user',
      sessionId: sessionId,
    });
  } catch (e) {
    // Session might already exist, which is fine
  }

  // 2. Stream events from the agent
  const stream = runner.runAsync({
    userId: 'system_user',
    sessionId: sessionId,
    newMessage: { role: 'user', parts: [{ text: userMessage }] }
  });

  let fullReply = '';
  // 3. Process events and collect the final response
  for await (const event of stream) {
    fullReply += stringifyContent(event);
  }

  return fullReply || "Üzgünüm, şu anda yanıt veremiyorum.";
}
