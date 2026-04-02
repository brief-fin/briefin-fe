'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '@/api/authApi';
import { markExplicitLogout } from '@/lib/refreshSession';
import { NAV_ITEMS } from '@/constants/header';
import { useAuthSessionVersion } from '@/providers/AuthSessionProvider';
import { authStore } from '@/store/authStore';

function getEmailFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email ?? null;
  } catch {
    return null;
  }
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const authSessionVersion = useAuthSessionVersion();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const authed = authStore.isAuthenticated();
    setIsLoggedIn(authed);
    const token = authStore.getAccessToken();
    setUserEmail(authed && token ? getEmailFromToken(token) : null);
  }, [pathname, authSessionVersion]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    try {
      await logoutApi();
    } catch {
      /* 서버 오류여도 클라이언트 세션은 종료 */
    } finally {
      queryClient.clear();
      markExplicitLogout();
      authStore.clear();
      setIsLoggedIn(false);
      setUserEmail(null);
      router.push('/login');
    }
  };

  const isActivePath = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="w-full min-w-0 shrink-0 bg-white">
      <div className="mx-auto max-w-1600pxr">
        {/* 상단 바 */}
        <div className="flex min-h-16 min-w-0 items-center justify-between px-20pxr py-20pxr sm:px-40pxr md:px-80pxr lg:px-130pxr">
          {/* 로고 + 데스크탑 nav */}
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-10pxr">
              <Image
                src="/icon/logo.svg"
                alt="BrieFin"
                width={40}
                height={40}
                className="h-8 w-8 shrink-0 md:h-10 md:w-10"
              />
              <Image
                src="/icon/logoText.svg"
                alt="BrieFin"
                width={71}
                height={28}
                className="h-24pxr w-auto shrink-0 md:h-7"
              />
            </Link>

            {/* 데스크탑 전용 nav */}
            <nav className="hidden items-center gap-2 xl:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = isActivePath(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`fonts-bodySmall flex h-36pxr shrink-0 items-center rounded-nav px-12pxr font-bold transition-colors ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#1E3A8A]'
                        : item.highlight
                          ? 'text-[#1E3A8A] hover:bg-[#EFF6FF]'
                          : 'text-[#4B5563] hover:bg-[#EFF6FF]'
                    }`}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* 데스크탑 전용 auth 버튼 */}
          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            {isLoggedIn ? (
              <>
                <span className="fonts-label">{userEmail}</span>
                <Link
                  href="/mypage"
                  className="fonts-bodySmall flex h-38pxr min-w-102pxr items-center justify-center rounded-button border border-[#D1D5DB] bg-white px-4 font-bold text-[#4B5563] hover:bg-[#F3F4F6]">
                  마이페이지
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="fonts-bodySmall flex h-38pxr min-w-90pxr items-center justify-center rounded-button border border-[#D1D5DB] bg-white px-16pxr font-bold text-[#4B5563] hover:bg-[#F3F4F6]">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="fonts-label flex h-9 items-center justify-center rounded-button border border-[#D1D5DB] px-12pxr text-[#4B5563]">
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="fonts-label flex h-9 items-center justify-center rounded-[10px] bg-[#1E3A8A] px-12pxr text-white">
                  회원가입
                </Link>
              </>
            )}
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-nav text-[#4B5563] hover:bg-[#F3F4F6] xl:hidden"
            aria-label="메뉴 열기">
            {isMenuOpen ? (
              /* X 아이콘 */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              /* 햄버거 아이콘 */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="5" x2="17" y2="5" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="15" x2="17" y2="15" />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {isMenuOpen && (
          <div className="border-t border-[#F1F5F9] px-20pxr pb-20pxr pt-12pxr sm:px-40pxr md:px-80pxr xl:hidden">
            <nav className="flex flex-col gap-4pxr">
              {NAV_ITEMS.map((item) => {
                const isActive = isActivePath(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`fonts-bodySmall flex h-44pxr items-center rounded-nav px-12pxr font-bold transition-colors ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#1E3A8A]'
                        : item.highlight
                          ? 'text-[#1E3A8A] hover:bg-[#EFF6FF]'
                          : 'text-[#4B5563] hover:bg-[#EFF6FF]'
                    }`}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-16pxr border-t border-[#F1F5F9] pt-16pxr">
              {isLoggedIn ? (
                <div className="flex flex-col gap-8pxr">
                  <span className="fonts-label px-12pxr text-[#6B7280]">{userEmail}</span>
                  <Link
                    href="/mypage"
                    className="fonts-bodySmall flex h-44pxr items-center rounded-nav px-12pxr font-bold text-[#4B5563] hover:bg-[#F3F4F6]">
                    마이페이지
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="fonts-bodySmall flex h-44pxr items-center rounded-nav px-12pxr font-bold text-[#4B5563] hover:bg-[#F3F4F6]">
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="flex gap-8pxr">
                  <Link
                    href="/login"
                    className="fonts-label flex h-9 flex-1 items-center justify-center rounded-button border border-[#D1D5DB] text-[#4B5563]">
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="fonts-label flex h-9 flex-1 items-center justify-center rounded-[10px] bg-[#1E3A8A] text-white">
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
