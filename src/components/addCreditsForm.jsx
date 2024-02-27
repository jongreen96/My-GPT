'use client';

import { loadStripe } from '@stripe/stripe-js';
import { AlertCircle, CheckCircleIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import ProductCard from './ui/productCard';
import { RadioGroup } from './ui/radio-group';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function AddCreditsForm({ credits }) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between'>
        <div className='flex items-baseline gap-2'>
          <p className='text-2xl font-semibold'>{credits.toLocaleString()}</p>
          <p>Credits</p>
        </div>

        <AfterPaymentMessage />
      </div>

      <form
        action='/api/checkout_sessions'
        method='POST'
        className='flex flex-col gap-2'
      >
        <p className='text-lg font-semibold'>Add credits </p>
        <RadioGroup defaultValue='500' className='flex w-full justify-between'>
          <ProductCard price={500} />
          <ProductCard price={1000} />
          <ProductCard price={2000} />
        </RadioGroup>

        {/* <Input type='number' name='credits' min='5' step='1' /> */}
        <Button type='submit' role='link'>
          Add credits{' '}
        </Button>
      </form>
    </div>
  );
}

function AfterPaymentMessage() {
  const params = useSearchParams();

  if (params.get('success')) {
    return (
      <div className='flex items-center gap-2 text-green-500'>
        <CheckCircleIcon size={24} />
        <p>Payment Successful </p>
      </div>
    );
  }

  if (params.get('canceled')) {
    return (
      <div className='flex items-center gap-2 text-destructive'>
        <AlertCircle size={24} />
        <p>Payment Unsuccessful</p>
      </div>
    );
  }
}
