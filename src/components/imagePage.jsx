'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import ImageGenerationInput from './imageGenerationInput';
import Messages from './messages';

export default function Images({
  userId,
  id,
  defaultSettings,
  initialMessages,
  conversationSettings,
  newChat,
}) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMessages || []);
  const [settings, setSettings] = useState(
    conversationSettings || defaultSettings,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: input },
    ]);
    const prompt = input;
    setInput('');

    // fetch image

    const response = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        id,
        settings,
        prompt,
        newChat,
      }),
    });

    if (!response.ok) {
      const error = await response.text();

      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: error },
      ]);
      return;
    }

    if (newChat) {
      router.push(`/image/${id}`);
      router.refresh();
    }

    const { images } = await response.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'assistant', images },
    ]);

    setIsLoading(false);
  };

  return (
    <>
      <Messages
        messages={messages}
        model={settings.imageModel}
        inputRef={inputRef}
      />

      <ImageGenerationInput
        input={input}
        setInput={setInput}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        started={messages.length > 0}
        settings={settings}
        setSettings={setSettings}
      />
    </>
  );
}
