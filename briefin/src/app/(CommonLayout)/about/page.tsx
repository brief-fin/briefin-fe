export default function AboutPage() {
  return (
    <main className="flex h-full w-full flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-20pxr"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-blue-200 uppercase">
            BrieFin 서비스 소개
          </p>
          <h1 className="fonts-heading1 mb-6 text-white">
            복잡한 공시,
            <br />
            3문장으로 끝내세요.
          </h1>
          <p className="fonts-body1 text-blue-100">
            Briefin은 국내 상장 기업의 공시와 뉴스를 AI로 요약해
            <br className="hidden sm:block" />
            투자 입문자의 빠른 정보탐색을 돕는 투자 정보 플랫폼입니다.
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-16">
        {/* Problem & Solution */}
        <section className="flex flex-col gap-6">
          <h2 className="fonts-heading2 text-text-primary">💡 우리가 해결하는 문제</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PROBLEMS.map((item) => (
              <div
                key={item.problem}
                className="flex flex-col gap-3 rounded-card border border-surface-border bg-surface-white p-6 shadow-card">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-500">
                    ✕
                  </span>
                  <p className="fonts-body2 text-text-secondary">{item.problem}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                    ✓
                  </span>
                  <p className="fonts-body2 font-medium text-text-primary">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Features */}
        <section className="flex flex-col gap-6">
          <h2 className="fonts-heading2 text-text-primary">🚀 핵심 기능</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-4 rounded-card border border-surface-border bg-surface-white p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <h3 className="fonts-heading3 text-text-primary">{feature.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {feature.items.map((item) => (
                    <li key={item} className="fonts-body2 flex items-start gap-2 text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Target Users */}
        <section className="flex flex-col gap-6">
          <h2 className="fonts-heading2 text-text-primary">📌 Briefin은 이런 분들께 추천합니다</h2>
          <div className="rounded-card border border-surface-border bg-surface-white p-6 shadow-card">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TARGET_USERS.map((user) => (
                <li key={user} className="fonts-body1 flex items-center gap-3 text-text-secondary">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600">
                    ✓
                  </span>
                  {user}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

const PROBLEMS = [
  {
    problem: '공시 원문이 길고 어려워 읽기 힘들다',
    solution: '핵심만 담은 3문장 AI 요약 제공',
  },
  {
    problem: '관심 기업 뉴스를 한 곳에서 보기 어렵다',
    solution: '관심 기업 기반 맞춤 뉴스 피드',
  },
  {
    problem: '중요한 공시를 놓치기 쉽다',
    solution: '실시간 공시 수집 및 알림',
  },
  {
    problem: '투자 정보가 어렵고 딱딱하다',
    solution: '숏폼 형태의 직관적인 피드 UX',
  },
];

const FEATURES = [
  {
    icon: '📰',
    title: '기업 뉴스 피드',
    items: [
      '국내 상장 기업 관련 뉴스 통합 제공',
      '카테고리·키워드 기반 탐색 지원',
      '유사 뉴스 추천 기능으로 흐름 파악 가능',
    ],
  },
  {
    icon: '📋',
    title: 'AI 공시 요약',
    items: [
      '공시 자동 수집 및 핵심 요약 제공',
      '중요한 내용만 3문장으로 정리',
      '계약 금액, 기간, 조건 등 핵심 수치 포함',
      '호재·악재·중립 등 투자 심리 분석 제공',
    ],
  },
  {
    icon: '🎬',
    title: '숏폼 릴스 피드',
    items: [
      '짧고 빠르게 보는 금융 뉴스',
      '사용자의 행동(조회·저장·체류 시간) 기반 추천',
      '관심사 기반 개인화 피드 제공',
    ],
  },
  {
    icon: '⭐',
    title: '관심 종목 & 스크랩',
    items: ['관심 기업 등록 후 맞춤 정보 제공', '뉴스·공시 저장(스크랩) 및 모아보기 기능'],
  },
  {
    icon: '📈',
    title: '기업 정보',
    items: ['실시간 주가 및 등락률 확인', '시가총액, 섹터 분류 및 관련 기업 정보 제공'],
  },
];

const TARGET_USERS = [
  '투자에 관심은 있지만 정보가 어려운 분',
  '공시를 직접 읽기엔 부담스러운 분',
  '관심 기업 정보를 빠르게 파악하고 싶은 분',
  '경제 뉴스를 쉽게 소비하고 싶은 분',
];
