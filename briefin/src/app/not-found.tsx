import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-24pxr bg-surface-bg px-24pxr text-center">
      <p className="text-[80px] font-black leading-none text-primary opacity-20">404</p>

      <div className="flex flex-col gap-8pxr">
        <h1 className="fonts-heading3 text-text-primary">페이지를 찾을 수 없어요</h1>
        <p className="fonts-body text-text-secondary">
          주소가 잘못됐거나 삭제된 페이지예요.
        </p>
      </div>

      <Link
        href="/home"
        className="rounded-button bg-primary px-24pxr py-12pxr text-[14px] font-semibold text-white transition-opacity hover:opacity-80">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
