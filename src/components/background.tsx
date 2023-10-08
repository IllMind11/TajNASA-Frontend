/* eslint-disable tailwindcss/no-contradicting-classname */
export function Background() {
  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full">
      <div className="relative h-full w-full bg-background">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff33_1px,#0a0a0a_1px)] dark:bg-[size:20px_20px]" />
      </div>
    </div>
  );
}
