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

export async function createMessage({
  id,
  messages,
  role,
  completion,
  time,
  tokens,
}) {
  const result = await prisma.messages.create({
    data: {
      conversationId: id,
      content:
        role === 'user' ? messages[messages.length - 1].content : completion,
      role,
      createdAt: time,
      tokens: tokens || 0,
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

export async function deleteUser(id) {
  const result = await prisma.users.delete({
    where: {
      id,
    },
  });
  return result;
}

export async function createUser(id) {
  const result = await prisma.users.create({
    data: {
      id,
    },
  });
  return result;
}
