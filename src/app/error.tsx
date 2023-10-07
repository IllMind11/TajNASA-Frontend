'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function ErrorFallback() {
  return (
    <div className="grid min-h-screen place-items-center gap-2">
      <div className="flex flex-col items-center justify-center">
        <ExclamationTriangleIcon
          className="h-32 w-32 fill-destructive"
          color="#ef4444"
        />
        <h2 className="text-center text-2xl font-bold text-destructive">
          Internal Server Error
        </h2>

        <p className="font-semibold text-neutral-700">Try again later!</p>
      </div>
    </div>
  );
}
