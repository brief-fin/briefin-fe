"use client";

import { SearchComponent } from "@/components/common/SearchComponent";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <main className="pt-30pxr relative flex h-full w-full flex-col px-40pxr">
      <div className="fonts-heading3 mb-16pxr">기업</div>
      <SearchComponent />
      <div className="fonts-bodySmall mt-20pxr">
        &quot;{query}&quot; 검색 결과
      </div>
    
    </main>
  );
}