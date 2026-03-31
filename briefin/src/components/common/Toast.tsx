import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-40pxr left-1/2 z-50 -translate-x-1/2 animate-bounce-in">
      <div className="rounded-full bg-text-primary px-24pxr py-12pxr text-[14px] font-bold text-surface-white shadow-lg">
        {message}
      </div>
    </div>
  );
}