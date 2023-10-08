import { PersonIcon } from '@radix-ui/react-icons';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/api/types';
import { Badge } from '@/components/ui/badge';

export function ProjectItem({ project }: { project: Project }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  return (
    <Link
      href={
        token
          ? `/projects/${project.id}`
          : `/login?${new URLSearchParams(
              `callbackUrl=/projects/${project.id}`,
            )}`
      }
      className="flex w-full max-w-6xl items-center gap-7 rounded-xl border border-border bg-card/90 p-4"
    >
      <div className="relative h-28 w-28 shrink-0">
        <Image
          src={
            project?.photos[0]?.url
              ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${project?.photos[0]?.url}`
              : '/assets/images/image-placeholder.jpg'
          }
          alt={project.name || 'placeholder image'}
          fill
          className="shrink-0 rounded-lg object-cover"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="mt-1 text-neutral-800 dark:text-neutral-100">
          {project.description}
        </p>

        <ul className="mt-2 flex flex-wrap items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="stroke-secondary-foreground"
          >
            <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z" />
            <path d="M6 9.01V9" />
            <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
          </svg>

          {project.tags.map((tag) => (
            <li key={tag.id}>
              <Badge variant="secondary">{tag.name}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="ml-auto self-start">
        <p className="mx-4 flex items-center text-lg font-medium text-neutral-500">
          <PersonIcon className="mr-2 fill-neutral-500 dark:fill-neutral-200" />{' '}
          {project.members_count}
        </p>
      </div>
    </Link>
  );
}
