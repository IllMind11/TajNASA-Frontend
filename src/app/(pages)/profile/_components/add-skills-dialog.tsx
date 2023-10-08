'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { AddSkillsForm } from './add-skills-form';

type AddSkillsDialogProps = {
  user_id: number;
  type: 'experience' | 'education';
};

export function AddSkillsDialog({ user_id, type }: AddSkillsDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          {type === 'education' ? 'Add Education' : 'Add Experience'}
          <PlusIcon className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'education' ? 'Add Education' : 'Add Experience'}
          </DialogTitle>
        </DialogHeader>

        <AddSkillsForm setDialogOpen={setOpen} user_id={user_id} type={type} />
      </DialogContent>
    </Dialog>
  );
}
