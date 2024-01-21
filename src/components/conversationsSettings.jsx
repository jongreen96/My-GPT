'use client';

import {
  createNewConversationSubject,
  deleteConversationAction,
  updateConversationSubjectAction,
} from '@/app/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loadingButton';
import { IsDesktop } from '@/lib/hooks';
import { MoreVertical, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

export default function ConversationsSettings({ conversation }) {
  const isDesktop = IsDesktop();

  useEffect(() => {
    if (conversation.subject === '') {
      createNewConversationSubject(conversation.id);
    }
  }, [conversation.id, conversation.subject]);

  const innerContent = (
    <div className='flex flex-col gap-2'>
      <form action={updateConversationSubjectAction}>
        <Label htmlFor='subject'>Change conversation subject:</Label>
        <div className='flex gap-2'>
          <input type='hidden' name='conversationId' value={conversation.id} />
          <Input
            type='text'
            label='Subject'
            id='subject'
            name='subject'
            autoFocus={false}
            placeholder={conversation.subject}
          />

          <GenerateButton />
          <SaveButton />
        </div>
      </form>

      <form action={deleteConversationAction} className='mt-4 flex flex-col'>
        <input type='hidden' name='conversationId' value={conversation.id} />
        <Label htmlFor='subject'>Delete conversation:</Label>
        <DeleteButton />
      </form>
    </div>
  );

  if (isDesktop) {
    return (
      <div className='mt-[5px]'>
        <Dialog>
          <DialogTrigger>
            <MoreVertical size={20} className='text-brand' />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Conversation Settings</DialogTitle>

              <DialogDescription>
                Subject: {conversation.subject}
              </DialogDescription>

              {innerContent}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <MoreVertical size={20} className='text-brand' />
      </DrawerTrigger>
      <DrawerContent className='p-2'>
        <DrawerHeader>
          <DrawerTitle>Conversation Settings</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription>{conversation.subject}</DrawerDescription>

        {innerContent}
      </DrawerContent>
    </Drawer>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <LoadingButton
      loading={pending}
      type='submit'
      variant='destructive'
      className='mt-1'
    >
      Delete
    </LoadingButton>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <LoadingButton type='submit' loading={pending}>
      Save
    </LoadingButton>
  );
}

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <LoadingButton
      variant='shadow'
      size='icon'
      loading={pending}
      name='generate'
      value='true'
      autoFocus
      className='absolute right-[75px]'
    >
      <Sparkles size={20} className='text-brand' />
    </LoadingButton>
  );
}
