'use client';

import { useEffect, useState, type CSSProperties } from 'react';

const SLIDES = [
  {
    title: '투자뉴스, 핵심만\n골라드려요',
    bullets: ['공시·뉴스·실적을 AI가 요약해', '내 관심 종목 소식만 골라 알려드려요'],
    href: '/about',
    imageSrc: '/images/hero-banner.svg',
    imageStyle: { maxHeight: '320px' },
    background: 'linear-gradient(106deg, #EFF6FF 0%, #BFDBFE 60%, #EFF6FF 100%)',
    navColor: '#1E3A8A',
    navHoverColor: '#1E40AF',
  },
  {
    title: '어렵고 긴 뉴스,\n핵심만 남겼어요',
    bullets: ['주요 뉴스를 3줄로 요약', '관심 종목 뉴스만 골라서 보여드려요'],
    href: '/news',
    imageSrc: '/images/disclo.svg',
    imageStyle: { maxHeight: '400px' },
    imageContainerClass:
      'mt-8 flex w-full justify-center md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-auto md:items-end md:justify-end',
    background: 'linear-gradient(106deg, #F0FDF4 0%, #DCFCE7 60%, #F0FDF4 100%)',
    navColor: '#166534',
    navHoverColor: '#15803D',
  },
  {
    title: '복잡한 공시,\n3줄로 끝냅니다',
    bullets: ['DART 공시를 쉬운 말로 바꿔드려요', '계약·실적·지분 변동 핵심만 추려드려요'],
    href: '/disclosure',
    imageSrc: '/images/disclosure.svg',
    imageStyle: { maxHeight: '380px' },
    imageContainerClass:
      'mt-8 flex w-full justify-center md:absolute md:bottom-0 md:right-16 md:mt-0 md:w-auto md:items-end md:justify-end',
    background: 'linear-gradient(106deg, #FAF5FF 0%, #EDE9FE 60%, #FAF5FF 100%)',
    navColor: '#6B21A8',
    navHoverColor: '#7E22CE',
  },
  {
    title: '오늘 내 종목\n이슈는?',
    bullets: ['관심 기업 뉴스를 한곳에서', '매일 아침 맞춤 브리핑을 받아보세요'],
    href: '/feed',
    imageSrc: '/images/news.svg',
    imageStyle: { maxHeight: '450px' },
    imageContainerClass:
      'mt-8 flex w-full justify-center md:absolute md:bottom-0 md:right-48 md:mt-0 md:w-auto md:translate-y-40pxr md:items-end md:justify-end',
    background: 'linear-gradient(106deg, #FFFBEB 0%, #FEF3C7 60%, #FFFBEB 100%)',
    navColor: '#92400E',
    navHoverColor: '#B45309',
  },
  {
    title: '스크롤 한 번에\n오늘의 시장 흐름',
    bullets: ['숏폼으로 빠르게 읽는 투자 뉴스', '출퇴근길 3분, 오늘의 브리핑 완료'],
    href: '/reels',
    imageSrc: '/images/graph.svg',
    imageStyle: { maxHeight: '450px' },
    imageContainerClass:
      'mt-8 flex w-full justify-center md:absolute md:bottom-0 md:right-48 md:mt-0 md:w-auto md:translate-y-40pxr md:items-end md:justify-end',
    background: 'linear-gradient(106deg, #F0FDFA 0%, #CCFBF1 60%, #F0FDFA 100%)',
    navColor: '#134E4A',
    navHoverColor: '#0F766E',
  },
];

const INTERVAL = 4000;

const fadeUpStyle = (delay: number): CSSProperties => ({
  animation: `bannerFadeUp 0.5s ease both`,
  animationDelay: `${delay}ms`,
});

export default function HomeBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, tick]);

  const prev = () => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
    setTick((t) => t + 1);
  };
  const next = () => {
    setCurrent((c) => (c + 1) % SLIDES.length);
    setTick((t) => t + 1);
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative min-h-620pxr w-full overflow-hidden md:min-h-400pxr"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: slide.background }}>
      <style>{`
        @keyframes bannerFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto flex h-full min-h-620pxr w-full max-w-1600pxr flex-col items-start md:min-h-400pxr md:flex-row md:items-center">
        {/* 왼쪽 텍스트 블럭 */}
        <div className="flex w-full shrink-0 flex-col items-center gap-6 px-20pxr py-24pxr text-center sm:px-36pxr md:ml-8 md:max-w-[56%] md:items-start md:px-80pxr md:py-16 md:text-left lg:px-130pxr">
          <h1
            key={`title-${current}`}
            className="fonts-display whitespace-pre-line text-[#111827]"
            style={fadeUpStyle(0)}>
            {slide.title}
          </h1>
          <ul key={`bullets-${current}`} className="flex flex-col gap-2">
            {slide.bullets.map((b, i) => (
              <li
                key={b}
                className="text-[15px] font-normal leading-relaxed text-[#4B5563] sm:text-[16px]"
                style={fadeUpStyle(80 + i * 80)}>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <div
              className="flex items-center overflow-hidden rounded-full"
              style={{ border: `1px solid ${slide.navColor}`, background: slide.navColor }}>
              <button
                onClick={prev}
                className="flex h-8 w-8 items-center justify-center text-white transition-colors"
                style={{ ['--hover-bg' as string]: slide.navHoverColor }}
                onMouseEnter={(e) => (e.currentTarget.style.background = slide.navHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                ‹
              </button>
              <span
                className="px-3 text-[13px] font-bold text-white"
                style={{
                  borderLeft: `1px solid ${slide.navHoverColor}`,
                  borderRight: `1px solid ${slide.navHoverColor}`,
                }}>
                {current + 1} / {SLIDES.length}
              </span>
              <button
                onClick={next}
                className="flex h-8 w-8 items-center justify-center text-white transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.background = slide.navHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                ›
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 이미지 */}
        {slide.imageSrc && (
          <div
            key={`image-${current}`}
            className={
              slide.imageContainerClass ??
              'mt-8 flex w-full justify-center md:absolute md:bottom-0 md:right-48 md:mt-0 md:w-auto md:items-end md:justify-end'
            }
            style={fadeUpStyle(100)}>
            <img
              src={slide.imageSrc}
              alt="BrieFin 서비스 소개"
              className="h-auto w-[min(84vw,460px)] object-contain md:w-auto"
              style={slide.imageStyle}
            />
          </div>
        )}
      </div>
    </section>
  );
}
