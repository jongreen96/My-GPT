'use client';

import { IsDesktop } from '@/lib/hooks';
import { ImagePlusIcon, MessageSquarePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Conversation from './ui/conversation';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';

export default function Conversations({ allConversations }) {
  const isDesktop = IsDesktop();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/chat') || pathname.includes('/image'))
      setOpen(false);
  }, [pathname]);

  if (isDesktop) {
    return (
      <div className='flex min-h-0 flex-col gap-2'>
        <Button asChild className='shrink-0 justify-start group-hover:flex'>
          <Link href='/chat'>
            <MessageSquarePlusIcon size={20} className='group-hover:mr-2' />
            <p className='hidden group-hover:block'>New Conversation</p>
          </Link>
        </Button>

        <Button asChild className='shrink-0 justify-start group-hover:flex'>
          <Link href='/image'>
            <ImagePlusIcon size={20} className='group-hover:mr-2' />
            <p className='hidden group-hover:block'>New Image Generation</p>
          </Link>
        </Button>

        <div className='no-scrollbar flex flex-col gap-2 overflow-scroll'>
          {allConversations.map((conversation) => (
            <Conversation key={conversation.id} conversation={conversation} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size='sm'>Conversations</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex max-h-[75vh] w-full flex-col gap-2 p-2'>
          <DrawerHeader>
            <DrawerTitle>Conversations</DrawerTitle>
          </DrawerHeader>

          <Button asChild className='flex'>
            <Link href='/chat'>
              <MessageSquarePlusIcon size={20} className='mr-2' />
              <p>New Conversation</p>
            </Link>
          </Button>

          <Button asChild className='flex'>
            <Link href='/image'>
              <ImagePlusIcon size={20} className='mr-2' />
              <p>New Image Generation</p>
            </Link>
          </Button>

          <div className='no-scrollbar flex flex-col gap-2 overflow-scroll'>
            {allConversations.map((conversation) => (
              <Conversation key={conversation.id} conversation={conversation} />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
