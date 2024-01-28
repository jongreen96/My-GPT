'use client';

import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { User } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from './ui/button';
import ThemeToggleButton from './ui/themeToggle';

export default function AuthUI({ userId }) {
  const { theme } = useTheme();

  if (!userId)
    return (
      <>
        <div className='hidden h-full flex-col gap-2 sm:group-hover:flex'>
          <Button asChild>
            <Link href='/sign-in'>
              <User className='mr-2' />
              Sign In
            </Link>
          </Button>
          <Button asChild variant='secondary'>
            <Link href='/sign-up'>
              <User className='mr-2' />
              Sign Up
            </Link>
          </Button>
          <ThemeToggleButton className='mt-auto' />
        </div>
        <div className='hidden h-full flex-col gap-2 sm:flex sm:group-hover:hidden'>
          <Button asChild size='icon'>
            <Link href='/sign-in'>
              <User />
            </Link>
          </Button>
          <Button asChild size='icon' variant='secondary'>
            <Link href='/sign-up'>
              <User />
            </Link>
          </Button>
          <ThemeToggleButton className='mt-auto' />
        </div>
      </>
    );

  return (
    <div className='hidden w-full sm:flex sm:justify-between'>
      <UserButton
        afterSignOutUrl='/'
        appearance={{
          elements: {
            avatarBox: {
              width: 40,
              height: 40,
            },
          },
          baseTheme: theme === 'dark' ? dark : undefined,
        }}
      />
      <ThemeToggleButton className='hidden items-center justify-center group-hover:flex' />
    </div>
  );
}
