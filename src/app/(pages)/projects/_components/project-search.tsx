'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ProjectSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!search) {
      router.replace(pathname);
    }
  }, [pathname, router, search]);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.set('page', '1');
    searchParams.set('q', search);

    router.push(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="container flex w-full items-center"
    >
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for projects"
        type="search"
        className="rounded-r-none bg-background"
      />
      <Button className="rounded-l-none" type="submit">
        <MagnifyingGlassIcon />
      </Button>
    </form>
  );
}
