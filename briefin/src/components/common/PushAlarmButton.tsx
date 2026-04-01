'use client';

import { useState, useEffect } from 'react';
import { getSubscriptionStatus, subscribePush, unsubscribePush } from '@/lib/pushNotification';

interface Props {
  companyId: number;
  companyName?: string;
}

export default function PushAlarmButton({ companyId }: Props) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    getSubscriptionStatus(companyId)
      .then(setIsSubscribed)
      .finally(() => setLoading(false));
  }, [companyId]);

  const handleClick = async () => {
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

  if (typeof window !== 'undefined' && !('serviceWorker' in navigator)) return null;

  // 알림이 설정된 상태는 항상 노란색으로 표시
  const iconSrc = isSubscribed ? '/bell-yellow.svg' : hovered ? '/bell-yellow.svg' : '/bell-outline-gray.svg';

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title={isSubscribed ? '알림 해제' : '알림 받기'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 p-4pxr disabled:opacity-40">
      {loading ? (
        <span className="block h-18pxr w-18pxr animate-pulse rounded-full bg-gray-200" />
      ) : (
        <img src={iconSrc} alt="" width={18} height={18} />
      )}
    </button>
  );
}
