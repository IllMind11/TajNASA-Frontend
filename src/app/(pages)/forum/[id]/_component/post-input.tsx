'use client';

import { PaperPlaneIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useParams, useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { useCreatePost } from '@/api/project-forum/post/use-create-post';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PostInputProps = {
  user_id?: number;
};

export function PostInput({ user_id }: PostInputProps) {
  const router = useRouter();
  const params: any = useParams();

  const [content, setContent] = useState('');

  const { mutate: createPost, isLoading } = useCreatePost({
    onSuccess: () => {
      router.refresh();
    },
  });

  function handlePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setContent('');
    createPost({ content, user_id, forum_id: params.id });
  }

  return (
    <form onSubmit={handlePost} className="flex items-center">
      <Input
        className="rounded-r-none rounded-t-none bg-background"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post something"
      />
      <Button type="submit" className="rounded-l-none rounded-t-none">
        {isLoading ? (
          <ReloadIcon className="animate-spin" />
        ) : (
          <PaperPlaneIcon />
        )}
      </Button>
    </form>
  );
}
