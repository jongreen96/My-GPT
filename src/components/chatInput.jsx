'use client';

import ChatSettingsPopover from '@/components/chatSettings';
import { SendHorizonal, Square } from 'lucide-react';
import { useEffect, useState } from 'react';
import TextAreaAuto from 'react-textarea-autosize';
import ImageInput from './imageInput';
import ImageTray from './imageTray';
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
  messages,
}) {
  const [images, setImages] = useState([]);
  const [tempImages, setTempImages] = useState([]);

  useEffect(() => {
    if (isLoading && messages[messages.length - 1]?.role === 'user') {
      messages[messages.length - 1].images = tempImages;
    }
  }, [isLoading]);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, { data: { images } });
        setTempImages(images);
        setImages([]);
      }}
      className='sticky bottom-0 mx-auto flex w-full max-w-7xl gap-2 p-2'
    >
      <ChatSettingsPopover
        settings={settings}
        setSettings={setSettings}
        started={started}
      />

      <div className='flex w-full min-w-0 flex-col rounded-[20px] border border-input bg-background px-3 py-2 shadow'>
        <ImageTray images={images} setImages={setImages} />

        <div className='flex gap-2'>
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
                  setTempImages(images);
                  setImages([]);
                }
              }
            }}
            className='grow resize-none bg-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          />
          <ImageInput
            images={images}
            setImages={setImages}
            settings={settings}
          />
        </div>
      </div>

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
