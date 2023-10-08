import { useProjects } from '@/api/projects/use-projects';

import { PaginationButton } from '../_components/pagination-button';
import { ProjectSearch } from '../_components/project-search';
import { ProjectsList } from '../_components/projects-list';

type ProjectsPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const projects = await useProjects({
    page_param: Number(searchParams.page),
    q: searchParams.q,
  });

  return (
    <div className="container">
      <ProjectSearch />

      <ProjectsList projects={projects.data.data} />

      {projects.data.total > 10 && (
        <div className="container my-10 flex w-full items-center justify-center">
          <ul className="flex items-center gap-2.5">
            {projects.data.links.map((link, index, arr) => (
              <li key={link.label}>
                <PaginationButton arr={arr} link={link} index={index} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
