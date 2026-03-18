'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginRequiredViewProps {
  /** 모달로 쓸 때 닫기 콜백. 없으면 페이지에서 사용, "다음에 할게요"는 router.back() */
  onClose?: () => void;
}

export default function LoginRequiredView({ onClose }: LoginRequiredViewProps) {
  const router = useRouter();

  const handleLater = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-bg p-24pxr sm:p-32pxr">
      <div
        className="absolute inset-24pxr rounded-hero bg-black/5 sm:inset-32pxr"
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-440pxr rounded-modal bg-surface-white px-40pxr py-32pxr shadow-modal">
        <p className="text-center text-[48px] leading-none" aria-hidden>
          🔒
        </p>
        <h2 className="mt-16pxr text-center text-[22px] font-black tracking-[-0.5px] text-text-primary">
          로그인이 필요해요
        </h2>
        <p className="mt-12pxr text-center text-[14px] font-normal leading-[22.4px] text-text-secondary">
          로그인하면 관심 기업 등록, 스크랩, 맞춤 피드를 이용할 수{' '}
          <span className="whitespace-nowrap">있어요.</span>
        </p>

        <div className="mt-24pxr flex flex-col gap-12pxr">
          <Link
            href="/login"
            className="flex h-49pxr items-center justify-center rounded-button bg-primary text-[15px] font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            로그인하기
          </Link>
          <Link
            href="/signup"
            className="flex h-51pxr items-center justify-center rounded-button border-2 border-primary bg-surface-white text-[15px] font-bold text-primary transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            회원가입하기
          </Link>
        </div>

        <button
          type="button"
          onClick={handleLater}
          className="mt-20pxr w-full text-center text-[14px] font-normal text-text-muted transition-colors hover:text-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-border"
        >
          다음에 할게요
        </button>
      </div>
    </div>
  );
}
