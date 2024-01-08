import Chat from '@/components/ui/chat';
import { auth } from '@clerk/nextjs';
import { nanoid } from 'nanoid';

export const metadata = {
  title: 'Chat',
};

export default function ChatPage() {
  const { userId } = auth();
  return (
    <div className='flex h-full flex-col justify-between'>
      <Chat userId={userId} id={nanoid(10)} />
    </div>
  );
}
