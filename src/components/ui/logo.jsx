'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo(props) {
  return (
    <>
      <Image
        src='/logo-light.svg'
        alt='my-gpt logo'
        {...props}
        width={props.width || 40}
        height={props.height || 40}
        className={cn('dark:hidden', props.className)}
      />
      <Image
        src='/logo-dark.svg'
        alt='my-gpt logo'
        {...props}
        width={props.width || 40}
        height={props.height || 40}
        className={cn('hidden dark:block', props.className)}
      />
    </>
  );
}
