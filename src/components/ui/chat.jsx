'use client';

import ChatInput from '@/components/ui/chatInput';
import {
  AssistantChatBubble,
  UserChatBubble,
} from '@/components/ui/messageBubble';
import { useChat } from 'ai/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Chat({ initialMessages, userId, id }) {
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const { messages, input, handleInputChange, handleSubmit, error, isLoading } =
    useChat({
      initialMessages,
      body: {
        id,
        userId,
        newChat: pathname === '/chat',
      },
      onFinish: () => {
        if (pathname !== `/chat/${id}`) {
          router.push(`/chat/${id}`);
          router.refresh();
        }
      },
    });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <section
        className='no-scrollbar flex w-full flex-grow flex-col gap-2 overflow-y-auto p-2'
        ref={scrollRef}
      >
        {messages.map((message) =>
          message.role === 'user' ? (
            <UserChatBubble message={message} key={message.id} />
          ) : (
            <AssistantChatBubble message={message} key={message.id} />
          ),
        )}
        {error && (
          <AssistantChatBubble
            message={{
              role: 'assistant',
              content:
                'Sorry, something went wrong. Please refresh the page and try again.',
            }}
          />
        )}
      </section>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        isLoading={isLoading}
      />
    </>
  );
}
