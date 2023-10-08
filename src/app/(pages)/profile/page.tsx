import { useUser } from '@/api/common/use-user';
import { useMyProjects } from '@/api/projects/use-my-projects';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { ProjectsList } from '../projects/_components/projects-list';
import { UpdateUserDialog } from './_components/update-user-dialog';

export default async function ProfilePage() {
  const user = await useUser();
  const myProjects = await useMyProjects();

  if (!user) return null;

  return (
    <div className="container">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-7 rounded-xl border border-border bg-card/90 p-5">
        <Avatar className="h-52 w-52 shrink-0 cursor-pointer select-none">
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

      <ProjectsList projects={myProjects.data.data} />
    </div>
  );
}
