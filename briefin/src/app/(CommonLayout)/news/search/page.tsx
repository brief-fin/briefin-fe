'use client';

import { SearchComponent } from '@/components/common/SearchComponent';
import { CategoryButton } from '@/components/news/CategoryButton';

export default function page() {
  return (
    <main className="relative flex h-full w-full flex-col px-40pxr pt-30pxr">
      <div className="fonts-heading3 mb-16pxr">뉴스</div>
      <div className="mb-20pxr">
        <SearchComponent />
      </div>
      <div className="fonts-label mb-20pxr text-text-secondary">인기뉴스</div>
      <div className="mb-20pxr flex gap-2">
        <CategoryButton label="전체" isSelected={true} onClick={() => {}} />
        <CategoryButton label="국내" onClick={() => {}} />
        <CategoryButton label="해외" onClick={() => {}} />
      </div>
      <div></div>
      <div className="fonts-label mb-20pxr">최근 본 뉴스</div>
    </main>
  );
}
