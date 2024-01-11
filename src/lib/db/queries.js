import prisma from '@/lib/db/prisma';

export async function createConversation(id, userId) {
  const result = await prisma.conversations.create({
    data: {
      id,
      model: 'gpt-3.5-turbo',
      userId,
      subject: '',
    },
  });
  return result;
}

export async function createMessage({ id, messages, role, completion, time }) {
  const result = await prisma.messages.create({
    data: {
      conversationId: id,
      content:
        role === 'user' ? messages[messages.length - 1].content : completion,
      role,
      createdAt: time,
    },
  });
  return result;
}

export async function getMessages(conversationId) {
  const result = await prisma.messages.findMany({
    where: {
      conversationId,
    },
    select: {
      role: true,
      content: true,
    },
  });
  return result;
}
