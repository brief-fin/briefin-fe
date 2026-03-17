import Link from 'next/link';

type HomeBannerProps = {
  /** 우측 이미지 경로 (public 기준). 없으면 빈 영역 */
  imageSrc?: string;
  /** 서비스 소개 버튼 링크 */
  serviceIntroHref?: string;
};

export default function HomeBanner({
  imageSrc = '/images/hero-banner.svg',
  serviceIntroHref = '/about',
}: HomeBannerProps) {
  return (
    <section
      className="relative my-6 flex min-h-280pxr w-full flex-col overflow-hidden rounded-hero md:my-8 md:flex-row md:items-start md:justify-between"
      style={{
        background: 'linear-gradient(106deg, #F5F0E8 0%, #E0D8C8 60%, #F5F0E8 100%)',
      }}>
      <div className="flex flex-col justify-center gap-6 px-8 py-10 md:px-12 md:py-12">
        <h1 className="fonts-display max-w-320pxr text-[#1A1D1F]">
          투자뉴스, 핵심만
          <br />
          골라드려요
        </h1>
        <p className="leading-26pxr max-w-248pxr text-[16px] font-normal text-[#4B5563]">
          공시·뉴스·실적을 AI가 요약해
          <br />내 관심 종목 소식만 골라 알려드려요.
        </p>
        <Link
          href={serviceIntroHref}
          className="leading-18pxr flex h-49pxr w-full max-w-300pxr items-center justify-center rounded-button border border-[#E5E7EB] bg-white text-[15px] font-bold text-[#4B5563] transition-colors hover:bg-[#F9FAFB]">
          서비스 소개
        </Link>
      </div>

      {imageSrc && (
        <div className="relative mt-6 flex h-200pxr shrink-0 items-end justify-end overflow-hidden md:mt-0 md:h-280pxr md:max-w-[55%] md:flex-1 md:self-end lg:h-320pxr">
          {/* 이미지는 높이를 채우지 않고, items-end로 컨테이너 맨 아래에 붙음 */}
          <img
            src={imageSrc}
            alt="BrieFin 서비스 소개"
            className="max-h-full w-auto max-w-full object-contain object-[right_bottom]"
          />
        </div>
      )}
    </section>
  );
}
