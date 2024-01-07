import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <div className='flex h-full flex-col items-center justify-center py-6'>
      <SignUp />
    </div>
  );
}
