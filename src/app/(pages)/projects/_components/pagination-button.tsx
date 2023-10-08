'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

type PaginationButtonProps = {
  link: {
    url: string | null;
    label: string;
    active: boolean;
  };

  index: number;

  arr: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
};

export function PaginationButton({ link, index, arr }: PaginationButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();

  function handlePagination(url: string | null) {
    if (!url) return;

    const params = new URL(url).searchParams;

    const newSearchParams = new URLSearchParams(searchparams);
    newSearchParams.set('page', params.get('page') ?? '1');

    router.push(`${pathname}?${newSearchParams}`);
  }

  return (
    <Button
      onClick={() => handlePagination(link.url)}
      variant={link.active ? 'default' : 'secondary'}
      size="icon"
      disabled={link.url === null}
    >
      {index === 0 && <ArrowLeftIcon />}
      {index === arr.length - 1 && <ArrowRightIcon />}

      {index !== 0 && index !== arr.length - 1 && link.label}
    </Button>
  );
}
