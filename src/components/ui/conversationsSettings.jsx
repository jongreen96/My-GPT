'use client';

import { Button } from '@/components/ui/button';
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

export default function ConversationsSettings({ conversation }) {
  const router = useRouter();
  return (
    <div className='self-start'>
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

            <Button
              variant='destructive'
              onClick={() => deleteConversation(conversation, router)}
            >
              Delete
            </Button>
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
