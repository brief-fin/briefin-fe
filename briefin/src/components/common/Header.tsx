'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  isLoggedIn?: boolean;
  userEmail?: string;
  onLogout?: () => void;
};

type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: '전체 뉴스', href: '/news' },
  { label: '내 피드', href: '/feed' },
  { label: '공시', href: '/disclosure' },
  { label: '기업', href: '/companies' },
  { label: '✦ 뉴스탐색', href: '/explore', highlight: true },
];

export default function Header({ isLoggedIn = false, userEmail, onLogout }: HeaderProps) {
  const pathname = usePathname();

  const isActivePath = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="w-full min-w-0 shrink-0 border-b border-[#E5E7EB] bg-white">
      <div className="flex min-h-16 min-w-0 flex-wrap items-center justify-between gap-3 px-6 py-3">
        <div className="flex min-w-0 flex-wrap items-center gap-4 gap-y-2">
          <Link href="/" className="flex shrink-0 items-center gap-[10px]">
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
              className="h-6 w-auto shrink-0 md:h-7"
            />
          </Link>

          <nav className="flex flex-wrap items-center gap-2 gap-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = isActivePath(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`fonts-bodySmall flex h-9 shrink-0 items-center rounded-[8px] px-3 font-bold transition-colors ${
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
              <span className="fonts-label">{userEmail ?? 'user@example.com'}</span>

              <Link
                href="/mypage"
                className="fonts-bodySmall flex h-[38px] min-w-[102px] items-center justify-center rounded-[10px] border border-[#E5E7EB] bg-white px-4 font-bold text-[#4B5563] hover:bg-[#F9FAFB]">
                마이페이지
              </Link>

              <button
                onClick={onLogout}
                className="fonts-bodySmall flex h-[38px] min-w-[90px] items-center justify-center rounded-[10px] border border-[#E5E7EB] bg-white px-4 font-bold text-[#4B5563] hover:bg-[#F9FAFB]">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="fonts-label flex h-9 items-center justify-center rounded-[10px] border border-[#E5E7EB] px-[12px] text-[#4B5563]">
                로그인
              </Link>
              <Link
                href="/signup"
                className="fonts-label flex h-9 items-center justify-center rounded-[10px] bg-[#2C4A8F] px-[12px] text-white">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
