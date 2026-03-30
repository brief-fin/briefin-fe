import Link from 'next/link';
import { AlertBannerProps } from '@/types/common';

const buttonClass =
  'mt-16pxr flex h-42pxr w-full items-center justify-center rounded-button bg-surface-white text-[14px] font-bold text-primary';

export default function AlertBanner({ title, description, buttonLabel, buttonHref, onButtonClick }: AlertBannerProps) {
  return (
    <div
      className="rounded-card p-24pxr md:p-28pxr"
      style={{ background: 'linear-gradient(135deg, #2C4A8F 0%, #1A3270 100%)' }}>
      <p className="text-[15px] font-black text-white">{title}</p>
      <p className="mt-10pxr text-[13px] leading-relaxed text-white/85">{description}</p>
      {buttonHref ? (
        <Link href={buttonHref} className={buttonClass}>
          {buttonLabel}
        </Link>
      ) : (
        <button type="button" onClick={onButtonClick} className={buttonClass}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
