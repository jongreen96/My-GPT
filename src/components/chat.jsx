'use client';

import ChatInput from '@/components/chatInput';
import { useChat } from 'ai/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
    stop,
    data,
  } = useChat({
    initialMessages,
    sendExtraMessageFields: true,
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

  /*
    Absolutely despise this, but without it i'm a broken man
    who couldnt see the light at the end of the tunnel :(
  */
  useEffect(() => {
    if (data && data[data.length - 1]?.images.length > 0) {
      messages[messages.length - 2].images = data[data.length - 1].images;
    }
    if (data) data.length = 0;
  }, [data, messages]);

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
        stop={stop}
        settings={settings}
        setSettings={setSettings}
        started={messages.length > 0}
        messages={messages}
      />
    </>
  );
}
