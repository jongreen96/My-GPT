import {
  createConversation,
  createMessages,
  getUser,
  updateUser,
} from '@/lib/db/queries';
import { calculateCost, openAIModels } from '@/lib/openAI';
import { put } from '@vercel/blob';
import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from 'ai';
import sizeOf from 'image-size';
import { getEncoding } from 'js-tiktoken';
import OpenAI from 'openai';

export const maxDuration = 300;

export async function POST(req) {
  try {
    const openai = new OpenAI();
    let { messages, id, userId, newChat, settings, data } = await req.json();
    let resTokens = 0;
    let images = [];

    const reqTime = new Date().toISOString();

    const user = await getUser(userId);
    if (user.credits <= 0) {
      return 'Insufficient credits';
    }

    const responseSettings = {
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
    };

    // Format messages for OpenAI
    if (openAIModels[settings.model].type === 'vision') {
      delete responseSettings.response_format;
      responseSettings.max_tokens = 4096;
    }

    messages = messages.map((message) => {
      if (message.images?.length > 0) {
        message.content = [
          { type: 'text', text: message.content },
          ...message.images.map((image) => ({
            type: 'image_url',
            image_url: { url: image, detail: 'low' },
          })),
        ];
      }

      delete message.images;
      delete message.id;
      delete message.createdAt;
      return message;
    });

    // Upload images to Vercel Blob
    if (data.images.length > 0) {
      images = await Promise.all(
        data.images.map(async (image) => {
          const buffer = Buffer.from(image.split(',')[1], 'base64');

          const dimensions = sizeOf(buffer);

          const blob = await put('chat-image.png', buffer, {
            contentType: 'image/png',
            access: 'public',
          });

          return { url: blob.url, dimensions };
        }),
      );

      // Add images to last message
      messages[messages.length - 1].content = [
        { type: 'text', text: messages[messages.length - 1].content },
        ...images.map((image) => ({
          type: 'image_url',
          image_url: { url: image.url, detail: 'low' },
        })),
      ];
    }

    // Send request to OpenAI
    const response = await openai.chat.completions.create({
      ...responseSettings,
    });

    const extraData = new experimental_StreamData();
    const stream = new OpenAIStream(response, {
      onToken: () => {
        resTokens++;
      },
      onCompletion: async (completion) => {
        extraData.append({ images: images });
        const enc = getEncoding('cl100k_base');

        // Calculate cost
        const reqTokens = messages.reduce((acc, message) => {
          if (typeof message.content === 'string') {
            return acc + enc.encode(message.content).length;
          } else {
            return (
              acc +
              message.content.reduce((accu, content) => {
                if (content.type === 'text') {
                  return accu + enc.encode(content.text).length;
                } else {
                  return accu + 85;
                }
              }, 0)
            );
          }
        }, 0);

        const { reqCost, resCost } = calculateCost(
          reqTokens,
          resTokens,
          settings.model,
        );

        await updateUser(userId, reqCost, resCost);
        if (newChat) await createConversation(id, userId, settings);

        await createMessages(
          id,
          messages,
          completion,
          reqTime,
          reqCost,
          resCost,
          images,
        );
      },
      onFinal: () => {
        extraData.close();
      },
      experimental_streamData: true,
    });

    return new StreamingTextResponse(stream, {}, extraData);
  } catch (error) {
    console.log(error);
  }
}
