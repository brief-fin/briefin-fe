import Link from 'next/link';
import { mockNewsDetailData, MockNewsDetailRaw } from '@/mocks/newsDetail';
import NewsHeader from '@/components/news/NewsHeader';
import NewsSummary from '@/components/news/NewsSummary';
import NewsDetail from '@/components/news/NewsDetail';
import NewsSidebar from '@/components/news/NewsSidebar';
import NewsRelatedCompanies from '@/components/news/NewsRelatedCompanies';
import NewsActions from '@/components/news/NewsActions';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getNews(id: string): Promise<MockNewsDetailRaw | null> {
  return mockNewsDetailData.find((news) => news.id === id) ?? null;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getNews(id);

  if (!data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-16pxr">
        <p className="fonts-body text-text-secondary">해당 뉴스를 찾을 수 없습니다.</p>
        <Link
          href="/news"
          className="rounded-button border border-surface-border bg-surface-white px-14pxr py-10pxr text-[14px] font-bold text-text-secondary transition-colors hover:bg-surface-bg">
          ← 뉴스 목록으로
        </Link>
      </div>
    );
  }

  const {
    title,
    summaries,
    content,
    originalUrl,
    category,
    relatedCompanies,
    relatedNews,
    isLive,
    source,
    publishedAt,
    isScrapped,
  } = data;

  return (
    <div className="min-h-screen bg-surface-bg pb-40pxr">
      <div className="pt-20pxr sm:pt-28pxr md:pt-36pxr">
        <Link
          href="/news"
          className="inline-flex items-center gap-4pxr rounded-button border border-surface-border bg-surface-white px-12pxr py-8pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg sm:px-14pxr sm:py-10pxr sm:text-[14px]">
          ← 뉴스 목록으로
        </Link>
      </div>

      <div className="mt-14pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        {/* 메인 기사 */}
        <article className="min-w-0 flex-1 rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
          {/* 헤더 */}
          <NewsHeader
            data={{
              category,
              publishedAt,
              source,
              title,
              isLive,
            }}
          />

          {/* 요약 */}
          <div className="mt-20pxr">
            <NewsSummary summaries={summaries} />
          </div>
          {/* 본문 */}
          <NewsDetail content={content} />
          
          <NewsActions originalUrl={originalUrl} isScrapped={isScrapped} />
          <NewsRelatedCompanies relatedCompanies={relatedCompanies} />
        </article>

        {/* 사이드바 */}
        <NewsSidebar relatedNews={relatedNews} relatedCompanies={relatedCompanies} />
      </div>
    </div>
  );
}
