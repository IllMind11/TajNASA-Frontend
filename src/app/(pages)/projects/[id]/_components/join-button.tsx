'use client';

import { CheckIcon, PlusIcon, TimerIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import { useCreateMember } from '@/api/members/use-create-member';
import { Badge } from '@/components/ui/badge';
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
          Join <PlusIcon className="ml-1" />
        </Button>
      ) : (
        <>
          {member_status === '0' && (
            <Badge variant="secondary">
              Requested <TimerIcon className="ml-1" />
            </Badge>
          )}
          {member_status === '1' && (
            <Badge variant="secondary">
              Approved <CheckIcon className="ml-1" />
            </Badge>
          )}
        </>
      )}
    </>
  );
}
