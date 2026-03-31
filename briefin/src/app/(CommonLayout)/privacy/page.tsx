export default function PrivacyPage() {
  return (
    <div className="flex h-full w-full flex-col gap-10 pb-16">
      {/* Header */}
      <section
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-16pxr"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-blue-200 uppercase">
            BrieFin
          </p>
          <h1 className="fonts-heading1 text-white">개인정보처리방침</h1>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-8">
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="fonts-heading3 text-text-primary">{section.title}</h2>
            <div className="rounded-card border border-surface-border bg-surface-white p-6 shadow-card flex flex-col gap-4">
              {section.intro && (
                <p className="fonts-body1 text-text-secondary">{section.intro}</p>
              )}
              {section.items && (
                <ul className="flex flex-col gap-2">
                  {section.items.map((item) => (
                    <li key={item} className="fonts-body2 flex items-start gap-2 text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.groups && section.groups.map((group) => (
                <div key={group.label} className="flex flex-col gap-2">
                  <p className="fonts-label1 font-semibold text-text-primary">{group.label}</p>
                  <ul className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <li key={item} className="fonts-body2 flex items-start gap-2 text-text-secondary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {section.note && (
                <p className="fonts-body2 text-text-muted">{section.note}</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const PRIVACY_SECTIONS = [
  {
    title: '1. 개인정보 수집 및 이용 목적',
    intro: 'Briefin(이하 "서비스")은 다음의 목적을 위해 개인정보를 수집·이용합니다.',
    items: [
      '회원 가입 및 로그인 처리',
      '관심 기업(Watchlist), 스크랩 기능 제공',
      '맞춤형 뉴스 및 콘텐츠 추천',
      '서비스 개선 및 사용자 경험 분석',
      '고객 문의 대응',
    ],
  },
  {
    title: '2. 수집하는 개인정보 항목',
    groups: [
      {
        label: '① 회원가입 시',
        items: ['이메일', '비밀번호(암호화 저장)'],
      },
      {
        label: '② 서비스 이용 과정에서 자동 수집',
        items: [
          '접속 로그',
          '이용 기록 (조회, 좋아요, 체류 시간 등)',
          'IP 주소, 브라우저 정보',
        ],
      },
    ],
  },
  {
    title: '3. 개인정보의 보유 및 이용 기간',
    intro: '회원 탈퇴 시까지 보관합니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.',
    items: ['로그 기록: 최대 3개월', '서비스 이용 기록: 최대 1년'],
  },
  {
    title: '4. 개인정보의 제3자 제공',
    intro: '서비스는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 단, 아래의 경우는 예외로 합니다.',
    items: ['이용자의 사전 동의가 있는 경우', '법령에 의한 요청이 있는 경우'],
  },
  {
    title: '5. 개인정보 처리 위탁',
    intro: '서비스는 원활한 운영을 위해 일부 업무를 외부에 위탁할 수 있습니다.',
    items: [
      '클라우드 서비스 제공자 (예: Amazon Web Services, Supabase)',
      '분석 도구 (예: Google Analytics)',
    ],
  },
  {
    title: '6. 개인정보의 안전성 확보 조치',
    intro: '서비스는 개인정보 보호를 위해 다음과 같은 조치를 취합니다.',
    items: ['비밀번호 암호화 저장', '접근 권한 제한', '보안 시스템 적용'],
  },
  {
    title: '7. 이용자의 권리',
    intro: '이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.',
    items: ['개인정보 조회', '수정 및 삭제 요청', '회원 탈퇴'],
  },
  {
    title: '8. 쿠키(Cookie) 사용',
    intro: '서비스는 사용자 경험 개선을 위해 쿠키를 사용할 수 있습니다.',
    items: ['로그인 상태 유지', '사용자 맞춤 콘텐츠 제공'],
    note: '사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.',
  },
  {
    title: '9. 개인정보 보호책임자',
    intro: '서비스는 개인정보 보호 관련 문의를 위해 아래와 같이 담당자를 지정합니다.',
    items: ['이메일: seohyeonkim111@gmail.com'],
  },
  {
    title: '10. 정책 변경',
    intro:
      '본 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수 있으며, 변경 시 공지합니다.',
  },
];
