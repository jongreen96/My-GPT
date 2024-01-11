import prisma from '@/lib/db/prisma';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req) {
  try {
    const reqTime = new Date().toISOString();
    let { messages, id, userId, newChat } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
    });

    const stream = new OpenAIStream(response, {
      onCompletion: async (completion) => {
        if (newChat) {
          await createConversation(id, userId);
        }
        await createMessage({
          id,
          messages,
          role: 'user',
          time: reqTime,
        });
        createMessage({
          id,
          messages,
          role: 'assistant',
          completion,
          time: new Date().toISOString(),
        });
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}

async function createConversation(id, userId) {
  await prisma.conversations.create({
    data: {
      id,
      model: 'gpt-3.5-turbo',
      userId,
      subject: '',
    },
  });
}

async function createMessage({ id, messages, role, completion, time }) {
  await prisma.messages.create({
    data: {
      conversationId: id,
      content:
        role === 'user' ? messages[messages.length - 1].content : completion,
      role,
      createdAt: time,
    },
  });
}
