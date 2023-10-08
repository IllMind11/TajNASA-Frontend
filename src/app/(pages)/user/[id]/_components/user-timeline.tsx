/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
/* eslint-disable tailwindcss/no-custom-classname */

import { DotFilledIcon } from '@radix-ui/react-icons';

import type { Education } from '@/api/types';

type TimeLineProps = {
  timelines: Education[];
};

export function UserTimeLine({ timelines }: TimeLineProps) {
  return (
    <ol className="border-l border-neutral-300 dark:border-neutral-500">
      {timelines.map((timeline) => (
        <li
          key={timeline.id}
          className="flex items-center justify-between gap-4"
        >
          <div>
            <div className="flex-start flex items-center pt-3">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500" />
              <p className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-300">
                {timeline.from} <DotFilledIcon /> {timeline.to}
              </p>
            </div>
            <div className="mb-6 ml-4 mt-2">
              <h4 className="mb-1.5 text-xl font-semibold">{timeline.name}</h4>
              <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                {timeline.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
