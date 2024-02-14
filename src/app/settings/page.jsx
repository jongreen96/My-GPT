import DefaultSettingsForm from '@/components/defaultSettingsForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getUser } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js';

export const metadata = {
  title: 'Settings',
  description: 'Change your settings',
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default async function SettingsPage() {
  const { userId } = auth();
  const user = await getUser(userId);

  return (
    <div className='mx-auto flex max-w-7xl flex-col gap-8 p-2 pt-10'>
      <h1 className='text-center text-4xl font-bold tracking-tighter sm:text-left'>
        Settings
      </h1>

      <section className='flex flex-col gap-2 sm:flex-row'>
        <Card className='w-full'>
          <CardHeader className='text-center sm:text-left'>
            <CardTitle>Credits</CardTitle>
            <CardDescription>Manage your credits</CardDescription>
          </CardHeader>

          <CardContent>
            <div className='flex items-baseline gap-2'>
              <p className='text-2xl font-semibold'>{user.credits}</p>
              <p>Credits</p>
            </div>

            <div className='mt-6'>
              <p className='text-lg font-semibold'>Add credits</p>
              <form action='/api/checkout_sessions' method='POST'>
                <Button type='submit' role='link' className='w-full'>
                  Add credits
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card className='w-full'>
          <CardHeader className='text-center sm:text-left'>
            <CardTitle>Defaults</CardTitle>
            <CardDescription>Manage your default settings</CardDescription>
          </CardHeader>

          <CardContent>
            <DefaultSettingsForm user={user} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
