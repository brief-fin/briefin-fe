import NewsDetailClient from '@/components/news/NewsDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <NewsDetailClient id={id} />;
}
