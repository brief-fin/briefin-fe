import Link from 'next/link';
import { BackButtonProps } from '@/types/common';

const baseClass =
  'back-btn inline-flex items-center gap-1.5 rounded-button border border-[#D1D5DB] bg-white py-2 px-3.5 text-[14px] font-semibold text-[#4B5563] transition-colors hover:bg-[#F3F4F6]';

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
