import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();
  if (userId) redirect('/chat');

  return (
    <main className='flex h-full flex-col items-center justify-center '>
      <p>Home</p>
    </main>
  );
}
