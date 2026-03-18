import Link from 'next/link';

type BackButtonProps = {
  /** 이동할 경로. 있으면 Link, 없으면 button으로 렌더 */
  href?: string;
  /** 클릭 핸들러. href가 없을 때만 사용 */
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const baseClass =
  'back-btn inline-flex items-center gap-1.5 rounded-button border border-[#E5E7EB] bg-white py-2 px-3.5 text-[14px] font-semibold text-[#4B5563] transition-colors hover:bg-[#F9FAFB]';

export default function BackButton({ href, onClick, children, className = '' }: BackButtonProps) {
  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  if (href != null) {
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
}
