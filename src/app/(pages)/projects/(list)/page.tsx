import { useProjects } from '@/api/projects/use-projects';

import { ProjectsList } from '../_components/projects-list';

export default async function ProjectsPage() {
  const projects = await useProjects();

  return (
    <div className="container">
      <ProjectsList projects={projects.data.data} />
    </div>
  );
}
