import { Skeleton } from '@/components/ui/skeleton';

export default function CreateProjectLoader() {
  return (
    <div className="container">
      <div className="mt-16 w-full">
        <Skeleton className="mx-auto h-5 w-32" />

        <div className="mx-auto my-14 max-w-3xl space-y-8 rounded-2xl border border-border bg-background p-6 shadow">
          <Skeleton className="mx-auto h-6 w-full" />
          <Skeleton className="mx-auto h-6 w-full" />
          <Skeleton className="mx-auto h-24 w-full" />
          <Skeleton className="mx-auto h-6 w-full" />
          <Skeleton className="mx-auto h-6 w-full" />
          <Skeleton className="mx-auto h-6 w-full" />
        </div>
      </div>
    </div>
  );
}
