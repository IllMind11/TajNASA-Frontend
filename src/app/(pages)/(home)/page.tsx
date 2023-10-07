import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <div className="container m-5 mx-auto flex min-h-[60vh] flex-col justify-center">
      <div className="my-auto flex flex-col items-center justify-center gap-8">
        <h1 className="my-10 w-full bg-gradient-to-b from-black to-neutral-500 bg-clip-text text-center text-[max(36px,min(5vw,65px))] font-extrabold leading-tight tracking-tight text-transparent sm:leading-normal">
          <Balancer>Get Creative with Science Project Ideas</Balancer>
        </h1>

        <p className="mx-auto w-3/4 text-center text-[max(15px,min(2vw,20px))] leading-8 text-neutral-800">
          Unleash your creativity with our collection of science project ideas.
          From <strong>simple</strong> experiments to <strong>complex</strong>{' '}
          investigations, we&apos;ve got you covered.
        </p>

        <Link href="/projects">
          <Button className="mx-auto mt-8 text-lg font-semibold" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
