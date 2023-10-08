import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateEducation } from '@/api/education/use-create-education';
import { useEditEducation } from '@/api/education/use-edit-education';
import { useCreateExperience } from '@/api/experience/use-create-experience';
import { useEditExperience } from '@/api/experience/use-edit-experience';
import type { Education } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, 'Required'),

  description: z.string().min(1, 'Required'),

  from: z.date(),

  to: z.date(),
});

type UpdateUserFormProps = {
  user_id: number;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  type: 'experience' | 'education';
  defaultValues?: Education;
};

export function AddSkillsForm({
  user_id,
  setDialogOpen,
  type,
  defaultValues,
}: UpdateUserFormProps) {
  const router = useRouter();

  const { mutate: createEducation, isLoading: educationLoading } =
    useCreateEducation({
      onSuccess: () => {
        router.refresh();
        setDialogOpen(false);
      },
    });

  const { mutate: createExperience, isLoading: experienceLoading } =
    useCreateExperience({
      onSuccess: () => {
        router.refresh();
        setDialogOpen(false);
      },
    });

  const { mutate: editExperience, isLoading: editExperienceLoading } =
    useEditExperience({
      onSuccess: () => {
        router.refresh();
        setDialogOpen(false);
      },
    });

  const { mutate: editEducation, isLoading: editEducationLoading } =
    useEditEducation({
      onSuccess: () => {
        router.refresh();
        setDialogOpen(false);
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      from: defaultValues?.from ? new Date(defaultValues.from) : undefined,
      to: defaultValues?.to ? new Date(defaultValues.to) : undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === 'education' && defaultValues) {
      return editEducation({
        ...values,
        from: format(values.from, 'yyyy-M-d'),
        to: format(values.to, 'yyyy-M-d'),
        user_id,
        education_id: defaultValues.id,
      });
    }

    if (type === 'experience' && defaultValues) {
      return editExperience({
        ...values,
        from: format(values.from, 'yyyy-M-d'),
        to: format(values.to, 'yyyy-M-d'),
        user_id,
        experience_id: defaultValues.id,
      });
    }

    if (type === 'education') {
      return createEducation({
        ...values,
        from: format(values.from, 'yyyy-M-d'),
        to: format(values.to, 'yyyy-M-d'),
        user_id,
      });
    }

    if (type === 'experience') {
      return createExperience({
        ...values,
        from: format(values.from, 'yyyy-M-d'),
        to: format(values.to, 'yyyy-M-d'),
        user_id,
      });
    }

    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>From Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={field.onChange}
                        fromYear={1960}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>To Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={field.onChange}
                        fromYear={1960}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          loading={
            educationLoading ||
            experienceLoading ||
            editExperienceLoading ||
            editEducationLoading
          }
          size="lg"
          variant="outline"
          className="mt-6 w-full font-semibold"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
