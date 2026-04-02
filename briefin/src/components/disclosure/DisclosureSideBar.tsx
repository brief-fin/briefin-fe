'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DisclosureSidebarProps } from '@/types/disclosure';
import { getCategoryLabel } from '@/constants/disclosureCategories';
import { getSubscriptionStatus, subscribePush, unsubscribePush } from '@/lib/pushNotification';
import { useAuthSessionVersion } from '@/providers/AuthSessionProvider';

export default function DisclosureSidebar({
  recentDisclosures,
  companyName = '이 기업',
  companyId,
}: DisclosureSidebarProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const authVersion = useAuthSessionVersion();
  const router = useRouter();

  // auth 초기화 완료 후 구독 상태 조회 (authVersion === 0이면 토큰 미설정 상태)
  useEffect(() => {
    if (authVersion === 0) return;

    let cancelled = false;
    if (!companyId) {
      setLoading(false);
      return;
    }

    getSubscriptionStatus(companyId)
      .then((value) => {
        if (!cancelled) setIsSubscribed(value);
      })
      .catch(() => {
        if (!cancelled) setIsSubscribed(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [companyId, authVersion]);

  const handleAlertClick = async () => {
    // Service Worker 미지원 브라우저
    if (!('serviceWorker' in navigator)) {
      alert('이 브라우저는 알림을 지원하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      if (isSubscribed) {
        await unsubscribePush(companyId);
        setIsSubscribed(false);
      } else {
        const success = await subscribePush(companyId);
        if (success) {
          setIsSubscribed(true);
          if (companyId) router.push(`/companies/${companyId}`);
        }
      }
    } catch (error) {
      console.error('알림 설정 실패:', error);
      alert('알림 설정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-16pxr">
      <div className="overflow-hidden rounded-card border border-surface-border bg-surface-white">
        <h2 className="border-b border-surface-border px-22pxr py-16pxr text-[13px] font-black text-text-primary">
          최근 공시
        </h2>
        {recentDisclosures.length === 0 ? (
          <p className="px-22pxr py-20pxr text-center text-[13px] text-text-muted">해당 기업의 최근 공시가 없습니다.</p>
        ) : (
          <ul className="divide-y divide-surface-border">
            {recentDisclosures.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/disclosure/${item.id}`}
                  className="block px-22pxr py-16pxr transition-colors hover:bg-surface-bg">
                  <p className="line-clamp-2 text-[14px] font-bold text-text-primary">{item.title}</p>
                  <p className="fonts-caption mt-4pxr">
                    {[item.date, item.category ? getCategoryLabel(item.category) : ''].filter(Boolean).join(' · ')}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 공시 알림 구독 배너 */}
      <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
        <div className="mb-14pxr flex h-40pxr w-40pxr items-center justify-center rounded-full bg-primary/10">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>

        <p className="text-[14px] font-bold text-text-primary">공시 알림 받기</p>
        <p className="mt-6pxr text-[12px] leading-relaxed text-text-muted">
          {companyName}의 새 공시가 올라오면 즉시 알려드려요.
        </p>

        {loading ? (
          <div className="bg-surface-muted mt-14pxr h-34pxr w-full animate-pulse rounded-button" />
        ) : (
          <button
            type="button"
            onClick={handleAlertClick}
            className={[
              'mt-14pxr flex w-full items-center justify-center rounded-button px-16pxr py-8pxr text-[12px] font-semibold transition-opacity hover:opacity-80',
              isSubscribed
                ? 'border border-surface-border bg-surface-white text-text-secondary'
                : 'bg-primary text-white',
            ].join(' ')}>
            {isSubscribed ? '알림 해제하기' : '알림 설정하기'}
          </button>
        )}
      </div>
    </div>
  );
}
