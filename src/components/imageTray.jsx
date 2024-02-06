import { XCircle } from 'lucide-react';
import Image from 'next/image';

export default function ImageTray({ images, setImages }) {
  if (images.length === 0) return null;
  return (
    <div className='fixed bottom-14 right-1 flex flex-col gap-2 rounded-lg border bg-muted p-2'>
      {images.map((image, index) => (
        <div key={index} className='relative'>
          <XCircle
            className='absolute -right-2 -top-2 z-10 cursor-pointer rounded-full bg-destructive text-white'
            onClick={() => {
              setImages((prev) => prev.filter((_, i) => i !== index));
            }}
          />
          <Image
            src={image}
            alt='image'
            width={50}
            height={50}
            className='w-20 shadow'
          />
        </div>
      ))}
    </div>
  );
}
