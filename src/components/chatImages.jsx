export default function ChatImages({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className='ml-auto flex w-full max-w-[90%] flex-wrap justify-end gap-2 rounded-lg'>
      {images.map((image) => {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image}
            src={image}
            alt='user image'
            className='max-h-625 h-min w-full self-center rounded-lg sm:w-[373px]'
          />
        );
      })}
    </div>
  );
}
