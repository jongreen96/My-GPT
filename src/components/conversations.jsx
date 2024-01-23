import { getConversations } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs';
import Conversation from './ui/conversation';

export default async function Conversations() {
  const { userId } = auth();

  const allConversations = await getConversations(userId);

  return allConversations.map((conversation) => (
    <Conversation key={conversation.id} conversation={conversation} />
  ));
}
