'use client';

import ChatInput from '@/components/chatInput';
import { useChat } from 'ai/react';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Messages from './messages';

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

  const [settings, setSettings] = useState(
    conversationSettings || defaultSettings,
  );

  const { messages, input, handleInputChange, handleSubmit, error, isLoading } =
    useChat({
      initialMessages,
      sendExtraMessageFields: true,
      body: {
        id,
        userId,
        newChat: pathname === '/chat',
        settings,
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
      <Messages
        messages={messages}
        settings={settings}
        error={error}
        inputRef={inputRef}
      />

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        isLoading={isLoading}
        settings={settings}
        setSettings={setSettings}
        started={messages.length > 0}
        messages={messages}
      />
    </>
  );
}
