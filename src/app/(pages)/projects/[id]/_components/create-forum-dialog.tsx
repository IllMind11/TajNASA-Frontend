'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateForumForm } from './create-forum-form';

type CreateForumDialogProps = {
  project_id?: number;
};

export function CreateForumDialog({ project_id }: CreateForumDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Create a forum</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a forum</DialogTitle>
        </DialogHeader>

        <CreateForumForm project_id={project_id} setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
