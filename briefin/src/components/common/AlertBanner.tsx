import { AlertBannerProps } from '@/types/common';

export default function AlertBanner({ title, description, buttonLabel, onButtonClick }: AlertBannerProps) {
  return (
    <div
      className="rounded-card p-24pxr md:p-28pxr"
      style={{ background: 'linear-gradient(135deg, #2C4A8F 0%, #1A3270 100%)' }}>
      <p className="text-[15px] font-black text-white">{title}</p>
      <p className="mt-10pxr text-[13px] leading-relaxed text-white/85">{description}</p>
      <button
        onClick={onButtonClick}
        className="mt-16pxr h-42pxr w-full rounded-button bg-surface-white text-[14px] font-bold text-primary transition-colors hover:bg-primary-light">
        {buttonLabel}
      </button>
    </div>
  );
}
