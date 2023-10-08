import { Background } from '@/components/background';
import { Footer } from '@/components/footer';
import { MainNav } from '@/components/main-nav/main-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <main className="min-h-screen">
        <Background />
        {children}
      </main>
      <Footer />
    </>
  );
}
