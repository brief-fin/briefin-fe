import NewsDetailLoader from '@/components/news/NewsDetailLoader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <NewsDetailLoader id={id} />;
}
