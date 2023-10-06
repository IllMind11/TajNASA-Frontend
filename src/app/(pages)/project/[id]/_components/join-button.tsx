'use client';

import { useRouter } from 'next/navigation';

import { useCreateMember } from '@/api/projects/use-create-member';
import { Button } from '@/components/ui/button';

type JoinButtonProps = {
  is_member: boolean;
  project_id?: number;
  user_id?: number;
  member_status?: string;
};

export function JoinButton({
  is_member,
  member_status,
  project_id,
  user_id,
}: JoinButtonProps) {
  const router = useRouter();

  const { mutate: createMember, isLoading } = useCreateMember({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {is_member === false ? (
        <Button
          loading={isLoading}
          onClick={() =>
            createMember({
              project_id,
              status: 0,
              type: 0,
              user_id,
            })
          }
        >
          Join
        </Button>
      ) : (
        <Button disabled>
          {member_status === '0' && 'Requested'}
          {member_status === '1' && 'Approved'}
        </Button>
      )}
    </>
  );
}
