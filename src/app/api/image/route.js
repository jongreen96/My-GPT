import {
  createConversation,
  createImageMessages,
  decreaseUserCredits,
  getUser,
} from '@/lib/db/queries';
import {
  calculateImageCost,
  generateImageSubject,
  openAIModels,
} from '@/lib/openAI';
import { clamp } from '@/lib/utils';
import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import OpenAI from 'openai';

export async function POST(req) {
  const openai = new OpenAI();
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );
  const reqTime = new Date().toISOString();

  const { userId, id, settings, input, newChat } = await req.json();
  const user = await getUser(userId);

  // Check if user has enough credits
  const creditsCost = calculateImageCost(settings);
  if (user.credits < creditsCost) {
    return new Response(
      'Insufficient credits, add more in the settings page.',
      { status: 402 },
    );
  }

  if (newChat) {
    const subject = await generateImageSubject(input);
    await createConversation(id, userId, settings, subject);
  }

  // Setup response settings for OpenAI
  const responseSettings = {
    prompt: input,
    model: settings.imageModel,
    n: settings.model === 'dall-e-3' ? 1 : clamp(settings.n, 1, 10),
    response_format: 'b64_json',
    size: settings.size,
    user: userId,
  };
  if (settings.imageModel === 'dall-e-3') {
    responseSettings.quality = settings.quality;
    responseSettings.size = openAIModels[settings.imageModel].resTokens[
      settings.quality
    ][settings.size]
      ? settings.size
      : '1024x1024';
    responseSettings.style = settings.style;
  }
  if (settings.imageModel === 'dall-e-2') {
    responseSettings.size = openAIModels[settings.imageModel].resTokens[
      settings.quality
    ][settings.size]
      ? settings.size
      : '256x256';
  }

  // Send request to OpenAI
  const image = await openai.images.generate({
    model: settings.imageModel,
    prompt: input,
    response_format: 'b64_json',
    size: settings.size,
    n: settings.n,
  });

  // Upload images to Supabase
  const images = await Promise.all(
    image.data.map(async (image) => {
      const buffer = Buffer.from(image.b64_json, 'base64');

      const storageObject = await supabase.storage
        .from('my-gpt-storage')
        .upload(
          `${settings.imageModel}-images/${user.id}/image-${nanoid(10)}.png`,
          buffer,
        );

      const storageUrl = supabase.storage
        .from('my-gpt-storage')
        .getPublicUrl(storageObject.data.path);

      return storageUrl.data.publicUrl;
    }),
  );

  await decreaseUserCredits(user.id, 0, creditsCost);

  await createImageMessages(id, input, images, reqTime, creditsCost);

  return new Response(JSON.stringify({ images }), {
    status: 200,
  });
}
