'use client';

import { Button } from '@/components/ui/button';
import NewConversationDialog from '@/components/ui/newConversationDialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function CreateNewConversation() {
  const [showNewConversationDialog, setShowNewConversationDialog] =
    useState(false);

  return (
    <>
      <Button
        size='icon'
        onClick={() => setShowNewConversationDialog(true)}
        className='group-hover:hidden'
      >
        <Plus size={20} className='group-hover:mr-2' />
        <p className='hidden group-hover:block'>New Conversation</p>
      </Button>

      <Button
        onClick={() => setShowNewConversationDialog(true)}
        className='hidden group-hover:flex'
      >
        <Plus size={20} className='group-hover:mr-2' />
        <p className='hidden group-hover:block'>New Conversation</p>
      </Button>

      <NewConversationDialog
        open={showNewConversationDialog}
        setOpen={setShowNewConversationDialog}
      />
    </>
  );
}
