import './globals.css';
import type { Viewport } from 'next';
import AuthSessionProvider from '@/providers/AuthSessionProvider';
import QueryProvider from '@/providers/QueryProvider';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>Briefin</title>
        <link rel="icon" href="/icon/logo.svg" type="image/svg+xml" />
        <meta property="og:title" content="Briefin | 투자 정보를 한눈에" />
        <meta property="og:description" content="뉴스와 기업 공시 정보를 한눈에 확인하는 투자 브리핑 플랫폼" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://github.com/brief-fin" />
      </head>
      <body>
        <QueryProvider>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
