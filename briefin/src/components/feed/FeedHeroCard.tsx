import Image from 'next/image';
import Link from 'next/link';
import Label from '@/components/common/Label';
import type { FeedItem } from '@/api/feedApi';

export default function FeedHeroCard({ item }: { item: FeedItem }) {
  return (
    <Link
      href={`/news/${item.newsId}`}
      className="group relative flex h-[300px] w-full overflow-hidden rounded-card sm:h-[380px]">
      {/* 배경 썸네일 */}
      {item.thumbnailUrl ? (
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/90" />
      )}

      {/* 어두운 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* 콘텐츠 */}
      <div className="relative mt-auto flex w-full flex-col gap-10pxr p-24pxr sm:p-32pxr">
        <div className="flex flex-wrap gap-6pxr">
          {item.category && <Label text={item.category} variant="category" />}
          {(item.relatedCompanies ?? []).slice(0, 2).map((c) => (
            <Label key={c} text={c} variant="company" />
          ))}
        </div>
        <h2 className="line-clamp-2 text-[20px] font-bold leading-snug text-white sm:text-[24px]">
          {item.title}
        </h2>
        {item.summary && (
          <p className="line-clamp-2 text-[13px] text-white/70">{item.summary}</p>
        )}
        <p className="text-[12px] text-white/50">
          <span className="font-medium text-white/70">{item.press}</span>
          <span className="mx-6pxr">·</span>
          <span>{item.publishedAt}</span>
        </p>
      </div>
    </Link>
  );
}
