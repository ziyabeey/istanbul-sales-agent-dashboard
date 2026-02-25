const { InMemoryRunner, stringifyContent, LlmAgent } = require('@google/adk');
async function test() {
  const agent = new LlmAgent({name: 'A', model: 'gemini-2.5-flash', instruction: 'Say hello world.'});
  const runner = new InMemoryRunner({ appName: 'kepenk.ai', agent });
  const stream = runner.runAsync({
    userId: 'test_user',
    sessionId: 'test_session',
    newMessage: { role: 'user', parts: [{ text: 'Greetings!' }] }
  });
  let rep = '';
  for await (const ev of stream) {
    rep += stringifyContent(ev);
  }
  console.log('Result:', rep);
}
test().catch(console.error);
