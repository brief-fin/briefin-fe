import HomeBanner from '@/components/home/HomeBanner';
import HomeNewsSection from '@/components/home/HomeNewsSection';
import AlertBanner from '@/components/common/AlertBanner';
import HomeWatchlistSection from '@/components/home/HomeWatchlistSection';

export default function HomePage() {
  return (
    <main className="flex h-full w-full flex-col gap-8 pb-10">
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <HomeBanner />
      </div>
      <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start">
        {/* Left: 뉴스 섹션 */}
        <div className="flex flex-1 flex-col gap-8">
          <HomeNewsSection />
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-16pxr lg:w-96 lg:shrink-0">
          <HomeWatchlistSection />
          <AlertBanner
            title="관심 기업을 더 추가해보세요"
            description="더 많은 기업을 등록할수록 내 피드가 풍성해져요."
            buttonLabel="관심 기업 추가하기"
            buttonHref="/onboarding"
          />
        </div>
      </div>
    </main>
  );
}
