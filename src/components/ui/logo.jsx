'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <Image
        src='/logo-light.svg'
        alt='my-gpt logo'
        width={38}
        height={38}
        className='dark:hidden'
      />
      <Image
        src='/logo-dark.svg'
        alt='my-gpt logo'
        width={38}
        height={38}
        className='hidden dark:block'
      />
    </>
  );
}
