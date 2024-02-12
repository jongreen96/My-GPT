import { XCircle } from 'lucide-react';
import Image from 'next/image';

export default function ImageTray({ images, setImages }) {
  if (images.length === 0) return null;
  return (
    <>
      <div className='no-scrollbar relative flex items-center gap-2 overflow-scroll p-2'>
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
              width={80}
              height={80}
              className='min-w-10 shadow'
            />
          </div>
        ))}
      </div>
      <div className='my-2 h-[1px] w-full bg-secondary'></div>
    </>
  );
}
