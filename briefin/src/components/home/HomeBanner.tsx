import Link from 'next/link';

type HomeBannerProps = {
  imageSrc?: string;
  serviceIntroHref?: string;
};

export default function HomeBanner({
  imageSrc = '/images/hero-banner.svg',
  serviceIntroHref = '/about',
}: HomeBannerProps) {
  return (
    <section
      className="relative min-h-400pxr w-full"
      style={{
        background: 'linear-gradient(106deg, #F5F0E8 0%, #E0D8C8 60%, #F5F0E8 100%)',
      }}>
      <div className="mx-auto flex h-full min-h-400pxr w-full max-w-1600pxr flex-row items-center">
        {/* 왼쪽 텍스트 블럭 */}
        <div className="flex shrink-0 flex-col gap-6 px-48pxr py-16 ml-8">
          <h1 className="fonts-display text-[#1A1D1F]">
            투자뉴스, 핵심만
            <br />
            골라드려요
          </h1>
          <p className="text-[16px] font-normal leading-relaxed text-[#4B5563]">
            공시·뉴스·실적을 AI가 요약해
            <br />내 관심 종목 소식만 골라 알려드려요.
          </p>
          <Link
            href={serviceIntroHref}
            className="flex h-49pxr w-fit items-center justify-center rounded-button border border-[#E5E7EB] bg-white px-8 text-[15px] font-bold text-[#4B5563] transition-colors hover:bg-[#F9FAFB]">
            서비스 소개
          </Link>
        </div>

        {/* 오른쪽 이미지 — 나머지 공간 전부 차지 */}
        {imageSrc && (
          <div className="relative ml-auto flex self-stretch items-end justify-end mr-48">
            <img
              src={imageSrc}
              alt="BrieFin 서비스 소개"
              className="h-auto max-h-320pxr w-auto object-contain object-bottom-right"
            />
          </div>
        )}
      </div>
    </section>
  );
}
