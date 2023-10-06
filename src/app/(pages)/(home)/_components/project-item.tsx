import { PersonIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/api/types';

export function ProjectItem({ project }: { project: Project }) {
  return (
    <Link
      href={`/project/${project.id}`}
      className="flex w-full max-w-6xl items-center gap-7 rounded-xl border border-border bg-card/90 p-4"
    >
      <div className="relative h-28 w-28">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${project?.photos[0]?.url}`}
          alt={project.name}
          fill
          className="shrink-0 rounded-lg object-cover"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="mt-1 text-neutral-800">{project.description}</p>
      </div>

      <div className="ml-auto self-start">
        <p className="mx-4 flex items-center text-lg font-medium text-neutral-500">
          <PersonIcon className="mr-2 fill-neutral-500" />{' '}
          {project.members_count}
        </p>
      </div>
    </Link>
  );
}
