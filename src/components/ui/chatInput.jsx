'use client';

import ChatSettingsPopover from '@/components/chatSettings';
import LoadingButton from '@/components/ui/loadingButton';
import { SendHorizonal } from 'lucide-react';
import TextAreaAuto from 'react-textarea-autosize';

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  inputRef,
  isLoading,
  settings,
  setSettings,
  started,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className='sticky bottom-0 mx-auto flex w-full max-w-7xl gap-2 p-2 backdrop-blur'
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
        className='flex w-full resize-none self-end rounded-md border border-input bg-background px-3 py-2 shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      />
      <LoadingButton
        loading={isLoading}
        size='icon'
        type='submit'
        className='aspect-square self-end text-white'
      >
        <SendHorizonal />
      </LoadingButton>
    </form>
  );
}
