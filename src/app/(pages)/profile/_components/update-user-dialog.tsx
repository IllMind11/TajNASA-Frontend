'use client';

import { Pencil1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

import type { User } from '@/api/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { UpdateUserForm } from './update-user-form';

export function UpdateUserDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Edit <Pencil1Icon className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <UpdateUserForm user={user} setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
