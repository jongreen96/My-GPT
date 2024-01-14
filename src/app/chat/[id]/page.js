import Chat from '@/components/chat';
import { getConversation, getMessages } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function ChatPage({ params }) {
  const { userId } = auth();
  const conversation = await getConversation(params.id);
  const initialMessages = await getMessages(params.id);
  if (!initialMessages.length) redirect('/chat');

  return (
    <div className='flex h-full flex-col justify-between'>
      <Chat
        initialMessages={initialMessages}
        userId={userId}
        id={params.id}
        conversationSettings={conversation.settings}
      />
    </div>
  );
}
