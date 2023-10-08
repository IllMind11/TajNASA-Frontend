import { useTags } from '@/api/common/use-tags';
import { useProject } from '@/api/projects/use-project';

import { EditProjectForm } from './_components/edit-project-form';

export default async function EditProject({
  params,
}: {
  params: { id: number };
}) {
  const project = await useProject({ id: params.id });
  const tags = await useTags();

  return (
    <div className="container">
      <div className="mt-16 w-full">
        <h1 className="text-center text-2xl font-semibold">Edit the Project</h1>

        <div className="mx-auto my-14 max-w-3xl rounded-2xl border border-border bg-background p-6 shadow">
          <EditProjectForm tags={tags} project={project.project} />
        </div>
      </div>
    </div>
  );
}
