'use client';

import ChatSettingsPopover from '@/components/chatSettings';
import { SendHorizonal, Square } from 'lucide-react';
import TextAreaAuto from 'react-textarea-autosize';
import { Button } from './ui/button';
import LoadingButton from './ui/loadingButton';

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  inputRef,
  isLoading,
  stop,
  settings,
  setSettings,
  started,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className='sticky bottom-0 mx-auto flex w-full max-w-7xl gap-2 p-2'
    >
      {!started && (
        <ChatSettingsPopover settings={settings} setSettings={setSettings} />
      )}
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
        className='flex w-full resize-none self-end rounded-[20px] border border-input bg-background px-3 py-2 shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      />
      {isLoading ? (
        <Button
          size='icon'
          className='aspect-square self-end rounded-full'
          onClick={stop}
        >
          <Square />
        </Button>
      ) : (
        <LoadingButton
          size='icon'
          type='submit'
          loading={isLoading}
          className='aspect-square self-end rounded-full'
        >
          <SendHorizonal />
        </LoadingButton>
      )}
    </form>
  );
}
