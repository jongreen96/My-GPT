'use client';

import darkLogoSVG from '@/app/assets/logo-dark.svg';
import lightLogoSVG from '@/app/assets/logo-light.svg';
import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <Image
        src={lightLogoSVG}
        alt='my-gpt logo'
        width={38}
        height={38}
        className='dark:hidden'
      />
      <Image
        src={darkLogoSVG}
        alt='my-gpt logo'
        width={38}
        height={38}
        className='hidden dark:block'
      />
    </>
  );
}
