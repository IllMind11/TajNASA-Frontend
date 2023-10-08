import { CalendarIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { useUser } from '@/api/common/use-user';
import { useProjectMember } from '@/api/members/use-project-member';
import { useForums } from '@/api/project-forum/forum/use-forums';
import { useProject } from '@/api/projects/use-project';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { ApproveMemberDialog } from './_components/approve-member-dialog';
import { CreateForumDialog } from './_components/create-forum-dialog';
import { DeleteMemberDialog } from './_components/delete-member-dialog';
import { DeleteProjectDialog } from './_components/delete-project-dialog';
import { JoinButton } from './_components/join-button';

type ProjectPageProps = {
  params: {
    [key: string]: number;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const user = await useUser();
  const project = await useProject({ id: params.id });
  const member = await useProjectMember({
    project_id: params.id,
    member_id: user?.id,
  });

  const forums = await useForums({ project_id: project.project.id });

  if (!project) return notFound();

  return (
    <div className="container gap-5 lg:grid lg:grid-cols-7">
      <div className="col-span-5">
        <div className="flex gap-7 rounded-xl border border-border bg-card/90 p-5">
          <div className="relative h-14 w-14 shrink-0 lg:h-28 lg:w-28">
            <Image
              src={
                project.project?.photos[0]?.url
                  ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${project.project?.photos[0]?.url}`
                  : '/assets/images/image-placeholder.jpg'
              }
              alt={project.project.name}
              fill
              className="shrink-0 rounded-lg object-cover"
            />
          </div>

          <div>
            <h3 className="mt-2 text-xl font-semibold">
              {project.project.name}
            </h3>
            <p className="mt-2 text-neutral-800 dark:text-neutral-100">
              {project.project.description}
            </p>
          </div>
          {!project.is_admin && (
            <div className="ml-auto">
              <JoinButton
                is_member={!!member}
                member_status={member?.status}
                project_id={params.id}
                user_id={user?.id}
              />
            </div>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-card/90 p-5">
          <article
            className="prose prose-neutral max-w-none dark:prose-invert"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: project.project.content ?? '' }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3 lg:col-span-2 lg:mt-0">
        <div className="rounded-xl border border-border bg-card/90 p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="mb-2 inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
              <CalendarIcon />{' '}
              {format(new Date(project.project.created_at), 'd MMMM Y')}
            </p>

            {project.is_admin && (
              <div className="space-x-2">
                <Link href={`/projects/edit/${project.project.id}`}>
                  <Button variant="secondary" size="icon">
                    <Pencil2Icon />
                  </Button>
                </Link>
                <DeleteProjectDialog project_id={project.project.id} />
              </div>
            )}
          </div>

          <ul className="flex flex-wrap items-center gap-1">
            {project.project.tags.map((tag) => (
              <li key={tag.id}>
                <Badge>{tag.name}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card/90 p-5">
          <p className="mb-2 text-lg font-semibold">Members</p>

          <ul className="flex flex-col gap-2">
            {project.project.members.map((m) => (
              <li key={m.id}>
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href={`/user/${m.user_id}`}
                    className="line-clamp-1 underline-offset-4 hover:underline"
                  >
                    {m.user.firstname} {m.user.lastname}
                  </Link>

                  <div className="flex items-center gap-1">
                    {m?.type === '1' && (
                      <Badge variant="secondary">Owner</Badge>
                    )}

                    {project.is_admin && user?.id !== m?.user_id && (
                      <>
                        {m?.status === '0' && (
                          <ApproveMemberDialog
                            project_member_id={m.id}
                            project_id={params.id}
                            user_id={m.user_id}
                          />
                        )}

                        <DeleteMemberDialog project_member_id={m.id} />
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {forums.data.length || project.is_admin ? (
          <div className="rounded-xl border border-border bg-card/90 p-5">
            {project.is_admin && (
              <CreateForumDialog project_id={project.project.id} />
            )}

            {forums.data.length ? (
              <>
                <h5 className="my-3 text-lg font-semibold">Forums</h5>

                <ul className="flex flex-col gap-2">
                  {forums.data.map((forum) => (
                    <li key={forum.id}>
                      <Link href={`/forum/${forum.id}`}>
                        <Button className="w-full text-sm" variant="secondary">
                          {forum.name}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
