'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AlertBanner from '@/components/common/AlertBanner';
import { DisclosureSidebarProps } from '@/types/disclosure';
import { getSubscriptionStatus, subscribePush, unsubscribePush } from '@/lib/pushNotification';

export default function DisclosureSidebar({
  recentDisclosures,
  companyName = '이 기업',
  companyId,
}: DisclosureSidebarProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  // 초기 구독 상태 조회
  useEffect(() => {
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
  }, [companyId]);

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
        if (success) setIsSubscribed(true);
      }
    } catch (error) {
      console.error('알림 설정 실패:', error);
      alert('알림 설정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="flex w-full flex-col gap-20pxr lg:w-340pxr lg:shrink-0">
      <AlertBanner
        title="🔔 공시 알림 받기"
        description={`${companyName}의 새 공시가 올라오면 즉시 알려드려요.`}
        buttonLabel={loading ? '처리 중...' : isSubscribed ? '알림 해제하기' : '알림 설정하기'}
        onButtonClick={handleAlertClick}
      />
      <div className="overflow-hidden rounded-card border border-surface-border bg-surface-white">
        <h2 className="border-b border-surface-border px-22pxr py-16pxr text-[13px] font-black text-text-primary">
          📋 최근 공시
        </h2>
        <ul className="divide-y divide-surface-border">
          {recentDisclosures.map((item) => (
            <li key={item.id}>
              <Link
                href={`/disclosure/${item.id}`}
                className="block px-22pxr py-16pxr transition-colors hover:bg-surface-bg">
                <p className="line-clamp-2 text-[14px] font-bold text-text-primary">{item.title}</p>
                <p className="fonts-caption mt-4pxr">
                  {[item.date, item.category].filter(Boolean).join(' · ')}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
