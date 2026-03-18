import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col">
      <Header />
      <main className="min-h-0 min-w-0 grow">
        {/* 배경만 전체 가로(full-bleed), 뉴스/피드/공시 등 모든 페이지 동일 적용 */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-full w-screen bg-surface-bg">
          <div className="max-w-1600pxr mx-auto h-full w-full min-w-0 px-48pxr">
            <section className="children-container">{children}</section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
