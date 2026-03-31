export default function SupportPage() {
  return (
    <div className="flex h-full w-full flex-col gap-10 pb-16">
      {/* Header */}
      <section
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-16pxr"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">BrieFin</p>
          <h1 className="fonts-heading1 text-white">고객센터</h1>
          <p className="fonts-body1 mt-4 text-blue-100">
            Briefin은 더 나은 서비스를 만들기 위해
            <br className="hidden sm:block" />
            사용자의 의견을 적극적으로 듣고 있습니다.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        {/* 이메일 문의 */}
        <section className="flex flex-col gap-3">
          <h2 className="fonts-heading3 text-text-primary">📩 이메일 문의</h2>
          <div className="shadow-card flex flex-col gap-3 rounded-card border border-surface-border bg-surface-white p-6">
            <div className="flex items-center gap-3">
              <span className="fonts-label1 w-24 shrink-0 text-text-muted">이메일</span>
              <a href="mailto:briefin@gmail.com" className="fonts-body1 font-medium text-blue-600 hover:underline">
                briefin@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="fonts-label1 w-24 shrink-0 text-text-muted">운영 시간</span>
              <span className="fonts-body1 text-text-secondary">평일 10:00 ~ 18:00</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="fonts-label1 w-24 shrink-0 text-text-muted">답변 시간</span>
              <span className="fonts-body1 text-text-secondary">접수 후 최대 24시간 이내</span>
            </div>
          </div>
        </section>

        {/* 도움드리는 문의 */}
        <section className="flex flex-col gap-3">
          <h2 className="fonts-heading3 text-text-primary">이런 문의를 도와드려요</h2>
          <div className="shadow-card rounded-card border border-surface-border bg-surface-white p-6">
            <ul className="flex flex-col gap-2">
              {HELP_ITEMS.map((item) => (
                <li key={item} className="fonts-body2 flex items-start gap-2 text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 빠른 해결 */}
        <section className="flex flex-col gap-3">
          <h2 className="fonts-heading3 text-text-primary">🚀 빠른 해결을 원하신다면</h2>
          <div className="shadow-card flex flex-col gap-3 rounded-card border border-surface-border bg-surface-white p-6">
            <p className="fonts-body1 text-text-secondary">
              문의 시 아래 정보를 함께 보내주시면 더 빠르게 도와드릴 수 있습니다.
            </p>
            <ul className="flex flex-col gap-2">
              {QUICK_TIPS.map((item) => (
                <li key={item} className="fonts-body2 flex items-start gap-2 text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 참고사항 */}
        <section className="flex flex-col gap-3">
          <h2 className="fonts-heading3 text-text-primary">⚠️ 참고사항</h2>
          <div className="shadow-card rounded-card border border-amber-200 bg-amber-50 p-6">
            <ul className="flex flex-col gap-2">
              {NOTICES.map((item) => (
                <li key={item} className="fonts-body2 flex items-start gap-2 text-amber-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 하단 메시지 */}
        <div className="rounded-card border border-blue-100 bg-blue-50 p-6 text-center">
          <p className="fonts-heading3 text-blue-800">🙌 여러분의 의견이 Briefin을 만듭니다</p>
          <p className="fonts-body1 mt-2 text-blue-600">
            Briefin은 사용자의 피드백을 바탕으로 계속 발전합니다.
            <br />더 좋은 서비스를 위해 언제든지 의견을 남겨주세요.
          </p>
        </div>
      </div>
    </div>
  );
}

const HELP_ITEMS = [
  '서비스 이용 방법 안내',
  '계정 및 로그인 문제',
  '뉴스/공시 오류 제보',
  '기능 개선 제안',
  '기타 불편사항 접수',
];

const QUICK_TIPS = ['사용 중인 기기 및 브라우저', '문제 발생 화면 또는 내용', '발생 시간'];

const NOTICES = [
  '투자 관련 상담 및 종목 추천은 제공하지 않습니다.',
  '서비스는 투자 참고 정보를 제공하며, 투자 판단은 이용자 본인의 책임입니다.',
];
