import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchNewsDetail } from '@/api/newsApi';
import NewsDetailClient from '@/components/news/NewsDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await fetchNewsDetail(id);
    return {
      title: data.title,
      description: data.summary ?? undefined,
      openGraph: {
        title: data.title,
        description: data.summary ?? undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;

  let data;
  try {
    data = await fetchNewsDetail(id);
  } catch {
    notFound();
  }

  return <NewsDetailClient data={data} />;
}
