'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loadingButton';
import { IsDesktop } from '@/lib/hooks';
import { MoreVertical, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';

export default function ConversationsSettings({ conversation }) {
  const isDesktop = IsDesktop();

  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const router = useRouter();

  if (conversation.subject === '') {
    updateConversationSubject(conversation, '', router, true);
  }

  const innerContent = (
    <div className='flex flex-col gap-2'>
      <div>
        <Label htmlFor='subject'>Change conversation title:</Label>
        <div className='flex gap-2'>
          <Input
            type='text'
            label='Subject'
            id='subject'
            value={newSubject}
            autoFocus={false}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder={conversation.subject}
          />

          <LoadingButton
            variant='shadow'
            size='icon'
            loading={generating}
            autoFocus
            onClick={async () => {
              setGenerating(true);
              await updateConversationSubject(
                conversation,
                newSubject,
                router,
                true,
              )
                .then(() => setGenerating(false))
                .catch(() => setGenerating(false));
              setNewSubject('');
            }}
            className='absolute right-[75px]'
          >
            <Sparkles size={20} className='text-brand' />
          </LoadingButton>
          <LoadingButton
            loading={updating}
            onClick={async () => {
              if (newSubject === '') return;
              setUpdating(true);
              await updateConversationSubject(conversation, newSubject, router)
                .then(() => setUpdating(false))
                .catch(() => setUpdating(false));
              setNewSubject('');
            }}
          >
            Save
          </LoadingButton>
        </div>
      </div>

      <div className='mt-4 flex flex-col'>
        <Label htmlFor='subject'>Delete conversation:</Label>
        <LoadingButton
          variant='destructive'
          loading={deleting}
          onClick={() => {
            setDeleting(true);
            deleteConversation(conversation, router);
          }}
          className='mt-1'
        >
          Delete
        </LoadingButton>
      </div>
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

              <DialogDescription>{conversation.subject}</DialogDescription>

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

async function deleteConversation(conversation, router) {
  try {
    const res = await fetch(`/api/conversations`, {
      method: 'DELETE',
      body: JSON.stringify({ conversationId: conversation.id }),
    });
    if (!res.ok) throw Error('Failed to delete conversation');
    router.refresh();
  } catch (error) {
    console.error(error);
  }
}

async function updateConversationSubject(
  conversation,
  newSubject,
  router,
  generate,
) {
  const res = await fetch('/api/conversations', {
    method: 'PUT',
    body: JSON.stringify({
      conversationId: conversation.id,
      newSubject,
      generate,
    }),
  });
  if (!res.ok) throw Error('Failed to update subject');
  router.refresh();
}
