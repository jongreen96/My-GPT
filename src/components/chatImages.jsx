import Image from 'next/image';

export default function ChatImages({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className='ml-auto flex max-w-[90%] flex-wrap justify-end gap-2'>
      {images.map((image) => {
        return (
          <Image
            key={image}
            src={image}
            width={350}
            height={350}
            alt='user image'
            className='h-min w-min rounded-lg'
          />
        );
      })}
    </div>
  );
}
