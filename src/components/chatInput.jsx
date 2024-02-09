'use client';

import ChatSettingsPopover from '@/components/chatSettings';
import { SendHorizonal, Square } from 'lucide-react';
import { useState } from 'react';
import TextAreaAuto from 'react-textarea-autosize';
import ImageInput from './imageInput';
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
  const [images, setImages] = useState([]);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, { data: { images } });
        setImages([]);
      }}
      className='sticky bottom-0 mx-auto flex w-full max-w-7xl gap-2 p-2'
    >
      <ChatSettingsPopover
        settings={settings}
        setSettings={setSettings}
        started={started}
      />

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
            if (!isLoading) {
              handleSubmit(e, {
                data: {
                  images,
                },
              });
              setImages([]);
            }
          }
        }}
        className='flex w-full resize-none self-end rounded-[20px] border border-input bg-background px-3 py-2 shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      />

      <ImageInput images={images} setImages={setImages} settings={settings} />

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
