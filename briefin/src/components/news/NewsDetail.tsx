interface NewsDetailProps {
    content: string;
  }
  
  export default function NewsDetail({ content }: NewsDetailProps) {
    return (
      <div className="mt-20pxr">
        {content.split('\n\n').map((paragraph, i) => (
          <p key={i} className="fonts-body mt-16pxr text-text-secondary break-keep">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }