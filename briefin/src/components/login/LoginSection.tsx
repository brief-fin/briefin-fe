'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';

export default function LoginSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error } = useLogin();

  return (
    <section className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-primary-dark px-16pxr py-24pxr sm:px-24pxr sm:py-40pxr">
      {/* 배경 장식 */}
      <div className="size-r600pxr pointer-events-none absolute -left-200pxr -top-250pxr rounded-full bg-[radial-gradient(circle,rgba(44,74,143,0.45)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-120pxr -right-80pxr size-350pxr rounded-full bg-[radial-gradient(circle,rgba(26,50,112,0.55)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute right-[8%] top-[20%] size-180pxr rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 카드 */}
      <div className="sm:max-w-110 relative z-10 w-full min-w-0 overflow-hidden rounded-[22px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.3)] sm:rounded-[28px]">
        {/* 카드 상단 */}
        <div className="min-w-0 border-b border-surface-border px-20pxr pb-20pxr pt-28pxr sm:px-40pxr sm:pb-28pxr sm:pt-40pxr">
          {/* 로고 */}
          <div className="mb-28pxr flex items-center gap-10pxr">
            <Image src="/icon/logo.svg" alt="BrieFin" width={32} height={32} className="h-32pxr w-32pxr shrink-0" />
            <Image src="/icon/logoText.svg" alt="BrieFin" width={71} height={28} className="h-28pxr w-auto shrink-0" />
          </div>
          <h2 className="wrap-break-word mb-6pxr break-keep text-[22px] font-black tracking-[-0.5px] text-text-primary sm:text-2xl">
            다시 만나서 반가워요
          </h2>
          <p className="break-keep text-sm leading-relaxed text-text-muted">로그인하고 나만의 투자 피드를 확인하세요</p>
        </div>

        {/* 카드 본문 */}
        <div className="min-w-0 px-20pxr py-20pxr sm:px-40pxr sm:py-32pxr">
          {/* 이메일 */}
          <div className="mb-14pxr">
            <label className="mb-6pxr block text-xs font-bold tracking-[0.3px] text-text-secondary">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="block w-full min-w-0 rounded-input border-[1.5px] border-transparent bg-surface-bg px-16pxr py-12pxr text-sm text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:border-primary focus:bg-white sm:py-14pxr sm:text-[15px]"
            />
          </div>

          {/* 비밀번호 */}
          <div className="mb-14pxr">
            <div className="mb-6pxr flex flex-wrap items-center justify-between gap-8pxr">
              <label className="text-xs font-bold tracking-[0.3px] text-text-secondary">비밀번호</label>
              <Link href="#" className="text-xs font-semibold text-primary transition-opacity duration-150 hover:opacity-70">
                비밀번호 찾기
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="block w-full min-w-0 rounded-input border-[1.5px] border-transparent bg-surface-bg px-16pxr py-12pxr text-sm text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:border-primary focus:bg-white sm:py-14pxr sm:text-[15px]"
            />
          </div>

          {error && (
            <p className="mb-10pxr text-center text-xs font-semibold text-red-500">
              이메일 또는 비밀번호를 확인해주세요
            </p>
          )}

          <button
            type="button"
            disabled={isPending}
            onClick={() => login({ email, password })}
            className="mt-20pxr w-full rounded-input bg-primary py-14pxr text-sm font-bold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 sm:py-15pxr sm:text-[15px]">
            {isPending ? '로그인 중...' : '로그인'}
          </button>

          {/* 구분선 */}
          <div className="my-20pxr flex items-center gap-12pxr">
            <span className="h-px flex-1 bg-surface-border" />
            <span className="text-xs font-semibold text-text-muted">또는</span>
            <span className="h-px flex-1 bg-surface-border" />
          </div>

          <p className="fonts-label break-keep text-center text-text-muted">
            아직 계정이 없으신가요?{' '}
            <Link href="/signup" className="font-bold text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
