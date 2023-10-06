'use client';

import { ThickArrowRightIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import type { User } from '@/api/types';

import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function UserDropdown({ user }: { user: User }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{user.firstname.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {`${user.firstname} ${user.lastname}`}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            // eslint-disable-next-line no-useless-concat
            document.cookie = 'token' + '=; Max-Age=-99999999;';
            router.replace('/');
            router.refresh();
          }}
          className="inline-flex w-full justify-between"
        >
          Logout <ThickArrowRightIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
