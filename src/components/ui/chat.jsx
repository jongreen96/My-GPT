'use client';

import ChatInput from '@/components/ui/chatInput';
import { useChat } from 'ai/react';
import { usePathname, useRouter } from 'next/navigation';
import { AssistantChatBubble, UserChatBubble } from './messageBubble';

export default function Chat({ initialMessages, userId, id }) {
  const router = useRouter();
  const pathname = usePathname();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    body: {
      id,
      userId,
    },
    onFinish: () => {
      if (pathname !== `/chat/${id}`) {
        router.push(`/chat/${id}`);
        router.refresh();
      }
    },
  });

  return (
    <>
      <section className='no-scrollbar flex w-full flex-grow flex-col gap-2 overflow-scroll p-2'>
        {messages.map((message) =>
          message.role === 'user' ? (
            <UserChatBubble message={message} key={message.id} />
          ) : (
            <AssistantChatBubble message={message} key={message.id} />
          ),
        )}
      </section>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
