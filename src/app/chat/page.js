import Chat from '@/components/chat';
import { getUser } from '@/lib/db/queries';
import { defaultSettings } from '@/lib/openAI';
import { auth } from '@clerk/nextjs';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

export const metadata = {
  title: 'Chat',
};

export default async function ChatPage() {
  const router = useRouter();
  const { userId } = auth();
  const user = await getUser(userId);
  if (!user) router.refresh();

  const settings = user?.settings || defaultSettings;

  return (
    <div className='flex h-full flex-col justify-between'>
      <Chat userId={userId} id={nanoid(10)} defaultSettings={settings} />
    </div>
  );
}
