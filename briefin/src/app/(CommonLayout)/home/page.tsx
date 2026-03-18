import HomeBanner from '@/components/home/HomeBanner';
import NewsCard from '@/components/common/NewsCard';
import { mockDomesticNewsData, mockNewsData, toNewsItem } from '@/mocks/newsData';

export default function HomePage() {
  const domesticNews = mockDomesticNewsData.slice(0, 3).map(toNewsItem);
  const overseasNews = mockNewsData.slice(0, 3).map(toNewsItem);

  return (
    <main className="flex h-full w-full flex-col gap-8 pb-10">
      <HomeBanner />

      {/* 🇰🇷 국내 뉴스 (뉴스 페이지와 동일: gap-14pxr, NewsCard만 나열) */}
      <section className="flex flex-col gap-4">
        <h2 className="fonts-heading3 flex items-center text-[19.2px] leading-[23px] tracking-[-0.5px] text-[#1A1D1F]">
          🇰🇷 국내 뉴스
        </h2>
        <div className="flex w-full flex-col gap-14pxr">
          {domesticNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      {/* 🌐 해외 뉴스 */}
      <section className="flex flex-col gap-4">
        <h2 className="fonts-heading3 flex items-center text-[19.2px] leading-[23px] tracking-[-0.5px] text-[#1A1D1F]">
          🌐 해외 뉴스
        </h2>
        <div className="flex w-full flex-col gap-14pxr">
          {overseasNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>
    </main>
  );
}
