import './globals.css';
import type { Viewport } from 'next';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>pda</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Briefin | 투자 정보를 한눈에" />
        <meta
          property="og:description"
          content="해외 IT·AI 뉴스와 기업 공시 정보를 한눈에 확인하는 투자 브리핑 플랫폼"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://github.com/brief-fin" />
      </head>
      <body>
        <div className="flex min-h-full w-full min-w-0 flex-col">
          <Header />
          <main className="min-h-0 min-w-0 flex-1">
            <div className="mx-auto h-full w-full max-w-[100rem] min-w-0 px-6">
              <section className="children-container">{children}</section>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
