import prisma from '@/lib/db/prisma';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req) {
  try {
    let { messages, id, userId } = await req.json();

    const conversation = await getConversation(id);
    if (!conversation) {
      await createConversation(id, userId, messages);
      createConversationSubject(id, messages);
    }

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
        createMessage(id, messages, 'assistant', completion, conversation);
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

async function createMessage(id, messages, role, completion, conversation) {
  await prisma.messages.create({
    data: {
      conversationId: id,
      content:
        role === 'user' ? messages[messages.length - 1].content : completion,
      role,
    },
  });
}

async function createConversationSubject(id, messages) {
  const prompt = [
    {
      role: 'system',
      content:
        'create a subject for this conversation. The subject should be a short sentence describing the topic of the conversation. MAXIMUM of 5 words',
    },
    ...messages,
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: prompt,
    temperature: 0.2,
  });

  await prisma.conversations.update({
    where: { id },
    data: {
      subject: response.choices[0].message.content,
    },
  });
}
