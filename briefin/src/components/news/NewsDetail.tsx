import { NewsDetailProps } from '@/types/news';

export default function NewsDetail({ content }: NewsDetailProps) {
  return (
    <div className="mt-20pxr">
      {content.split('\n\n').map((paragraph, i) => (
        <p key={i} className="fonts-body mt-16pxr break-keep text-text-secondary">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
