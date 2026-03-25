type HighlightTitleProps = {
  title: string;
  highlight: string;
};

export default function HighlightTitle({ title, highlight }: HighlightTitleProps) {
  const parts = title.split(highlight);
  if (parts.length === 1) return <span>{title}</span>;
  return (
    <>
      {parts[0]}
      <em className="not-italic text-primary">{highlight}</em>
      {parts[1]}
    </>
  );
}
