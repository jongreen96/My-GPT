import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/ui/logo';
import { auth } from '@clerk/nextjs';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();
  if (userId) redirect('/chat');

  return (
    <main className='flex flex-col gap-24 pb-20'>
      <section className='relative flex min-h-[calc(100svh-55px)] flex-col items-center justify-center gap-2 overflow-hidden border-b-4 border-secondary p-2 shadow-2xl shadow-secondary sm:min-h-svh'>
        <h1 className='flex text-center text-5xl font-bold tracking-tighter sm:text-6xl'>
          All GPT models,
          <br /> no monthly subscription
        </h1>

        <p className='max-w-96 text-center text-brand'>
          Access all OpenAI&apos;s models without having to pay a monthly fee,
          simply pay for what you use.
        </p>

        <Button asChild className='w-3/4 max-w-64'>
          <Link href='/sign-up'>Get Started</Link>
        </Button>

        <Logo
          width={450}
          className='animate-slow-spin absolute -right-40 -top-20 -z-10 opacity-10'
        />

        <Button
          asChild
          variant='secondary'
          className='absolute bottom-0 rounded-xl rounded-b-none px-4'
        >
          <Link href='/#features'>
            <ArrowDown size={20} className='mr-2' />
            Learn more
          </Link>
        </Button>
      </section>

      <section
        id='features'
        className='mx-auto flex min-h-lvh max-w-7xl flex-col gap-12 p-2 pt-20'
      >
        <h2 className='text-center text-4xl font-bold tracking-tighter'>
          Features
        </h2>
        <div className='flex flex-wrap justify-center gap-2'>
          <Card className='w-full text-center md:max-w-80'>
            <CardHeader>
              <CardTitle>GPT-4o</CardTitle>

              <CardDescription>
                Access the latest GPT-4 model from OpenAI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Up to date with the latest models, including GPT-4o,
                OpenAI&apos;s new omni model!
              </p>
            </CardContent>
          </Card>

          <Card className='w-full text-center md:max-w-80'>
            <CardHeader>
              <CardTitle>DALL·E 3</CardTitle>

              <CardDescription>
                Generate images from text with all DALL·E models.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Cutting edge image generation from text with all DALL·E models.
              </p>
            </CardContent>
          </Card>

          <Card className='w-full text-center md:max-w-80'>
            <CardHeader>
              <CardTitle>Pay as you go</CardTitle>

              <CardDescription>
                Pay for what you use, no monthly subscription.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Get 100,000 tokens for free when you sign up.</p>
            </CardContent>
          </Card>
        </div>

        <div className='flex flex-col items-center justify-center gap-2 sm:flex-row'>
          <div className='space-y-4 text-center sm:text-left'>
            <h3 className='text-2xl font-bold tracking-tight'>
              Streamed Responses
            </h3>
            <p className='max-w-prose'>
              Stream responses as they are tokenized, allowing you to see the
              response as it&apos;s being generated. Guarenteeing the snappiest
              responses OpenAI has to offer.
              <br /> No more daily limits or wait lists.
            </p>
          </div>
          <video
            width={400}
            height={300}
            playsInline
            loop
            autoPlay
            muted
            className='w-full dark:hidden sm:w-2/5'
          >
            <source src='/my-gpt-response-stream.mp4' type='video/mp4' />
            Your browser does not support video.
          </video>
          <video
            width={400}
            height={300}
            playsInline
            loop
            autoPlay
            muted
            className='hidden w-full dark:block sm:w-2/5'
          >
            <source src='/my-gpt-response-stream-dark.mp4' type='video/mp4' />
            Your browser does not support video.
          </video>
        </div>

        <div className='flex flex-col-reverse items-center justify-center gap-6 sm:flex-row'>
          <Image
            src='/chatSettings-light.png'
            width={400}
            height={300}
            alt='Chat Settings'
            className='w-full dark:hidden sm:w-2/5'
          />
          <Image
            src='/chatSettings-dark.png'
            width={400}
            height={300}
            alt='Chat Settings'
            className='hidden w-full dark:block sm:w-2/5'
          />
          <div className='space-y-4 text-center sm:text-left'>
            <h3 className='text-2xl font-bold tracking-tight'>
              Fine Tune Models
            </h3>
            <p className='max-w-prose'>
              Customise your models to your needs, change the model, max tokens,
              temperature, top p, frequency penalty, presence penalty and more.
              Allowing you to get the best responses for your use case without
              any restrictions.
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-2 sm:flex-row'>
          <div className='space-y-4 text-center sm:text-left'>
            <h3 className='text-2xl font-bold tracking-tight'>
              Responsive Design
            </h3>
            <p className='max-w-prose'>
              Chat on any device, with a responsive design that works on mobile,
              tablet and desktop. Your conversations are synced across all your
              devices, so you can chat on the go and pick up where you left off
              on your desktop.
            </p>
          </div>
          <Image
            src='/responsive-design.png'
            width={400}
            height={300}
            alt='Chat Settings'
            className='w-full dark:hidden sm:w-2/5'
          />
          <Image
            src='/responsive-design-dark.png'
            width={400}
            height={300}
            alt='Chat Settings'
            className='hidden w-full dark:block sm:w-2/5'
          />
        </div>
      </section>

      <section className='flex flex-col items-center justify-center gap-4 p-2'>
        <h2 className='flex text-center text-4xl font-bold tracking-tighter sm:text-6xl'>
          So, the question is... <br />
          What are you waiting for?
        </h2>

        <Button asChild className='w-3/4 max-w-96'>
          <Link href='/sign-up'>Get Started</Link>
        </Button>

        <p className='max-w-prose text-center'>
          Sign up now and get 100,000 tokens to use for free!
          <br /> No card details required.
        </p>
      </section>
    </main>
  );
}
