export default function NoticePage() {
  return (
    <div className="flex h-full w-full flex-col gap-10 pb-16">
      {/* Header */}
      <section
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-16pxr"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
            BrieFin
          </p>
          <h1 className="fonts-heading1 text-white">공지사항</h1>
          <p className="fonts-body1 mt-4 text-blue-100">
            Briefin의 새로운 기능, 업데이트, 점검 소식 등을 안내드립니다.
          </p>
        </div>
      </section>

      {/* Notice List */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {NOTICES.map((notice) => (
          <article
            key={notice.id}
            className="flex flex-col gap-4 rounded-card border border-surface-border bg-surface-white p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="rounded-badge bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  {notice.tag}
                </span>
                <h2 className="fonts-heading3 text-text-primary">{notice.title}</h2>
              </div>
              <span className="fonts-label1 shrink-0 text-text-muted">{notice.date}</span>
            </div>
            <div className="border-t border-surface-border pt-4">
              {notice.body.map((paragraph, i) => (
                <p key={i} className="fonts-body1 text-text-secondary mb-3 last:mb-0 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const NOTICES = [
  {
    id: 1,
    tag: '공지',
    title: 'Briefin 서비스 오픈 안내',
    date: '2026.03.31',
    body: [
      '안녕하세요, Briefin입니다.',
      'Briefin은 국내 상장 기업의 공시와 뉴스를 AI로 쉽고 빠르게 요약해 제공하는 금융 정보 플랫폼입니다.',
      '복잡한 금융 정보를 누구나 이해할 수 있도록 더 직관적이고 편리한 서비스로 발전해 나가겠습니다.\n많은 관심과 이용 부탁드립니다.',
      '감사합니다.\n— Briefin 팀 드림',
    ],
  },
];
