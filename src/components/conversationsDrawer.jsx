'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConversationsDrawer({ conversations }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/chat')) setOpen(false);
  }, [pathname]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size='sm'>Conversations</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full'>
          <DrawerHeader>
            <DrawerTitle>Conversations</DrawerTitle>
          </DrawerHeader>
          {conversations}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
