'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WithdrawConfirmModal from '@/components/auth/WithdrawConfirmModal';
import { STORAGE_KEY_SELECTED_COMPANIES } from '@/mocks/mock-companies';

export default function AccountSection() {
  const router = useRouter();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleWithdrawConfirm = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY_SELECTED_COMPANIES);
      }
    } catch {
      // ignore
    }
    router.push('/');
  };

  return (
    <>
      <div className="rounded-card border border-surface-border bg-surface-white p-24pxr">
        <h3 className="text-[15px] font-bold text-text-primary">계정</h3>
        <button
          type="button"
          onClick={() => setShowWithdrawModal(true)}
          className="mt-16pxr text-[14px] font-bold text-text-muted underline transition-colors hover:text-semantic-red"
        >
          회원 탈퇴
        </button>
      </div>

      <WithdrawConfirmModal
        open={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onConfirm={handleWithdrawConfirm}
      />
    </>
  );
}
