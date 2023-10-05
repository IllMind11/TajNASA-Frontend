import type { Project } from '@/api/types';

import { ProjectItem } from './project-item';

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="container mb-5 mt-40 flex flex-col items-center justify-center space-y-6">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
