'use client';

import { SendHorizonal } from 'lucide-react';
import TextAreaAuto from 'react-textarea-autosize';
import LoadingButton from './loadingButton';

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  inputRef,
  isLoading,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className='sticky bottom-0 mx-auto flex w-full max-w-7xl gap-2 p-2 backdrop-blur'
    >
      <TextAreaAuto
        autoFocus
        maxRows={15}
        ref={inputRef}
        value={input}
        placeholder='Say something...'
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) handleSubmit(e);
          }
        }}
        className='flex w-full resize-none self-end rounded-md border border-input bg-background px-3 py-2 shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      />
      <LoadingButton
        loading={isLoading}
        size='icon'
        type='submit'
        className='self-end text-white'
      >
        <SendHorizonal />
      </LoadingButton>
    </form>
  );
}
