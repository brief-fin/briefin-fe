import Link from 'next/link';
import { NewsSidebarProps } from '@/types/news';

export default function NewsSidebar({ relatedNews, relatedCompanies, relatedNewsLoading }: NewsSidebarProps) {
  return (
    <aside className="flex w-full flex-col gap-16pxr lg:w-[320px]">
      {relatedNewsLoading ? (
        <div className="animate-pulse rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
          <div className="mb-16pxr h-5 w-24 rounded bg-gray-200" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-14pxr flex flex-col gap-6pxr">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : relatedNews && relatedNews.length > 0 ? (
        <div className="rounded-card border border-[#E5E7EB] bg-surface-white shadow-hero-card">
          <div className="px-20pxr pt-16pxr">
            <p className="text-[15px] font-bold text-text-primary">관련 뉴스</p>
          </div>
          <div className="mt-12pxr border-t border-[#E5E7EB] px-20pxr py-16pxr">
            <div className="flex flex-col gap-12pxr">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/news/${news.id}`}
                  className="group flex flex-col gap-4pxr border-b border-[#E5E7EB] pb-12pxr last:border-none last:pb-0">
                  <p className="fonts-cardTitle transition-colors group-hover:text-primary">{news.title}</p>
                  <p className="fonts-caption text-text-muted">
                    {news.source} · {news.publishedAt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-card bg-primary p-20pxr shadow-hero-card">
        <p className="fonts-label mb-8pxr flex items-center gap-6pxr text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {relatedCompanies[0]?.name ?? '기업'} 소식 받기
        </p>
        <p className="fonts-bodySmall mb-16pxr text-white opacity-80">
          이 기업의 새 공시·뉴스를 실시간으로 받아보세요.
        </p>
        <Link
          href="/companies"
          className="block rounded-button bg-surface-white px-16pxr py-12pxr text-center text-[13px] font-bold text-primary transition-colors hover:bg-primary-light">
          관심 기업 등록
        </Link>
      </div>
    </aside>
  );
}
