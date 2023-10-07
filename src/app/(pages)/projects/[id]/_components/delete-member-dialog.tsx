'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDeleteMember } from '@/api/members/use-delete-member';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type DeleteDialogProps = {
  project_member_id: number;
};

export function DeleteMemberDialog({ project_member_id }: DeleteDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { mutate: deleteMember, isLoading } = useDeleteMember({
    onSuccess: () => {
      router.refresh();
      setOpen(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" className="px-2 py-0">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete the member?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isLoading}
            loading={isLoading}
            onClick={() => {
              deleteMember({
                project_member_id,
              });
            }}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
