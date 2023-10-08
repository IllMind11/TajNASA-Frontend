import { CalendarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { useUser } from '@/api/common/use-user';
import { useProjectMember } from '@/api/members/use-project-member';
import { useProject } from '@/api/projects/use-project';
import { Badge } from '@/components/ui/badge';

import { ApproveMemberDialog } from './_components/approve-member-dialog';
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

  if (!project) return notFound();

  const date = new Date(project.project.created_at);

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
              <CalendarIcon /> {date.getDay()}-{date.getMonth()}-
              {date.getFullYear()}
            </p>

            {project.is_admin && (
              <DeleteProjectDialog project_id={project.project.id} />
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
                  <p className="line-clamp-1">
                    {m.user.firstname} {m.user.lastname}
                  </p>

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
      </div>
    </div>
  );
}
