import {
  createConversation,
  createMessages,
  getMessages,
  getUser,
  updateUser,
} from '@/lib/db/queries';
import { OpenAIStream } from 'ai';
import { getEncoding } from 'js-tiktoken';
import OpenAI from 'openai';

export async function streamConversation(req) {
  const openai = new OpenAI();

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
    max_tokens: Number(settings.max_tokens) || null,
    frequency_penalty: settings.frequency_penalty,
    presence_penalty: settings.presence_penalty,
    top_p: settings.top_p,
    response_format: settings.response_format
      ? { type: 'json_object' }
      : { type: 'text' },
    messages:
      settings.system_message !== ''
        ? [{ role: 'system', content: settings.system_message }, ...messages]
        : messages,
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

      const { reqCost, resCost } = calculateCost(
        reqTokens,
        resTokens,
        settings.model,
      );

      await updateUser(userId, reqCost, resCost);
      if (newChat) await createConversation(id, userId, settings);

      await createMessages(id, messages, completion, reqTime, reqCost, resCost);
    },
  });

  return stream;
}

export async function generateSubject(conversationId) {
  const openai = new OpenAI();

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
  const reqCost = Math.ceil(
    reqTokens * openAIModels[model].reqTokens * process.env.PM,
  );
  const resCost = Math.ceil(
    resTokens * openAIModels[model].resTokens * process.env.PM,
  );

  return {
    reqCost,
    resCost,
  };
}

// Models updated as of 30/01/2024
export const openAIModels = {
  'gpt-4-0125-preview': {
    type: 'chat',
    reqTokens: 10,
    resTokens: 30,
  },
  'gpt-4-turbo-preview': {
    type: 'chat',
    reqTokens: 10,
    resTokens: 30,
  },
  'gpt-4-1106-preview': {
    type: 'chat',
    reqTokens: 10,
    resTokens: 30,
  },
  // 'gpt-4-vision-preview': {         Need to set up endpoint for this type
  //   type: 'vision',
  //   reqTokens: 10,
  //   resTokens: 30,
  // },
  'gpt-4': {
    type: 'chat',
    reqTokens: 30,
    resTokens: 60,
  },
  'gpt-4-0613': {
    type: 'chat',
    reqTokens: 30,
    resTokens: 60,
  },
  // 'gpt-4-32k': {                    Doesn't work because I don't have access to this model
  //   type: 'chat',
  //   reqTokens: 60,
  //   resTokens: 120,
  // },
  // 'gpt-4-32k-0613': {               Doesn't work because I don't have access to this model
  //   type: 'chat',
  //   reqTokens: 60,
  //   resTokens: 120,
  // },
  'gpt-3.5-turbo-0125': {
    type: 'chat',
    reqTokens: 1,
    resTokens: 2,
  },
  'gpt-3.5-turbo-1106': {
    type: 'chat',
    reqTokens: 1,
    resTokens: 2,
  },
  'gpt-3.5-turbo': {
    type: 'chat',
    reqTokens: 1,
    resTokens: 2,
  },
  'gpt-3.5-turbo-16k': {
    type: 'chat',
    reqTokens: 1,
    resTokens: 2,
  },
  // 'dall-e-3': {                      Need to set up endpoint for this type
  //   type: 'image',
  //   reqTokens: undefined,
  //   resTokens: undefined,
  // },
  // 'dall-e-2': {                      Need to set up endpoint for this type
  //   type: 'image',
  //   reqTokens: undefined,
  //   resTokens: undefined,
  // },
  // 'whisper-1': {                     Need to set up endpoint for this type
  //   type: 'audio',
  //   reqTokens: undefined,
  //   resTokens: undefined,
  // },
  // 'tts-1': {                         Need to set up endpoint for this type
  //   type: 'audio',
  //   reqTokens: undefined,
  //   resTokens: undefined,
  // },
  // 'tts-hd': {                        Need to set up endpoint for this type
  //   type: 'audio',
  //   reqTokens: undefined,
  //   resTokens: undefined,
  // },
};
