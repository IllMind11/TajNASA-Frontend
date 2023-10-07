'use client';

import { EyeOpenIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useApproveMember } from '@/api/members/use-approve-member';
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

type ApproveDialogProps = {
  project_id?: number;
  user_id?: number;
  project_member_id: number;
};

export function ApproveMemberDialog({
  project_member_id,
  project_id,
  user_id,
}: ApproveDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { mutate: approveMember, isLoading } = useApproveMember({
    onSuccess: () => {
      router.refresh();
      setOpen(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="px-2 py-0">
          <EyeOpenIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to add them as member?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isLoading}
            loading={isLoading}
            onClick={() => {
              approveMember({
                project_id,
                status: 1,
                type: 0,
                user_id,
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
