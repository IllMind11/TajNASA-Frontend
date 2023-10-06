import { ProjectForm } from './_components/project-form';

export default function CreateProject() {
  return (
    <div className="container">
      <div className="mt-16 w-full">
        <h1 className="text-center text-2xl font-semibold">
          Create New Project
        </h1>

        <div className="mx-auto my-14 max-w-3xl rounded-2xl border border-border bg-white p-6 shadow">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
}
