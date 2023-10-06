import { CheckIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { useUser } from '@/api/common/use-user';
import { useProject } from '@/api/projects/use-project';
import { useProjectMember } from '@/api/projects/use-project-member';
import { useProjectMembers } from '@/api/projects/use-project-members';
import { Button } from '@/components/ui/button';

import { JoinButton } from './_components/join-button';

type ProjectPageProps = {
  params: {
    [key: string]: number;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const user = await useUser();
  const project = await useProject({ id: params.id });
  const members = await useProjectMembers({ id: params.id });
  const member = await useProjectMember({
    project_id: params.id,
    member_id: user?.id,
  });

  return (
    <div className="container grid grid-cols-5 gap-5">
      <div className="col-span-4 rounded-xl border border-border bg-card/90 p-5">
        <div className="flex gap-7">
          <div className="relative h-28 w-28">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${project.project?.photos[0]?.url}`}
              alt={project.project.name}
              fill
              className="shrink-0 rounded-lg object-cover"
            />
          </div>

          <div>
            <h3 className="mt-2 text-xl font-semibold">
              {project.project.name}
            </h3>
            <p className="mt-1 text-neutral-800">
              {project.project.description}
            </p>
          </div>
          {/* {!project.is_admin && ( */}
          <div className="ml-auto">
            <JoinButton
              is_member={!!member}
              member_status={member?.status}
              project_id={params.id}
              user_id={user?.id}
            />
          </div>
          {/* )} */}
        </div>

        <div>
          <article
            className="prose prose-neutral mt-8 p-5"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: project.project.content ?? '' }}
          />
        </div>
      </div>

      <div className="col-span-1 rounded-xl border border-border bg-card/90 p-5">
        <p className="mb-2 text-lg font-semibold">Members</p>

        <ul className="flex flex-col gap-2">
          {members.map((m) => (
            <li key={m.id}>
              <div className="flex items-center justify-between">
                <p>
                  {m.user.firstname} {m.user.lastname}
                </p>

                <Button size="sm">
                  <CheckIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
