import Chat from '@/components/chat';
import { getUser } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs';
import { nanoid } from 'nanoid';

export const metadata = {
  title: 'Chat',
};

export default async function ChatPage() {
  const { userId } = auth();
  const { defaultSettings } = await getUser(userId);

  return (
    <div className='flex h-full flex-col justify-between'>
      <Chat userId={userId} id={nanoid(10)} defaultSettings={defaultSettings} />
    </div>
  );
}
