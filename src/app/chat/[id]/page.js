import Chat from '@/components/chat';
import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function ChatPage({ params }) {
  const { userId } = auth();
  const initialMessages = await prisma.messages.findMany({
    where: {
      conversationId: params.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  if (!initialMessages.length) redirect('/chat');

  return (
    <div className='flex h-full flex-col justify-between'>
      <Chat initialMessages={initialMessages} userId={userId} id={params.id} />
    </div>
  );
}
