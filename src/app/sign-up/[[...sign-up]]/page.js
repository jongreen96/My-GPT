'use client';

import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function SignUpPage() {
  const { theme } = useTheme();

  return (
    <div className='flex h-full flex-col items-center justify-center py-6'>
      <SignUp
        appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
        }}
      />
    </div>
  );
}
