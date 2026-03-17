import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'BrieFin', href: '/', bold: true },
  { label: '서비스 소개', href: '/about' },
  { label: '이용약관', href: '/terms' },
  { label: '개인정보처리방침', href: '/privacy' },
  { label: '고객센터', href: '/support' },
  { label: '공지사항', href: '/notice' },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E5E7EB] bg-white px-6 py-10">
      <div className="footer-inner mx-auto flex w-full max-w-[1200px] flex-col">
        <div className="footer-links mb-4 flex flex-wrap items-center gap-5">
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.bold
                  ? 'footer-link text-[13px] font-bold text-[#4B5563] transition-colors hover:text-[#2C4A8F]'
                  : 'footer-link text-[13px] font-semibold text-[#9CA3AF] transition-colors hover:text-[#2C4A8F]'
              }>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer-disclaimer mb-4 rounded-[10px] bg-[#F5F6F8] px-[18px] py-[14px] text-[12px] leading-[1.7] text-[#9CA3AF]">
          본 서비스에서 제공하는 정보는 투자 참고 자료이며, 투자 판단의 책임은 이용자 본인에게 있습니다. 제공되는 정보는
          오류가 있을 수 있으며, 투자 결과에 대해 당사는 법적 책임을 지지 않습니다.
        </div>
        <div className="footer-copy text-[12px] text-[#9CA3AF]">© 2026 BrieFin. All rights reserved.</div>
      </div>
    </footer>
  );
}
