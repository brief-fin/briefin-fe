"use client";

import NewsList from "@/components/common/NewsList";
import { SearchComponent } from "@/components/common/SearchComponent";
import { useSearchParams } from "next/navigation";
import { NEWS_DUMMY } from "@/core/newsDummy";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const filtered = NEWS_DUMMY.filter(
    (news) =>
      news.companies.includes(query) ||
      news.categories.includes(query)
  );
  return (
    <main className="pt-30pxr relative flex h-full w-full flex-col px-40pxr">
      <div className="fonts-heading3 mb-16pxr">뉴스</div>
      <SearchComponent searchPath="/news/search" />
      <div className="fonts-caption text-text-muted mt-20pxr">
        &quot;{query}&quot; 검색 결과 {filtered.length > 0 ? `${filtered.length}건` : "없음"}
      </div>
      {filtered.length > 0 ? (
        <div className="mt-20pxr mb-30pxr">
          <NewsList category={query} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-120pxr gap-16pxr">
          <span className="text-60pxr">🔍</span>
          <div className="fonts-cardTitle text-text-primary">검색 결과가 없어요</div>
          <div className="fonts-body text-text-muted">다른 키워드로 다시 검색해 보세요.</div>
        </div>
      )}
    </main>
  );
}