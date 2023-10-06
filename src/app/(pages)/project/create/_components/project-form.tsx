'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateProject } from '@/api/projects/use-create-project';
import { RichTextEditor } from '@/components/editor';
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
  name: z
    .string()
    .min(1, 'Required')
    .max(100, 'Title should be less than 100 characters'),

  description: z
    .string()
    .min(1, 'Required')
    .max(200, 'Description should be less than 200 characters'),

  content: z
    .string()
    .min(250, 'Detailed description should have at least 200 characters'),

  photo: z.string().min(1, 'Required'),
});

export function ProjectForm() {
  const router = useRouter();
  const { mutate: createProject, isLoading } = useCreateProject();

  const imageRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      content: '',
      photo: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProject(
      { ...values, photo: imageRef?.current?.files?.[0] },
      {
        onSuccess: () => {
          router.replace('/');
          router.refresh();
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
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
                <FormLabel>Short description of the project</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed description of the project</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" {...field} ref={imageRef} />
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
