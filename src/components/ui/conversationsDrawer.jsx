import { Button } from '@/components/ui/button';
import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function ConversationsDrawer() {
  const { userId } = auth();
  if (!userId) throw Error('UserId Not Found');

  const allConversations = await prisma.conversations.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className='flex max-h-[75svh] flex-col gap-2 px-2 pb-5'>
      <Button asChild className='group-hover:flex'>
        <Link href='/chat'>
          <Plus size={20} className='group-hover:mr-2' />
          <p className='group-hover:block'>New Conversation</p>
        </Link>
      </Button>

      <div className='no-scrollbar flex flex-col gap-2 overflow-scroll'>
        {allConversations.map((conversation) => (
          <div key={conversation.id}>
            <Button
              variant='outline'
              asChild
              className='justify-start group-hover:flex'
            >
              <Link
                href={`/chat/${conversation.id}`}
                className='w-full justify-center'
              >
                <p
                  title={conversation.subject}
                  className='max-w-full overflow-hidden text-ellipsis'
                >
                  {conversation.subject}
                </p>
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
