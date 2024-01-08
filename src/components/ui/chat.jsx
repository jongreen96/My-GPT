'use client';

import ChatInput from '@/components/ui/chatInput';
import { useChat } from 'ai/react';
import { usePathname, useRouter } from 'next/navigation';

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
            <div
              key={message.id}
              className='flex w-fit flex-col self-end rounded-lg rounded-br-none bg-primary p-2'
            >
              <span className='text-white'>{message.content}</span>
            </div>
          ) : (
            <div
              key={message.id}
              className='flex w-fit flex-col rounded-lg rounded-bl-none bg-neutral-600 p-2'
            >
              <span className='whitespace-pre-wrap text-white'>
                {message.content}
              </span>
            </div>
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
