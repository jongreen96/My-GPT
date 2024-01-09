'use client';

import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import TextAreaAuto from 'react-textarea-autosize';

export default function ChatInput({ input, handleInputChange, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className='fixed bottom-0 flex w-full gap-2 p-2 backdrop-blur sm:w-[calc(100%-56px)]'
    >
      <TextAreaAuto
        autoFocus
        maxRows={15}
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        className='flex w-full resize-none self-end rounded-md border border-input bg-background px-3 py-2 shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      />
      <Button size='icon' type='submit' className='self-end'>
        <SendHorizonal />
      </Button>
    </form>
  );
}
