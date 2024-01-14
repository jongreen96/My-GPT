import {
  createConversation,
  createMessage,
  getMessages,
  getUser,
  updateUser,
} from '@/lib/db/queries';
import { OpenAIStream } from 'ai';
import { getEncoding } from 'js-tiktoken';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function streamConversation(req) {
  let { messages, id, userId, newChat, settings } = await req.json();
  const reqTime = new Date().toISOString();
  let resTokens = 0;

  const user = await getUser(userId);
  if (user.credits <= 0) {
    return 'Insufficient credits';
  }

  const response = await openai.chat.completions.create({
    model: settings.model,
    temperature: settings.temperature,
    max_tokens: settings.maxTokens || null,
    response_format: settings.responseFormat
      ? { type: 'json_object' }
      : { type: 'text' },
    messages,
    stream: true,
    user: userId,
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

      const model = 'gpt-3.5-turbo'; // TODO: get model from req
      const { reqCost, resCost } = calculateCost(reqTokens, resTokens, model);

      await updateUser(userId, reqCost, resCost);
      if (newChat) {
        await createConversation(id, userId, settings);
      }
      await createMessage({
        id,
        messages,
        role: 'user',
        time: reqTime,
        credits: reqCost,
      });
      createMessage({
        id,
        messages,
        role: 'assistant',
        completion,
        time: new Date().toISOString(),
        credits: resCost,
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
        'Summarize the conversation in a short sentence. MAXIMUM of 5 words',
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

function calculateCost(reqTokens, resTokens, model) {
  // TODO: Seperate this into a seperate file
  const apiPrices = {
    'gpt-3.5-turbo': {
      reqTokens: 1,
      resTokens: 2,
    },
  };

  const reqCost = Math.ceil(
    reqTokens * apiPrices[model].reqTokens * process.env.PM,
  );
  const resCost = Math.ceil(
    resTokens * apiPrices[model].resTokens * process.env.PM,
  );

  return {
    reqCost,
    resCost,
  };
}
