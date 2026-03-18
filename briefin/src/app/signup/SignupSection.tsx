'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupSection() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-primary-dark px-16pxr py-24pxr sm:px-24pxr sm:py-40pxr">
      {/* 배경 장식 */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          top: -200,
          right: -150,
          background: 'radial-gradient(circle, rgba(44,74,143,0.5) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          bottom: -180,
          left: -100,
          background: 'radial-gradient(circle, rgba(26,50,112,0.6) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          top: '30%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* 카드 */}
      <div className="relative z-10 w-full min-w-0 overflow-hidden rounded-[22px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.3)] sm:max-w-110 sm:rounded-[28px]">
        {/* 카드 상단 */}
        <div className="min-w-0 border-b border-surface-border px-20pxr pb-20pxr pt-28pxr sm:px-40pxr sm:pb-28pxr sm:pt-40pxr">
          {/* 로고 */}
          <div className="mb-28pxr flex items-center gap-10pxr">
            <Image src="/icon/logo.svg" alt="BrieFin" width={32} height={32} className="h-32pxr w-32pxr shrink-0" />
            <Image src="/icon/logoText.svg" alt="BrieFin" width={71} height={28} className="h-28pxr w-auto shrink-0" />
          </div>
          <h2 className="mb-6pxr text-[22px] font-black tracking-[-0.5px] text-text-primary wrap-break-word break-keep sm:text-2xl">
            시작해볼까요
          </h2>
          <p className="text-sm leading-relaxed text-text-muted break-keep">
            지금 가입하고 나만의 투자 뉴스 피드를 받아보세요
          </p>
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
              className="block w-full min-w-0 rounded-input border-[1.5px] border-transparent bg-surface-bg px-16pxr py-12pxr text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:bg-white sm:py-14pxr sm:text-[15px]"
            />
          </div>

          {/* 비밀번호 */}
          <div className="mb-14pxr">
            <label className="mb-6pxr block text-xs font-bold tracking-[0.3px] text-text-secondary">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상 입력"
              className="block w-full min-w-0 rounded-input border-[1.5px] border-transparent bg-surface-bg px-16pxr py-12pxr text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:bg-white sm:py-14pxr sm:text-[15px]"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="mb-14pxr">
            <label className="mb-6pxr block text-xs font-bold tracking-[0.3px] text-text-secondary">비밀번호 확인</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력"
              className="block w-full min-w-0 rounded-input border-[1.5px] border-transparent bg-surface-bg px-16pxr py-12pxr text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:bg-white sm:py-14pxr sm:text-[15px]"
            />
          </div>

          <button
            type="button"
            onClick={() => router.push('/onboarding')}
            className="mt-20pxr w-full rounded-input bg-primary py-14pxr text-sm font-bold text-white sm:py-15pxr sm:text-[15px]"
          >
            시작하기 →
          </button>

          <p className="mt-20pxr text-center text-[13px] text-text-muted break-keep">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-bold text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
