'use client';

import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import ThemeToggleButton from './ui/themeToggle';

export default function AuthUIMobile({ userId, children }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/chat')) setOpen(false);
  }, [pathname]);

  if (!userId)
    return (
      <div className='flex items-center gap-2 sm:hidden'>
        <ThemeToggleButton className='items-center justify-center' />
        <Button asChild size='sm'>
          <Link href='/sign-in'>Sign In</Link>
        </Button>
        <Button asChild size='sm' variant='secondary'>
          <Link href='/sign-up'>Sign Up</Link>
        </Button>
      </div>
    );

  return (
    <div className='flex items-center gap-2 sm:hidden'>
      <ThemeToggleButton />

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size='sm'>Conversations</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto w-full'>
            <DrawerHeader>
              <DrawerTitle>Conversations</DrawerTitle>
            </DrawerHeader>
            {children}
          </div>
        </DrawerContent>
      </Drawer>

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
    </div>
  );
}
