import Chat from '@/components/chat';
import { getUser } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs';
import { nanoid } from 'nanoid';

export const metadata = {
  title: 'Chat',
};

export default async function ChatPage() {
  const { userId } = auth();
  const user = await getUser(userId);
  const settings = user.defaultSettings || {
    model: 'gpt-3.5-turbo-0125',
    max_tokens: null,
    temperature: 1,
    response_format: null,
    frequency_penalty: 0,
    presence_penalty: 0,
    top_p: 1,
    system_message: '',
  };

  return (
    <div className='flex h-full flex-col justify-between'>
      <Chat userId={userId} id={nanoid(10)} defaultSettings={settings} />
    </div>
  );
}
