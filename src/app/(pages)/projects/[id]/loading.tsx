/* eslint-disable react/no-array-index-key */
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectLoader() {
  return (
    <div className="container gap-5 lg:grid lg:grid-cols-7">
      <div className="col-span-5">
        <div className="flex gap-7 rounded-xl border border-border bg-card/90 p-5">
          <Skeleton className="relative h-28 w-28 shrink-0  rounded-lg" />

          <div className="w-full space-y-2">
            <Skeleton className="mb-5 h-6 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <div className="mt-4 space-y-4 rounded-xl border border-border bg-card/90 p-5">
          {Array.from({ length: 14 }).map((_s, index) => (
            <Skeleton key={index} className="h-3 w-full" />
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3 lg:col-span-2 lg:mt-0">
        <div className="rounded-xl border border-border bg-card/90 p-5">
          <div className="mb-2">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-border bg-card/90 p-5">
          <Skeleton className="h-5 w-full" />

          <ul className="flex flex-col gap-3">
            {Array.from({ length: 8 }).map((_m, index) => (
              <li key={index}>
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-3 w-full" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
