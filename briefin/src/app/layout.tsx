import './globals.css';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false,
};

const viewportMetaContent = `width=${viewport.width}, initial-scale=${viewport.initialScale}, maximum-scale=${viewport.maximumScale}, viewport-fit=${viewport.viewportFit}, user-scalable=${viewport.userScalable ? 'yes' : 'no'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>pda</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content={viewportMetaContent} />
        <meta property="og:title" content="Briefin | 투자 정보를 한눈에" />
        <meta
          property="og:description"
          content="해외 IT·AI 뉴스와 기업 공시 정보를 한눈에 확인하는 투자 브리핑 플랫폼"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://github.com/brief-fin" />
      </head>
      <body>
        <section className="h-full w-full">{children}</section>
      </body>
    </html>
  );
}
