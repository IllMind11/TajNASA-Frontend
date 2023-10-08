import { useUser } from '@/api/common/use-user';
import { useEducations } from '@/api/education/use-educations';
import { useExperiences } from '@/api/experience/use-experience';
import { useMyProjects } from '@/api/projects/use-my-projects';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { PaginationButton } from '../projects/_components/pagination-button';
import { ProjectsList } from '../projects/_components/projects-list';
import { AddSkillsDialog } from './_components/add-skills-dialog';
import { TimeLine } from './_components/timeline';
import { UpdateUserDialog } from './_components/update-user-dialog';

type ProfilePageProps = {
  searchParams: { [key: string]: string | undefined };
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const user = await useUser();
  const myProjects = await useMyProjects({
    page_param: Number(searchParams.page),
  });

  const educations = await useEducations();
  const experiences = await useExperiences();

  if (!user) return null;

  return (
    <div className="container">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-7 rounded-xl border border-border bg-card/90 p-5">
        <Avatar className="h-32 w-32 shrink-0 cursor-pointer select-none sm:h-52 sm:w-52">
          <AvatarImage
            className="object-cover"
            alt="Profile Imaage"
            src={
              user?.photos[0]?.url
                ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user?.photos[0]?.url}`
                : ''
            }
          />
          <AvatarFallback className="text-[50px] font-semibold">
            {user?.firstname.slice(0, 1)}
          </AvatarFallback>
        </Avatar>

        <div className="mt-2 space-y-2 self-start">
          <h3 className="text-2xl font-semibold">{`${user?.firstname} ${user?.lastname}`}</h3>
          <p className="text-neutral-800 dark:text-neutral-100">
            {user?.email}
          </p>
          <p className="text-neutral-800 dark:text-neutral-100">
            {user?.phone}
          </p>

          <div className="pt-6">
            <UpdateUserDialog user={user} />
          </div>
        </div>
      </div>

      <div className="container mt-6 max-w-6xl rounded-xl border border-border bg-card/90 p-5 pl-8">
        <h4 className="mb-3 text-lg font-semibold">Educations</h4>
        {educations.length ? (
          <TimeLine timelines={educations} type="education" user_id={user.id} />
        ) : null}

        <div className="mt-4">
          <AddSkillsDialog user_id={user.id} type="education" />
        </div>
      </div>

      <div className="container mt-6 max-w-6xl rounded-xl border border-border bg-card/90 p-5 pl-8">
        <h4 className="mb-3 text-lg font-semibold">Experiences</h4>
        {experiences.length ? (
          <TimeLine
            timelines={experiences}
            type="experience"
            user_id={user.id}
          />
        ) : null}

        <div className="mt-4">
          <AddSkillsDialog user_id={user.id} type="experience" />
        </div>
      </div>

      <ProjectsList projects={myProjects.data.data} />

      {myProjects.data.total > 10 && (
        <div className="container my-10 flex w-full items-center justify-center">
          <ul className="flex items-center gap-2.5">
            {myProjects.data.links.map((link, index, arr) => (
              <li key={link.label}>
                <PaginationButton arr={arr} link={link} index={index} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
