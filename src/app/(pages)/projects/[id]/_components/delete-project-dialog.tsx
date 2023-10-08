'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDeleteProject } from '@/api/projects/use-delete-project';
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
  project_id: number;
};

export function DeleteProjectDialog({ project_id }: DeleteDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { mutate: deleteProject, isLoading } = useDeleteProject({
    onSuccess: () => {
      setOpen(false);
      router.replace('/profile');
      router.refresh();
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
          <AlertDialogTitle>
            Do you want to delete the project?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isLoading}
            loading={isLoading}
            onClick={() => {
              deleteProject({
                project_id,
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
