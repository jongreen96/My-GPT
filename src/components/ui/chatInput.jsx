'use client';

import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import TextAreaAuto from 'react-textarea-autosize';

export default function ChatInput({ input, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className='flex gap-2 p-2 backdrop-blur'>
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
        className='flex w-full resize-none self-end rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      />
      <Button size='icon' type='submit' className='self-end'>
        <SendHorizonal />
      </Button>
    </form>
  );
}
