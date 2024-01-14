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
  credits,
}) {
  const result = await prisma.messages.create({
    data: {
      conversationId: id,
      content:
        role === 'user' ? messages[messages.length - 1].content : completion,
      role,
      createdAt: time,
      credits,
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

export async function getUser(id) {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export async function deleteUser(id) {
  const deletedUser = await prisma.users.delete({
    where: {
      id,
    },
  });

  const conversation = await prisma.conversations.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!conversation) return;

  const deletedMessages = await prisma.messages.deleteMany({
    where: {
      conversationId: conversation.id,
    },
  });

  const deletedConversations = await prisma.conversations.deleteMany({
    where: {
      userId: user.id,
    },
  });

  return {
    deletedUser,
    deletedMessages,
    deletedConversations,
  };
}

export async function createUser(id) {
  const result = await prisma.users.create({
    data: {
      id,
    },
  });
  return result;
}
