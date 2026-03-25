import ReelsClient from '@/components/reels/ReelsClient';

export default function ReelsPage() {
  return (
    <div className="w-full pb-24pxr">
      <h1 className="fonts-heading3 mb-16pxr text-text-primary">뉴스 릴스</h1>
      <div className="-mx-48pxr w-[calc(100%+6rem)] max-w-none">
        <ReelsClient />
      </div>
    </div>
  );
}
