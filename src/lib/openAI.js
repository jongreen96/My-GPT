import OpenAI from 'openai';
import { getMessages } from './db/queries';

export async function generateSubject(conversationId, messages) {
  const openai = new OpenAI();

  if (!messages) {
    messages = await getMessages(conversationId);
  }

  const formattedMessages = messages.map((message) => {
    if (typeof message.content !== 'string') {
      return {
        role: message.role,
        content: message.content[0].text,
      };
    } else {
      return {
        role: message.role,
        content: message.content,
      };
    }
  });

  const prompt = [
    {
      role: 'system',
      content:
        'Create a subject for this conversation. The subject should be a short sentence describing the topic of the conversation. MAXIMUM of 5 words',
    },
    ...formattedMessages.slice(0, 4),
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

// Models updated as of 28/02/2024
export const openAIModels = {
  'gpt-4-0125-preview': {
    type: 'chat',
    reqTokens: 10,
    resTokens: 30,
    max_tokens: 4096,
  },
  'gpt-4-turbo-preview': {
    type: 'chat',
    reqTokens: 10,
    resTokens: 30,
    max_tokens: 4096,
  },
  'gpt-4-1106-preview': {
    type: 'chat',
    reqTokens: 10,
    resTokens: 30,
    max_tokens: 4096,
  },
  'gpt-4-vision-preview': {
    type: 'vision',
    reqTokens: 10,
    resTokens: 30,
    max_tokens: 4096,
  },
  'gpt-4': {
    type: 'chat',
    reqTokens: 30,
    resTokens: 60,
    max_tokens: 8192,
  },
  // 'gpt-4-32k': {                    Doesn't work because I don't have access to this model
  //   type: 'chat',
  //   reqTokens: 60,
  //   resTokens: 120,
  //   max_tokens: 32768,
  // },
  // 'gpt-4-32k-0613': {               Doesn't work because I don't have access to this model
  //   type: 'chat',
  //   reqTokens: 60,
  //   resTokens: 120,
  //   max_tokens: 32768,
  // },
  'gpt-3.5-turbo-0125': {
    type: 'chat',
    reqTokens: 0.5,
    resTokens: 1.5,
    max_tokens: 4096,
  },
  'gpt-3.5-turbo-1106': {
    type: 'chat',
    reqTokens: 0.5,
    resTokens: 1.5,
    max_tokens: 4096,
  },
  'gpt-3.5-turbo': {
    type: 'chat',
    reqTokens: 0.5,
    resTokens: 1.5,
    max_tokens: 4096,
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

export const defaultSettings = {
  model: 'gpt-3.5-turbo-0125',
  max_tokens: null,
  temperature: 1,
  response_format: null,
  frequency_penalty: 0,
  presence_penalty: 0,
  top_p: 1,
  system_message: '',
};
