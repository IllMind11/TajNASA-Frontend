import Balancer from 'react-wrap-balancer';

import { useProjects } from '@/api/projects/use-projects';

import { ProjectsList } from './_components/projects-list';

export default async function Home() {
  const projects = await useProjects();

  return (
    <>
      <div className="container m-5 mx-auto flex min-h-[45vh] flex-col justify-center">
        <div className="my-auto">
          <h1 className="my-10 w-full bg-gradient-to-b from-black to-neutral-500 bg-clip-text text-center text-[max(36px,min(5vw,65px))] font-extrabold leading-tight tracking-tight text-transparent sm:leading-normal">
            <Balancer>Get Creative with Science Project Ideas</Balancer>
          </h1>

          <p className="mx-auto w-3/4 text-center text-[max(15px,min(2vw,20px))] leading-8 text-neutral-800">
            Unleash your creativity with our collection of science project
            ideas. From <strong>simple</strong> experiments to{' '}
            <strong>complex</strong> investigations, we&apos;ve got you covered.
          </p>
        </div>
      </div>

      <ProjectsList projects={projects.data} />
    </>
  );
}
