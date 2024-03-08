/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

export default function ChatImages({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className='ml-auto flex w-full max-w-[90%] flex-wrap justify-end gap-2 rounded-lg'>
      {images.map((image) => {
        return (
          <Dialog key={image}>
            <DialogTrigger asChild>
              <img
                src={image}
                alt='user image'
                className='w-full self-center rounded-lg sm:w-[186px]'
              />
            </DialogTrigger>
            <DialogContent className='w-fit max-w-[95dvh] overflow-hidden rounded-lg border-0 p-0'>
              <img src={image} alt='user image' className='' />
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
