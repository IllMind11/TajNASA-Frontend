import Link from 'next/link';

import { useUser } from '@/api/common/use-user';

import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { NavSheet } from './nav-sheet';
import { UserDropdown } from './user-dropdown';

export async function MainNav() {
  const user = await useUser();

  return (
    <nav className="mb-6 border-b border-border">
      <div className="container flex w-full items-center justify-between px-8 py-3">
        <a href="/" className="text-lg font-semibold tracking-wide sm:text-2xl">
          ProjectHub
        </a>

        <div className="max-[768px]:hidden min-[768px]:block">
          {user ? (
            <div className="flex items-center gap-5">
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
            <div className="flex items-center gap-3">
              <a href="/projects">
                <Button variant="link">Projects</Button>
              </a>
              <Link href="/register" scroll={false}>
                <Button variant="secondary">Register</Button>
              </Link>

              <Link href="/login" scroll={false}>
                <Button>Login</Button>
              </Link>

              <ThemeToggle />
            </div>
          )}
        </div>

        <div className="min-[768px]:hidden">
          <NavSheet user={user} />
        </div>
      </div>
    </nav>
  );
}
