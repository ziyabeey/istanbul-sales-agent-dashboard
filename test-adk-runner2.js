const { InMemoryRunner, stringifyContent, LlmAgent } = require('@google/adk');
async function test() {
  const agent = new LlmAgent({name: 'A', model: 'gemini-2.5-flash', instruction: 'Say hello world.'});
  const runner = new InMemoryRunner({ appName: 'kepenk.ai', agent });
  const sessionId = 'test_session_123';
  await runner.sessionService.createSession(sessionId, 'test_user');
  const stream = runner.runAsync({
    userId: 'test_user',
    sessionId: sessionId,
    newMessage: { role: 'user', parts: [{ text: 'Greetings!' }] }
  });
  let rep = '';
  for await (const ev of stream) {
    rep += stringifyContent(ev);
  }
  console.log('Result:', rep);
}
test().catch(console.error);
