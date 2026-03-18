import Link from 'next/link';
import { NewsSidebarProps } from '@/types/news';

export default function NewsSidebar({ relatedNews, relatedCompanies }: NewsSidebarProps) {
  return (
    <aside className="flex w-full flex-col gap-16pxr lg:w-[320px]">
      {relatedNews && relatedNews.length > 0 && (
        <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
          <p className="fonts-label mb-16pxr text-text-primary">🔗 관련 뉴스</p>
          <div className="flex flex-col gap-12pxr">
            {relatedNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="group flex flex-col gap-4pxr border-b border-surface-border pb-12pxr last:border-none last:pb-0">
                <p className="fonts-cardTitle transition-colors group-hover:text-primary">{news.title}</p>
                <p className="fonts-caption text-text-muted">
                  {news.source} · {news.publishedAt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-card bg-primary p-20pxr shadow-hero-card">
        <p className="fonts-label mb-8pxr text-white">🔔 {relatedCompanies[0]?.name ?? '기업'} 소식 받기</p>
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
