import Images from '@/components/imagePage';
import { getUser } from '@/lib/db/queries';
import { defaultSettings } from '@/lib/openAI';
import { auth } from '@clerk/nextjs';
import { nanoid } from 'nanoid';

export const metadata = {
  title: 'Image',
};

export default async function ImagePage() {
  const { userId } = auth();
  const user = await getUser(userId);
  if (!user) return null;

  const settings = user?.settings || defaultSettings;

  return (
    <div className='flex h-full flex-col justify-between'>
      <Images userId={userId} id={nanoid(10)} defaultSettings={settings} />
    </div>
  );
}
