import prisma from '@/lib/db/prisma';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req) {
  try {
    let { messages, id, userId } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
    });

    const stream = new OpenAIStream(response, {
      onStart: async () => {
        await prisma.conversations.upsert({
          where: { id },
          create: {
            id,
            model: 'gpt-3.5-turbo',
            userId,
            subject: 'chat',
          },
          update: {},
        });
        await prisma.messages.create({
          data: {
            conversationId: id,
            content: messages[messages.length - 1].content,
            role: 'user',
          },
        });
      },
      onCompletion: async (completion) => {
        await prisma.messages.create({
          data: {
            conversationId: id,
            content: completion,
            role: 'assistant',
          },
        });
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}
