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
import LoadingButton from '@/components/ui/loadingButton';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Label } from './ui/label';

export default function ConversationsSettings({ conversation }) {
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [newSubject, setNewSubject] = useState('');
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

            <div className='flex flex-col gap-2'>
              <div>
                <Label htmlFor='subject'>Change conversation title:</Label>
                <div className='flex gap-2'>
                  <Input
                    type='text'
                    label='Subject'
                    id='subject'
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder={conversation.subject}
                  />
                  <LoadingButton
                    loading={updating}
                    onClick={async () => {
                      setUpdating(true);
                      await updateConversationSubject(
                        conversation,
                        newSubject,
                        router,
                      )
                        .then(() => setUpdating(false))
                        .catch(() => setUpdating(false));
                    }}
                  >
                    Save
                  </LoadingButton>
                </div>
              </div>

              <div className='mt-10 flex flex-col'>
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

async function updateConversationSubject(conversation, newSubject, router) {
  const res = await fetch('/api/conversations', {
    method: 'PUT',
    body: JSON.stringify({ conversationId: conversation.id, newSubject }),
  });
  if (!res.ok) throw Error('Failed to update subject');
  router.refresh();
}
