import { openAIModels } from '@/lib/openAI';
import { ImageIcon } from 'lucide-react';
import { useRef } from 'react';
import { Input } from './ui/input';

export default function ImageInput({ setImages, settings }) {
  const fileInputRef = useRef();
  if (openAIModels[settings.model].type !== 'vision') return null;

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };

      reader.readAsDataURL(files[i]);
    }
  };

  return (
    <>
      <label
        htmlFor='fileInput'
        className='flex aspect-square cursor-pointer items-center justify-center self-end rounded-full text-brand'
      >
        <span className='icon-button'>
          <ImageIcon size={24} />
        </span>
      </label>
      <Input
        id='fileInput'
        type='file'
        accept='image/*'
        multiple
        onChange={handleImageUpload}
        ref={fileInputRef}
        className='hidden'
      />
    </>
  );
}
