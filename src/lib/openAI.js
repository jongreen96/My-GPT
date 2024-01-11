import { OpenAIStream } from 'ai';
import { getEncoding } from 'js-tiktoken';
import OpenAI from 'openai';
import { createConversation, createMessage, getMessages } from './db/queries';

const openai = new OpenAI();

export async function streamConversation(req) {
  let { messages, id, userId, newChat } = await req.json();
  const reqTime = new Date().toISOString();
  let resTokens = 0;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  });

  const stream = new OpenAIStream(response, {
    onToken: () => {
      resTokens++;
    },
    onCompletion: async (completion) => {
      const enc = getEncoding('cl100k_base');
      let reqTokens = messages.reduce((acc, message) => {
        return acc + enc.encode(message.content).length;
      }, 0);

      if (newChat) {
        await createConversation(id, userId);
      }
      await createMessage({
        id,
        messages,
        role: 'user',
        time: reqTime,
        tokens: reqTokens,
      });
      createMessage({
        id,
        messages,
        role: 'assistant',
        completion,
        time: new Date().toISOString(),
        tokens: resTokens,
      });
    },
  });

  return stream;
}

export async function generateSubject(conversationId) {
  const messages = await getMessages(conversationId);

  const prompt = [
    {
      role: 'system',
      content:
        'Create a subject for this conversation. The subject should be a short sentence describing the topic of the conversation. MAXIMUM of 5 words',
    },
    ...messages.slice(0, 4),
    {
      role: 'user',
      content:
        'What would be a good subject for this conversation? ONLY RESPOND WITH THE SUBJECT, MAXIMUM OF 5 WORDS',
    },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: prompt,
    temperature: 0.2,
    max_tokens: 10,
  });

  return response.choices[0].message.content;
}
