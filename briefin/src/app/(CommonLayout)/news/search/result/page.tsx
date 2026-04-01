'use client';

import { Suspense } from 'react';
import SearchContent from '@/components/news/SearchContent';

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
