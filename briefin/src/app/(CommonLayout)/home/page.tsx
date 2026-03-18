import HomeBanner from '@/components/home/HomeBanner';
import AlertBanner from '@/components/common/AlertBanner';
import NewsCard from '@/components/common/NewsCard';
import PopularCompanyList from '@/components/common/PopularCompanyList';
import { MOCK_WATCHLIST } from '@/mocks/feed';
import { mockDomesticNewsData, mockNewsData, toNewsItem } from '@/mocks/newsData';

export default function HomePage() {
  const domesticNews = mockDomesticNewsData.slice(0, 3).map(toNewsItem);
  const overseasNews = mockNewsData.slice(0, 3).map(toNewsItem);

  return (
    <main className="flex h-full w-full flex-col gap-8 pb-10">
      <HomeBanner />

      {/* 국내 뉴스 제목만 먼저(전체 너비), 그 아래에서 카드와 사이드바 y축 맞춤 */}
      <section className="flex flex-col gap-4">
        <h2 className="fonts-sectionTitle flex items-center text-[19.2px] leading-[23px] tracking-[-0.5px] text-[#1A1D1F]">
          🇰🇷 국내 뉴스
        </h2>
        <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start">
          {/* Left: 국내 뉴스 카드 + 해외 뉴스 섹션 */}
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex w-full flex-col gap-14pxr">
              {domesticNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
            {/* 🌐 해외 뉴스 */}
            <section className="flex flex-col gap-4">
              <h2 className="fonts-sectionTitle flex items-center text-[19.2px] leading-[23px] tracking-[-0.5px] text-[#1A1D1F]">
                🌐 해외 뉴스
              </h2>
              <div className="flex w-full flex-col gap-14pxr">
                {overseasNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar: 첫 뉴스 카드와 y축 시작 맞춤 */}
          <div className="flex flex-col gap-16pxr lg:w-96 lg:shrink-0">
            <AlertBanner
              title="관심 기업을 더 추가해보세요"
              description="더 많은 기업을 등록할수록 내 피드가 풍성해져요."
              buttonLabel="🏢 관련 기업 추가하기"
            />
            <PopularCompanyList title="👀 내 관심 기업" companies={MOCK_WATCHLIST} />
            <button className="text-[13px] font-bold text-text-muted hover:text-text-primary">
              관심 기업 관리 →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
