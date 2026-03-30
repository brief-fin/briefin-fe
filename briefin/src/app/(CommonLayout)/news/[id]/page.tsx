import type { Metadata } from 'next';
import NewsDetailLoader from '@/components/news/NewsDetailLoader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `뉴스 #${id} | BrieFin`,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <NewsDetailLoader id={id} />;
}
