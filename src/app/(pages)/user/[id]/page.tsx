import { useMember } from '@/api/members/use-member';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { UserTimeLine } from './_components/user-timeline';

export default async function UserPage({ params }: { params: { id: number } }) {
  const user = await useMember({ member_id: params.id });

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
        </div>
      </div>

      {user.educations.length ? (
        <div className="container mt-6 max-w-6xl rounded-xl border border-border bg-card/90 p-5 pl-8">
          <h4 className="mb-3 text-lg font-semibold">Educations</h4>
          <UserTimeLine timelines={user.educations} />
        </div>
      ) : null}

      {user.experiences.length ? (
        <div className="container mt-6 max-w-6xl rounded-xl border border-border bg-card/90 p-5 pl-8">
          <h4 className="mb-3 text-lg font-semibold">Experiences</h4>
          <UserTimeLine timelines={user.experiences} />
        </div>
      ) : null}
    </div>
  );
}
