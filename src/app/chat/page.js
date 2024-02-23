import Chat from '@/components/chat';
import { getUser } from '@/lib/db/queries';
import { defaultSettings } from '@/lib/openAI';
import { auth } from '@clerk/nextjs';
import { nanoid } from 'nanoid';

export const metadata = {
  title: 'Chat',
};

export default async function ChatPage() {
  const { userId } = auth();
  const user = await getUser(userId);
  const settings = user.defaultSettings || defaultSettings;

  return (
    <div className='flex h-full flex-col justify-between'>
      <Chat userId={userId} id={nanoid(10)} defaultSettings={settings} />
    </div>
  );
}
