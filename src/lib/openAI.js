import OpenAI from 'openai';
import { getMessages } from './db/queries';

export async function generateImageSubject(input) {
  const openai = new OpenAI();

  const prompt = [
    {
      role: 'system',
      content:
        'Create a subject for this conversation. The subject should be a short sentence describing the topic of the image. MAXIMUM of 5 words',
    },
    {
      role: 'user',
      content: input,
    },
    {
      role: 'user',
      content:
        'Summarize the conversation in a short sentence. MAXIMUM of 4 words, DO NOT use opening words like Discussing, and DO NOT use punctuation at the end.',
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
        'Summarize the conversation in a short sentence. MAXIMUM of 4 words',
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

export function calculateImageCost(settings) {
  return (
    settings.n *
    openAIModels[settings.imageModel].resTokens[settings.quality][
      settings.size
    ] *
    process.env.PM
  );
}

export function calculateTiles(image) {
  // Scale image to 2048x2048
  let scaleFactor = Math.min(
    2048 / image.dimensions.width,
    2048 / image.dimensions.height,
  );

  const scaledDimensions =
    scaleFactor > 1
      ? {
          width: image.dimensions.width,
          height: image.dimensions.height,
        }
      : {
          width: Math.floor(image.dimensions.width * scaleFactor),
          height: Math.floor(image.dimensions.height * scaleFactor),
        };

  // Scale image so shorter side to 768px
  scaleFactor = Math.max(
    768 / scaledDimensions.width,
    768 / scaledDimensions.height,
  );

  const finalDimensions =
    scaleFactor > 1
      ? scaledDimensions
      : {
          width: scaledDimensions.width * scaleFactor,
          height: scaledDimensions.height * scaleFactor,
        };

  // Calculate number of tiles
  const tiles =
    Math.ceil(finalDimensions.width / 512) *
    Math.ceil(finalDimensions.height / 512) *
    170;

  return tiles;
}

// Models updated as of 28/02/2024
export const openAIModels = {
  'gpt-4o-mini': {
    type: 'vision',
    reqTokens: 0.15,
    resTokens: 0.6,
    max_tokens: 4096,
  },
  'gpt-4o': {
    type: 'vision',
    reqTokens: 5,
    resTokens: 15,
    max_tokens: 4096,
  },
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
  'dall-e-3': {
    type: 'image',
    resTokens: {
      standard: {
        '1024x1024': 40000,
        '1024x1792': 80000,
        '1792x1024': 80000,
      },
      hd: {
        '1024x1024': 80000,
        '1024x1792': 120000,
        '1792x1024': 120000,
      },
    },
  },
  'dall-e-2': {
    type: 'image',
    resTokens: {
      standard: {
        '256x256': 16000,
        '512x512': 18000,
        '1024x1024': 20000,
      },
    },
  },
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
  high_res_vision: false,
  n: 1,
  size: '1024x1024',
  style: 'vivid',
  quality: 'standard',
};
