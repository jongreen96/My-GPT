'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RadioGroup } from './ui/radio-group';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function AddCreditsForm({ credits }) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-baseline gap-2'>
        <p className='text-2xl font-semibold'>{credits.toLocaleString()}</p>
        <p>Credits</p>
      </div>

      <p className='text-lg font-semibold'>Add credits </p>

      <form
        action='/api/checkout_sessions'
        method='POST'
        className='flex flex-col'
      >
        <RadioGroup
          defaultValue='500'
          className='flex w-full flex-wrap justify-between'
        >
          <div className='flex items-center gap-2'>
            <Input
              type='radio'
              name='credits'
              id='500'
              value='500'
              defaultChecked
              required
              className='w-fit'
            />
            <label htmlFor='500' className='whitespace-nowrap'>
              5 million
            </label>
          </div>

          <div className='flex items-center gap-2'>
            <Input
              type='radio'
              name='credits'
              id='1000'
              value='1000'
              required
              className='w-fit'
            />
            <label htmlFor='1000' className='whitespace-nowrap'>
              10 million
            </label>
          </div>

          <div className='flex items-center gap-2'>
            <Input
              type='radio'
              name='credits'
              id='2000'
              value='2000'
              required
              className='w-fit'
            />
            <label htmlFor='2000' className='whitespace-nowrap'>
              20 million
            </label>
          </div>
        </RadioGroup>

        {/* <Input type='number' name='credits' min='5' step='1' /> */}
        <Button type='submit' role='link'>
          Add credits{' '}
        </Button>
      </form>
    </div>
  );
}
