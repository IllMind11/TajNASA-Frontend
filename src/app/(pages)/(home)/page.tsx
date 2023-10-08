import ky from 'ky';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer';

import { Button } from '@/components/ui/button';

async function getAPOD() {
  const image = await ky
    .get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_API_KEY}`,
      { cache: 'no-store' },
    )
    .json();

  return image as { title: string; url: string; explanation: string };
}

export default async function Home() {
  const APOD = await getAPOD();

  return (
    <>
      <div className="container m-5 mx-auto flex min-h-[60vh] flex-col justify-center">
        <div className="my-auto flex flex-col items-center justify-center gap-8">
          <h1 className="my-10 w-full bg-gradient-to-b from-black to-neutral-500 bg-clip-text text-center text-[max(36px,min(5vw,65px))] font-extrabold leading-tight tracking-tight text-transparent dark:from-white dark:to-neutral-400 sm:leading-normal">
            <Balancer>Get Creative with Science Project Ideas</Balancer>
          </h1>

          <p className="mx-auto w-3/4 text-center text-[max(15px,min(2vw,20px))] leading-8 text-neutral-800 dark:text-neutral-100">
            Unleash your creativity with our collection of science project
            ideas. From <strong>simple</strong> experiments to{' '}
            <strong>complex</strong> investigations, we&apos;ve got you covered.
          </p>

          <a href="/projects">
            <Button className="mx-auto mt-8 text-lg font-semibold" size="lg">
              Get Started
            </Button>
          </a>
        </div>
      </div>

      <div className="container my-10 grid w-full gap-4 rounded-xl border bg-background p-4 md:grid-cols-2">
        <div className="p-3">
          <h2 className="text-xl">
            Astronomy Picture of the Day by NASA: <strong>{APOD.title}</strong>
          </h2>

          <p className="mt-4">{APOD.explanation}</p>
        </div>

        <div className="">
          <Image
            src={APOD.url}
            alt={APOD.title}
            width={1000}
            height={1000}
            className="rounded-xl"
          />
        </div>
      </div>
    </>
  );
}
