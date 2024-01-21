import { Loader2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import ConversationsSettings from '../conversationsSettings';
import { Button } from './button';

export default function Conversation({ conversation }) {
  return (
    <Button
      variant='secondary'
      asChild
      className='justify-start group-hover:flex'
    >
      <div className='flex'>
        <Link
          href={`/chat/${conversation.id}`}
          className='flex grow overflow-clip'
        >
          <MessageSquare
            size={20}
            className='mr-2 shrink-0 sm:mr-0 sm:group-hover:mr-2'
          />
          <p
            title={conversation.subject}
            className='overflow-hidden text-ellipsis sm:hidden sm:max-w-48 sm:group-hover:block'
          >
            {conversation.subject || (
              <Loader2 size={20} className='animate-spin' />
            )}
          </p>
        </Link>
        <ConversationsSettings conversation={conversation} />
      </div>
    </Button>
  );
}
