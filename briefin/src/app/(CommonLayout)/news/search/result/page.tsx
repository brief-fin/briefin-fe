import { Suspense } from 'react';
import SearchContent from '@/components/news/SearchContent';

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="relative flex h-full w-full flex-col pt-36pxr" />}>
      <SearchContent />
    </Suspense>
  );
}
