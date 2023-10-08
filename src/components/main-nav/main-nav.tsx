import Link from 'next/link';

import { useUser } from '@/api/common/use-user';

import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { UserDropdown } from './user-dropdown';

export async function MainNav() {
  const user = await useUser();

  return (
    <nav className="mb-6 border-b border-border">
      <div className="container flex w-full items-center justify-between px-8 py-3">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide sm:text-2xl"
        >
          ProjectHub
        </Link>

        {user ? (
          <div className="flex items-center gap-5">
            <Link href="/projects">
              <Button variant="link">Projects</Button>
            </Link>

            <Link href="/projects/create">
              <Button>New Project</Button>
            </Link>

            <UserDropdown user={user} />

            <ThemeToggle />
          </div>
        ) : (
          <div className="flex items-center space-x-3">
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
      </div>
    </nav>
  );
}
