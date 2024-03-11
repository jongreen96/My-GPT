import { useEffect, useRef } from 'react';
import MessageBubble from './ui/messageBubble';

export default function Messages({ messages, model, error, inputRef }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <section
      className='no-scrollbar flex w-full flex-grow flex-col items-center gap-2 overflow-y-auto'
      ref={scrollRef}
    >
      <div className='flex w-full max-w-7xl flex-col gap-2 p-2'>
        <p className='select-none text-center font-bold uppercase text-brand opacity-50'>
          {model}
        </p>

        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {error && (
          <MessageBubble
            message={{
              role: 'assistant',
              content:
                error.message ||
                'Sorry, something went wrong. Please refresh the page and try again.',
            }}
          />
        )}
      </div>
    </section>
  );
}
