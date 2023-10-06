import { Background } from '@/components/background';
import { MainNav } from '@/components/main-nav/main-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <main>
        <Background />
        {children}
      </main>
    </>
  );
}
