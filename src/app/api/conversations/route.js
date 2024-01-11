import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs';

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
    const { conversationId, newSubject } = await req.json();

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
        subject: newSubject,
      },
    });

    return Response.json({ conversation }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
