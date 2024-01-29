import ConversationsDesktop from '@/components/conversationsDesktop';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import AuthUI from './authUIDesktop';
import AuthUIMobile from './authUIMobile';
import ConversationsMobile from './conversationsMobile';
import Logo from './ui/logo';

export default function Navbar() {
  const { userId } = auth();

  return (
    <nav className='sm:max-100svh group fixed left-0 z-50 flex max-h-[75svh] w-full flex-col border-b-2 border-secondary bg-muted p-2 sm:h-full sm:max-h-full sm:w-fit sm:justify-between sm:border-b-0 sm:border-r-2 sm:hover:h-full sm:hover:w-fit'>
      <div className='flex items-center justify-between sm:self-start'>
        <Link href='/' className='flex items-center gap-2'>
          <Logo />

          <span className='text-lg font-bold tracking-tight text-brand sm:hidden sm:group-hover:block'>
            MY-GPT
          </span>
        </Link>

        {userId && (
          <AuthUIMobile userId={userId}>
            <ConversationsMobile />
          </AuthUIMobile>
        )}
      </div>
      <div className='hidden h-[calc(100%-46px)] flex-col justify-between gap-2 sm:flex'>
        {userId && (
          <div className='no-scrollbar hidden overflow-scroll sm:block'>
            <ConversationsDesktop />
          </div>
        )}

        <AuthUI userId={userId} />
      </div>
    </nav>
  );
}
