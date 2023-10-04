import Link from 'next/link';

import { Button } from './ui/button';

export function MainNav() {
  return (
    <nav className="mb-6 border-b border-border">
      <div className="container flex w-full items-center justify-between px-8 py-3">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide sm:text-2xl"
        >
          ProjectHub
        </Link>

        <div className="space-x-3">
          <Link href="/register" scroll={false}>
            <Button variant="secondary">Register</Button>
          </Link>

          <Button>
            <Link href="/login" scroll={false}>
              Login
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
