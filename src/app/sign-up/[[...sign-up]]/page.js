import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <div className='flex h-full items-center justify-center'>
      <SignUp />
    </div>
  );
}
