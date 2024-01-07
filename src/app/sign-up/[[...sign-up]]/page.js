import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <div className='flex flex-col items-center py-6'>
      <SignUp />
    </div>
  );
}
