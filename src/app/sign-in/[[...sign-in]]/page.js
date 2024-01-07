import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <div className='flex h-full items-center justify-center'>
      <SignIn />
    </div>
  );
}
