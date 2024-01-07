import CreateNewConversation from '@/components/ui/createNewConversation';
import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs';

export default function Conversations() {
  const { userId } = auth();
  if (!userId) throw Error('UserId Not Found');

  const allConversations = prisma.conversations.findMany({ where: { userId } });

  return (
    <div className='flex flex-col'>
      <CreateNewConversation />
      {JSON.stringify(allConversations)}
    </div>
  );
}
