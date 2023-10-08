'use client';

import { Pencil2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

import type { Education } from '@/api/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { AddSkillsForm } from './add-skills-form';

type EditSkillsDialogProps = {
  user_id: number;
  type: 'experience' | 'education';
  defaultValues?: Education;
};

export function EditSkillsDialog({
  user_id,
  type,
  defaultValues,
}: EditSkillsDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Pencil2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'education' ? 'Edit Education' : 'Edit Experience'}
          </DialogTitle>
        </DialogHeader>

        <AddSkillsForm
          setDialogOpen={setOpen}
          user_id={user_id}
          type={type}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
