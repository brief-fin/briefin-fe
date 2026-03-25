'use client';

import { useEffect, useState } from 'react';

const SLIDES = [
  {
    title: '투자뉴스, 핵심만\n골라드려요',
    bullets: ['공시·뉴스·실적을 AI가 요약해', '내 관심 종목 소식만 골라 알려드려요'],
    href: '/about',
    imageSrc: '/images/hero-banner.svg',
  },
  {
    title: '어렵고 긴 뉴스,\n핵심만 남겼어요',
    bullets: ['주요 뉴스를 3줄로 요약', '관심 종목 뉴스만 골라서 보여드려요'],
    href: '/news',
    imageSrc: '/images/banner-news.svg',
  },
  {
    title: '복잡한 공시,\n3줄로 끝냅니다',
    bullets: ['DART 공시를 쉬운 말로 바꿔드려요', '계약·실적·지분 변동 핵심만 추려드려요'],
    href: '/disclosure',
    imageSrc: '/images/banner-disclosure.svg',
  },
  {
    title: '오늘 내 종목\n이슈는?',
    bullets: ['관심 기업 뉴스를 한곳에서', '매일 아침 맞춤 브리핑을 받아보세요'],
    href: '/feed',
    imageSrc: '/images/banner-feed.svg',
  },
  {
    title: '스크롤 한 번에\n오늘의 시장 흐름',
    bullets: ['숏폼으로 빠르게 읽는 투자 뉴스', '출퇴근길 3분, 오늘의 브리핑 완료'],
    href: '/reels',
    imageSrc: '/images/banner-reels.svg',
  },
];

const INTERVAL = 4000;

const fadeUpStyle = (delay: number): React.CSSProperties => ({
  animation: `bannerFadeUp 0.5s ease both`,
  animationDelay: `${delay}ms`,
});

export default function HomeBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <section
      className="relative min-h-400pxr w-full overflow-hidden"
      style={{
        background: 'linear-gradient(106deg, #F5F0E8 0%, #E0D8C8 60%, #F5F0E8 100%)',
      }}>
      <style>{`
        @keyframes bannerFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto flex h-full min-h-400pxr w-full max-w-1600pxr flex-row items-center">
        {/* 왼쪽 텍스트 블럭 — key 변경 시 리마운트로 애니메이션 재실행 */}
        <div key={current} className="ml-8 flex shrink-0 flex-col gap-6 px-48pxr py-16">
          <h1
            className="fonts-display whitespace-pre-line text-[#1A1D1F]"
            style={fadeUpStyle(0)}>
            {slide.title}
          </h1>
          <ul className="flex flex-col gap-2">
            {slide.bullets.map((b, i) => (
              <li
                key={b}
                className="text-[16px] font-normal leading-relaxed text-[#4B5563]"
                style={fadeUpStyle(80 + i * 80)}>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6" style={fadeUpStyle(240)}>
            <div className="flex items-center overflow-hidden rounded-full border border-[#C4B49A] bg-[#C4B49A]">
              <button
                onClick={prev}
                className="flex h-8 w-8 items-center justify-center text-white hover:bg-[#B8A88E]">
                ‹
              </button>
              <span className="border-x border-[#B8A88E] px-3 text-[13px] font-bold text-white">
                {current + 1} / {SLIDES.length}
              </span>
              <button
                onClick={next}
                className="flex h-8 w-8 items-center justify-center text-white hover:bg-[#B8A88E]">
                ›
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 이미지 */}
        {slide.imageSrc && (
          <div
            className="relative ml-auto mr-48 flex items-end justify-end self-stretch"
            style={fadeUpStyle(100)}>
            <img
              src={slide.imageSrc}
              alt="BrieFin 서비스 소개"
              className="h-auto max-h-320pxr w-auto object-contain object-bottom-right"
            />
          </div>
        )}
      </div>
    </section>
  );
}
