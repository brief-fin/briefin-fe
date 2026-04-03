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
            <p className="text-[15px] font-bold text-text-primary">추천 뉴스</p>
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

      <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
        <div className="mb-14pxr flex h-40pxr w-40pxr items-center justify-center rounded-full bg-primary/10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="8" stroke="#3B82F6" strokeWidth="1.8" />
            <line x1="10" y1="6" x2="10" y2="14" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="6" y1="10" x2="14" y2="10" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-[14px] font-bold text-text-primary">관심 기업 추가하기</p>
        <p className="mt-6pxr text-[12px] leading-relaxed text-text-muted">
          관심 기업을 등록하면 맞춤 뉴스를 피드에서 바로 받아볼 수 있어요.
        </p>
        <Link
          href="/onboarding"
          className="mt-14pxr flex items-center justify-center rounded-button bg-primary px-16pxr py-8pxr text-[12px] font-semibold text-white transition-opacity hover:opacity-80"
        >
          기업 추가하기
        </Link>
      </div>
    </aside>
  );
}
