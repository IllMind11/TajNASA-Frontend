/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import { DotFilledIcon, TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDeleteEducation } from '@/api/education/use-delete-education';
import { useDeleteExperience } from '@/api/experience/use-delete-experience';
import type { Education } from '@/api/types';
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

import { EditSkillsDialog } from './edit-skills-dialog';

type TimeLineProps = {
  timelines: Education[];
  type: 'experience' | 'education';
  user_id: number;
};

export function TimeLine({ timelines, type, user_id }: TimeLineProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { mutate: deleteEducation, isLoading: educationLoading } =
    useDeleteEducation({
      onSuccess: () => {
        setOpen(false);
        router.refresh();
      },
    });
  const { mutate: deleteExperience, isLoading: experienceLoading } =
    useDeleteExperience({
      onSuccess: () => {
        setOpen(false);
        router.refresh();
      },
    });

  return (
    <ol className="border-l border-neutral-300 dark:border-neutral-500">
      {timelines.map((timeline) => (
        <li
          key={timeline.id}
          className="flex items-center justify-between gap-4"
        >
          <div>
            <div className="flex-start flex items-center pt-3">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500" />
              <p className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-300">
                {timeline.from} <DotFilledIcon /> {timeline.to}
              </p>
            </div>
            <div className="mb-6 ml-4 mt-2">
              <h4 className="mb-1.5 text-xl font-semibold">{timeline.name}</h4>
              <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                {timeline.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <EditSkillsDialog
              type={type}
              user_id={user_id}
              defaultValues={timeline}
            />

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive">
                  <TrashIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Do you want to delete the{' '}
                    {type === 'education' ? 'education' : 'experience'}
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    loading={experienceLoading || educationLoading}
                    variant="destructive"
                    onClick={() => {
                      if (type === 'education') {
                        deleteEducation({ education_id: timeline.id });
                      }

                      if (type === 'experience') {
                        deleteExperience({ education_id: timeline.id });
                      }
                    }}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </li>
      ))}
    </ol>
  );
}
