import { getConversations } from '@/lib/db/queries';
import { UserButton, auth } from '@clerk/nextjs';
import { Settings, User } from 'lucide-react';
import Link from 'next/link';
import Conversations from './conversations';
import { Button } from './ui/button';
import Logo from './ui/logo';
import ThemeToggleButton from './ui/themeToggle';

export default async function Navbar() {
  const { userId } = auth();

  if (userId) {
    const allConversations = await getConversations(userId);

    return (
      <nav className='group fixed left-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b-2 border-secondary bg-muted p-2 sm:h-full sm:w-fit sm:flex-col sm:items-start sm:justify-normal sm:border-b-0 sm:border-r-2'>
        <Link href='/chat' className='flex items-center gap-2'>
          <Logo />

          <span className='text-lg font-bold tracking-tight text-brand sm:hidden sm:group-hover:block'>
            MY-GPT
          </span>
        </Link>

        <div className='flex items-center gap-2 sm:min-h-0 sm:w-full sm:grow sm:flex-col sm:items-start sm:justify-between'>
          <Conversations allConversations={allConversations} />
          <div className='flex gap-2 sm:flex-col'>
            <Button asChild size='icon' variant='shadow'>
              <Link href='/settings'>
                <Settings className='text-brand' />
              </Link>
            </Button>
            <UserButton
              afterSignOutUrl='/'
              appearance={{
                elements: {
                  avatarBox: {
                    width: 40,
                    height: 40,
                  },
                },
              }}
            />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className='group fixed left-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b-2 border-secondary bg-muted p-2 sm:h-full sm:w-fit sm:flex-col sm:items-start sm:justify-normal sm:border-b-0 sm:border-r-2'>
      <Link href='/' className='flex items-center gap-2'>
        <Logo />

        <span className='text-lg font-bold tracking-tight text-brand sm:hidden sm:group-hover:block'>
          MY-GPT
        </span>
      </Link>

      <div className='flex items-center gap-2 sm:w-full sm:grow sm:flex-col'>
        <ThemeToggleButton className='sm:hidden' />

        <Button
          asChild
          size='sm'
          className='hidden w-full p-0 sm:flex sm:group-hover:hidden'
        >
          <Link href='/sign-in'>
            <User />
          </Link>
        </Button>
        <Button
          asChild
          size='sm'
          className='hidden w-full p-0 sm:flex sm:group-hover:hidden'
        >
          <Link href='/sign-up'>
            <User />
          </Link>
        </Button>

        <Button
          asChild
          size='sm'
          className='sm:hidden sm:w-full sm:group-hover:flex'
        >
          <Link href='/sign-in'>Sign In</Link>
        </Button>
        <Button
          asChild
          size='sm'
          className='sm:hidden sm:w-full sm:group-hover:flex'
        >
          <Link href='/sign-up'>Sign Up</Link>
        </Button>
      </div>
      <ThemeToggleButton className='hidden sm:flex' />
    </nav>
  );
}
