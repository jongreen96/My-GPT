'use server';

import {
  deleteConversation,
  updateConversationSubject,
} from '@/lib/db/queries';
import { generateSubject } from '@/lib/openAI';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export async function deleteConversationAction(formData) {
  const { userId } = auth();

  await deleteConversation(formData.get('conversationId'), userId);

  revalidatePath('/chat');
}

export async function updateConversationSubjectAction(formData) {
  const { userId } = auth();

  const subject = formData.get('generate')
    ? await generateSubject(formData.get('conversationId'))
    : formData.get('subject');

  if (subject.trim() === '') return;

  await updateConversationSubject(
    formData.get('conversationId'),
    userId,
    subject,
  );

  revalidatePath('/chat');
}

export async function createNewConversationSubject(conversationId) {
  const { userId } = auth();
  const subject = await generateSubject(conversationId);

  await updateConversationSubject(conversationId, userId, subject);

  revalidatePath('/chat');
}
