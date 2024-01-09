import logo from '@/app/assets/logo.png';
import { Button } from '@/components/ui/button';
import Conversations from '@/components/ui/conversations';
import ConversationsDrawer from '@/components/ui/conversationsDrawer';
import OpenConversations from '@/components/ui/openConversations';
import { UserButton, auth } from '@clerk/nextjs';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const { userId } = auth();

  return (
    <nav className='sm:max-100svh group fixed left-0 z-50 flex max-h-[75svh] w-full flex-col gap-4 border-b-2 border-secondary bg-muted p-[7px] sm:h-full sm:max-h-full sm:w-14 sm:items-center sm:justify-between sm:border-b-0 sm:border-r-2 sm:hover:h-full sm:hover:w-fit'>
      <div className='flex items-center justify-between sm:self-start'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src={logo} alt='my-gpt logo' width={38} height={38} />

          <span className='text-brand text-lg font-bold tracking-tight sm:hidden sm:group-hover:block'>
            MY-GPT
          </span>
        </Link>

        <AuthUIMobile userId={userId} />
      </div>
      <div className='hidden h-[calc(100%-46px)] flex-col justify-between gap-2 pb-2 sm:flex'>
        {userId && (
          <div className='no-scrollbar hidden overflow-scroll sm:block'>
            <Conversations />
          </div>
        )}

        <AuthUI userId={userId} />
      </div>
    </nav>
  );
}

const userButtonAppearance = {
  elements: {
    avatarBox: {
      width: 38,
      height: 38,
    },
  },
};

function AuthUI({ userId }) {
  if (!userId)
    return (
      <>
        <div className='hidden flex-col gap-2 sm:group-hover:flex'>
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
        </div>
        <div className='hidden flex-col gap-2 sm:flex sm:group-hover:hidden'>
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
        </div>
      </>
    );

  return (
    <div className='hidden self-start sm:flex'>
      <UserButton afterSignOutUrl='/' appearance={userButtonAppearance} />
    </div>
  );
}

function AuthUIMobile({ userId }) {
  if (!userId)
    return (
      <div className='flex gap-2 sm:hidden'>
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
      <OpenConversations conversations={<ConversationsDrawer />} />
      <UserButton afterSignOutUrl='/' appearance={userButtonAppearance} />
    </div>
  );
}
