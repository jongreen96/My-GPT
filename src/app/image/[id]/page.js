import Images from '@/components/imagePage';
import { getConversation, getMessages } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function ImagePage({ params }) {
  const { userId } = auth();
  const conversation = await getConversation(params.id, userId);
  const initialMessages = await getMessages(params.id);
  if (!initialMessages.length || !conversation) redirect('/image');
  if (conversation.type === 'chat') redirect(`/chat/${params.id}`);

  return (
    <div className='flex h-full flex-col justify-between'>
      <Images
        userId={userId}
        id={params.id}
        newChat={false}
        initialMessages={initialMessages}
        conversationSettings={conversation.settings}
      />
    </div>
  );
}
