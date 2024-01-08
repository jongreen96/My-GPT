import { Button } from '@/components/ui/button';
import CreateNewConversation from '@/components/ui/createNewConversation';
import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default async function Conversations() {
  const { userId } = auth();
  if (!userId) throw Error('UserId Not Found');

  const allConversations = await prisma.conversations.findMany({
    where: { userId },
  });

  return (
    <div className='flex flex-col gap-2'>
      <CreateNewConversation />
      {allConversations.map((conversation) => (
        <>
          <Button
            key={conversation.id}
            variant='outline'
            asChild
            className='hidden justify-start group-hover:flex'
          >
            <Link href={`/chat/${conversation.id}`}>
              <MessageSquare size={20} className='mr-2' />
              {conversation.subject}
            </Link>
          </Button>

          <Button
            key={conversation.id}
            variant='outline'
            size='icon'
            asChild
            className='group-hover:hidden'
          >
            <Link href={`/chat/${conversation.id}`}>
              <MessageSquare size={20} />
            </Link>
          </Button>
        </>
      ))}
    </div>
  );
}