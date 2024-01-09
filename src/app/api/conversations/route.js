import prisma from '@/lib/db/prisma';
import { conversationSchema } from '@/lib/validation/conversation';
import { auth } from '@clerk/nextjs';

export async function POST(req) {
  try {
    const body = await req.json();

    const parseResult = conversationSchema.safeParse(body);
    if (!parseResult.success) {
      console.log(parseResult.error);
      return Response.json({ error: 'Invalid Conversation' }, { status: 400 });
    }

    const { subject, model } = parseResult.data;

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

    const messages = await prisma.messages.deleteMany({
      where: {
        conversationId,
      },
    });

    const conversation = await prisma.conversations.delete({
      where: {
        id: conversationId,
      },
    });

    return Response.json({ conversation }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
