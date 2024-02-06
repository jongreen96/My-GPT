import { openAIModels } from '@/lib/openAI';
import { ImageIcon } from 'lucide-react';
import { useRef } from 'react';
import ImageTray from './imageTray';
import { Input } from './ui/input';

export default function ImageInput({ images, setImages, settings }) {
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
      <ImageTray images={images} setImages={setImages} />
      <label
        htmlFor='fileInput'
        className='flex aspect-square h-10 w-10 cursor-pointer items-center justify-center self-end rounded-full bg-primary text-white'
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
