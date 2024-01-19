'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <Image
        src='/logo-light.svg'
        alt='my-gpt logo'
        width={40}
        height={40}
        className='dark:hidden'
      />
      <Image
        src='/logo-dark.svg'
        alt='my-gpt logo'
        width={40}
        height={40}
        className='hidden dark:block'
      />
    </>
  );
}
