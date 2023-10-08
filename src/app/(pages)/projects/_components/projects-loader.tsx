import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectsLoader() {
  return (
    <div className="container mb-5 mt-6 flex flex-col items-center justify-center space-y-6">
      {Array.from({ length: 10 }).map((_project, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="flex w-full max-w-6xl items-center gap-7 rounded-xl border border-border bg-card/90 p-4"
        >
          <Skeleton className="relative h-28 w-28 shrink-0  rounded-lg" />

          <div className="w-full space-y-2">
            <Skeleton className="mb-5 h-6 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>

          <div className="ml-auto self-start">
            <div className="mx-4 flex items-center text-lg font-medium text-neutral-500">
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
