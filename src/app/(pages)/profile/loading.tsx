import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileLoader() {
  return (
    <div className="container">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-7 rounded-xl border border-border bg-card/90 p-5">
        <Skeleton className="h-32 w-32 shrink-0 cursor-pointer select-none rounded-full sm:h-52 sm:w-52" />

        <div className="mt-2 space-y-2 self-start">
          <Skeleton className="mb-4 h-4 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="mb-5 mt-6 flex flex-col items-center justify-center space-y-6">
        {Array.from({ length: 3 }).map((_project, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="flex w-full max-w-6xl flex-col items-center gap-7 rounded-xl border border-border bg-card/90 p-4 sm:flex-row"
          >
            <Skeleton className="relative h-[220px] w-full shrink-0 rounded-lg sm:h-28  sm:w-28" />

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
    </div>
  );
}
