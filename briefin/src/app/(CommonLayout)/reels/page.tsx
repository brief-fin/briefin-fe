import ReelsClient from '@/components/reels/ReelsClient';

export default function ReelsPage() {
  return (
    <div className="min-h-screen w-full pt-24pxr pb-24pxr">
      <div className="-mx-20pxr w-[calc(100%+2.5rem)] max-w-none sm:-mx-40pxr sm:w-[calc(100%+5rem)] md:-mx-80pxr md:w-[calc(100%+10rem)] lg:-mx-130pxr lg:w-[calc(100%+16.25rem)]">
        <ReelsClient />
      </div>
    </div>
  );
}
