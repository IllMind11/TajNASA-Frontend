import { useTags } from '@/api/common/use-tags';

import { ProjectForm } from './_components/project-form';

export default async function CreateProject() {
  const tags = await useTags();

  return (
    <div className="container">
      <div className="mt-16 w-full">
        <h1 className="text-center text-2xl font-semibold">
          Create New Project
        </h1>

        <div className="mx-auto my-14 max-w-3xl rounded-2xl border border-border bg-white p-6 shadow">
          <ProjectForm tags={tags} />
        </div>
      </div>
    </div>
  );
}
