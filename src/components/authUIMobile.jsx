'use client';

import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import ConversationsDrawer from './conversationsDrawer';
import ConversationsMobile from './conversationsMobile';
import { Button } from './ui/button';
import ThemeToggleButton from './ui/themeToggle';

export default function AuthUIMobile({ userId }) {
  const { theme } = useTheme();

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
      <ConversationsDrawer conversations={<ConversationsMobile />} />
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
