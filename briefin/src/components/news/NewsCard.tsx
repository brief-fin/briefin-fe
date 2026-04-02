'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Label from '../common/Label';
import { NewsCardProps } from '@/types/news';
import { useScrapNews, useDeleteScrapNews, newsKeys } from '@/hooks/useNews';
import { useAuthStatus } from '@/providers/AuthSessionProvider';
import { ApiError } from '@/api/client';
import { useQueryClient } from '@tanstack/react-query';
import type { ScrapedNews } from '@/types/mypage';
import type { NewsDetailResponse } from '@/api/newsApi';

export default function NewsCard({ news }: NewsCardProps) {
  const { id, source, time, title, summary, categories, companies, thumbnailUrl, isScraped } = news;

  const queryClient = useQueryClient();
  const cachedDetail = queryClient.getQueryData<NewsDetailResponse>(newsKeys.detail(id));
  const cachedScraps = queryClient.getQueryData<{ scrapList: ScrapedNews[]; totalCount: number }>([
    'user',
    'scraps',
    1,
  ]);
  const isInCache = cachedScraps?.scrapList?.some((s) => String(s.newsId) === String(id)) ?? false;
  const [scrapped, setScrapped] = useState(cachedDetail?.isScraped ?? isScraped ?? isInCache);

  const authStatus = useAuthStatus();
  const { mutate: doScrap, isPending: scrapping } = useScrapNews();
  const { mutate: doDelete, isPending: deleting } = useDeleteScrapNews();
  const isPending = scrapping || deleting;

  const handleScrap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPending) return;
    if (scrapped) {
      setScrapped(false);
      doDelete(id, { onError: () => setScrapped(true) });
    } else {
      setScrapped(true);
      doScrap(id, {
        onError: (err) => {
          // 409: 이미 스크랩된 상태 → scrapped 유지
          if (err instanceof ApiError && err.status === 409) return;
          setScrapped(false);
        },
      });
    }
  };

  const hasLabels = categories.length > 0 || companies.length > 0;

  return (
    <div className="group relative max-w-1028pxr rounded-card border border-surface-border bg-white">
      {/* 카드 전체 클릭 → 뉴스 상세 이동 */}
      <Link href={`/news/${id}`} className="absolute inset-0 z-0" tabIndex={-1} aria-hidden />

      {/* 콘텐츠: pointer-events-none으로 Link 클릭 통과, 버튼만 pointer-events-auto */}
      <div className="pointer-events-none relative z-10 flex flex-col gap-10pxr px-24pxr py-22pxr sm:flex-row sm:gap-20pxr">
        <div className="flex flex-1 flex-col gap-10pxr overflow-hidden">
          {/* 스크랩 버튼 */}
          {authStatus === 'authenticated' && (
            <button
              onClick={handleScrap}
              disabled={isPending}
              aria-label={scrapped ? '스크랩 취소' : '스크랩'}
              className="pointer-events-auto self-start p-0 text-text-muted transition-colors hover:text-primary disabled:opacity-50">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={scrapped ? '#1E3A8A' : 'none'}
                stroke={scrapped ? '#1E3A8A' : 'currentColor'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          )}

          {/* 태그 */}
          {hasLabels && (
            <section className="flex flex-wrap gap-6pxr">
              {categories.map((cat) => (
                <Label key={cat} text={cat} variant="category" />
              ))}
              {companies.map((company, idx) => (
                <Label key={`${company}-${idx}`} text={company} variant="company" />
              ))}
            </section>
          )}

          {/* 모바일: 썸네일 + 제목 / 데스크탑: 제목만 */}
          <div className="flex items-start gap-12pxr sm:block">
            {thumbnailUrl && (
              <div className="relative h-72pxr w-100pxr shrink-0 overflow-hidden rounded-md sm:hidden">
                <Image src={thumbnailUrl} alt="" fill className="object-cover" unoptimized />
              </div>
            )}
            <p className="fonts-cardTitle line-clamp-2 flex-1 text-text-primary transition-colors group-hover:text-primary">
              {title}
            </p>
          </div>

          {/* 요약 */}
          {summary && summary.length > 0 && (
            <ul className="flex flex-col gap-4pxr">
              {summary.slice(0, 2).map((item, idx) => (
                <li key={idx} className="fonts-label flex items-center gap-6pxr text-text-secondary">
                  <span className="shrink-0 text-primary">•</span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 언론사 + 시간 */}
          <p className="fonts-label mt-auto flex items-center gap-4pxr pt-4pxr text-text-muted">
            <span className="font-medium text-text-sub">{source}</span>
            <span>·</span>
            <span>{time}</span>
          </p>
        </div>

        {/* 썸네일: 데스크탑만 */}
        {thumbnailUrl && (
          <div className="relative hidden h-100pxr w-160pxr shrink-0 self-center overflow-hidden rounded-md sm:block">
            <Image src={thumbnailUrl} alt="" fill className="object-cover" unoptimized />
          </div>
        )}
      </div>
    </div>
  );
}
