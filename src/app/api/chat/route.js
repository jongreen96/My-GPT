import {
  createConversation,
  createMessages,
  decreaseUserCredits,
  deleteConversation,
  getUser,
} from '@/lib/db/queries';
import {
  calculateCost,
  calculateTiles,
  generateSubject,
  openAIModels,
} from '@/lib/openAI';
import { createClient } from '@supabase/supabase-js';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import sizeOf from 'image-size';
import { getEncoding } from 'js-tiktoken';
import { nanoid } from 'nanoid';
import OpenAI from 'openai';

export const maxDuration = 300;

export async function POST(req) {
  try {
    const openai = new OpenAI();
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
    );
    const reqTime = new Date().toISOString();

    let { messages, id, userId, newChat, settings, data } = await req.json();
    let resTokens = 0;
    let images = [];
    const user = await getUser(userId);

    // Check if user has enough credits
    if (user.credits <= 0) {
      return new Response(
        'Insufficient credits, add more in the settings page.',
        { status: 402 },
      );
    }

    // Format messages for OpenAI
    messages = messages.map((message) => {
      if (message.images?.length > 0) {
        message.content = [
          { type: 'text', text: message.content },
          ...message.images.map((image) => ({
            type: 'image_url',
            image_url: {
              url: image,
              detail: 'low',
            },
          })),
        ];
      }
      delete message.images;
      delete message.id;
      delete message.createdAt;

      return message;
    });

    // Upload images to Supabase
    if (data.images.length > 0) {
      images = await Promise.all(
        data.images.map(async (image) => {
          const buffer = Buffer.from(image.split(',')[1], 'base64');

          const dimensions = sizeOf(buffer);

          const storageObject = await supabase.storage
            .from('my-gpt-storage')
            .upload(`vision-images/${user.id}/image-${nanoid(10)}.png`, buffer);

          const storageUrl = supabase.storage
            .from('my-gpt-storage')
            .getPublicUrl(storageObject.data.path);

          return {
            url: storageUrl.data.publicUrl,
            dimensions,
            path: storageObject.data.path,
          };
        }),
      );

      // Add images to last message
      messages[messages.length - 1].content = [
        { type: 'text', text: messages[messages.length - 1].content },
        ...images.map((image) => ({
          type: 'image_url',
          image_url: {
            url: image.url,
            detail: settings.high_res_vision ? 'high' : 'low',
          },
        })),
      ];
    }

    // Calculate request cost
    const enc = getEncoding('cl100k_base');
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
              if (content.image_url.detail === 'low') {
                return accu + 85;
              } else {
                const image = images.find(
                  (image) => image.url === content.image_url.url,
                );

                const tilesCost = calculateTiles(image);

                return accu + 85 + tilesCost;
              }
            }
          }, 0)
        );
      }
    }, 0);

    const reqCost = Math.ceil(
      reqTokens * openAIModels[settings.model].reqTokens * process.env.PM,
    );

    // Check if user has enough credits
    const remainingCredits = user.credits - reqCost;
    if (remainingCredits < 1) {
      if (images.length > 0) {
        await Promise.all(
          images.map((image) =>
            supabase.storage.from('my-gpt-storage').remove(image.path),
          ),
        );
      }

      return new Response(
        'Insufficient credits, request cost is higher than available credits. Add more in the settings page.',
        { status: 402 },
      );
    }

    // Create conversation if new chat
    if (newChat) {
      const subject = await generateSubject(null, messages);
      await createConversation(id, userId, settings, subject, 'chat');
    }

    // Setup response settings for OpenAI
    if (!settings.max_tokens || settings.max_tokens == 0)
      settings.max_tokens = Infinity;
    const responseSettings = {
      model: settings.model,
      messages:
        settings.system_message !== ''
          ? [{ role: 'system', content: settings.system_message }, ...messages]
          : messages,
      temperature: settings.temperature,
      max_tokens: Math.min(
        settings.max_tokens,
        Math.floor(
          remainingCredits /
            openAIModels[settings.model].resTokens /
            process.env.PM,
        ),
        openAIModels[settings.model].max_tokens - reqTokens,
      ),
      frequency_penalty: settings.frequency_penalty,
      presence_penalty: settings.presence_penalty,
      top_p: settings.top_p,
      response_format: settings.response_format
        ? { type: 'json_object' }
        : { type: 'text' },
      stream: true,
      user: userId,
    };

    // Change settings for vision models
    if (openAIModels[settings.model].type === 'vision')
      delete responseSettings.response_format;

    // Final check if user has enough credits
    if (responseSettings.max_tokens < 1) {
      if (images.length > 0) {
        await Promise.all(
          images.map((image) =>
            supabase.storage.from('my-gpt-storage').remove(image.path),
          ),
        );
      }

      await deleteConversation(id, userId);

      return new Response(
        'Insufficient credits, minimum response cost is higher than available credits. Add more in the settings page.',
        { status: 402 },
      );
    }

    // Send request to OpenAI
    const response = await openai.chat.completions.create(responseSettings);

    // Create stream
    const stream = new OpenAIStream(response, {
      onToken: () => {
        resTokens++;
      },
      onCompletion: async (completion) => {
        const { reqCost, resCost } = calculateCost(
          reqTokens,
          resTokens,
          settings.model,
        );

        await decreaseUserCredits(userId, reqCost, resCost);

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
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return new Response(
      'An internal error occurred. Please refresh the page and try again.',
      { status: 500 },
    );
  }
}
