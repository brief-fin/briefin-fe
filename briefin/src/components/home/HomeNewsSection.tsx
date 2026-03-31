'use client';

import Image from 'next/image';
import NewsCard from '@/components/news/NewsCard';
import { useNewsList } from '@/hooks/useNews';
import { toNewsItem } from '@/api/newsApi';

export default function HomeNewsSection() {
  const { data, isLoading, isError } = useNewsList();

  if (isLoading) {
    return <p className="fonts-label py-10 text-center text-text-muted">뉴스를 불러오는 중...</p>;
  }

  if (isError || !data) {
    return <p className="fonts-label py-10 text-center text-text-muted">뉴스를 불러오지 못했습니다.</p>;
  }

  const allItems = data.pages.flatMap((page) => page.content);
  const domestic = allItems.filter((item) => item.region === '국내').slice(0, 3).map(toNewsItem);
  const overseas = allItems.filter((item) => item.region === '해외').slice(0, 3).map(toNewsItem);

  return (
    <>
      {/* 국내 뉴스 */}
      <section className="flex flex-col gap-4">
        <h2 className="fonts-heading3 leading-23pxr flex items-center gap-2 text-[19.2px] tracking-[-0.5px] text-[#111827]">
          <Image src="/icon/twemoji_flag-south-korea.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
          국내 뉴스
        </h2>
        <div className="flex w-full flex-col gap-14pxr">
          {domestic.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      {/* 해외 뉴스 */}
      <section className="flex flex-col gap-4">
        <h2 className="fonts-heading3 leading-23pxr flex items-center gap-2 text-[19.2px] tracking-[-0.5px] text-[#111827]">
          <Image src="/icon/noto-v1_world-map.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
          해외 뉴스
        </h2>
        <div className="flex w-full flex-col gap-14pxr">
          {overseas.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>
    </>
  );
}
