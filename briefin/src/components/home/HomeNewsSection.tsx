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

  const newsList = data.map(toNewsItem);
  const first3 = newsList.slice(0, 3);
  const next3 = newsList.slice(3, 6);

  return (
    <>
      {/* 국내 뉴스 */}
      <section className="flex flex-col gap-4">
        <h2 className="fonts-heading3 leading-23pxr flex items-center gap-2 text-[19.2px] tracking-[-0.5px] text-[#1A1D1F]">
          <Image src="/icon/twemoji_flag-south-korea.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
          국내 뉴스
        </h2>
        <div className="flex w-full flex-col gap-14pxr">
          {first3.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      {/* 해외 뉴스 */}
      <section className="flex flex-col gap-4">
        <h2 className="fonts-heading3 leading-23pxr flex items-center gap-2 text-[19.2px] tracking-[-0.5px] text-[#1A1D1F]">
          <Image src="/icon/noto-v1_world-map.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
          해외 뉴스
        </h2>
        <div className="flex w-full flex-col gap-14pxr">
          {next3.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>
    </>
  );
}
