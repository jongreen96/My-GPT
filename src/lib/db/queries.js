import prisma from '@/lib/db/prisma';
import { createClient } from '@supabase/supabase-js';
import { defaultSettings } from '../openAI';

// ---------------------------------- Conversations ----------------------------------

export async function createConversation(id, userId, settings, subject = '') {
  const result = await prisma.conversations.create({
    data: {
      id,
      settings,
      userId,
      subject,
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

export async function getConversation(id, userId) {
  const conversation = await prisma.conversations.findUnique({
    where: {
      id,
      userId,
    },
  });
  return conversation;
}

export async function deleteConversation(conversationId, userId) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );

  const messages = await prisma.messages.findMany({
    where: {
      conversationId,
    },
  });

  messages.forEach((message) => {
    if (message.images?.length > 0) {
      message.images.forEach(async (image) => {
        supabase.storage
          .from('my-gpt-storage')
          .remove([image.split('my-gpt-storage/')[1]]);
      });
    }
  });

  await prisma.conversations.delete({
    where: {
      id: conversationId,
      userId,
    },
  });
}

export async function updateConversationSubject(
  conversationId,
  userId,
  subject,
) {
  await prisma.conversations.update({
    where: {
      id: conversationId,
      userId,
    },
    data: {
      subject,
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
  images,
) {
  const result = await prisma.messages.createMany({
    data: [
      {
        conversationId: id,
        content:
          typeof messages[messages.length - 1].content === 'string'
            ? messages[messages.length - 1].content
            : messages[messages.length - 1].content[0].text,
        role: 'user',
        images: images.map((image) => image.url),
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
      images: true,
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

export async function decreaseUserCredits(userId, reqCost, resCost) {
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

export async function increaseUserCredits(userId, amount) {
  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      credits: {
        increment: amount * 10000,
      },
    },
  });
}

export async function updateDefaultChatSettings(userId, settings) {
  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      defaultSettings: settings,
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
      defaultSettings: defaultSettings,
    },
  });
  return result;
}

// ---------------------------------- Transactions ----------------------------------

export async function addTransaction(userId, total) {
  const result = await prisma.transactions.create({
    data: {
      userId,
      total,
      credits: total * 10000,
    },
  });
  return result;
}
