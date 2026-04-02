import HomeBanner from '@/components/home/HomeBanner';
import HomeNewsSection from '@/components/home/HomeNewsSection';
import HomeWatchlistSection from '@/components/home/HomeWatchlistSection';
import FeedWatchlistBanner from '@/components/feed/FeedWatchlistBanner';

export default function HomePage() {
  return (
    <main className="flex h-full w-full flex-col gap-8 pb-10">
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <HomeBanner />
      </div>
      <div className="flex flex-col gap-16pxr lg:flex-row">
        {/* Left: 뉴스 섹션 */}
        <div className="flex flex-1 flex-col gap-8">
          <HomeNewsSection />
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block lg:w-260pxr lg:shrink-0">
          <div className="sticky top-24pxr flex flex-col gap-16pxr">
            <HomeWatchlistSection />
            <FeedWatchlistBanner />
          </div>
        </div>
      </div>
    </main>
  );
}
