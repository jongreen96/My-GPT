'use client';

import ChatInput from '@/components/ui/chatInput';
import MessageBubble from '@/components/ui/messageBubble';
import { useChat } from 'ai/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Chat({
  initialMessages,
  userId,
  id,
  defaultSettings,
  conversationSettings,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const [settings, setSettings] = useState(defaultSettings);

  const { messages, input, handleInputChange, handleSubmit, error, isLoading } =
    useChat({
      initialMessages,
      body: {
        id,
        userId,
        newChat: pathname === '/chat',
        settings: conversationSettings || settings,
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
        className='no-scrollbar flex w-full flex-grow flex-col items-center gap-2 overflow-y-auto'
        ref={scrollRef}
      >
        <div className='flex w-full max-w-7xl flex-col gap-2 p-2'>
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {error && (
            <MessageBubble
              message={{
                role: 'assistant',
                content:
                  'Sorry, something went wrong. Please refresh the page and try again.',
              }}
            />
          )}
        </div>
      </section>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        isLoading={isLoading}
        settings={settings}
        setSettings={setSettings}
        pathname={pathname}
        started={messages.length > 0}
      />
    </>
  );
}

// TODO: Add Stop button to responses
