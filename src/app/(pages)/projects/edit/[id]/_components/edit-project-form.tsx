'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useEditProject } from '@/api/projects/use-edit-project';
import type { Project, Tag } from '@/api/types';
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
import { MultiSelect } from '@/components/ui/multi-select';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Required')
    .max(100, 'Title should be less than 100 characters'),

  description: z
    .string()
    .min(1, 'Required')
    .max(250, 'Description should be less than 250 characters'),

  content: z
    .string()
    .min(250, 'Detailed description should have at least 200 characters'),

  photo: z.any(),

  tags: z.number().array().nonempty({ message: 'Required' }),
});

type EditProjectFormProps = {
  tags: Tag[];
  project: Project;
};

export function EditProjectForm({ tags, project }: EditProjectFormProps) {
  const { mutate: EditProject, isLoading } = useEditProject();

  const imageRef = useRef<HTMLInputElement>(null);
  const projectTags = useMemo(() => {
    return tags.map((tag) => ({ value: tag.id, label: tag.name }));
  }, [tags]);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      content: project.content,
      photo: '',
      tags: project.tags.map((tag) => tag.id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    EditProject(
      {
        ...values,
        photo: imageRef?.current?.files?.[0] || null,
        project_id: project.id,
      },
      {
        onSuccess: () => {
          toast({ title: 'Project edited successfully' });
          window.location.href = `/projects/${project.id}`;
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
                  <Input
                    accept="image/*"
                    type="file"
                    {...field}
                    ref={imageRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={projectTags}
                    placeholder="Select Tags"
                    onChange={field.onChange}
                    value={field.value}
                  />
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
