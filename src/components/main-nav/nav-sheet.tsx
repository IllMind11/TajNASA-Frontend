'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { User } from '@/api/types';

import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { UserDropdown } from './user-dropdown';

export function NavSheet({ user }: { user: User | null }) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent>
        {user ? (
          <div className="flex flex-col items-center gap-5">
            <a href="/projects">
              <Button variant="link">Projects</Button>
            </a>

            <a href="/projects/create">
              <Button>New Project</Button>
            </a>

            <UserDropdown user={user} />

            <ThemeToggle />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Link href="/projects">
              <Button variant="link">Projects</Button>
            </Link>
            <Link href="/register" scroll={false}>
              <Button variant="secondary">Register</Button>
            </Link>

            <Link href="/login" scroll={false}>
              <Button>Login</Button>
            </Link>

            <ThemeToggle />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
