'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout as logoutApi } from '@/api/authApi';
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
  const authSessionVersion = useAuthSessionVersion();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const authed = authStore.isAuthenticated();
    setIsLoggedIn(authed);
    const token = authStore.getAccessToken();
    setUserEmail(authed && token ? getEmailFromToken(token) : null);
  }, [pathname, authSessionVersion]);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      /* 서버 오류여도 클라이언트 세션은 종료 */
    } finally {
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
    <header className="w-full min-w-0 shrink-0 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-1600pxr">
        <div className="flex min-h-16 min-w-0 flex-wrap items-center justify-between gap-3 px-130pxr py-20pxr">
          <div className="flex min-w-0 flex-wrap items-center gap-4 gap-y-2">
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

            <nav className="flex flex-wrap items-center gap-2 gap-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = isActivePath(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`fonts-bodySmall flex h-36pxr shrink-0 items-center rounded-nav px-12pxr font-bold transition-colors ${
                      isActive
                        ? 'bg-[#F5F0E8] text-[#2C4A8F]'
                        : item.highlight
                          ? 'text-[#2C4A8F] hover:bg-[#F8F5EF]'
                          : 'text-[#4B5563] hover:bg-[#F8F5EF]'
                    }`}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {isLoggedIn ? (
              <>
                <span className="fonts-label">{userEmail}</span>
                <Link
                  href="/mypage"
                  className="fonts-bodySmall flex h-38pxr min-w-102pxr items-center justify-center rounded-button border border-[#E5E7EB] bg-white px-4 font-bold text-[#4B5563] hover:bg-[#F9FAFB]">
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="fonts-bodySmall flex h-38pxr min-w-90pxr items-center justify-center rounded-button border border-[#E5E7EB] bg-white px-16pxr font-bold text-[#4B5563] hover:bg-[#F9FAFB]">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="fonts-label flex h-9 items-center justify-center rounded-button border border-[#E5E7EB] px-12pxr text-[#4B5563]">
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="fonts-label flex h-9 items-center justify-center rounded-[10px] bg-[#2C4A8F] px-12pxr text-white">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
