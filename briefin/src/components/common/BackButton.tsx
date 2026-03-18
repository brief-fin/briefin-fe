import Link from 'next/link';
import { BackButtonProps } from '@/types/common';

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
