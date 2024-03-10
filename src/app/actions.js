'use server';

import {
  deleteConversation,
  updateConversationSubject,
  updateUserSettings,
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

export async function updateDefaultChatSettingsAction(formData) {
  const { userId } = auth();

  const settings = {
    model: formData.get('model'),
    top_p: parseFloat(formData.get('top_p')),
    system_message: formData.get('system_message'),
    max_tokens: parseInt(formData.get('max_tokens')) || null,
    response_format: formData.get('response_format') === 'on',
    temperature: parseFloat(formData.get('temperature')),
    presence_penalty: parseFloat(formData.get('presence_penalty')),
    frequency_penalty: parseFloat(formData.get('frequency_penalty')),
    high_res_vision: formData.get('high_res_vision') === 'on' ? true : false,
  };

  await updateUserSettings(userId, settings);

  revalidatePath('/settings');
}
