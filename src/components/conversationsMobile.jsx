import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Conversations from './conversations';

export default async function ConversationsMobile() {
  const { userId } = auth();
  if (!userId) throw Error('UserId Not Found');

  return (
    <div className='flex max-h-[75svh] flex-col gap-2 px-2 pb-5'>
      <Button asChild className='group-hover:flex'>
        <Link href='/chat'>
          <Plus size={20} className='group-hover:mr-2' />
          <p className='group-hover:block'>New Conversation</p>
        </Link>
      </Button>

      <div className='no-scrollbar flex flex-col gap-2 overflow-scroll'>
        <Conversations />
      </div>
    </div>
  );
}
