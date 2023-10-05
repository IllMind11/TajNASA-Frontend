import type { Project } from '@/api/types';

export function ProjectItem({ project }: { project: Project }) {
  return (
    <div className="w-full max-w-6xl space-y-2 rounded-xl border border-border bg-card/5 p-6 backdrop-blur-[1.8px]">
      {/* <img
        src={`http://projecthub.arasd.com/storage/${project?.photos[0]?.url}`}
        alt=""
      /> */}
      <h3 className="text-xl font-semibold">{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
}
