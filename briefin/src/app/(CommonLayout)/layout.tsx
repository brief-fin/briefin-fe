import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col">
      <Header />
      <main className="min-h-0 min-w-0 grow">
        <div className="mx-auto h-full w-full min-w-0 max-w-[100rem] px-6">
          <section className="children-container">{children}</section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
