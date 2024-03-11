'use client';

import { useRef, useState } from 'react';
import ImageGenerationInput from './imageGenerationInput';
import Messages from './messages';

export default function Images({
  userId,
  id,
  defaultSettings,
  initialMessages,
  conversationSettings,
}) {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMessages || []);
  const [settings, setSettings] = useState(
    conversationSettings || defaultSettings,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: input },
    ]);
    setInput('');
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
      />
    </>
  );
}
