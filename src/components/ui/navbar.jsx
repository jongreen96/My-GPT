import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/logo.png';
import { UserButton } from '@clerk/nextjs';

const userButtonAppearance = {
  elements: {
    avatarBox: {
      width: 38,
      height: 38,
    },
  },
};

export default function Navbar() {
  return (
    <nav className='group fixed left-0 flex max-h-[75svh] w-full flex-col gap-4 border-b-2 border-zinc-300 bg-zinc-200 p-2 sm:h-full sm:max-h-none sm:w-14 sm:justify-between sm:border-b-0 sm:border-r-2 sm:hover:h-full sm:hover:w-fit'>
      <div className='flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src={logo} alt='my-gpt logo' width={38} height={38} />
          <span className='text-lg font-bold group-hover:block sm:hidden'>
            MY-GPT
          </span>
        </Link>
        <div className='sm:hidden'>
          <UserButton afterSignOutUrl='/' appearance={userButtonAppearance} />
        </div>
      </div>
      <div className='hidden sm:flex'>
        <UserButton afterSignOutUrl='/' appearance={userButtonAppearance} />
      </div>
    </nav>
  );
}
