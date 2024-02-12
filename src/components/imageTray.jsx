import { XCircle } from 'lucide-react';
import Image from 'next/image';

export default function ImageTray({ images, setImages }) {
  if (images.length === 0) return null;
  return (
    <>
      <div className='horizontal-scroll flex h-20 gap-2 overflow-x-scroll p-2'>
        {images.map((image, index) => (
          <div key={index} className='relative h-full flex-none'>
            <XCircle
              className='absolute -right-2 -top-2 z-10 cursor-pointer rounded-full bg-destructive text-white'
              onClick={() => {
                setImages((prev) => prev.filter((_, i) => i !== index));
              }}
            />
            <Image
              src={image}
              alt='image'
              width={80}
              height={80}
              className='h-full object-cover shadow sm:w-full'
            />
          </div>
        ))}
      </div>
      <div className='my-2 h-[1px] w-full bg-secondary'></div>
    </>
  );
}
