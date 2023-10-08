import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateForum } from '@/api/project-forum/forum/use-create-forum';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(1, 'Required'),
});

type CreateForumProps = {
  project_id?: number;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreateForumForm({
  project_id,
  setDialogOpen,
}: CreateForumProps) {
  const router = useRouter();

  const { mutate: createForum, isLoading } = useCreateForum({
    onSuccess: () => {
      router.refresh();
      setDialogOpen(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createForum({
      ...values,
      project_id: Number(project_id),
    });
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
        </div>

        <Button
          loading={isLoading}
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
