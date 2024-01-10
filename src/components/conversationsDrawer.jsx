'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export default function ConversationsDrawer({ conversations }) {
  return (
    <Drawer>
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
