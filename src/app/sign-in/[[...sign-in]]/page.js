import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <div className='flex h-full flex-col items-center justify-center py-6'>
      <SignIn />
    </div>
  );
}
