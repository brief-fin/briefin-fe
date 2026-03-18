'use client';

interface WithdrawConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function WithdrawConfirmModal({
  open,
  onClose,
  onConfirm,
}: WithdrawConfirmModalProps) {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-bg p-24pxr sm:p-32pxr"
      role="dialog"
      aria-modal="true"
      aria-labelledby="withdraw-modal-title"
    >
      <div
        className="absolute inset-24pxr rounded-hero bg-black/5 sm:inset-32pxr"
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-440pxr rounded-modal bg-surface-white px-40pxr py-32pxr shadow-modal">
        <p className="text-center text-[48px] leading-none" aria-hidden>
          ⚠️
        </p>
        <h2
          id="withdraw-modal-title"
          className="mt-16pxr text-center text-[22px] font-black tracking-[-0.5px] text-text-primary"
        >
          정말 탈퇴하시겠어요?
        </h2>
        <p className="mt-12pxr text-center text-[14px] font-normal leading-[22.4px] text-text-secondary">
          탈퇴하면 모든 데이터(관심 기업, 스크랩, 히스토리)가
          <br />
          영구적으로 삭제되며 <span className="whitespace-nowrap">복구할 수 없습니다.</span>
        </p>

        <button
          type="button"
          onClick={handleConfirm}
          className="mt-24pxr flex h-49pxr w-full items-center justify-center rounded-button bg-semantic-red text-[15px] font-bold text-white shadow-modal transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-red"
        >
          탈퇴하기
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-16pxr w-full text-center text-[14px] font-normal text-text-muted transition-colors hover:text-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-border"
        >
          취소
        </button>
      </div>
    </div>
  );
}
