'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WithdrawConfirmModal from '@/components/auth/WithdrawConfirmModal';
import { deleteMyAccount } from '@/api/userApi';
import { STORAGE_KEY_SELECTED_COMPANIES } from '@/mocks/mock-companies';
import { authStore } from '@/store/authStore';
import { useMyInfo } from '@/hooks/useUser';

export default function AccountSection() {
  const router = useRouter();
  const { data: userInfo } = useMyInfo();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleWithdrawConfirm = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteMyAccount();
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY_SELECTED_COMPANIES);
      }
      authStore.clear();
      setShowWithdrawModal(false);
      router.replace('/');
    } catch {
      setDeleteError('회원 탈퇴 처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="rounded-card border border-surface-border bg-surface-white p-24pxr">
        <h3 className="text-[15px] font-bold text-text-primary">{userInfo?.email ?? '계정'}</h3>
        <button
          type="button"
          onClick={() => {
            setDeleteError(null);
            setShowWithdrawModal(true);
          }}
          className="mt-16pxr text-[14px] font-bold text-text-muted underline transition-colors hover:text-semantic-red"
        >
          회원 탈퇴
        </button>
      </div>

      <WithdrawConfirmModal
        open={showWithdrawModal}
        onClose={() => {
          if (isDeleting) return;
          setShowWithdrawModal(false);
        }}
        onConfirm={handleWithdrawConfirm}
        isDeleting={isDeleting}
        errorMessage={deleteError}
      />
    </>
  );
}
