import prisma from '@/lib/db/prisma';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req) {
  try {
    let { messages, id, userId } = await req.json();

    const conversation = await getConversation(id);
    if (!conversation) await createConversation(id, userId);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
    });

    const stream = new OpenAIStream(response, {
      onStart: async () => {
        createMessage(id, messages, 'user');
      },
      onCompletion: async (completion) => {
        createMessage(id, messages, 'assistant', completion);
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}

async function getConversation(id) {
  return await prisma.conversations.findUnique({
    where: { id },
  });
}

async function createConversation(id, userId) {
  await prisma.conversations.create({
    data: {
      id,
      model: 'gpt-3.5-turbo',
      userId,
      subject: 'chat',
    },
  });
}

async function createMessage(id, messages, role, completion) {
  await prisma.messages.create({
    data: {
      conversationId: id,
      content:
        role === 'user' ? messages[messages.length - 1].content : completion,
      role,
    },
  });
}
