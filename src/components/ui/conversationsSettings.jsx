'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingButton from './loadingButton';

export default function ConversationsSettings({ conversation }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  return (
    <div className='absolute right-4 self-start sm:static'>
      <Dialog>
        <DialogTrigger>
          <MoreVertical size={20} className='text-brand' />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conversation Settings</DialogTitle>
            <DialogDescription>
              <p>{conversation.subject}</p>
            </DialogDescription>

            <LoadingButton
              variant='destructive'
              loading={deleting}
              onClick={() => {
                setDeleting(true);
                deleteConversation(conversation, router);
              }}
            >
              Delete
            </LoadingButton>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

async function deleteConversation(conversation, router) {
  const res = await fetch(`/api/conversations`, {
    method: 'DELETE',
    body: JSON.stringify({ conversationId: conversation.id }),
  });
  if (!res.ok) throw Error('Failed to delete conversation');
  router.refresh();
}
