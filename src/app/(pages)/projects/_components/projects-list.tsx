import type { Project } from '@/api/types';

import { ProjectItem } from './project-item';

type ProjectListProps = {
  projects: Project[];
};

export function ProjectsList({ projects }: ProjectListProps) {
  return (
    <div className="container mb-5 mt-6 flex flex-col items-center justify-center space-y-6">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
