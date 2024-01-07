import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <div className='flex flex-col items-center py-6'>
      <SignIn />
    </div>
  );
}
