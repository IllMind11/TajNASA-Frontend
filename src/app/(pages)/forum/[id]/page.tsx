import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import Link from 'next/link';

import { useUser } from '@/api/common/use-user';
import { useForum } from '@/api/project-forum/forum/use-forum';
import { usePosts } from '@/api/project-forum/post/use-posts';

import { PostInput } from './_component/post-input';

export default async function ForumPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await useUser();

  const forum = await useForum({ forum_id: Number(params.id) });
  const posts = await usePosts({ f: Number(params.id) });

  return (
    <div className="container relative my-4 flex min-h-[80vh] max-w-3xl flex-col rounded-xl border border-b-0 bg-background p-5">
      <h1 className="mb-4 text-center text-xl font-semibold">{forum.name}</h1>

      <ul className="flex flex-col items-start gap-3">
        {posts.data.map((post) => (
          <li
            key={post.id}
            className="flex w-fit flex-col gap-1 rounded-lg bg-accent px-4 py-2"
          >
            <div className="flex items-center justify-between gap-4">
              <Link href={`/user/${post.user_id}`}>
                <p className="text-sm text-neutral-600">
                  {post.user.firstname}
                </p>
              </Link>
              <p className="inline-flex items-center gap-1 text-sm text-neutral-400">
                <CalendarIcon />{' '}
                {format(new Date(post.created_at), 'd MMM y · kk:mm')}
              </p>
            </div>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-0 mx-auto mt-4 w-full self-center justify-self-center">
        <PostInput user_id={user?.id} />
      </div>
    </div>
  );
}
