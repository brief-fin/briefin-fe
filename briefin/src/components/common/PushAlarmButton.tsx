'use client';

import { useState, useEffect } from 'react';
import { getSubscriptionStatus, subscribePush, unsubscribePush } from '@/lib/pushNotification';

interface Props {
  companyId: number;
  companyName: string;
}

export default function PushAlarmButton({ companyId, companyName }: Props) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  // 초기 구독 상태 조회
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

  // Service Worker 미지원 브라우저 처리
  if (typeof window !== 'undefined' && !('serviceWorker' in navigator)) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={!isSubscribed ? { background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' } : undefined}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-opacity ${
        isSubscribed ? 'bg-gray-100 text-gray-700 hover:opacity-70' : 'text-white hover:opacity-80'
      }`}>
      {loading ? '처리 중...' : isSubscribed ? '🔔 알림 해제' : '🔔 알림 받기'}
    </button>
  );
}
