import Link from 'next/link';
import HomeBanner from '@/components/home/HomeBanner';
import HomeNewsSection from '@/components/home/HomeNewsSection';
import AlertBanner from '@/components/common/AlertBanner';
import PopularCompanyList from '@/components/common/PopularCompanyList';
import { MOCK_WATCHLIST } from '@/mocks/feed';

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
        <div className="flex flex-col gap-16pxr lg:w-96 lg:shrink-0 lg:pt-[39px]">
          <AlertBanner
            title="관심 기업을 더 추가해보세요"
            description="더 많은 기업을 등록할수록 내 피드가 풍성해져요."
            buttonLabel="🏢 관련 기업 추가하기"
            buttonHref="/mypage?tab=watchlist"
          />
          <PopularCompanyList title="👀 내 관심 기업" companies={MOCK_WATCHLIST} />
          <Link
            href="/mypage?tab=watchlist"
            className="block text-center text-[13px] font-bold text-text-muted hover:text-text-primary">
            관심 기업 관리 →
          </Link>
        </div>
      </div>
    </main>
  );
}
