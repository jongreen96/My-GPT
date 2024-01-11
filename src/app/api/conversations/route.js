import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    const { subject, model } = await req.json();

    const { userId } = auth();
    if (!userId)
      return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const conversation = await prisma.conversations.create({
      data: {
        subject,
        model,
        userId,
      },
    });

    return Response.json({ conversation }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { conversationId } = await req.json();

    const { userId } = auth();
    if (!userId)
      return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const authenticated = await prisma.conversations.findUnique({
      where: { id: conversationId, userId },
    });
    if (!authenticated)
      return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await prisma.messages.deleteMany({
      where: {
        conversationId,
      },
    });

    await prisma.conversations.delete({
      where: {
        id: conversationId,
      },
    });

    return Response.json({ conversationId }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { conversationId, newSubject, generate } = await req.json();

    const subject = generate
      ? await generateSubject(conversationId)
      : newSubject;

    const { userId } = auth();
    if (!userId)
      return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const authenticated = await prisma.conversations.findUnique({
      where: { id: conversationId, userId },
    });
    if (!authenticated)
      return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const conversation = await prisma.conversations.update({
      where: {
        id: conversationId,
      },
      data: {
        subject,
      },
    });

    return Response.json({ conversation }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function generateSubject(conversationId) {
  const openai = new OpenAI();

  const messages = await prisma.messages.findMany({
    where: {
      conversationId,
    },
    select: {
      role: true,
      content: true,
    },
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
        'What would be a good subject for this conversation? ONLY RESPOND WITH THE SUBJECT, MAXIMUM OF 5 WORDS',
    },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: prompt,
    temperature: 0.2,
    max_tokens: 10,
  });

  return response.choices[0].message.content;
}
