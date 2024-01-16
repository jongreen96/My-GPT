import prisma from '@/lib/db/prisma';

// ---------------------------------- Conversations ----------------------------------

export async function createConversation(id, userId, settings) {
  const result = await prisma.conversations.create({
    data: {
      id,
      settings,
      userId,
      subject: '',
    },
  });
  return result;
}

export async function getConversations(userId) {
  const conversations = await prisma.conversations.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });
  return conversations;
}

export async function getConversation(id) {
  const conversation = await prisma.conversations.findUnique({
    where: {
      id,
    },
  });
  return conversation;
}

export async function deleteConversation(conversationId, userId) {
  await prisma.conversations.delete({
    where: {
      id: conversationId,
      userId,
    },
  });
}

// ---------------------------------- Messages ----------------------------------

export async function createMessages(
  id,
  messages,
  completion,
  reqTime,
  reqCost,
  resCost,
) {
  const result = await prisma.messages.createMany({
    data: [
      {
        conversationId: id,
        content: messages[messages.length - 1].content,
        role: 'user',
        createdAt: reqTime,
        credits: reqCost,
      },
      {
        conversationId: id,
        content: completion,
        role: 'assistant',
        createdAt: new Date(),
        credits: resCost,
      },
    ],
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
    orderBy: {
      createdAt: 'asc',
    },
  });
  return result;
}

// ---------------------------------- User ----------------------------------

export async function getUser(id) {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export async function updateUser(userId, reqCost, resCost) {
  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      credits: {
        decrement: reqCost + resCost,
      },
    },
  });
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
      credits: 100000,
      defaultSettings: {
        model: 'gpt-3.5-turbo',
        max_tokens: null,
        temperature: 1,
        response_format: null,
        frequency_penalty: 0,
      },
    },
  });
  return result;
}
