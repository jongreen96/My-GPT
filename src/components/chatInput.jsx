'use client';

import ChatSettingsPopover from '@/components/chatSettings';
import { SendHorizonal, Square } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import TextAreaAuto from 'react-textarea-autosize';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const triggerFileInput = () => {
  //   fileInputRef.current.click();
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className='sticky bottom-0 mx-auto flex w-full max-w-7xl gap-2 p-2'
    >
      <ChatSettingsPopover
        settings={settings}
        setSettings={setSettings}
        started={started}
      />

      {image && ( // TODO: Add a way to remove the image and improve the UI, seperate into a new component
        <div className='fixed bottom-16 left-16'>
          <Image
            src={image}
            alt='image'
            width={50}
            height={50}
            className='h-20 w-20'
          />
        </div>
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
            if (!isLoading)
              handleSubmit(e, {
                data: {
                  image: image,
                },
              });
          }
        }}
        className='flex w-full resize-none self-end rounded-[20px] border border-input bg-background px-3 py-2 shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      />

      <Button
        asChild
        size='icon'
        className='aspect-square self-end rounded-full'
      >
        <Input
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          ref={fileInputRef}
        />
      </Button>

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
