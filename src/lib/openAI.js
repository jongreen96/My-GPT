import { getMessages } from '@/lib/db/queries';
import OpenAI from 'openai';

export async function generateSubject(conversationId) {
  const openai = new OpenAI();

  const messages = await getMessages(conversationId);

  messages.forEach((message) => {
    delete message.id;
    delete message.createdAt;
    delete message.images;
  });

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
    model: 'gpt-3.5-turbo-0125',
    messages: prompt,
    temperature: 0.2,
    max_tokens: 10,
  });

  return response.choices[0].message.content;
}

export function calculateCost(reqTokens, resTokens, model) {
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
  // 'gpt-4-vision-preview': {
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
