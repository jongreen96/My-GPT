import { Button } from '@/components/ui/button';
import { getConversations } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs';
import { Loader2, MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';
import ConversationsSettings from './conversationsSettings';

export default async function Conversations() {
  const { userId } = auth();
  if (!userId) throw Error('UserId Not Found');

  const allConversations = await getConversations(userId);

  return (
    <div className='flex flex-col gap-2'>
      <Button size='icon' className='group-hover:hidden' asChild>
        <Link href='/chat'>
          <Plus size={20} className='group-hover:mr-2' />
          <p className='hidden group-hover:block'>New Conversation</p>
        </Link>
      </Button>

      <Button asChild className='hidden group-hover:flex'>
        <Link href='/chat'>
          <Plus size={20} className='group-hover:mr-2' />
          <p className='hidden group-hover:block'>New Conversation</p>
        </Link>
      </Button>

      <div className='no-scrollbar flex flex-col gap-2 overflow-hidden'>
        {allConversations.map((conversation) => (
          <div key={conversation.id}>
            <Button
              variant='secondary'
              asChild
              className='hidden justify-start group-hover:flex'
            >
              <div className='flex'>
                <Link href={`/chat/${conversation.id}`} className='flex grow'>
                  <MessageSquare size={20} className='mr-2' />
                  <p
                    title={conversation.subject}
                    className='max-w-48 overflow-hidden text-ellipsis'
                  >
                    {conversation.subject || (
                      <Loader2 size={20} className='animate-spin' />
                    )}
                  </p>
                </Link>
                <ConversationsSettings conversation={conversation} />
              </div>
            </Button>

            <Button
              variant='secondary'
              size='icon'
              asChild
              className='group-hover:hidden'
            >
              <Link href={`/chat/${conversation.id}`}>
                <MessageSquare size={20} />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
