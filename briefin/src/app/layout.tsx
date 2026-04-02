import './globals.css';
import type { Metadata, Viewport } from 'next';
import AuthSessionProvider from '@/providers/AuthSessionProvider';
import QueryProvider from '@/providers/QueryProvider';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Briefin',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'Briefin | 투자 정보를 한눈에',
    description: '뉴스와 기업 공시 정보를 한눈에 확인하는 투자 브리핑 플랫폼',
    type: 'website',
    url: 'https://github.com/brief-fin',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
