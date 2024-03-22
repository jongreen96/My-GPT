/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

export default function ChatImages({ images, role }) {
  if (!images || images.length === 0) return null;

  return (
    <div
      className={cn(
        'flex w-full max-w-[90%] flex-wrap gap-2 rounded-lg',
        role === 'user' && 'ml-auto justify-end ',
        role === 'assistant' && 'mr-auto',
      )}
    >
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
            <DialogContent className='max-h-[95%] w-max overflow-hidden border-0 p-0 sm:max-w-[95%] sm:rounded-lg'>
              <img
                src={image}
                alt='user image'
                className='max-h-[90dvh] max-w-[90dvw]'
              />
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
