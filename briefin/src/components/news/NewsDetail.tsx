import { NewsDetailProps } from '@/types/news';

const SENTENCE_TERMINAL = /[.!?]$|[다요죠음함임]\.?$/;

function buildParagraphs(raw: string): string[] {
  const lines = raw.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const result: string[] = [];
  let current = lines[0];

  for (let i = 1; i < lines.length; i++) {
    if (SENTENCE_TERMINAL.test(current.trim())) {
      result.push(current);
      current = lines[i];
    } else {
      current += lines[i];
    }
  }
  result.push(current);
  return result;
}

export default function NewsDetail({ content }: NewsDetailProps) {
  const paragraphs = buildParagraphs(content);

  return (
    <div className="mt-24pxr border-t border-surface-border pt-24pxr">
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="leading-28pxr mt-18pxr break-keep text-[15px] tracking-[-0.1px] text-text-secondary first:mt-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
